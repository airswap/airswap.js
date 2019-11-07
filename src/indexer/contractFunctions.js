// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/indexer.json')
const constants = require('../constants')

function getIndexerContract(provider) {
  return new ethers.Contract(constants.INDEXER_CONTRACT_ADDRESS, abi, provider)
}
function getIndexerContractPaused() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.contractPaused()
}

function getIndexerIndexes(signerToken, senderToken) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.indexes(signerToken, senderToken)
}

function getIndexerIsOwner() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.isOwner()
}

function getIndexerLocatorWhitelist() {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.locatorWhitelist()
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

function submitIndexerSetLocatorWhitelist(newLocatorWhitelist, signer) {
  const contract = getIndexerContract(signer)
  return contract.setLocatorWhitelist(newLocatorWhitelist)
}

function submitIndexerCreateIndex(signerToken, senderToken, signer) {
  const contract = getIndexerContract(signer)
  return contract.createIndex(signerToken, senderToken)
}

function submitIndexerAddTokenToBlacklist(token, signer) {
  const contract = getIndexerContract(signer)
  return contract.addTokenToBlacklist(token)
}

function submitIndexerRemoveTokenFromBlacklist(token, signer) {
  const contract = getIndexerContract(signer)
  return contract.removeTokenFromBlacklist(token)
}

function submitIndexerSetIntent(signerToken, senderToken, stakingAmount, locator, signer) {
  const contract = getIndexerContract(signer)
  return contract.setIntent(signerToken, senderToken, stakingAmount, locator)
}

function submitIndexerUnsetIntent(signerToken, senderToken, signer) {
  const contract = getIndexerContract(signer)
  return contract.unsetIntent(signerToken, senderToken)
}

function submitIndexerUnsetIntentForUser(user, signerToken, senderToken, signer) {
  const contract = getIndexerContract(signer)
  return contract.unsetIntentForUser(user, signerToken, senderToken)
}

function submitIndexerSetPausedStatus(newStatus, signer) {
  const contract = getIndexerContract(signer)
  return contract.setPausedStatus(newStatus)
}

function submitIndexerKillContract(recipient, signer) {
  const contract = getIndexerContract(signer)
  return contract.killContract(recipient)
}

function getIndexerGetLocators(signerToken, senderToken, cursor, limit) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.getLocators(signerToken, senderToken, cursor, limit)
}

function getIndexerGetStakedAmount(user, signerToken, senderToken) {
  const contract = getIndexerContract(constants.httpProvider)
  return contract.getStakedAmount(user, signerToken, senderToken)
}

module.exports = {
  getIndexerContractPaused,
  getIndexerIndexes,
  getIndexerIsOwner,
  getIndexerLocatorWhitelist,
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
  submitIndexerUnsetIntentForUser,
  submitIndexerSetPausedStatus,
  submitIndexerKillContract,
  getIndexerGetLocators,
  getIndexerGetStakedAmount,
}
