"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/indexer.json');

var constants = require('../constants');

function getIndexerContract(provider) {
  return new ethers.Contract(constants.INDEXER_CONTRACT_ADDRESS, abi, provider);
}

function getIndexerIndexes(signerToken, senderToken, protocol) {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.indexes(signerToken, senderToken, protocol);
}

function getIndexerIsOwner() {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.isOwner();
}

function getIndexerLocatorWhitelists(protocol) {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.locatorWhitelists(protocol);
}

function getIndexerOwner() {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.owner();
}

function submitIndexerRenounceOwnership(signer) {
  var contract = getIndexerContract(signer);
  return contract.renounceOwnership();
}

function getIndexerStakingToken() {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.stakingToken();
}

function getIndexerTokenBlacklist(token) {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.tokenBlacklist(token);
}

function submitIndexerTransferOwnership(newOwner, signer) {
  var contract = getIndexerContract(signer);
  return contract.transferOwnership(newOwner);
}

function submitIndexerSetLocatorWhitelist(protocol, newLocatorWhitelist, signer) {
  var contract = getIndexerContract(signer);
  return contract.setLocatorWhitelist(protocol, newLocatorWhitelist);
}

function submitIndexerCreateIndex(signerToken, senderToken, protocol, signer) {
  var contract = getIndexerContract(signer);
  return contract.createIndex(signerToken, senderToken, protocol);
}

function submitIndexerAddTokenToBlacklist(token, signer) {
  var contract = getIndexerContract(signer);
  return contract.addTokenToBlacklist(token);
}

function submitIndexerRemoveTokenFromBlacklist(token, signer) {
  var contract = getIndexerContract(signer);
  return contract.removeTokenFromBlacklist(token);
}

function submitIndexerSetIntent(signerToken, senderToken, protocol, stakingAmount, locator, signer) {
  var contract = getIndexerContract(signer);
  return contract.setIntent(signerToken, senderToken, protocol, stakingAmount, locator);
}

function submitIndexerUnsetIntent(signerToken, senderToken, protocol, signer) {
  var contract = getIndexerContract(signer);
  return contract.unsetIntent(signerToken, senderToken, protocol);
}

function getIndexerGetLocators(signerToken, senderToken, protocol, cursor, limit) {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.getLocators(signerToken, senderToken, protocol, cursor, limit);
}

function getIndexerGetStakedAmount(user, signerToken, senderToken, protocol) {
  var contract = getIndexerContract(constants.httpProvider);
  return contract.getStakedAmount(user, signerToken, senderToken, protocol);
}

module.exports = {
  getIndexerIndexes: getIndexerIndexes,
  getIndexerIsOwner: getIndexerIsOwner,
  getIndexerLocatorWhitelists: getIndexerLocatorWhitelists,
  getIndexerOwner: getIndexerOwner,
  submitIndexerRenounceOwnership: submitIndexerRenounceOwnership,
  getIndexerStakingToken: getIndexerStakingToken,
  getIndexerTokenBlacklist: getIndexerTokenBlacklist,
  submitIndexerTransferOwnership: submitIndexerTransferOwnership,
  submitIndexerSetLocatorWhitelist: submitIndexerSetLocatorWhitelist,
  submitIndexerCreateIndex: submitIndexerCreateIndex,
  submitIndexerAddTokenToBlacklist: submitIndexerAddTokenToBlacklist,
  submitIndexerRemoveTokenFromBlacklist: submitIndexerRemoveTokenFromBlacklist,
  submitIndexerSetIntent: submitIndexerSetIntent,
  submitIndexerUnsetIntent: submitIndexerUnsetIntent,
  getIndexerGetLocators: getIndexerGetLocators,
  getIndexerGetStakedAmount: getIndexerGetStakedAmount
};