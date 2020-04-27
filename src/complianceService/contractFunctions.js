// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/complianceServiceWhitelist.json')
const constants = require('../constants')

function getComplianceServiceContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getComplianceServiceIsWhitelisted(contractAddress, account) {
  const contract = getComplianceServiceContract(constants.ethersProvider, contractAddress)
  return contract.isWhitelisted(account)
}

module.exports = { getComplianceServiceIsWhitelisted }
