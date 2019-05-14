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

module.exports = fetchGasSettings
