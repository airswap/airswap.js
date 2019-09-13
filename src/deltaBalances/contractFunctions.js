// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/deltaBalancesABI.json')
const constants = require('../constants')

function getDeltaBalancesContract(provider) {
  return new ethers.Contract(constants.DELTA_BALANCES_CONTRACT_ADDRESS, abi, provider)
}
function getDeltaBalancesAllBalancesForManyAccounts(users, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allBalancesForManyAccounts(users, tokens)
}

function getDeltaBalancesTokenBalance(user, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenBalance(user, token)
}

function submitDeltaBalancesDestruct(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.destruct()
}

function getDeltaBalancesWalletAllowances(user, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletAllowances(user, spender, tokens)
}

function submitDeltaBalancesWithdraw(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdraw()
}

function getDeltaBalancesWalletBalances(user, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletBalances(user, tokens)
}

function getDeltaBalancesTokenAllowance(user, spender, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenAllowance(user, spender, token)
}

function submitDeltaBalancesWithdrawToken(token, amount, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdrawToken(token, amount)
}

function getDeltaBalancesAllWETHbalances(wethAddress, users) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allWETHbalances(wethAddress, users)
}

function getDeltaBalancesAllAllowancesForManyAccounts(users, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allAllowancesForManyAccounts(users, spender, tokens)
}

function getDeltaBalancesAdmin() {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.admin()
}

function submitDeltaBalancesConstructor(_deployer, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.constructor(_deployer)
}

module.exports = {
  getDeltaBalancesAllBalancesForManyAccounts,
  getDeltaBalancesTokenBalance,
  submitDeltaBalancesDestruct,
  getDeltaBalancesWalletAllowances,
  submitDeltaBalancesWithdraw,
  getDeltaBalancesWalletBalances,
  getDeltaBalancesTokenAllowance,
  submitDeltaBalancesWithdrawToken,
  getDeltaBalancesAllWETHbalances,
  getDeltaBalancesAllAllowancesForManyAccounts,
  getDeltaBalancesAdmin,
  submitDeltaBalancesConstructor,
}
