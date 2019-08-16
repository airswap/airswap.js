const ethers = require('ethers')
const { httpProvider } = require('../constants')

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
    return this.signer.sendUncheckedTransaction(transaction).then(hash => httpProvider.getTransaction(hash))
  }

  signMessage(message) {
    return this.signer.signMessage(message)
  }
}

module.exports = UncheckedJsonRpcSigner
