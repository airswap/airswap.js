// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/index.json')
const constants = require('../constants')

function getIndexContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getIndexEntries(contractAddress, identifier) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.entries(identifier)
}

function getIndexIsOwner(contractAddress) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.isOwner()
}

function getIndexLength(contractAddress) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.length()
}

function getIndexOwner(contractAddress) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.owner()
}

function submitIndexRenounceOwnership(contractAddress, signer) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.renounceOwnership()
}

function submitIndexTransferOwnership(contractAddress, newOwner, signer) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.transferOwnership(newOwner)
}

function submitIndexSetLocator(contractAddress, identifier, score, locator, signer) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.setLocator(identifier, score, locator)
}

function submitIndexUnsetLocator(contractAddress, identifier, signer) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.unsetLocator(identifier)
}

function submitIndexUpdateLocator(contractAddress, identifier, score, locator, signer) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.updateLocator(identifier, score, locator)
}

function getIndexGetScore(contractAddress, identifier) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.getScore(identifier)
}

function getIndexGetLocator(contractAddress, identifier) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.getLocator(identifier)
}

function getIndexGetLocators(contractAddress, cursor, limit) {
  const contract = getIndexContract(constants.httpProvider, contractAddress)
  return contract.getLocators(cursor, limit)
}

module.exports = {
  getIndexEntries,
  getIndexIsOwner,
  getIndexLength,
  getIndexOwner,
  submitIndexRenounceOwnership,
  submitIndexTransferOwnership,
  submitIndexSetLocator,
  submitIndexUnsetLocator,
  submitIndexUpdateLocator,
  getIndexGetScore,
  getIndexGetLocator,
  getIndexGetLocators,
}
