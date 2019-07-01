const _ = require('lodash')
const uuid = require('uuid')
const ethers = require('ethers')
const ethUtil = require('ethereumjs-util')
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
          const addressPromise = target.getAddress()

          return addressPromise.then(from => {
            const msg = ethUtil.bufferToHex(new Buffer(_.first(args), 'utf8'))
            const params = [msg, from]
            const result = new Promise((resolve, reject) =>
              target.provider._sendAsync({ id: uuid(), method: 'personal_sign', params }, (err, resp) => {
                if (err) {
                  reject(err)
                } else {
                  resolve(_.get(resp, 'result'))
                }
              }),
            )
            result.finally(() => finishWalletAction(propKey, args))
            return result
          })
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
