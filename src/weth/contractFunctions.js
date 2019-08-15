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

export function approve({ guy, wad }, signer) {
  const contract = getWethContract(signer)
  return contract.approve(guy, wad)
}

export function totalSupply() {
  const contract = getWethContract(constants.httpProvider)
  return contract.totalSupply()
}

export function transferFrom({ src, dst, wad }, signer) {
  const contract = getWethContract(signer)
  return contract.transferFrom(src, dst, wad)
}

export function withdraw({ wad }, signer) {
  const contract = getWethContract(signer)
  return contract.withdraw(wad)
}

export function decimals() {
  const contract = getWethContract(constants.httpProvider)
  return contract.decimals()
}

export function balanceOf({ addressInput1 }) {
  const contract = getWethContract(constants.httpProvider)
  return contract.balanceOf(addressInput1)
}

export function symbol() {
  const contract = getWethContract(constants.httpProvider)
  return contract.symbol()
}

export function transfer({ dst, wad }, signer) {
  const contract = getWethContract(signer)
  return contract.transfer(dst, wad)
}

export function deposit(signer) {
  const contract = getWethContract(signer)
  return contract.deposit()
}

export function allowance({ addressInput1, addressInput2 }) {
  const contract = getWethContract(constants.httpProvider)
  return contract.allowance(addressInput1, addressInput2)
}
