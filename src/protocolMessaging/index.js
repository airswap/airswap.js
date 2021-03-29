const _ = require('lodash')
const ethers = require('ethers')
const jaysonBrowserClient = require('jayson/lib/client/browser')
const axios = require('axios')
const uuid = require('uuid4')
const { nest, flatten, mapNested22OrderTo20Order, mapNested22QuoteTo20Quote } = require('../swap/utils')
const { routeDelegateCall } = require('../delegate')

// Class Constructor
// ----------------

const quoteQueryDefaults = {
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateAmount: '0',
}

const orderQueryDefaults = {
  senderWallet: '0x0000000000000000000000000000000000000000',
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateAmount: '0',
}

function typeSafeOrder(params, locatorType) {
  if (locatorType === 'contract') {
    return mapNested22QuoteTo20Quote(params)
  }

  const { nonce, expiry, signature, signer, sender, affiliate } = params
  const safeOrder = mapNested22OrderTo20Order(
    {
      signer: {
        ...signer,
        wallet: signer.wallet.toLowerCase(),
      },
      sender: {
        ...sender,
        wallet: sender.wallet.toLowerCase(),
      },
      affiliate: {
        ...affiliate,
        wallet: affiliate.wallet.toLowerCase(),
      },
      signature: {
        ...signature,
        v: `${signature.v}`,
        signatory: signature.signatory.toLowerCase(),
        validator: signature.validator.toLowerCase(),
      },
      nonce: `${nonce}`,
      expiry: `${expiry}`,
    },
    true,
  )

  return safeOrder
}

