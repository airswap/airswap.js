const { ethersProvider } = require('../constants')

function hex_to_ascii(str1) {
  const hex = str1.toString()
  let str = ''
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return str
}

async function getRevertReason(hash) {
  const tx = await ethersProvider.getTransaction(hash)
  if (!tx) {
    console.log('tx not found')
  } else {
    const code = await ethersProvider.call(tx, tx.blockNumber)
    return hex_to_ascii(code.substr(138))
  }
}

module.exports = getRevertReason
