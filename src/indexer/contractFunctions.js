// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/indexer.json')
const constants = require('../constants')

function getIndexerContract(provider) {
  return new ethers.Contract(constants.INDEXER_CONTRACT_ADDRESS, abi, provider)
}
function getIndexerIndexes(signerToken, senderToken, protocol) {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.indexes(signerToken, senderToken, protocol)
}

function getIndexerIsOwner() {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.isOwner()
}

function getIndexerLocatorWhitelists(protocol) {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.locatorWhitelists(protocol)
}

function getIndexerOwner() {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.owner()
}

function submitIndexerRenounceOwnership(signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.renounceOwnership({ ...options })
}

function getIndexerStakingToken() {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.stakingToken()
}

function getIndexerTokenBlacklist(token) {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.tokenBlacklist(token)
}

function submitIndexerTransferOwnership(newOwner, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.transferOwnership(newOwner, { ...options })
}

function submitIndexerSetLocatorWhitelist(protocol, newLocatorWhitelist, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.setLocatorWhitelist(protocol, newLocatorWhitelist, { ...options })
}

function submitIndexerCreateIndex(signerToken, senderToken, protocol, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.createIndex(signerToken, senderToken, protocol, { ...options })
}

function submitIndexerAddTokenToBlacklist(token, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.addTokenToBlacklist(token, { ...options })
}

function submitIndexerRemoveTokenFromBlacklist(token, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.removeTokenFromBlacklist(token, { ...options })
}

function submitIndexerSetIntent(signerToken, senderToken, protocol, stakingAmount, locator, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.setIntent(signerToken, senderToken, protocol, stakingAmount, locator, { ...options })
}

function submitIndexerUnsetIntent(signerToken, senderToken, protocol, signer, options = {}) {
  const contract = getIndexerContract(signer)
  return contract.unsetIntent(signerToken, senderToken, protocol, { ...options })
}

function getIndexerGetLocators(signerToken, senderToken, protocol, cursor, limit) {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.getLocators(signerToken, senderToken, protocol, cursor, limit)
}

function getIndexerGetStakedAmount(user, signerToken, senderToken, protocol) {
  const contract = getIndexerContract(constants.ethersProvider)
  return contract.getStakedAmount(user, signerToken, senderToken, protocol)
}

module.exports = {
  getIndexerIndexes,
  getIndexerIsOwner,
  getIndexerLocatorWhitelists,
  getIndexerOwner,
  submitIndexerRenounceOwnership,
  getIndexerStakingToken,
  getIndexerTokenBlacklist,
  submitIndexerTransferOwnership,
  submitIndexerSetLocatorWhitelist,
  submitIndexerCreateIndex,
  submitIndexerAddTokenToBlacklist,
  submitIndexerRemoveTokenFromBlacklist,
  submitIndexerSetIntent,
  submitIndexerUnsetIntent,
  getIndexerGetLocators,
  getIndexerGetStakedAmount,
}
