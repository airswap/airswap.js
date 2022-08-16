const _ = require('lodash')
const IPFS = require('../ipfs-mini')
const axios = require('axios')

const ipfsInfura = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  auth: 'Basic MkRQRHlRWUJBUUVaM21uZW0zNm5uS003ZlM2OjJiNGM3NzYzZjQwMjc1ZjJjMzQ0ODdkNDAwNzRjZTJm',
})

async function ipfsStoreJSON(obj) {
  const storeString = _.isString(obj) ? JSON.stringify(JSON.parse(obj)) : JSON.stringify(obj)

  return new Promise((resolve, reject) => {
    // this "resolved" syntax is required since there isn't a Promise.none()
    let resolved = 0
    ipfsInfura
      .add(storeString)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 2) {
          reject(e)
        }
      })
  })
}

const ipfsFetchJSONFromCID = cid => axios.get(`https://airswap.infura-ipfs.io/ipfs/${cid}`).then(resp => resp.data)

module.exports = { ipfsStoreJSON, ipfsFetchJSONFromCID }
