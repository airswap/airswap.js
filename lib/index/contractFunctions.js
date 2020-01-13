"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/index.json');

var constants = require('../constants');

function getIndexContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function getIndexEntries(contractAddress, identifier) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.entries(identifier);
}

function getIndexIsOwner(contractAddress) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.isOwner();
}

function getIndexLength(contractAddress) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.length();
}

function getIndexOwner(contractAddress) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.owner();
}

function submitIndexRenounceOwnership(contractAddress, signer) {
  var contract = getIndexContract(signer, contractAddress);
  return contract.renounceOwnership();
}

function submitIndexTransferOwnership(contractAddress, newOwner, signer) {
  var contract = getIndexContract(signer, contractAddress);
  return contract.transferOwnership(newOwner);
}

function submitIndexSetLocator(contractAddress, identifier, score, locator, signer) {
  var contract = getIndexContract(signer, contractAddress);
  return contract.setLocator(identifier, score, locator);
}

function submitIndexUnsetLocator(contractAddress, identifier, signer) {
  var contract = getIndexContract(signer, contractAddress);
  return contract.unsetLocator(identifier);
}

function submitIndexUpdateLocator(contractAddress, identifier, score, locator, signer) {
  var contract = getIndexContract(signer, contractAddress);
  return contract.updateLocator(identifier, score, locator);
}

function getIndexGetScore(contractAddress, identifier) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.getScore(identifier);
}

function getIndexGetLocator(contractAddress, identifier) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.getLocator(identifier);
}

function getIndexGetLocators(contractAddress, cursor, limit) {
  var contract = getIndexContract(constants.httpProvider, contractAddress);
  return contract.getLocators(cursor, limit);
}

module.exports = {
  getIndexEntries: getIndexEntries,
  getIndexIsOwner: getIndexIsOwner,
  getIndexLength: getIndexLength,
  getIndexOwner: getIndexOwner,
  submitIndexRenounceOwnership: submitIndexRenounceOwnership,
  submitIndexTransferOwnership: submitIndexTransferOwnership,
  submitIndexSetLocator: submitIndexSetLocator,
  submitIndexUnsetLocator: submitIndexUnsetLocator,
  submitIndexUpdateLocator: submitIndexUpdateLocator,
  getIndexGetScore: getIndexGetScore,
  getIndexGetLocator: getIndexGetLocator,
  getIndexGetLocators: getIndexGetLocators
};