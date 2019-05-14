const fetch = require('isomorphic-fetch')
const { DEXINDEX_URL } = require('../constants')

function fetchDexIndexPrices({ side, amount, symbol }) {
  if (!side || !amount || !symbol) throw new Error('must specify side, amount, symbol')
  if (side !== 'buy' && side !== 'sell') throw new Error('side must be buy or sell')
  return new Promise((resolve, reject) => {
    fetch(`${DEXINDEX_URL}/${side}?symbol=${symbol}&amount=${amount}`, {
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

module.exports = {
  fetchDexIndexPrices,
}
