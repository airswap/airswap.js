// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider)
}
function getWrapperSwapContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.swapContract()
}

function getWrapperWethContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.wethContract()
}

function submitWrapperSwap(ethAmount, order, signer) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitWrapperProvideDelegateOrder(ethAmount, order, delegate, signer) {
  const contract = getWrapperContract(signer)
  return contract.provideDelegateOrder(order, delegate, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}

module.exports = {
  getWrapperSwapContract,
  getWrapperWethContract,
  submitWrapperSwap,
  submitWrapperProvideDelegateOrder,
}
