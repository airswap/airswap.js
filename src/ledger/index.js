const _ = require('lodash')
const ProviderEngine = require('web3-provider-engine')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc')
const { default: AppEth } = require('@ledgerhq/hw-app-eth/lib/Eth')
const { default: TransportU2F } = require('@ledgerhq/hw-transport-u2f')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet')
const stripHexPrefix = require('strip-hex-prefix')
const EthereumTx = require('ethereumjs-tx')
const { NETWORK, AIRSWAP_GETH_NODE_ADDRESS } = require('../constants')

const getLedgerAccount = async subPath => {
  const transport = await TransportU2F.create(10000, 10000)

  const eth = new AppEth(transport)
  const path = `${subPath}`
  const addressPromise = eth.getAddress(path, false, true)

  addressPromise.then(() => transport.close())

  return addressPromise
}

const makeLedgerProvider = async path => {
  const engine = new ProviderEngine()
  const getTransport = () => TransportU2F.create(10000, 10000)
  const ledger = createLedgerSubprovider(getTransport, {
    networkId: NETWORK,
    accountsLength: 1,
    path,
    accountsOffset: 0,
  })
  const rpcProvider = new RpcSubprovider({
    rpcUrl: AIRSWAP_GETH_NODE_ADDRESS,
  })
  engine.addProvider(ledger)
  engine.addProvider(rpcProvider)
  engine.start()
  return engine
}

const allowedHdPaths = ["44'/60'", "44'/61'"]

function makeError(msg, id) {
  const err = new Error(msg)
  err.id = id
  return err
}

function obtainPathComponentsFromDerivationPath(derivationPath) {
  // check if derivation path follows 44'/60'/x'/n pattern
  const regExp = /^(44'\/6[0|1]'\/\d+'?\/\d+'?)(\/\d+)?$/
  const matchResult = regExp.exec(derivationPath)
  if (matchResult === null) {
    throw makeError(
      "To get multiple accounts your derivation path must follow pattern 44'/60|61'/x'/n ",
      'InvalidDerivationPath',
    )
  }
  return { basePath: matchResult[1], index: parseInt(_.trimStart(matchResult[2], '/'), 10) }
}

const defaultOptions = {
  networkId: 1, // mainnet
  path: "44'/60'/0'/0", // ledger default derivation path
  askConfirm: false,
  accountsLength: 1,
  accountsOffset: 0,
}

function createLedgerSubprovider(getTransport, options) {
  const { networkId, path, askConfirm, accountsLength, accountsOffset } = {
    ...defaultOptions,
    ...options,
  }
  if (!allowedHdPaths.some(hdPref => path.startsWith(hdPref))) {
    throw makeError(
      `Ledger derivation path allowed are ${allowedHdPaths.join(', ')}. ${path} is not supported`,
      'InvalidDerivationPath',
    )
  }

  const pathComponents = obtainPathComponentsFromDerivationPath(path)

  const addressToPathMap = {}

  async function getAccounts() {
    let transport
    try {
      transport = await getTransport()
    } catch (e) {
      return Promise.reject(e)
    }
    try {
      const eth = new AppEth(transport)
      const addresses = {}
      for (let i = accountsOffset; i < accountsOffset + accountsLength; i++) {
        const accountPath = `${pathComponents.basePath}/${pathComponents.index + i}`
        let address
        try {
          address = await eth.getAddress(accountPath, askConfirm, false) //eslint-disable-line
        } catch (e) {
          return Promise.reject(e)
        }
        addresses[path] = address.address.toLowerCase()
        addressToPathMap[address.address.toLowerCase()] = path
      }
      return addresses
    } finally {
      transport.close()
    }
  }

  async function signPersonalMessage(msgData) {
    const dPath = addressToPathMap[msgData.from.toLowerCase()]
    if (!dPath) throw new Error(`address unknown '${msgData.from}'`)
    const transport = await getTransport()

    try {
      const eth = new AppEth(transport)

      let result
      try {
        result = await eth.signPersonalMessage(dPath, stripHexPrefix(msgData.data))
      } catch (e) {
        return Promise.reject(e)
      }

      const v = parseInt(result.v, 10) - 27
      let vHex = v.toString(16)
      if (vHex.length < 2) {
        vHex = `0${v}`
      }
      return `0x${result.r}${result.s}${vHex}`
    } finally {
      transport.close()
    }
  }

  async function signTransaction(txData) {
    const dPath = addressToPathMap[txData.from]
    if (!dPath) throw new Error(`address unknown '${txData.from}'`)
    const transport = await getTransport()

    try {
      const eth = new AppEth(transport)
      const tx = new EthereumTx(txData)

      // Set the EIP155 bits
      tx.raw[6] = Buffer.from([networkId]) // v
      tx.raw[7] = Buffer.from([]) // r
      tx.raw[8] = Buffer.from([]) // s

      // Pass hex-rlp to ledger for signing
      const result = await eth.signTransaction(dPath, tx.serialize().toString('hex'))

      // Store signature in transaction
      tx.v = Buffer.from(result.v, 'hex')
      tx.r = Buffer.from(result.r, 'hex')
      tx.s = Buffer.from(result.s, 'hex')

      // EIP155: v should be chain_id * 2 + {35, 36}
      const signedChainId = Math.floor((tx.v[0] - 35) / 2)
      // eslint-disable-next-line
      const validChainId = networkId & 0xff // FIXME this is to fixed a current workaround that app don't support > 0xff
      if (signedChainId !== validChainId) {
        throw makeError(
          `Invalid networkId signature returned. Expected: ${networkId}, Got: ${signedChainId}`,
          'InvalidNetworkId',
        )
      }

      return `0x${tx.serialize().toString('hex')}`
    } finally {
      transport.close()
    }
  }

  const ledgerTimeout = 30000

  const subprovider = new HookedWalletSubprovider({
    getAccounts: callback => {
      getAccounts()
        .then(res => callback(null, Object.values(res)))
        .catch(err => callback(err, null))
    },
    signPersonalMessage: (txData, callback) => {
      let timedOut
      let finished

      window.setTimeout(() => {
        timedOut = true
        if (!finished) callback(`Ledger ${ledgerTimeout / 1000} second timeout reached`, null)
      }, ledgerTimeout)

      signPersonalMessage(txData)
        .then(res => {
          if (!timedOut) {
            callback(null, res)
            finished = true
          }
        })
        .catch(err => {
          if (!timedOut) {
            callback(err, null)
            finished = true
          }
        })
    },
    signTransaction: (txData, callback) => {
      let timedOut
      let finished
      window.setTimeout(() => {
        timedOut = true
        if (!finished) callback(`Ledger ${ledgerTimeout / 1000} second timeout reached`, null)
      }, ledgerTimeout)

      signTransaction(txData)
        .then(res => {
          if (!timedOut) {
            callback(null, res)
            finished = true
          }
        })
        .catch(err => {
          if (!timedOut) {
            callback(err, null)
            finished = true
          }
        })
    },
  })

  return subprovider
}

module.exports = { getLedgerAccount, makeLedgerProvider }
