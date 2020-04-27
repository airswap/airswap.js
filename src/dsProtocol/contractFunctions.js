// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/DSProtocolTokenInterface.json')
const constants = require('../constants')

function getDsProtocolContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getDsProtocolPreTransferCheck(contractAddress, from, to, value) {
  const contract = getDsProtocolContract(constants.ethersProvider, contractAddress)
  return contract.preTransferCheck(from, to, value)
}

module.exports = { getDsProtocolPreTransferCheck }
