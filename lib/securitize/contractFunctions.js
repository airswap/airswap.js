"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/SecuritizeTokenInterface.json');

var constants = require('../constants');

function getSecuritizeContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function getSecuritizePreTransferCheck(contractAddress, from, to, value) {
  var contract = getSecuritizeContract(constants.httpProvider, contractAddress);
  return contract.preTransferCheck(from, to, value);
}

module.exports = {
  getSecuritizePreTransferCheck: getSecuritizePreTransferCheck
};