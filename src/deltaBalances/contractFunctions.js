const ethers = require('ethers')
const abi = require('../abis/deltaBalancesABI.json')
const constants = require('../constants')

function getDeltaBalancesContract(provider) {
  return new ethers.Contract(constants.DELTA_BALANCES_CONTRACT_ADDRESS, abi, provider)
}

export function getDeltaBalancesAllBalancesForManyAccounts(users, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allBalancesForManyAccounts(users, tokens)
}

export function getDeltaBalancesTokenBalance(user, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenBalance(user, token)
}

export function submitDeltaBalancesDestruct(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.destruct()
}

export function getDeltaBalancesWalletAllowances(user, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletAllowances(user, spender, tokens)
}

export function submitDeltaBalancesWithdraw(signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdraw()
}

export function getDeltaBalancesWalletBalances(user, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.walletBalances(user, tokens)
}

export function getDeltaBalancesTokenAllowance(user, spender, token) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.tokenAllowance(user, spender, token)
}

export function submitDeltaBalancesWithdrawToken(token, amount, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.withdrawToken(token, amount)
}

export function getDeltaBalancesAllWETHbalances(wethAddress, users) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allWETHbalances(wethAddress, users)
}

export function getDeltaBalancesAllAllowancesForManyAccounts(users, spender, tokens) {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.allAllowancesForManyAccounts(users, spender, tokens)
}

export function getDeltaBalancesAdmin() {
  const contract = getDeltaBalancesContract(constants.httpProvider)
  return contract.admin()
}

export function submitDeltaBalancesConstructor(_deployer, signer) {
  const contract = getDeltaBalancesContract(signer)
  return contract.constructor(_deployer)
}
