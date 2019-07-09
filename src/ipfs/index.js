const _ = require('lodash')
const { SLS_PGP_URL } = require('../constants')
const IPFS = require('ipfs-mini')
const axios = require('axios')

const ipfsInfura = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const ipfsAirSwap = new IPFS({ host: 'ipfs.airswap.io', port: 443, protocol: 'https' })

const pinJSONToIPFSPinata = JSONBody => {
  const url = `${SLS_PGP_URL}/storePinata`
  return axios.post(url, JSONBody).then(resp => resp.data.IpfsHash)
}

async function ipfsStoreJSON(obj) {
  const storeString = _.isString(obj) ? JSON.stringify(JSON.parse(obj)) : JSON.stringify(obj)

  return new Promise((resolve, reject) => {
    // this "resolved" syntax is required since there isn't a Promise.none()
    let resolved = 0
    ipfsAirSwap
      .add(storeString)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 2) {
          reject(e)
        }
      })
    ipfsInfura
      .add(storeString)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 2) {
          reject(e)
        }
      })

    pinJSONToIPFSPinata(JSON.parse(storeString)) // pinata will always take the longest to resolve since they don't support reads
  })
}

const fetchIPFSContentFromCloudfare = cid =>
  axios.get(`https://cloudflare-ipfs.com/ipfs/${cid}`).then(resp => JSON.stringify(resp.data))

async function ipfsFetchJSONFromCID(cid) {
  const content = await new Promise((resolve, reject) => {
    if (!cid) {
      resolve(undefined)
      return
    }
    // this "resolved" syntax is required since there isn't a Promise.none()
    let resolved = 0
    ipfsAirSwap
      .cat(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })
    ipfsInfura
      .cat(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })

    fetchIPFSContentFromCloudfare(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })
  })
  return JSON.parse(content)
}

module.exports = { ipfsStoreJSON, ipfsFetchJSONFromCID }
