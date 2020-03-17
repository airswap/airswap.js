// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/allinfraWhitelist.json')
const constants = require('../constants')

function getAllinfraContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getAllinfraIsWhitelisted(contractAddress, account) {
  const contract = getAllinfraContract(constants.httpProvider, contractAddress)
  return contract.isWhitelisted(account)
}

module.exports = { getAllinfraIsWhitelisted }
