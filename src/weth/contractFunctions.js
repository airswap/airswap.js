// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/WETH_ABI.json')
const constants = require('../constants')

function getWethContract(provider) {
  return new ethers.Contract(constants.WETH_CONTRACT_ADDRESS, abi, provider)
}
function getWethName() {
  const contract = getWethContract(constants.ethersProvider)
  return contract.name()
}

function submitWethApprove(spender, amount, signer, options = {}) {
  const contract = getWethContract(signer)
  return contract.approve(spender, amount, { ...options })
}

function getWethTotalSupply() {
  const contract = getWethContract(constants.ethersProvider)
  return contract.totalSupply()
}

function submitWethTransferFrom(from, to, amount, signer, options = {}) {
  const contract = getWethContract(signer)
  return contract.transferFrom(from, to, amount, { ...options })
}

function submitWethWithdraw(amount, signer, options = {}) {
  const contract = getWethContract(signer)
  return contract.withdraw(amount, { ...options })
}

function getWethDecimals() {
  const contract = getWethContract(constants.ethersProvider)
  return contract.decimals()
}

function getWethBalanceOf(owner) {
  const contract = getWethContract(constants.ethersProvider)
  return contract.balanceOf(owner)
}

function getWethSymbol() {
  const contract = getWethContract(constants.ethersProvider)
  return contract.symbol()
}

function submitWethTransfer(to, amount, signer, options = {}) {
  const contract = getWethContract(signer)
  return contract.transfer(to, amount, { ...options })
}

function submitWethDeposit(ethAmount, signer, options = {}) {
  const contract = getWethContract(signer)
  return contract.deposit({ ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function getWethAllowance(owner, spender) {
  const contract = getWethContract(constants.ethersProvider)
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
