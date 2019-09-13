// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider)
}
function getWrapperWethContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.wethContract()
}

function getWrapperSwapContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.swapContract()
}

function submitWrapperSwap(ethAmount, order, signer) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}

module.exports = { getWrapperWethContract, getWrapperSwapContract, submitWrapperSwap }
