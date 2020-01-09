"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/wrapper.json');

var constants = require('../constants');

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider);
}

function getWrapperSwapContract() {
  var contract = getWrapperContract(constants.httpProvider);
  return contract.swapContract();
}

function getWrapperWethContract() {
  var contract = getWrapperContract(constants.httpProvider);
  return contract.wethContract();
}

function submitWrapperSwap(ethAmount, order, signer) {
  var contract = getWrapperContract(signer);
  return contract.swap(order, {
    value: ethers.utils.bigNumberify(ethAmount || '0')
  });
}

function submitWrapperProvideDelegateOrder(ethAmount, order, delegate, signer) {
  var contract = getWrapperContract(signer);
  return contract.provideDelegateOrder(order, delegate, {
    value: ethers.utils.bigNumberify(ethAmount || '0')
  });
}

module.exports = {
  getWrapperSwapContract: getWrapperSwapContract,
  getWrapperWethContract: getWrapperWethContract,
  submitWrapperSwap: submitWrapperSwap,
  submitWrapperProvideDelegateOrder: submitWrapperProvideDelegateOrder
};