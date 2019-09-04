const ethers = require('ethers')
const abi = require('../abis/WETH_ABI.json')
const constants = require('../constants')

function getWethContract(provider) {
  return new ethers.Contract(constants.WETH_CONTRACT_ADDRESS, abi, provider)
}

export function getWethName() {
  const contract = getWethContract(constants.httpProvider)
  return contract.name()
}

export function submitWethApprove(spender, amount, signer) {
  const contract = getWethContract(signer)
  return contract.approve(spender, amount)
}

export function getWethTotalSupply() {
  const contract = getWethContract(constants.httpProvider)
  return contract.totalSupply()
}

export function submitWethTransferFrom(from, to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transferFrom(from, to, amount)
}

export function submitWethWithdraw(amount, signer) {
  const contract = getWethContract(signer)
  return contract.withdraw(amount)
}

export function getWethDecimals() {
  const contract = getWethContract(constants.httpProvider)
  return contract.decimals()
}

export function getWethBalanceOf(owner) {
  const contract = getWethContract(constants.httpProvider)
  return contract.balanceOf(owner)
}

export function getWethSymbol() {
  const contract = getWethContract(constants.httpProvider)
  return contract.symbol()
}

export function submitWethTransfer(to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transfer(to, amount)
}

export function submitWethDeposit(ethAmount, signer) {
  const contract = getWethContract(signer)
  return contract.deposit({ value: ethers.utils.bigNumberify(ethAmount || '0') })
}

export function getWethAllowance(owner, spender) {
  const contract = getWethContract(constants.httpProvider)
  return contract.allowance(owner, spender)
}
