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

function getSwapLightFEE_DIVISOR() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.FEE_DIVISOR()
}

function getSwapLightLIGHT_ORDER_TYPEHASH() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.LIGHT_ORDER_TYPEHASH()
}

function getSwapLightAuthorized(authorizedAddress) {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.authorized(authorizedAddress)
}

function getSwapLightFeeWallet() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.feeWallet()
}

function getSwapLightOwner() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.owner()
}

function submitSwapLightRenounceOwnership(ethAmount, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.renounceOwnership({ ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function getSwapLightSignerFee() {
  const contract = getSwapLightContract(constants.ethersProvider)
  return contract.signerFee()
}

function submitSwapLightTransferOwnership(ethAmount, newOwner, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.transferOwnership(newOwner, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightSwap(
  ethAmount,
  nonce,
  expiry,
  signerWallet,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  v,
  r,
  s,
  signer,
  options = {},
) {
  const contract = getSwapLightContract(signer)
  return contract.swap(nonce, expiry, signerWallet, signerToken, signerAmount, senderToken, senderAmount, v, r, s, {
    ...options,
    value: ethers.utils.bigNumberify(ethAmount || '0'),
  })
}

function submitSwapLightSwapWithRecipient(
  ethAmount,
  recipient,
  nonce,
  expiry,
  signerWallet,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  v,
  r,
  s,
  signer,
  options = {},
) {
  const contract = getSwapLightContract(signer)
  return contract.swapWithRecipient(
    recipient,
    nonce,
    expiry,
    signerWallet,
    signerToken,
    signerAmount,
    senderToken,
    senderAmount,
    v,
    r,
    s,
    { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') },
  )
}

function submitSwapLightSetFeeWallet(ethAmount, newFeeWallet, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.setFeeWallet(newFeeWallet, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightSetFee(ethAmount, newSignerFee, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.setFee(newSignerFee, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightAuthorize(ethAmount, signerAddress, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.authorize(signerAddress, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightRevoke(ethAmount, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.revoke({ ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitSwapLightCancel(ethAmount, nonces, signer, options = {}) {
  const contract = getSwapLightContract(signer)
  return contract.cancel(nonces, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
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
  getSwapLightFEE_DIVISOR,
  getSwapLightLIGHT_ORDER_TYPEHASH,
  getSwapLightAuthorized,
  getSwapLightFeeWallet,
  getSwapLightOwner,
  submitSwapLightRenounceOwnership,
  getSwapLightSignerFee,
  submitSwapLightTransferOwnership,
  submitSwapLightSwap,
  submitSwapLightSwapWithRecipient,
  submitSwapLightSetFeeWallet,
  submitSwapLightSetFee,
  submitSwapLightAuthorize,
  submitSwapLightRevoke,
  submitSwapLightCancel,
  getSwapLightNonceUsed,
  getSwapLightGetChainId,
}
