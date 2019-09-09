const ethers = require('ethers')
const abi = require('../abis/Swap.json')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}

export function getSwapMakerMinimumNonce(makerWallet) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerMinimumNonce(makerWallet)
}

export function getSwapMakerOrderStatus(makerWallet, nonce) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerOrderStatus(makerWallet, nonce)
}

export function getSwapDelegateApprovals(approver, delegate) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.delegateApprovals(approver, delegate)
}

export function submitSwap(order, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order)
}

export function submitSwapCancel(nonces, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces)
}

export function submitSwapInvalidate(minimumNonce, signer) {
  const contract = getSwapContract(signer)
  return contract.invalidate(minimumNonce)
}

export function submitSwapAuthorize(delegate, expiry, signer) {
  const contract = getSwapContract(signer)
  return contract.authorize(delegate, expiry)
}

export function submitSwapRevoke(delegate, signer) {
  const contract = getSwapContract(signer)
  return contract.revoke(delegate)
}
