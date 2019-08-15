const ethers = require('ethers')
const abi = require('../abis/WETH_ABI.json')
const constants = require('../constants')

function getWethContract(provider) {
  return new ethers.Contract(constants.WETH_CONTRACT_ADDRESS, abi, provider)
}

export function name() {
  const contract = getWethContract(constants.httpProvider)
  return contract.name()
}

export function approve(spender, amount, signer) {
  const contract = getWethContract(signer)
  return contract.approve(spender, amount)
}

export function totalSupply() {
  const contract = getWethContract(constants.httpProvider)
  return contract.totalSupply()
}

export function transferFrom(from, to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transferFrom(from, to, amount)
}

export function withdraw(amount, signer) {
  const contract = getWethContract(signer)
  return contract.withdraw(amount)
}

export function decimals() {
  const contract = getWethContract(constants.httpProvider)
  return contract.decimals()
}

export function balanceOf(owner) {
  const contract = getWethContract(constants.httpProvider)
  return contract.balanceOf(owner)
}

export function symbol() {
  const contract = getWethContract(constants.httpProvider)
  return contract.symbol()
}

export function transfer(to, amount, signer) {
  const contract = getWethContract(signer)
  return contract.transfer(to, amount)
}

export function deposit(ethAmount, signer) {
  const contract = getWethContract(signer)
  return contract.deposit({ value: ethers.utils.bigNumberify(ethAmount) })
}

export function allowance(owner, spender) {
  const contract = getWethContract(constants.httpProvider)
  return contract.allowance(owner, spender)
}
