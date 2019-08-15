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

export function approve(contractAddress, { _spender, _value }, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approve(_spender, _value)
}

export function totalSupply(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.totalSupply()
}

export function transferFrom(contractAddress, { _from, _to, _value }, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transferFrom(_from, _to, _value)
}

export function decimals(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.decimals()
}

export function version(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.version()
}

export function balanceOf(contractAddress, { _owner }) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.balanceOf(_owner)
}

export function symbol(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.symbol()
}

export function transfer(contractAddress, { _to, _value }, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transfer(_to, _value)
}

export function approveAndCall(contractAddress, { _spender, _value, _extraData }, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approveAndCall(_spender, _value, _extraData)
}

export function allowance(contractAddress, { _owner, _spender }) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.allowance(_owner, _spender)
}
