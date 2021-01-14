const { NETWORK_NAME } = require('../constants')

function makeEtherscanURL(hash, type) {
  return `https://${NETWORK_NAME === 'mainnet' ? '' : `${NETWORK_NAME}.`}etherscan.io/${type}/${hash}`
}

function makeEtherscanAddress(address) {
  return makeEtherscanURL(address, 'address')
}

function makeEtherscanTransaction(tx) {
  return makeEtherscanURL(tx, 'tx')
}

function openEtherscanLink(hash, type) {
  window.open(makeEtherscanURL(hash, type))
}

module.exports = { openEtherscanLink, makeEtherscanURL, makeEtherscanAddress, makeEtherscanTransaction }
