import { JsonRpcProvider } from 'ethers/providers'
import { poll } from 'ethers/utils/web'

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

export { RetryProvider }