class Router {
  // * `address`: `string` - ethereum address of wallet using the Router
  constructor(config) {
    const { address = '', timeout = 12000 } = config

    // Create an ethereum wallet object for signing orders
    this.address = address.toLowerCase()
    this.timeout = timeout

    // Websocket authentication state
    this.isAuthenticated = false

    // Promise resolvers/rejectors and timeouts for each call
    this.RESOLVERS = {}
    this.REJECTORS = {}
    this.TIMEOUTS = {}
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
  call(signerAddress, message, resolve, reject, locator, locatorType) {
    if (locatorType && _.includes(['http', 'https'], locatorType)) {
      const timeout = setTimeout(() => reject({ message: `Request timed out.`, code: -1 }), this.timeout)
      const callServer = function(request, callback) {
        axios
          .post(locator, request, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then(response => {
            if (response.status === 200) {
              callback(null, JSON.stringify(response.data))
            } else {
              callback(response.status)
            }
          })
          .catch(error => {
            callback(error)
          })
      }

      const client = jaysonBrowserClient(callServer)

      client.request(message.method, message.params, (err, error, response) => {
        clearTimeout(timeout)
        if (err) {
          reject(err)
        } else if (error) {
          reject(`Maker Error: ${error.message}`)
        } else {
          resolve(response)
        }
      })
    } else if (locatorType === 'contract') {
      routeDelegateCall(locator, message, signerAddress, this.address)
        .then(resp => {
          resolve(resp)
        })
        .catch(e => {
          reject(e)
        })
    }
  }

  getSignerSideOrder(signerAddress, params) {
    const { signerToken, senderToken, senderAmount, affiliateToken, affiliateAmount, locator, locatorType } = params

    const query = Object.assign({}, orderQueryDefaults, {
      signerToken,
      senderToken,
      senderAmount,
      senderWallet: this.address.toLowerCase(),
      affiliateToken,
      affiliateAmount,
    })

    const payload = Router.makeRPC('getSignerSideOrder', query)
    return new Promise((res, rej) => this.call(signerAddress, payload, res, rej, locator, locatorType)).then(order => ({
      ...typeSafeOrder(order, locatorType),
      swap: { version: 2 },
      locator: { type: locatorType, value: locator },
    }))
  }

  getSenderSideOrder(signerAddress, params) {
    const { signerToken, senderToken, signerAmount, affiliateToken, affiliateAmount, locator, locatorType } = params

    const query = Object.assign({}, orderQueryDefaults, {
      signerToken,
      senderToken,
      signerAmount,
      senderWallet: this.address.toLowerCase(),
      affiliateToken,
      affiliateAmount,
    })

    const payload = Router.makeRPC('getSenderSideOrder', query)
    return new Promise((res, rej) => this.call(signerAddress, payload, res, rej, locator, locatorType)).then(order => ({
      ...typeSafeOrder(order, locatorType),
      swap: { version: 2 },
      locator: { type: locatorType, value: locator },
    }))
  }

  // Make a JSON-RPC `getOrder` call on a maker and recieve back a signed order (or a timeout if they fail to respond)
  // * `makerAddress`: `string` - the maker address to request an order from
  // * `params`: `Object` - order parameters. Must specify 1 of either `makerAmount` or `takerAmount`. Must also specify `makerToken` and `takerToken` addresses
  getOrder(makerAddress, params) {
    const { makerAmount, takerAmount, makerToken, takerToken, locator, locatorType } = params
    const BadArgumentsError = new Error('bad arguments passed to getOrder')
    const swapVersion = params.swapVersion || 1

    if (swapVersion === 2) {
      if (takerAmount) {
        return this.getSignerSideOrder(makerAddress, {
          senderAmount: takerAmount,
          signerToken: makerToken,
          senderToken: takerToken,
          locator,
          locatorType,
        })
      } else if (makerAmount) {
        return this.getSenderSideOrder(makerAddress, {
          signerAmount: makerAmount,
          signerToken: makerToken,
          senderToken: takerToken,
          locator,
          locatorType,
        })
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

  getSignerSideQuote(makerAddress, params) {
    const { signerToken, senderToken, senderAmount, locator, locatorType } = params

    const query = Object.assign({}, quoteQueryDefaults, {
      signerToken,
      senderToken,
      senderAmount,
    })

    const payload = Router.makeRPC('getSignerSideQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej, locator, locatorType)).then(quote => {
      const flatQuote = flatten(quote)
      const combinedQuote = {
        ...query,
        ...flatQuote,
        swapVersion: 2,
        locator: { type: locatorType, value: locator },
      }
      return mapNested22QuoteTo20Quote(nest(combinedQuote))
    })
  }

  getSenderSideQuote(makerAddress, params) {
    const { signerToken, senderToken, signerAmount, locator, locatorType } = params

    const query = Object.assign({}, quoteQueryDefaults, {
      signerToken,
      senderToken,
      signerAmount,
    })

    const payload = Router.makeRPC('getSenderSideQuote', query)
    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej, locator, locatorType)).then(quote => {
      const flatQuote = flatten(quote)
      const combinedQuote = {
        ...query,
        ...flatQuote,
        swapVersion: 2,
        locator: { type: locatorType, value: locator },
      }
      return mapNested22QuoteTo20Quote(nest(combinedQuote))
    })
  }

  getMaxQuote(makerAddress, params) {
    const { makerToken, takerToken, signerToken, senderToken, locator, locatorType } = params
    const BadArgumentsError = new Error('bad arguments passed to getMaxQuote')
    const swapVersion = params.swapVersion || 1
    if (!((takerToken && makerToken) || (signerToken && senderToken))) throw BadArgumentsError

    const query =
      swapVersion === 2
        ? {
            signerToken: signerToken || makerToken,
            senderToken: senderToken || takerToken,
          }
        : {
            makerToken,
            takerToken,
          }

    const payload = Router.makeRPC('getMaxQuote', query)

    return new Promise((res, rej) => this.call(makerAddress, payload, res, rej, locator, locatorType)).then(quote => {
      if (swapVersion === 2) {
        const flatQuote = flatten(quote)
        const combinedQuote = {
          ...query,
          ...flatQuote,
          swapVersion: 2,
          locator: { type: locatorType, value: locator },
        }
        return mapNested22QuoteTo20Quote(nest(combinedQuote))
      }
      return { ...quote, ...query, swapVersion }
    })
  }

  getQuote(makerAddress, params) {
    const { makerAmount, takerAmount, makerToken, takerToken, locator, locatorType } = params
    const swapVersion = params.swapVersion || 1

    if (swapVersion === 2) {
      if (takerAmount) {
        return this.getSignerSideQuote(makerAddress, {
          senderAmount: takerAmount,
          signerToken: makerToken,
          senderToken: takerToken,
          locator,
          locatorType,
        })
      } else if (makerAmount) {
        return this.getSenderSideQuote(makerAddress, {
          signerAmount: makerAmount,
          signerToken: makerToken,
          senderToken: takerToken,
          locator,
          locatorType,
        })
      }
    }
  }
}

module.exports = Router
