// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/swapLight.json')
const constants = require('../constants')

function getSwapLightContract(provider) {
  return new ethers.Contract(constants.SWAP_LIGHT_CONTRACT_ADDRESS, abi, provider)
}
function getSwapLightDOMAIN_CHAIN_ID() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.DOMAIN_CHAIN_ID()
}

function getSwapLightDOMAIN_NAME() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.DOMAIN_NAME()
}

function getSwapLightDOMAIN_SEPARATOR() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.DOMAIN_SEPARATOR()
}

function getSwapLightDOMAIN_TYPEHASH() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.DOMAIN_TYPEHASH()
}

function getSwapLightDOMAIN_VERSION() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.DOMAIN_VERSION()
}

function getSwapLightORDER_TYPEHASH() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.ORDER_TYPEHASH()
}

function getSwapLightSignerMinimumNonce(nonce) {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.signerMinimumNonce(nonce)
}

function submitSwapLightSwap(
  ethAmount,
  nonce,
  expiry,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  signature,
  signer,
  options = {},
) {
  const contract = getSwapLightContract(signer)
  return contract.swap(nonce, expiry, signerToken, signerAmount, senderToken, senderAmount, signature, {
    ...options,
    value: ethers.utils.bigNumberify(ethAmount || '0'),
  })
}

function submitSwapLightCancel(ethAmount, nonces, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.cancel(nonces, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightCancelUpTo(ethAmount, minimumNonce, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.cancelUpTo(minimumNonce, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function getSwapLightNonceUsed(signer, nonce) {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.nonceUsed(signer, nonce)
}

function getSwapLightGetChainId() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.getChainId()
}

module.exports = {
  getSwapLightDOMAIN_CHAIN_ID,
  getSwapLightDOMAIN_NAME,
  getSwapLightDOMAIN_SEPARATOR,
  getSwapLightDOMAIN_TYPEHASH,
  getSwapLightDOMAIN_VERSION,
  getSwapLightORDER_TYPEHASH,
  getSwapLightSignerMinimumNonce,
  submitSwapLightSwap,
  submitSwapLightCancel,
  submitSwapLightCancelUpTo,
  getSwapLightNonceUsed,
  getSwapLightGetChainId,
}
