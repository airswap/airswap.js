// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/delegateFactory.json')
const constants = require('../constants')

function getDelegateFactoryContract(provider) {
  return new ethers.Contract(constants.DELEGATE_FACTORY_CONTRACT_ADDRESS, abi, provider)
}
function getDelegateFactoryIndexerContract() {
  const contract = getDelegateFactoryContract(constants.ethersProvider)
  return contract.indexerContract()
}

function getDelegateFactoryProtocol() {
  const contract = getDelegateFactoryContract(constants.ethersProvider)
  return contract.protocol()
}

function getDelegateFactorySwapContract() {
  const contract = getDelegateFactoryContract(constants.ethersProvider)
  return contract.swapContract()
}

function submitDelegateFactoryCreateDelegate(delegateTradeWallet, signer, options = {}) {
  const contract = getDelegateFactoryContract(signer)
  return contract.createDelegate(delegateTradeWallet, { ...options })
}

function getDelegateFactoryHas(locator) {
  const contract = getDelegateFactoryContract(constants.ethersProvider)
  return contract.has(locator)
}

module.exports = {
  getDelegateFactoryIndexerContract,
  getDelegateFactoryProtocol,
  getDelegateFactorySwapContract,
  submitDelegateFactoryCreateDelegate,
  getDelegateFactoryHas,
}
