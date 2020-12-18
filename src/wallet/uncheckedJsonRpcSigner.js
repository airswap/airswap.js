const ethers = require('ethers')
const { ethersProvider } = require('../constants')
const { poll } = require('ethers/utils/web')
// const { checkProperties, defineReadOnly, resolveProperties, shallowCopy } = require('ethers/utils/properties')

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
    // return this.signer.sendUncheckedTransaction(transaction).then(hash => ethersProvider.getTransaction(hash))

    return this.signer.sendUncheckedTransaction(transaction).then(hash =>
      poll(
        async () => {
          let tx
          tx = await this.signer.provider.getTransaction(hash)
          if (tx) {
            console.log('window.web3 injected provider found transaction')
            return tx
          }
          tx = await ethersProvider.getTransaction(hash)
          if (tx) {
            console.log('ethers provider found transaction')
            return tx
          }
          console.log(`failed to find ${hash}`)
          return undefined
        },
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
