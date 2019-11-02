// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../swap/abi.js')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}
function submitSwapAuthorizeSender(authorizedSender, signer) {
  const contract = getSwapContract(signer)
  return contract.authorizeSender(authorizedSender)
}

function submitSwapAuthorizeSigner(authorizedSigner, signer) {
  const contract = getSwapContract(signer)
  return contract.authorizeSigner(authorizedSigner)
}

function submitSwapCancel(nonces, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces)
}

function submitSwapInvalidate(minimumNonce, signer) {
  const contract = getSwapContract(signer)
  return contract.invalidate(minimumNonce)
}

function submitSwapRevokeSender(authorizedSender, signer) {
  const contract = getSwapContract(signer)
  return contract.revokeSender(authorizedSender)
}

function submitSwapRevokeSigner(authorizedSigner, signer) {
  const contract = getSwapContract(signer)
  return contract.revokeSigner(authorizedSigner)
}

function getSwapSenderAuthorizations(sender, authorizedSender) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.senderAuthorizations(sender, authorizedSender)
}

function getSwapSignerAuthorizations(signer, authorizedSigner) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.signerAuthorizations(signer, authorizedSigner)
}

function getSwapSignerMinimumNonce(signer) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.signerMinimumNonce(signer)
}

function getSwapSignerNonceStatus(signer, nonce) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.signerNonceStatus(signer, nonce)
}

function submitSwap(order, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order)
}

module.exports = {
  submitSwapAuthorizeSender,
  submitSwapAuthorizeSigner,
  submitSwapCancel,
  submitSwapInvalidate,
  submitSwapRevokeSender,
  submitSwapRevokeSigner,
  getSwapSenderAuthorizations,
  getSwapSignerAuthorizations,
  getSwapSignerMinimumNonce,
  getSwapSignerNonceStatus,
  submitSwap,
}
