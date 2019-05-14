const fetch = require('isomorphic-fetch')
const { GET_TOKEN_PRICE_URL } = require('../constants')

function fetchTokenPrice() {
  return new Promise((resolve, reject) => {
    fetch(GET_TOKEN_PRICE_URL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(({ response }) => {
        resolve(response)
      })
  })
}

module.exports = { fetchTokenPrice }
