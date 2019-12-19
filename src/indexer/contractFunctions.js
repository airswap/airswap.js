// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/indexer.json')
const constants = require('../constants')

function getIndexerContract(provider) {
  return new ethers.Contract(constants.INDEXER_CONTRACT_ADDRESS, abi, provider)
}
function getIndexerIndexes(signerToken, senderToken, protocol) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.indexes(signerToken, senderToken, protocol)
}

function getIndexerIsOwner() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.isOwner()
}

function getIndexerLocatorWhitelists(protocol) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.locatorWhitelists(protocol)
}

function getIndexerOwner() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.owner()
}

function submitIndexerRenounceOwnership(signer) {
  const contract = getIndexerContract(signer)
  return contract.renounceOwnership()
}

function getIndexerStakingToken() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.stakingToken()
}

function getIndexerTokenBlacklist(token) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.tokenBlacklist(token)
}

function submitIndexerTransferOwnership(newOwner, signer) {
  const contract = getIndexerContract(signer)
  return contract.transferOwnership(newOwner)
}

function submitIndexerSetLocatorWhitelist(protocol, newLocatorWhitelist, signer) {
  const contract = getIndexerContract(signer)
  return contract.setLocatorWhitelist(protocol, newLocatorWhitelist)
}

function submitIndexerCreateIndex(signerToken, senderToken, protocol, signer) {
  const contract = getIndexerContract(signer)
  return contract.createIndex(signerToken, senderToken, protocol)
}

function submitIndexerAddTokenToBlacklist(token, signer) {
  const contract = getIndexerContract(signer)
  return contract.addTokenToBlacklist(token)
}

function submitIndexerRemoveTokenFromBlacklist(token, signer) {
  const contract = getIndexerContract(signer)
  return contract.removeTokenFromBlacklist(token)
}

function submitIndexerSetIntent(signerToken, senderToken, protocol, stakingAmount, locator, signer) {
  const contract = getIndexerContract(signer)
  return contract.setIntent(signerToken, senderToken, protocol, stakingAmount, locator)
}

function submitIndexerUnsetIntent(signerToken, senderToken, protocol, signer) {
  const contract = getIndexerContract(signer)
  return contract.unsetIntent(signerToken, senderToken, protocol)
}

function getIndexerGetLocators(signerToken, senderToken, protocol, cursor, limit) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.getLocators(signerToken, senderToken, protocol, cursor, limit)
}

function getIndexerGetStakedAmount(user, signerToken, senderToken, protocol) {
  const contract = getIndexerContract(constants.httpProvider)
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
