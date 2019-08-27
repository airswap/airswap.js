const ethers = require('ethers')
const abi = require('../abis/Swap.json')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}

export function getMakerMinimumNonce(makerWallet) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerMinimumNonce(makerWallet)
}

export function getMakerOrderStatus(makerWallet, nonce) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerOrderStatus(makerWallet, nonce)
}

export function getDelegateApprovals(approverAddress, delegateAddress) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.delegateApprovals(approverAddress, delegateAddress)
}

export function swap(order, signature, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order, signature)
}

export function cancel(nonces, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces)
}

export function invalidate(minimumNonce, signer) {
  const contract = getSwapContract(signer)
  return contract.invalidate(minimumNonce)
}

export function authorize(delegate, expiry, signer) {
  const contract = getSwapContract(signer)
  return contract.authorize(delegate, expiry)
}

export function revoke(delegate, signer) {
  const contract = getSwapContract(signer)
  return contract.revoke(delegate)
}
