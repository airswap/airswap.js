// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/delegate.json')
const constants = require('../constants')

function getDelegateContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getDelegateIndexer(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.indexer()
}

function getDelegateIsOwner(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.isOwner()
}

function getDelegateOwner(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.owner()
}

function getDelegateProtocol(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.protocol()
}

function submitDelegateRenounceOwnership(contractAddress, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.renounceOwnership({ ...options })
}

function getDelegateRules(contractAddress, senderToken, signerToken) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.rules(senderToken, signerToken)
}

function getDelegateSwapContract(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.swapContract()
}

function getDelegateTradeWallet(contractAddress) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.tradeWallet()
}

function submitDelegateTransferOwnership(contractAddress, newOwner, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.transferOwnership(newOwner, { ...options })
}

function submitDelegateSetRule(
  contractAddress,
  senderToken,
  signerToken,
  maxSenderAmount,
  priceCoef,
  priceExp,
  signer,
  options = {},
) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setRule(senderToken, signerToken, maxSenderAmount, priceCoef, priceExp, { ...options })
}

function submitDelegateUnsetRule(contractAddress, senderToken, signerToken, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.unsetRule(senderToken, signerToken, { ...options })
}

function submitDelegateSetRuleAndIntent(
  contractAddress,
  senderToken,
  signerToken,
  rule,
  newStakeAmount,
  signer,
  options = {},
) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setRuleAndIntent(senderToken, signerToken, rule, newStakeAmount, { ...options })
}

function submitDelegateUnsetRuleAndIntent(contractAddress, senderToken, signerToken, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.unsetRuleAndIntent(senderToken, signerToken, { ...options })
}

function submitDelegateProvideOrder(contractAddress, order, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.provideOrder(order, { ...options })
}

function submitDelegateSetTradeWallet(contractAddress, newTradeWallet, signer, options = {}) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setTradeWallet(newTradeWallet, { ...options })
}

function getDelegateGetSignerSideQuote(contractAddress, senderAmount, senderToken, signerToken) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.getSignerSideQuote(senderAmount, senderToken, signerToken)
}

function getDelegateGetSenderSideQuote(contractAddress, signerAmount, signerToken, senderToken) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.getSenderSideQuote(signerAmount, signerToken, senderToken)
}

function getDelegateGetMaxQuote(contractAddress, senderToken, signerToken) {
  const contract = getDelegateContract(constants.ethersProvider, contractAddress)
  return contract.getMaxQuote(senderToken, signerToken)
}

module.exports = {
  getDelegateIndexer,
  getDelegateIsOwner,
  getDelegateOwner,
  getDelegateProtocol,
  submitDelegateRenounceOwnership,
  getDelegateRules,
  getDelegateSwapContract,
  getDelegateTradeWallet,
  submitDelegateTransferOwnership,
  submitDelegateSetRule,
  submitDelegateUnsetRule,
  submitDelegateSetRuleAndIntent,
  submitDelegateUnsetRuleAndIntent,
  submitDelegateProvideOrder,
  submitDelegateSetTradeWallet,
  getDelegateGetSignerSideQuote,
  getDelegateGetSenderSideQuote,
  getDelegateGetMaxQuote,
}
