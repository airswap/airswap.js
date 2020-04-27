// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/index.json')
const constants = require('../constants')

function getIndexContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getIndexEntries(contractAddress, identifier) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.entries(identifier)
}

function getIndexIsOwner(contractAddress) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.isOwner()
}

function getIndexLength(contractAddress) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.length()
}

function getIndexOwner(contractAddress) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.owner()
}

function submitIndexRenounceOwnership(contractAddress, signer, options = {}) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.renounceOwnership({ ...options })
}

function submitIndexTransferOwnership(contractAddress, newOwner, signer, options = {}) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.transferOwnership(newOwner, { ...options })
}

function submitIndexSetLocator(contractAddress, identifier, score, locator, signer, options = {}) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.setLocator(identifier, score, locator, { ...options })
}

function submitIndexUnsetLocator(contractAddress, identifier, signer, options = {}) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.unsetLocator(identifier, { ...options })
}

function submitIndexUpdateLocator(contractAddress, identifier, score, locator, signer, options = {}) {
  const contract = getIndexContract(signer, contractAddress)
  return contract.updateLocator(identifier, score, locator, { ...options })
}

function getIndexGetScore(contractAddress, identifier) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.getScore(identifier)
}

function getIndexGetLocator(contractAddress, identifier) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
  return contract.getLocator(identifier)
}

function getIndexGetLocators(contractAddress, cursor, limit) {
  const contract = getIndexContract(constants.ethersProvider, contractAddress)
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
