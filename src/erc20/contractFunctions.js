const ethers = require('ethers')
const abi = require('../abis/hst.json')
const constants = require('../constants')

function getERC20Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}

export function getERC20Name(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.name()
}

export function submitERC20Approve(contractAddress, spender, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approve(spender, value)
}

export function getERC20TotalSupply(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.totalSupply()
}

export function submitERC20TransferFrom(contractAddress, from, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transferFrom(from, to, value)
}

export function getERC20Decimals(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.decimals()
}

export function getERC20Version(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.version()
}

export function getERC20BalanceOf(contractAddress, owner) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.balanceOf(owner)
}

export function getERC20Symbol(contractAddress) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.symbol()
}

export function submitERC20Transfer(contractAddress, to, value, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.transfer(to, value)
}

export function submitERC20ApproveAndCall(contractAddress, spender, value, extraData, signer) {
  const contract = getERC20Contract(signer, contractAddress)
  return contract.approveAndCall(spender, value, extraData)
}

export function getERC20Allowance(contractAddress, owner, spender) {
  const contract = getERC20Contract(constants.httpProvider, contractAddress)
  return contract.allowance(owner, spender)
}
