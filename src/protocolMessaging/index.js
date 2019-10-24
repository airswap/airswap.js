const ethers = require('ethers')
const WebSocket = require('isomorphic-ws')
const uuid = require('uuid4')
const { REACT_APP_SERVER_URL, INDEXER_ADDRESS } = require('../constants')
const { nest, flatten } = require('../swap/utils')

// Class Constructor
// ----------------

const quoteQueryDefaults = {
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateParam: '0',
}

const orderQueryDefaults = {
  takerWallet: '0x0000000000000000000000000000000000000000',
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateParam: '0',
}

function typeSafeOrder({ nonce, expiry, signature, ...rest }) {
  return {
    ...rest,
    signature: {
      ...signature,
      v: `${signature.v}`,
    },
    nonce: `${nonce}`,
    expiry: `${expiry}`,
  }
}

class Router {
  // * `rpcActions`: `Object` - user defined methods; called by peers via JSON-RPC
  // * `messageSigner`: `function` - a function taking the form (message) => signer.sign(message)
  // * `address`: `string` - ethereum address of wallet using the Router
  // * `keyspace`: `boolean` - if true, uses a keyspace messageSigner (message) => keyspace.sign(message), if false, uses an ethereum signer
  // * `requireAuthentication`: `boolean` if authenticated, the indexer allows the setting of intents. If not, only messaging is enabled
  constructor(config) {
    const { rpcActions = {}, messageSigner, address, keyspace, requireAuthentication, timeout = 12000 } = config

    // Create an ethereum wallet object for signing orders
    this.messageSigner = messageSigner
    this.address = address
    this.requireAuthentication = requireAuthentication
    this.timeout = timeout

    const keyspaceSnippet = keyspace ? 'use_pgp=true&' : ''
    const prefix = typeof window !== 'undefined' && window.location.protocol === 'http:' ? 'ws:' : 'wss:'

    // Set the websocket url based on environment
    this.socketUrl = `${prefix}${REACT_APP_SERVER_URL}websocket${requireAuthentication ? '' : '/nochallenge'}${`?${
      requireAuthentication ? keyspaceSnippet : ''
    }address=${address.toLowerCase()}`}`

    // Websocket authentication state
    this.isAuthenticated = false

    // Promise resolvers/rejectors and timeouts for each call
    this.RESOLVERS = {}
    this.REJECTORS = {}
    this.TIMEOUTS = {}

    // User defined methods that will be invoked by peers on the JSON-RPC
    this.RPC_METHOD_ACTIONS = rpcActions

    this.getOrders = this.getOrders.bind(this)
  }

  // RPC Methods
  // ----------------

  // Prepare a formatted query to be submitted as a JSON-RPC call
  static makeRPC(method, params = {}, id = uuid()) {
    return {
      jsonrpc: '2.0',
      method,
      params,
      id,
    }
  }

  // Send a JSON-RPC `message` to a `receiver` address.
  // Optionally pass `resolve` and `reject` callbacks to handle a response
  call(receiver, message, resolve, reject) {
    const messageString = JSON.stringify({
      sender: this.address.toLowerCase(),
      receiver,
      message: JSON.stringify(message),
      id: uuid(),
    })
    this.socket.send(messageString)

    // Set the promise resolvers and rejectors for this call
    if (typeof resolve === 'function') {
      this.RESOLVERS[message.id] = resolve
    }
    if (typeof reject === 'function') {
      this.REJECTORS[message.id] = reject
    }

    // Set a timeout for this call
    this.TIMEOUTS[message.id] = setTimeout(() => {
      if (typeof reject === 'function') {
        reject({ message: `Request timed out. [${message.id}]`, code: -1 })
      }
    }, this.timeout)
  }

  // WebSocket Interaction
  // ----------------

