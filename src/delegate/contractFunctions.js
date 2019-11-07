// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/delegate.json')
const constants = require('../constants')

function getDelegateContract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getDelegateIndexer(contractAddress) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.indexer()
}

function getDelegateIsOwner(contractAddress) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.isOwner()
}

function getDelegateOwner(contractAddress) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.owner()
}

function submitDelegateRenounceOwnership(contractAddress, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.renounceOwnership()
}

function getDelegateRules(contractAddress, senderToken, signerToken) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.rules(senderToken, signerToken)
}

function getDelegateSwapContract(contractAddress) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.swapContract()
}

function getDelegateTradeWallet(contractAddress) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.tradeWallet()
}

function submitDelegateTransferOwnership(contractAddress, newOwner, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.transferOwnership(newOwner)
}

function submitDelegateSetRule(
  contractAddress,
  senderToken,
  signerToken,
  maxSenderAmount,
  priceCoef,
  priceExp,
  signer,
) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setRule(senderToken, signerToken, maxSenderAmount, priceCoef, priceExp)
}

function submitDelegateUnsetRule(contractAddress, senderToken, signerToken, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.unsetRule(senderToken, signerToken)
}

function submitDelegateSetRuleAndIntent(contractAddress, senderToken, signerToken, rule, amountToStake, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setRuleAndIntent(senderToken, signerToken, rule, amountToStake)
}

function submitDelegateUnsetRuleAndIntent(contractAddress, signerToken, senderToken, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.unsetRuleAndIntent(signerToken, senderToken)
}

function submitDelegateProvideOrder(contractAddress, order, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.provideOrder(order)
}

function submitDelegateSetTradeWallet(contractAddress, newTradeWallet, signer) {
  const contract = getDelegateContract(signer, contractAddress)
  return contract.setTradeWallet(newTradeWallet)
}

function getDelegateGetSignerSideQuote(contractAddress, senderParam, senderToken, signerToken) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.getSignerSideQuote(senderParam, senderToken, signerToken)
}

function getDelegateGetSenderSideQuote(contractAddress, signerParam, signerToken, senderToken) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.getSenderSideQuote(signerParam, signerToken, senderToken)
}

function getDelegateGetMaxQuote(contractAddress, senderToken, signerToken) {
  const contract = getDelegateContract(constants.httpProvider, contractAddress)
  return contract.getMaxQuote(senderToken, signerToken)
}

module.exports = {
  getDelegateIndexer,
  getDelegateIsOwner,
  getDelegateOwner,
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
