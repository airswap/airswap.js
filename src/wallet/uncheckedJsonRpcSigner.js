const ethers = require('ethers')
const { NETWORK_NAME, httpProvider, infuraProvider, nodesmithProvider } = require('../constants')
const { poll } = require('ethers/utils/web')
// const { checkProperties, defineReadOnly, resolveProperties, shallowCopy } = require('ethers/utils/properties')

const provider = new ethers.getDefaultProvider(NETWORK_NAME || 'homestead')

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
        async () => {
          let tx
          tx = await provider.getTransaction(hash)
          if (tx) {
            console.log('ethers default provider found transaction')
            return tx
          }
          tx = await this.signer.provider.getTransaction(hash)
          if (tx) {
            console.log('window.web3 injected provider found transaction')
            return tx
          }
          tx = await nodesmithProvider.getTransaction(hash)
          if (tx) {
            console.log('nodesmith found transaction')
            return tx
          }
          tx = await infuraProvider.getTransaction(hash)
          if (tx) {
            console.log('infura found transaction')
            return tx
          }
          tx = await httpProvider.getTransaction(hash)
          if (tx) {
            console.log('airswap found transaction')
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
