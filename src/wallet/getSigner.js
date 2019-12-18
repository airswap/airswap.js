const _ = require('lodash')
const uuid = require('uuid4')
const ethers = require('ethers')
const ethUtil = require('ethereumjs-util')
const { httpProvider, NETWORK, NETWORK_MAPPING } = require('../constants')
const walletTypes = require('./static/walletTypes.json')
const UncheckedJsonRpcSigner = require('./uncheckedJsonRpcSigner')
const { Gas } = require('../gas')

function traceMethodCalls(obj, { startWalletAction, finishWalletAction }, walletType) {
  const supportsSignTypedData = !!_.get(_.find(walletTypes, { type: walletType }), 'supportsSignTypedData')
  const handler = {
    get(target, propKey) {
      if (propKey === 'walletType') {
        return walletType
      } else if (propKey === 'supportsSignTypedData') {
        return supportsSignTypedData
      } else if (typeof target[propKey] === 'function' && propKey === 'sendTransaction') {
        return async function(...args) {
          const transactionArguments = startWalletAction ? (await startWalletAction(propKey, args)) || {} : {}
          const [tx, ...rest] = args

          const result = target[propKey].apply(this, [{ ...tx, ...transactionArguments }, ...rest])
          result.finally(() => finishWalletAction && finishWalletAction(propKey, args))
          return result
        }
      } else if (
        startWalletAction &&
        finishWalletAction &&
        typeof target[propKey] === 'function' &&
        propKey === 'signMessage'
      ) {
        return function(...args) {
          startWalletAction(propKey, args)
          const addressPromise = target.getAddress()

          return addressPromise.then(from => {
            const msg = ethUtil.bufferToHex(new Buffer(_.first(args), 'utf8'))
            const params = [msg, from.toLowerCase()]
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
      } else if (propKey === 'signTypedData') {
        return function(...args) {
          if (!supportsSignTypedData) {
            return Promise.reject(`signTypedData not supported by ${walletType}`)
          }

          startWalletAction(propKey, args)
          const addressPromise = target.getAddress()

          return addressPromise.then(from => {
            const data = _.first(args)
            const result = (type => {
              switch (type) {
                case 'metamask':
                  return new Promise((resolve, reject) => {
                    target.provider._web3Provider.sendAsync(
                      { id: uuid(), method: 'eth_signTypedData_v3', params: [from, JSON.stringify(data)], from },
                      (err, resp) => {
                        if (err) {
                          reject(err)
                        } else {
                          resolve(_.get(resp, 'result'))
                        }
                      },
                    )
                  })
                case 'fortmatic':
                  return new Promise((resolve, reject) => {
                    target.provider._web3Provider.sendAsync(
                      { id: uuid(), method: 'eth_signTypedData_v3', params: [from, JSON.stringify(data)], from },
                      (err, resp) => {
                        if (err) {
                          reject(err)
                        } else {
                          resolve(_.get(resp, 'result'))
                        }
                      },
                    )
                  })
                default:
                  return Promise.reject(`signTypedData not supported by ${walletType}`)
              }
            })(walletType)
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

function getSigner(params, walletActions = {}, walletType) {
  if (!walletActions.startWalletAction) {
    const gas = new Gas()
    walletActions.startWalletAction = () =>
      // eslint-disable-line
      gas.getGasSettingsForTransaction('average')
  }

  const { privateKey, web3Provider } = params
  if (!(privateKey || web3Provider)) {
    throw new Error("must set 'privateKey' or 'web3Provider' in params")
  } else if (privateKey) {
    return traceMethodCalls(new ethers.Wallet(privateKey, httpProvider), walletActions)
  } else {
    let networkVersion
    if (web3Provider.isPortis || web3Provider.isLedger || web3Provider.isFortmatic) {
      networkVersion = NETWORK
    } else if (web3Provider.networkVersion) {
      networkVersion = Number(web3Provider.networkVersion)
    } else {
      try {
        networkVersion = Number(web3Provider.send({ method: 'net_version' }).result)
      } catch (e) {
        networkVersion = NETWORK
      }
    }

    if (NETWORK !== networkVersion) {
      throw new Error(`Please set your wallet to use ${NETWORK_MAPPING[NETWORK]}`)
    }

    const tempProvider = new ethers.providers.Web3Provider(web3Provider)
    const signer = new UncheckedJsonRpcSigner(tempProvider.getSigner())
    return traceMethodCalls(signer, walletActions, walletType)
  }
}

module.exports = getSigner
