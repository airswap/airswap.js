// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/hst.json')
const constants = require('../constants')

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getERC20Name(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.name()
}

function submitERC20Approve(contractAddress, spender, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approve(spender, value)
}

function getERC20TotalSupply(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.totalSupply()
}

function submitERC20TransferFrom(contractAddress, from, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transferFrom(from, to, value)
}

function getERC20Decimals(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.decimals()
}

function getERC20Version(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.version()
}

function getERC20BalanceOf(contractAddress, owner) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.balanceOf(owner)
}

function getERC20Symbol(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.symbol()
}

function submitERC20Transfer(contractAddress, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transfer(to, value)
}

function submitERC20ApproveAndCall(contractAddress, spender, value, extraData, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approveAndCall(spender, value, extraData)
}

function getERC20Allowance(contractAddress, owner, spender) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.allowance(owner, spender)
}

module.exports = {
  getERC20Name,
  submitERC20Approve,
  getERC20TotalSupply,
  submitERC20TransferFrom,
  getERC20Decimals,
  getERC20Version,
  getERC20BalanceOf,
  getERC20Symbol,
  submitERC20Transfer,
  submitERC20ApproveAndCall,
  getERC20Allowance,
}
