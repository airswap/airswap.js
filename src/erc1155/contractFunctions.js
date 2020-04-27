// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/erc1155.json')
const constants = require('../constants')

function getERC1155Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function submitERC1155SafeTransferFrom(contractAddress, from, to, id, value, data, signer, options = {}) {
  const contract = getERC1155Contract(signer, contractAddress)
  return contract.safeTransferFrom(from, to, id, value, data, { ...options })
}

function submitERC1155SafeBatchTransferFrom(contractAddress, from, to, ids, values, data, signer, options = {}) {
  const contract = getERC1155Contract(signer, contractAddress)
  return contract.safeBatchTransferFrom(from, to, ids, values, data, { ...options })
}

function getERC1155BalanceOf(contractAddress, owner, id) {
  const contract = getERC1155Contract(constants.ethersProvider, contractAddress)
  return contract.balanceOf(owner, id)
}

function getERC1155BalanceOfBatch(contractAddress, owners, ids) {
  const contract = getERC1155Contract(constants.ethersProvider, contractAddress)
  return contract.balanceOfBatch(owners, ids)
}

function submitERC1155SetApprovalForAll(contractAddress, operator, approved, signer, options = {}) {
  const contract = getERC1155Contract(signer, contractAddress)
  return contract.setApprovalForAll(operator, approved, { ...options })
}

function getERC1155IsApprovedForAll(contractAddress, owner, operator) {
  const contract = getERC1155Contract(constants.ethersProvider, contractAddress)
  return contract.isApprovedForAll(owner, operator)
}

function getERC1155GetComplianceService(contractAddress) {
  const contract = getERC1155Contract(constants.ethersProvider, contractAddress)
  return contract.getComplianceService()
}

module.exports = {
  submitERC1155SafeTransferFrom,
  submitERC1155SafeBatchTransferFrom,
  getERC1155BalanceOf,
  getERC1155BalanceOfBatch,
  submitERC1155SetApprovalForAll,
  getERC1155IsApprovedForAll,
  getERC1155GetComplianceService,
}