  // Connect to AirSwap by opening websocket. The sequence:
  // 1. Open a websocket connection
  // 2. Receive a challenge (some random data to sign)
  // 3. Sign the data and send it back over the wire
  // 4. Receive an "ok" and start sending and receiving RPC
  connect(reconnect = true) {
    this.socket = new WebSocket(this.socketUrl)

    // Check socket health every 30 seconds
    this.socket.onopen = function healthCheck() {
      this.isAlive = true
      // trying to make this isomorphic, and ping/pong isn't supported in browser websocket api
      if (this.ping) {
        this.addEventListener('pong', () => {
          this.isAlive = true
        })

        this.interval = setInterval(() => {
          if (this.isAlive === false) {
            console.log('no response for 30s; closing socket')
            this.close()
          }
          this.isAlive = false
          this.ping()
        }, 30000)
      }
    }

    // The connection was closed
    this.socket.onclose = () => {
      this.isAuthenticated = false
      clearInterval(this.socket.interval)
      if (reconnect) {
        console.log('socket closed; attempting reconnect in 10s')
        setTimeout(() => {
          this.connect()
        }, 10000)
      } else {
        console.log('socket closed')
      }
    }

    // There was an error on the connection
    this.socket.onerror = event => {
      throw new Error(event)
    }

    // Promisify the `onmessage` handler. Allows us to return information
    // about the connection state after the authentication handshake
    return new Promise((resolve, reject) => {
      // Received a message
      this.socket.onmessage = event => {
        // We are authenticating
        if (!this.isAuthenticated && this.requireAuthentication) {
          switch (event.data) {
            // We have completed the challenge.
            case 'ok':
              this.isAuthenticated = true
              console.log('Authentication successful')
              resolve(event.data)
              break
            case 'not authorized':
              reject(new Error('Address is not authorized.'))
              break
            default:
              // We have been issued a challenge.
              this.messageSigner(event.data).then(signature => {
                this.socket.send(signature)
              })
          }
        } else if (!this.isAuthenticated && !this.requireAuthentication) {
          if (event.data === 'ok') {
            this.isAuthenticated = true
            console.log('Authentication successful')
            resolve(event.data)
          }
        } else if (this.isAuthenticated) {
          // We are already authenticated and are receiving an RPC.
          let payload
          let message

          try {
            payload = JSON.parse(event.data)
            message = payload.message && JSON.parse(payload.message)
            payload.message = message
          } catch (e) {
            console.error('Error parsing payload', e, payload)
          }

          if (!payload || !message) {
            return
          }

          if (message.method) {
            // Another peer is invoking a method.
            if (this.RPC_METHOD_ACTIONS[message.method]) {
              this.RPC_METHOD_ACTIONS[message.method](payload)
            }
          } else if (message.id) {
            // We have received a response from a method call.
            const isError = Object.prototype.hasOwnProperty.call(message, 'error')

            if (!isError && message.result) {
              // Resolve the call if a resolver exists.
              if (typeof this.RESOLVERS[message.id] === 'function') {
                this.RESOLVERS[message.id](message.result)
              }
            } else if (isError) {
              // Reject the call if a resolver exists.
              if (typeof this.REJECTORS[message.id] === 'function') {
                this.REJECTORS[message.id](message.error)
              }
            }

            // Call lifecycle finished; tear down resolver, rejector, and timeout
            delete this.RESOLVERS[message.id]
            delete this.REJECTORS[message.id]
            clearTimeout(this.TIMEOUTS[message.id])
          }
        }
      }
    })
  }

  // Disconnect from AirSwap by closing websocket
  disconnect() {
    this.socket.close(1000)
  }

  // Interacting with the Indexer
  // ----------------

  // Query the indexer for trade intents.
  // * returns a `Promise` which is resolved with an array of `intents`
  findIntents(makerTokens, takerTokens, role = 'maker') {
    if (!makerTokens || !takerTokens) {
      throw new Error('missing arguments makerTokens or takerTokens')
    }
    const payload = Router.makeRPC('findIntents', {
      makerTokens,
      takerTokens,
      role,
    })
    return new Promise((resolve, reject) => this.call(INDEXER_ADDRESS, payload, resolve, reject))
  }

