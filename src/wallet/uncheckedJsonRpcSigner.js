const ethers = require('ethers')
const { httpProvider } = require('../constants')
const { poll } = require('ethers/utils/web')
// from: https://github.com/ethers-io/ethers.js/issues/340#issuecomment-447512944
class UncheckedJsonRpcSigner extends ethers.Signer {
  constructor(signer) {
    super()
    ethers.utils.defineReadOnly(this, 'signer', signer)
    ethers.utils.defineReadOnly(this, 'provider', signer.provider)
  }

  getAddress() {
    return this.signer.getAddress()
  }

  sendTransaction(transaction) {
    // return this.signer.sendUncheckedTransaction(transaction).then(hash => httpProvider.getTransaction(hash))

    return this.signer.sendUncheckedTransaction(transaction).then(hash =>
      poll(
        () =>
          httpProvider.getTransaction(hash).then(tx => {
            if (tx === null) {
              return undefined
            }
            return tx
          }),
        { fastRetry: 250 },
      ).catch(error => {
        throw error
      }),
    )
  }

  signMessage(message) {
    return this.signer.signMessage(message)
  }
}

module.exports = UncheckedJsonRpcSigner
