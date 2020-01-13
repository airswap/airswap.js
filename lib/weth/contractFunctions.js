"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/WETH_ABI.json');

var constants = require('../constants');

function getWethContract(provider) {
  return new ethers.Contract(constants.WETH_CONTRACT_ADDRESS, abi, provider);
}

function getWethName() {
  var contract = getWethContract(constants.httpProvider);
  return contract.name();
}

function submitWethApprove(spender, amount, signer) {
  var contract = getWethContract(signer);
  return contract.approve(spender, amount);
}

function getWethTotalSupply() {
  var contract = getWethContract(constants.httpProvider);
  return contract.totalSupply();
}

function submitWethTransferFrom(from, to, amount, signer) {
  var contract = getWethContract(signer);
  return contract.transferFrom(from, to, amount);
}

function submitWethWithdraw(amount, signer) {
  var contract = getWethContract(signer);
  return contract.withdraw(amount);
}

function getWethDecimals() {
  var contract = getWethContract(constants.httpProvider);
  return contract.decimals();
}

function getWethBalanceOf(owner) {
  var contract = getWethContract(constants.httpProvider);
  return contract.balanceOf(owner);
}

function getWethSymbol() {
  var contract = getWethContract(constants.httpProvider);
  return contract.symbol();
}

function submitWethTransfer(to, amount, signer) {
  var contract = getWethContract(signer);
  return contract.transfer(to, amount);
}

function submitWethDeposit(ethAmount, signer) {
  var contract = getWethContract(signer);
  return contract.deposit({
    value: ethers.utils.bigNumberify(ethAmount || '0')
  });
}

function getWethAllowance(owner, spender) {
  var contract = getWethContract(constants.httpProvider);
  return contract.allowance(owner, spender);
}

module.exports = {
  getWethName: getWethName,
  submitWethApprove: submitWethApprove,
  getWethTotalSupply: getWethTotalSupply,
  submitWethTransferFrom: submitWethTransferFrom,
  submitWethWithdraw: submitWethWithdraw,
  getWethDecimals: getWethDecimals,
  getWethBalanceOf: getWethBalanceOf,
  getWethSymbol: getWethSymbol,
  submitWethTransfer: submitWethTransfer,
  submitWethDeposit: submitWethDeposit,
  getWethAllowance: getWethAllowance
};