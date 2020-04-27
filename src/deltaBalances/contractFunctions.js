// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/deltaBalancesABI.json')
const constants = require('../constants')

function getDeltaBalancesContract(provider) {
  return new ethers.Contract(constants.DELTA_BALANCES_CONTRACT_ADDRESS, abi, provider)
}
function getDeltaBalancesAllBalancesForManyAccounts(users, tokens) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.allBalancesForManyAccounts(users, tokens)
}

function getDeltaBalancesTokenBalance(user, token) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.tokenBalance(user, token)
}

function submitDeltaBalancesDestruct(signer, options = {}) {
  const contract = getDeltaBalancesContract(signer)
  return contract.destruct({ ...options })
}

function getDeltaBalancesWalletAllowances(user, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.walletAllowances(user, spender, tokens)
}

function submitDeltaBalancesWithdraw(signer, options = {}) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdraw({ ...options })
}

function getDeltaBalancesWalletBalances(user, tokens) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.walletBalances(user, tokens)
}

function getDeltaBalancesTokenAllowance(user, spender, token) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.tokenAllowance(user, spender, token)
}

function submitDeltaBalancesWithdrawToken(token, amount, signer, options = {}) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdrawToken(token, amount, { ...options })
}

function getDeltaBalancesAllWETHbalances(wethAddress, users) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.allWETHbalances(wethAddress, users)
}

function getDeltaBalancesAllAllowancesForManyAccounts(users, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.allAllowancesForManyAccounts(users, spender, tokens)
}

function getDeltaBalancesAdmin() {
  const contract = getDeltaBalancesContract(constants.ethersProvider)
  return contract.admin()
}

function submitDeltaBalancesConstructor(_deployer, signer, options = {}) {
  const contract = getDeltaBalancesContract(signer)
  return contract.constructor(_deployer, { ...options })
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
