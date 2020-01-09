"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/deltaBalancesABI.json');

var constants = require('../constants');

function getDeltaBalancesContract(provider) {
  return new ethers.Contract(constants.DELTA_BALANCES_CONTRACT_ADDRESS, abi, provider);
}

function getDeltaBalancesAllBalancesForManyAccounts(users, tokens) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.allBalancesForManyAccounts(users, tokens);
}

function getDeltaBalancesTokenBalance(user, token) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.tokenBalance(user, token);
}

function submitDeltaBalancesDestruct(signer) {
  var contract = getDeltaBalancesContract(signer);
  return contract.destruct();
}

function getDeltaBalancesWalletAllowances(user, spender, tokens) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.walletAllowances(user, spender, tokens);
}

function submitDeltaBalancesWithdraw(signer) {
  var contract = getDeltaBalancesContract(signer);
  return contract.withdraw();
}

function getDeltaBalancesWalletBalances(user, tokens) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.walletBalances(user, tokens);
}

function getDeltaBalancesTokenAllowance(user, spender, token) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.tokenAllowance(user, spender, token);
}

function submitDeltaBalancesWithdrawToken(token, amount, signer) {
  var contract = getDeltaBalancesContract(signer);
  return contract.withdrawToken(token, amount);
}

function getDeltaBalancesAllWETHbalances(wethAddress, users) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.allWETHbalances(wethAddress, users);
}

function getDeltaBalancesAllAllowancesForManyAccounts(users, spender, tokens) {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.allAllowancesForManyAccounts(users, spender, tokens);
}

function getDeltaBalancesAdmin() {
  var contract = getDeltaBalancesContract(constants.httpProvider);
  return contract.admin();
}

function submitDeltaBalancesConstructor(_deployer, signer) {
  var contract = getDeltaBalancesContract(signer);
  return contract.constructor(_deployer);
}

module.exports = {
  getDeltaBalancesAllBalancesForManyAccounts: getDeltaBalancesAllBalancesForManyAccounts,
  getDeltaBalancesTokenBalance: getDeltaBalancesTokenBalance,
  submitDeltaBalancesDestruct: submitDeltaBalancesDestruct,
  getDeltaBalancesWalletAllowances: getDeltaBalancesWalletAllowances,
  submitDeltaBalancesWithdraw: submitDeltaBalancesWithdraw,
  getDeltaBalancesWalletBalances: getDeltaBalancesWalletBalances,
  getDeltaBalancesTokenAllowance: getDeltaBalancesTokenAllowance,
  submitDeltaBalancesWithdrawToken: submitDeltaBalancesWithdrawToken,
  getDeltaBalancesAllWETHbalances: getDeltaBalancesAllWETHbalances,
  getDeltaBalancesAllAllowancesForManyAccounts: getDeltaBalancesAllAllowancesForManyAccounts,
  getDeltaBalancesAdmin: getDeltaBalancesAdmin,
  submitDeltaBalancesConstructor: submitDeltaBalancesConstructor
};