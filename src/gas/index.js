const ethers = require('ethers')
const _ = require('lodash')
const fetch = require('isomorphic-fetch')
const { GAS_URL } = require('../constants')

function fetchGasSettings() {
  return new Promise((resolve, reject) => {
    fetch(GAS_URL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

class Gas {
  constructor() {
    this.settings = {}
    this.ready = this.pollGasSettings()
    setInterval(() => this.pollGasSettings(), 10000)
  }
  async pollGasSettings() {
    const settings = await fetchGasSettings()
    const { fast, fastest, average, safeLow } = settings
    this.settings = _.mapValues({ fast, fastest, average, safeLow }, v => v / 10)
    return this.settings
  }
  getGasSettingsForTransaction(setting = 'fast', gasLimit = 300000) {
    const gwei = this.settings[setting]
    const gasPrice = ethers.utils.parseUnits(`${gwei}`, 'gwei').toNumber()
    return {
      gasLimit: Number(gasLimit),
      gasPrice,
    }
  }
}

module.exports = { fetchGasSettings, Gas }
