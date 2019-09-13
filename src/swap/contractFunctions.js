// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/Swap.json')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}
function getSwapMakerMinimumNonce(makerWallet) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerMinimumNonce(makerWallet)
}

function getSwapMakerOrderStatus(makerWallet, nonce) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.makerOrderStatus(makerWallet, nonce)
}

function getSwapDelegateApprovals(approver, delegate) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.delegateApprovals(approver, delegate)
}

function submitSwap(order, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order)
}

function submitSwapCancel(nonces, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces)
}

function submitSwapInvalidate(minimumNonce, signer) {
  const contract = getSwapContract(signer)
  return contract.invalidate(minimumNonce)
}

function submitSwapAuthorize(delegate, expiry, signer) {
  const contract = getSwapContract(signer)
  return contract.authorize(delegate, expiry)
}

function submitSwapRevoke(delegate, signer) {
  const contract = getSwapContract(signer)
  return contract.revoke(delegate)
}

module.exports = {
  getSwapMakerMinimumNonce,
  getSwapMakerOrderStatus,
  getSwapDelegateApprovals,
  submitSwap,
  submitSwapCancel,
  submitSwapInvalidate,
  submitSwapAuthorize,
  submitSwapRevoke,
}
