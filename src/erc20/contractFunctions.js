const ethers = require('ethers')
const abi = require('../abis/hst.json')
const constants = require('../constants')

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}

export function name(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.name()
}

export function approve(contractAddress, spender, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approve(spender, value)
}

export function totalSupply(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.totalSupply()
}

export function transferFrom(contractAddress, from, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transferFrom(from, to, value)
}

export function decimals(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.decimals()
}

export function version(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.version()
}

export function balanceOf(contractAddress, owner) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.balanceOf(owner)
}

export function symbol(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.symbol()
}

export function transfer(contractAddress, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transfer(to, value)
}

export function approveAndCall(contractAddress, spender, value, extraData, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approveAndCall(spender, value, extraData)
}

export function allowance(contractAddress, owner, spender) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.allowance(owner, spender)
}
