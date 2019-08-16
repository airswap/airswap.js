const ethers = require('ethers')
const abi = require('../abis/deltaBalancesABI.json')
const constants = require('../constants')

function getDeltaBalancesContract(provider) {
  return new ethers.Contract(constants.DELTA_BALANCES_CONTRACT_ADDRESS, abi, provider)
}

export function getAllBalancesForManyAccounts(users, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allBalancesForManyAccounts(users, tokens)
}

export function getTokenBalance(user, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenBalance(user, token)
}

export function destruct(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.destruct()
}

export function getWalletAllowances(user, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletAllowances(user, spender, tokens)
}

export function withdraw(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdraw()
}

export function getWalletBalances(user, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletBalances(user, tokens)
}

export function getTokenAllowance(user, spender, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenAllowance(user, spender, token)
}

export function withdrawToken(token, amount, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdrawToken(token, amount)
}

export function getAllWETHbalances(wethAddress, users) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allWETHbalances(wethAddress, users)
}

export function getAllAllowancesForManyAccounts(users, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allAllowancesForManyAccounts(users, spender, tokens)
}

export function getAdmin() {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.admin()
}

export function constructor(_deployer, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.constructor(_deployer)
}