  // Call `getIntents` on the indexer to return an array of tokens that the specified address has published intent to trade
  // * parameter `address` is a lowercased Ethereum address to fetch intents for
  // * returns a `Promise` which is resolved with an array of intents set by a specific address
  getIntents(address) {
    const payload = Router.makeRPC('getIntents', { address })
    return new Promise((resolve, reject) => this.call(INDEXER_ADDRESS, payload, resolve, reject))
  }

  // Call `setIntents` on the indexer with an array of trade `intent` objects.
  // * returns a `Promise` with the indexer response. Passes `'OK'` if succcessful.
  setIntents(intents) {
    const payload = Router.makeRPC('setIntents', {
      address: this.address.toLowerCase(),
      intents,
    })
    return new Promise((resolve, reject) => this.call(INDEXER_ADDRESS, payload, resolve, reject))
  }

  getMakerSideOrder(makerAddress, params) {
    const { makerToken, takerToken, takerParam, affiliateToken, affiliateParam } = params

    const query = Object.assign({}, orderQueryDefaults, {
      makerToken,
      takerToken,
      takerParam,
      takerWallet: this.address.toLowerCase(),
      affiliateToken,
      affiliateParam,
    })

    const payload = Router.makeRPC('getMakerSideOrder', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(order => ({
      ...typeSafeOrder(order),
      swap: { version: 2 },
    }))
  }

  getTakerSideOrder(makerAddress, params) {
    const { makerToken, takerToken, makerParam, affiliateToken, affiliateParam } = params

    const query = Object.assign({}, orderQueryDefaults, {
      makerToken,
      takerToken,
      makerParam,
      takerWallet: this.address.toLowerCase(),
      affiliateToken,
      affiliateParam,
    })

    const payload = Router.makeRPC('getTakerSideOrder', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(order => ({
      ...typeSafeOrder(order),
      swap: { version: 2 },
    }))
  }

  // Make a JSON-RPC `getOrder` call on a maker and recieve back a signed order (or a timeout if they fail to respond)
  // * `makerAddress`: `string` - the maker address to request an order from
  // * `params`: `Object` - order parameters. Must specify 1 of either `makerAmount` or `takerAmount`. Must also specify `makerToken` and `takerToken` addresses
  getOrder(makerAddress, params) {
    const { makerAmount, takerAmount, makerToken, takerToken } = params
    const BadArgumentsError = new Error('bad arguments passed to getOrder')
    const swapVersion = params.swapVersion || 1

    if (swapVersion === 2) {
      if (takerAmount) {
        return this.getMakerSideOrder(makerAddress, { makerAmount, takerParam: takerAmount, makerToken, takerToken })
      } else if (makerAmount) {
        return this.getTakerSideOrder(makerAddress, { makerAmount, makerParam: makerAmount, makerToken, takerToken })
      }
    }

    if (!makerAmount && !takerAmount) throw BadArgumentsError
    if (makerAmount && takerAmount) throw BadArgumentsError
    if (!takerToken || !makerToken) throw BadArgumentsError

    const query = {
      makerToken,
      takerToken,
      makerAmount: makerAmount ? String(makerAmount) : null,
      takerAmount: takerAmount ? String(takerAmount) : null,
      takerAddress: this.address.toLowerCase(),
    }

    const payload = Router.makeRPC('getOrder', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(order => {
      if (makerAmount && makerAmount !== order.makerAmount) {
        return {
          message:
            'makerAmount specified in getOrder request does not match makerAmount sent from maker; discarding order',
        }
      } else if (takerAmount && takerAmount !== order.takerAmount) {
        return {
          message:
            'takerAmount specified in getOrder request does not match takerAmount sent from maker; discarding order',
        }
      }

      return {
        ...order,
        v: order.v ? ethers.utils.bigNumberify(order.v).toNumber() : order.v,
        expiration: order.expiration ? ethers.utils.bigNumberify(order.expiration).toNumber() : order.expiration,
        makerAddress: (order.makerAddress || '').toLowerCase(), // normalizes the case of addresses in returned orders
        takerAddress: (order.takerAddress || '').toLowerCase(),
        makerToken: (order.makerToken || '').toLowerCase(),
        takerToken: (order.takerToken || '').toLowerCase(),
        swapVersion,
        nonce: order.nonce ? `${order.nonce}` : order.nonce,
      }
    })
  }

  getMakerSideQuote(makerAddress, params) {
    const { makerToken, takerToken, takerParam, affiliateToken, affiliateParam } = params

    const query = Object.assign({}, quoteQueryDefaults, {
      makerToken,
      takerToken,
      takerParam,
      affiliateToken,
      affiliateParam,
    })

    const payload = Router.makeRPC('getMakerSideQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(quote => {
      const flatQuote = flatten(quote)
      const combinedQuote = {
        ...query,
        ...flatQuote,
        swapVersion: 2,
      }
      return nest(combinedQuote)
    })
  }

  getTakerSideQuote(makerAddress, params) {
    const { makerToken, takerToken, makerParam, affiliateToken, affiliateParam } = params

    const query = Object.assign({}, quoteQueryDefaults, {
      makerToken,
      takerToken,
      makerParam,
      affiliateToken,
      affiliateParam,
    })

    const payload = Router.makeRPC('getTakerSideQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(quote => {
      const flatQuote = flatten(quote)
      const combinedQuote = {
        ...query,
        ...flatQuote,
        swapVersion: 2,
      }
      return nest(combinedQuote)
    })
  }

  getMaxQuote(makerAddress, params) {
    const { makerToken, takerToken } = params
    const BadArgumentsError = new Error('bad arguments passed to getMaxQuote')
    const swapVersion = params.swapVersion || 1
    if (!takerToken || !makerToken) throw BadArgumentsError

    const query =
      swapVersion === 2
        ? Object.assign({}, quoteQueryDefaults, { makerToken, takerToken })
        : {
            makerToken,
            takerToken,
          }

    const payload = Router.makeRPC('getMaxQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(quote => {
      if (swapVersion === 2) {
        const flatQuote = flatten(quote)
        const combinedQuote = {
          ...query,
          ...flatQuote,
          swapVersion: 2,
        }
        return nest(combinedQuote)
      }
      return { ...quote, ...query, swapVersion }
    })
  }

