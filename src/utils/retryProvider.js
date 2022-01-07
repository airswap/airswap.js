const { ethers } = require('ethers')
const axios = require('axios')

const MAX_ATTEMPTS = 5

class RetryProvider extends ethers.providers.JsonRpcProvider {
  constructor(url, network) {
    super(url, network)
    this.url = url
    this.id = 1
  }

  send(method, params) {
    let attempts = 0
    return ethers.utils.poll(() => {
      attempts++
      return axios
        .post(this.url, {
          method,
          params,
          id: this.id++,
          jsonrpc: '2.0',
        })
        .then(
          response => Promise.resolve(response.data.result),
          response => {
            if ((response.statusCode !== 0 && response.statusCode !== 429) || attempts >= MAX_ATTEMPTS) {
              return Promise.reject(response)
            }
            return Promise.resolve(undefined)
          },
        )
    })
  }
}

module.exports = RetryProvider
