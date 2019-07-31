const { NETWORK_NAME } = require('../constants')

const ethers = require('ethers')

const provider = new ethers.getDefaultProvider(NETWORK_NAME || 'homestead')

function hex_to_ascii(str1) {
  const hex = str1.toString()
  let str = ''
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return str
}

async function getRevertReason(hash) {
  const tx = await provider.getTransaction(hash)
  if (!tx) {
    console.log('tx not found')
  } else {
    const code = await provider.call(tx, tx.blockNumber)
    return hex_to_ascii(code.substr(138))
  }
}

module.exports = getRevertReason
