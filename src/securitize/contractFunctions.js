// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/SecuritizeTokenInterface.json')
const constants = require('../constants')

function getSecuritizeContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getSecuritizePreTransferCheck(contractAddress, from, to, value) {
  const contract = getSecuritizeContract(constants.httpProvider, contractAddress)
  return contract.preTransferCheck(from, to, value)
}

module.exports = { getSecuritizePreTransferCheck }
