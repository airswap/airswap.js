// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/WETH_ABI.json')
const constants = require('../constants')

function getWethContract(provider) {
  return new ethers.Contract(constants.WETH_CONTRACT_ADDRESS, abi, provider)
}
function getWethName() {
  const contract = getWethContract(constants.httpProvider)
  return contract.name()
}

function submitWethApprove(spender, amount, signer) {
  const contract = getWethContract(signer)
  return contract.approve(spender, amount)
}

function getWethTotalSupply() {
  const contract = getWethContract(constants.httpProvider)
  return contract.totalSupply()
}

function submitWethTransferFrom(from, to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transferFrom(from, to, amount)
}

function submitWethWithdraw(amount, signer) {
  const contract = getWethContract(signer)
  return contract.withdraw(amount)
}

function getWethDecimals() {
  const contract = getWethContract(constants.httpProvider)
  return contract.decimals()
}

function getWethBalanceOf(owner) {
  const contract = getWethContract(constants.httpProvider)
  return contract.balanceOf(owner)
}

function getWethSymbol() {
  const contract = getWethContract(constants.httpProvider)
  return contract.symbol()
}

function submitWethTransfer(to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transfer(to, amount)
}

function submitWethDeposit(ethAmount, signer) {
  const contract = getWethContract(signer)
  return contract.deposit({ value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function getWethAllowance(owner, spender) {
  const contract = getWethContract(constants.httpProvider)
  return contract.allowance(owner, spender)
}

module.exports = {
  getWethName,
  submitWethApprove,
  getWethTotalSupply,
  submitWethTransferFrom,
  submitWethWithdraw,
  getWethDecimals,
  getWethBalanceOf,
  getWethSymbol,
  submitWethTransfer,
  submitWethDeposit,
  getWethAllowance,
}
