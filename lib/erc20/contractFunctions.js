"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/hst.json');

var constants = require('../constants');

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function getERC20Name(contractAddress) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.name();
}

function submitERC20Approve(contractAddress, spender, value, signer) {
  var contract = getERC20Contract(signer, contractAddress);
  return contract.approve(spender, value);
}

function getERC20TotalSupply(contractAddress) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.totalSupply();
}

function submitERC20TransferFrom(contractAddress, from, to, value, signer) {
  var contract = getERC20Contract(signer, contractAddress);
  return contract.transferFrom(from, to, value);
}

function getERC20Decimals(contractAddress) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.decimals();
}

function getERC20Version(contractAddress) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.version();
}

function getERC20BalanceOf(contractAddress, owner) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.balanceOf(owner);
}

function getERC20Symbol(contractAddress) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.symbol();
}

function submitERC20Transfer(contractAddress, to, value, signer) {
  var contract = getERC20Contract(signer, contractAddress);
  return contract.transfer(to, value);
}

function submitERC20ApproveAndCall(contractAddress, spender, value, extraData, signer) {
  var contract = getERC20Contract(signer, contractAddress);
  return contract.approveAndCall(spender, value, extraData);
}

function getERC20Allowance(contractAddress, owner, spender) {
  var contract = getERC20Contract(constants.httpProvider, contractAddress);
  return contract.allowance(owner, spender);
}

module.exports = {
  getERC20Name: getERC20Name,
  submitERC20Approve: submitERC20Approve,
  getERC20TotalSupply: getERC20TotalSupply,
  submitERC20TransferFrom: submitERC20TransferFrom,
  getERC20Decimals: getERC20Decimals,
  getERC20Version: getERC20Version,
  getERC20BalanceOf: getERC20BalanceOf,
  getERC20Symbol: getERC20Symbol,
  submitERC20Transfer: submitERC20Transfer,
  submitERC20ApproveAndCall: submitERC20ApproveAndCall,
  getERC20Allowance: getERC20Allowance
};