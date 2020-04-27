// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/swap.json')
const constants = require('../constants')

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider)
}
function getSwapRegistry() {
  const contract = getSwapContract(constants.ethersProvider)
  return contract.registry()
}

function getSwapSenderAuthorizations(authorizerAddress, authorizedSender) {
  const contract = getSwapContract(constants.ethersProvider)
  return contract.senderAuthorizations(authorizerAddress, authorizedSender)
}

function getSwapSignerAuthorizations(authorizerAddress, authorizedSigner) {
  const contract = getSwapContract(constants.ethersProvider)
  return contract.signerAuthorizations(authorizerAddress, authorizedSigner)
}

function getSwapSignerMinimumNonce(signer) {
  const contract = getSwapContract(constants.ethersProvider)
  return contract.signerMinimumNonce(signer)
}

function getSwapSignerNonceStatus(signer, nonce) {
  const contract = getSwapContract(constants.ethersProvider)
  return contract.signerNonceStatus(signer, nonce)
}

function submitSwap(order, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.swap(order, { ...options })
}

function submitSwapCancel(nonces, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.cancel(nonces, { ...options })
}

function submitSwapCancelUpTo(minimumNonce, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.cancelUpTo(minimumNonce, { ...options })
}

function submitSwapAuthorizeSender(authorizedSender, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.authorizeSender(authorizedSender, { ...options })
}

function submitSwapAuthorizeSigner(authorizedSigner, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.authorizeSigner(authorizedSigner, { ...options })
}

function submitSwapRevokeSender(authorizedSender, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.revokeSender(authorizedSender, { ...options })
}

function submitSwapRevokeSigner(authorizedSigner, signer, options = {}) {
  const contract = getSwapContract(signer)
  return contract.revokeSigner(authorizedSigner, { ...options })
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
