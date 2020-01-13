"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/delegateFactory.json');

var constants = require('../constants');

function getDelegateFactoryContract(provider) {
  return new ethers.Contract(constants.DELEGATE_FACTORY_CONTRACT_ADDRESS, abi, provider);
}

function getDelegateFactoryIndexerContract() {
  var contract = getDelegateFactoryContract(constants.httpProvider);
  return contract.indexerContract();
}

function getDelegateFactoryProtocol() {
  var contract = getDelegateFactoryContract(constants.httpProvider);
  return contract.protocol();
}

function getDelegateFactorySwapContract() {
  var contract = getDelegateFactoryContract(constants.httpProvider);
  return contract.swapContract();
}

function submitDelegateFactoryCreateDelegate(delegateTradeWallet, signer) {
  var contract = getDelegateFactoryContract(signer);
  return contract.createDelegate(delegateTradeWallet);
}

function getDelegateFactoryHas(locator) {
  var contract = getDelegateFactoryContract(constants.httpProvider);
  return contract.has(locator);
}

module.exports = {
  getDelegateFactoryIndexerContract: getDelegateFactoryIndexerContract,
  getDelegateFactoryProtocol: getDelegateFactoryProtocol,
  getDelegateFactorySwapContract: getDelegateFactorySwapContract,
  submitDelegateFactoryCreateDelegate: submitDelegateFactoryCreateDelegate,
  getDelegateFactoryHas: getDelegateFactoryHas
};