  getQuote(makerAddress, params) {
    const { makerAmount, takerAmount, makerToken, takerToken } = params
    const swapVersion = params.swapVersion || 1
    const BadArgumentsError = new Error('bad arguments passed to getOrder')

    if (swapVersion === 2) {
      if (takerAmount) {
        return this.getMakerSideQuote(makerAddress, { makerAmount, takerParam: takerAmount, makerToken, takerToken })
      } else if (makerAmount) {
        return this.getTakerSideQuote(makerAddress, { makerAmount, makerParam: makerAmount, makerToken, takerToken })
      }
    }

    if (!makerAmount && !takerAmount) throw BadArgumentsError
    if (makerAmount && takerAmount) throw BadArgumentsError
    if (!takerToken || !makerToken) throw BadArgumentsError

    const query = {
      makerToken,
      takerToken,
      makerAmount: makerAmount ? String(makerAmount) : null,
      takerAmount: takerAmount ? String(takerAmount) : null,
    }

    const payload = Router.makeRPC('getQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).then(quote => ({
      ...quote,
      swapVersion,
    }))
  }
  // Given an array of trade intents, make a JSON-RPC `getOrder` call for each `intent`
  getOrders(intents, params) {
    const { makerAmount, takerAmount } = params
    if (!Array.isArray(intents) || !(makerAmount || takerAmount)) {
      throw new Error('bad arguments passed to getOrders')
    }
    return Promise.all(
      intents.map(({ makerAddress, makerToken, takerToken }) => {
        const payload = Router.makeRPC('getOrder', {
          makerToken,
          takerToken,
          takerAddress: this.address.toLowerCase(),
          ...params,
        })

        // `Promise.all` will return a complete array of resolved promises, or just the first rejection if a promise fails.
        // To mitigate this, we `catch` errors on individual promises so that `Promise.all` always returns a complete array
        return new Promise((res, rej) => this.call(makerAddress, payload, res, rej)).catch(e => e)
      }),
    )
  }
}

module.exports = Router
