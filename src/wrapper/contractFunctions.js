// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider)
}
function getWrapperSwapContract() {
  const contract = getWrapperContract(constants.ethersProvider)
  return contract.swapContract()
}

function getWrapperWethContract() {
  const contract = getWrapperContract(constants.ethersProvider)
  return contract.wethContract()
}

function submitWrapperSwap(ethAmount, order, signer, options = {}) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { ...options, value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function submitWrapperProvideDelegateOrder(ethAmount, order, delegate, signer, options = {}) {
  const contract = getWrapperContract(signer)
  return contract.provideDelegateOrder(order, delegate, {
    ...options,
    value: ethers.utils.bigNumberify(ethAmount || '0'),
  })
}

module.exports = {
  getWrapperSwapContract,
  getWrapperWethContract,
  submitWrapperSwap,
  submitWrapperProvideDelegateOrder,
}
