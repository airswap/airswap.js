// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/hst.json')
const constants = require('../constants')

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getERC20Name(contractAddress) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.name()
}

function submitERC20Approve(contractAddress, spender, value, signer, options = {}) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approve(spender, value, { ...options })
}

function getERC20TotalSupply(contractAddress) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.totalSupply()
}

function submitERC20TransferFrom(contractAddress, from, to, value, signer, options = {}) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transferFrom(from, to, value, { ...options })
}

function getERC20Decimals(contractAddress) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.decimals()
}

function getERC20Version(contractAddress) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.version()
}

function getERC20BalanceOf(contractAddress, owner) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.balanceOf(owner)
}

function getERC20Symbol(contractAddress) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
  return contract.symbol()
}

function submitERC20Transfer(contractAddress, to, value, signer, options = {}) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transfer(to, value, { ...options })
}

function submitERC20ApproveAndCall(contractAddress, spender, value, extraData, signer, options = {}) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approveAndCall(spender, value, extraData, { ...options })
}

function getERC20Allowance(contractAddress, owner, spender) {
  const contract = getERC20Contract(constants.ethersProvider, contractAddress)
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
