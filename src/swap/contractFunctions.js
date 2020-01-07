// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/swap.json')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}
function getSwapRegistry() {
  const contract = getSwapContract(constants.httpProvider)
  return contract.registry()
}

function getSwapSenderAuthorizations(authorizerAddress, authorizedSender) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.senderAuthorizations(authorizerAddress, authorizedSender)
}

function getSwapSignerAuthorizations(authorizerAddress, authorizedSigner) {
  const contract = getSwapContract(constants.httpProvider)
  return contract.signerAuthorizations(authorizerAddress, authorizedSigner)
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

function submitSwapCancel(nonces, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces)
}

function submitSwapCancelUpTo(minimumNonce, signer) {
  const contract = getSwapContract(signer)
  return contract.cancelUpTo(minimumNonce)
}

function submitSwapAuthorizeSender(authorizedSender, signer) {
  const contract = getSwapContract(signer)
  return contract.authorizeSender(authorizedSender)
}

function submitSwapAuthorizeSigner(authorizedSigner, signer) {
  const contract = getSwapContract(signer)
  return contract.authorizeSigner(authorizedSigner)
}

function submitSwapRevokeSender(authorizedSender, signer) {
  const contract = getSwapContract(signer)
  return contract.revokeSender(authorizedSender)
}

function submitSwapRevokeSigner(authorizedSigner, signer) {
  const contract = getSwapContract(signer)
  return contract.revokeSigner(authorizedSigner)
}

module.exports = {
  getSwapRegistry,
  getSwapSenderAuthorizations,
  getSwapSignerAuthorizations,
  getSwapSignerMinimumNonce,
  getSwapSignerNonceStatus,
  submitSwap,
  submitSwapCancel,
  submitSwapCancelUpTo,
  submitSwapAuthorizeSender,
  submitSwapAuthorizeSigner,
  submitSwapRevokeSender,
  submitSwapRevokeSigner,
}
