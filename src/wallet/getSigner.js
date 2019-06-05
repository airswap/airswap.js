const ethers = require('ethers')
const { AIRSWAP_GETH_NODE_ADDRESS, NETWORK, NETWORK_MAPPING } = require('../constants')

const provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

function traceMethodCalls(obj, { startWalletAction, finishWalletAction }) {
  const handler = {
    get(target, propKey) {
      if (
        startWalletAction &&
        finishWalletAction &&
        typeof target[propKey] === 'function' &&
        propKey === 'sendTransaction'
      ) {
        return async function(...args) {
          const transactionArguments = (await startWalletAction(propKey, args)) || {}
          const [tx, ...rest] = args

          const result = target[propKey].apply(this, [{ ...tx, ...transactionArguments }, ...rest])
          result.finally(() => finishWalletAction(propKey, args))
          return result
        }
      } else if (
        startWalletAction &&
        finishWalletAction &&
        typeof target[propKey] === 'function' &&
        propKey === 'signMessage'
      ) {
        return function(...args) {
          const result = target[propKey].apply(this, args)
          result.finally(() => finishWalletAction(propKey, args))
          return result
        }
      } else if (propKey === 'getAddress') {
        return function(...args) {
          const result = target[propKey].apply(this, args)
          return result
        }
      }
      return target[propKey]
    },
  }
  return new Proxy(obj, handler)
}

function getSigner(params, walletActions = {}) {
  const { privateKey, web3Provider } = params
  if (!(privateKey || web3Provider)) {
    throw new Error("must set 'privateKey' or 'web3Provider' in params")
  } else if (privateKey) {
    return traceMethodCalls(new ethers.Wallet(privateKey, provider), walletActions)
  } else {
    let networkVersion
    if (web3Provider.isPortis || web3Provider.isLedger || web3Provider.isFortmatic) {
      networkVersion = NETWORK
    } else {
      networkVersion = Number(web3Provider.send({ method: 'net_version' }).result)
    }

    if (NETWORK !== networkVersion) {
      throw new Error(`Please set your wallet to use ${NETWORK_MAPPING[NETWORK]}`)
    }

    const tempProvider = new ethers.providers.Web3Provider(web3Provider)
    const signer = tempProvider.getSigner()
    return traceMethodCalls(signer, walletActions)
  }
}

module.exports = getSigner
