const { JsonRpcProvider } = require('ethers/providers')
const { poll } = require('ethers/utils/web')

const ATTEMPTS = 5

class RetryProvider extends JsonRpcProvider {
  constructor(url, network) {
    super(url, network)
    this.attempts = ATTEMPTS
  }

  perform(method, params) {
    let attempts = 0
    return poll(() => {
      attempts++
      return super.perform(method, params).then(
        result => result,
        error => {
          if ((error.statusCode !== 0 && error.statusCode !== 429) || attempts >= this.attempts) {
            return Promise.reject(error)
          }
          return Promise.resolve(undefined)
        },
      )
    })
  }
}

module.exports = RetryProvider
