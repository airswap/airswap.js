"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/delegate.json');

var constants = require('../constants');

function getDelegateContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function getDelegateIndexer(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.indexer();
}

function getDelegateIsOwner(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.isOwner();
}

function getDelegateOwner(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.owner();
}

function getDelegateProtocol(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.protocol();
}

function submitDelegateRenounceOwnership(contractAddress, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.renounceOwnership();
}

function getDelegateRules(contractAddress, senderToken, signerToken) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.rules(senderToken, signerToken);
}

function getDelegateSwapContract(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.swapContract();
}

function getDelegateTradeWallet(contractAddress) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.tradeWallet();
}

function submitDelegateTransferOwnership(contractAddress, newOwner, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.transferOwnership(newOwner);
}

function submitDelegateSetRule(contractAddress, senderToken, signerToken, maxSenderAmount, priceCoef, priceExp, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.setRule(senderToken, signerToken, maxSenderAmount, priceCoef, priceExp);
}

function submitDelegateUnsetRule(contractAddress, senderToken, signerToken, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.unsetRule(senderToken, signerToken);
}

function submitDelegateSetRuleAndIntent(contractAddress, senderToken, signerToken, rule, newStakeAmount, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.setRuleAndIntent(senderToken, signerToken, rule, newStakeAmount);
}

function submitDelegateUnsetRuleAndIntent(contractAddress, senderToken, signerToken, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.unsetRuleAndIntent(senderToken, signerToken);
}

function submitDelegateProvideOrder(contractAddress, order, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.provideOrder(order);
}

function submitDelegateSetTradeWallet(contractAddress, newTradeWallet, signer) {
  var contract = getDelegateContract(signer, contractAddress);
  return contract.setTradeWallet(newTradeWallet);
}

function getDelegateGetSignerSideQuote(contractAddress, senderAmount, senderToken, signerToken) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.getSignerSideQuote(senderAmount, senderToken, signerToken);
}

function getDelegateGetSenderSideQuote(contractAddress, signerAmount, signerToken, senderToken) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.getSenderSideQuote(signerAmount, signerToken, senderToken);
}

function getDelegateGetMaxQuote(contractAddress, senderToken, signerToken) {
  var contract = getDelegateContract(constants.httpProvider, contractAddress);
  return contract.getMaxQuote(senderToken, signerToken);
}

module.exports = {
  getDelegateIndexer: getDelegateIndexer,
  getDelegateIsOwner: getDelegateIsOwner,
  getDelegateOwner: getDelegateOwner,
  getDelegateProtocol: getDelegateProtocol,
  submitDelegateRenounceOwnership: submitDelegateRenounceOwnership,
  getDelegateRules: getDelegateRules,
  getDelegateSwapContract: getDelegateSwapContract,
  getDelegateTradeWallet: getDelegateTradeWallet,
  submitDelegateTransferOwnership: submitDelegateTransferOwnership,
  submitDelegateSetRule: submitDelegateSetRule,
  submitDelegateUnsetRule: submitDelegateUnsetRule,
  submitDelegateSetRuleAndIntent: submitDelegateSetRuleAndIntent,
  submitDelegateUnsetRuleAndIntent: submitDelegateUnsetRuleAndIntent,
  submitDelegateProvideOrder: submitDelegateProvideOrder,
  submitDelegateSetTradeWallet: submitDelegateSetTradeWallet,
  getDelegateGetSignerSideQuote: getDelegateGetSignerSideQuote,
  getDelegateGetSenderSideQuote: getDelegateGetSenderSideQuote,
  getDelegateGetMaxQuote: getDelegateGetMaxQuote
};