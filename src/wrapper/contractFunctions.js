// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider)
}
function getWrapperContractPaused() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.contractPaused()
}

function getWrapperIsOwner() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.isOwner()
}

function submitWrapperKillContract(recipient, signer) {
  const contract = getWrapperContract(signer)
  return contract.killContract(recipient)
}

function getWrapperOwner() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.owner()
}

function submitWrapperRenounceOwnership(signer) {
  const contract = getWrapperContract(signer)
  return contract.renounceOwnership()
}

function submitWrapperSetPausedStatus(newStatus, signer) {
  const contract = getWrapperContract(signer)
  return contract.setPausedStatus(newStatus)
}

function submitWrapperSwap(ethAmount, order, signer) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}

function getWrapperSwapContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.swapContract()
}

function submitWrapperTransferOwnership(newOwner, signer) {
  const contract = getWrapperContract(signer)
  return contract.transferOwnership(newOwner)
}

function getWrapperWethContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.wethContract()
}

module.exports = {
  getWrapperContractPaused,
  getWrapperIsOwner,
  submitWrapperKillContract,
  getWrapperOwner,
  submitWrapperRenounceOwnership,
  submitWrapperSetPausedStatus,
  submitWrapperSwap,
  getWrapperSwapContract,
  submitWrapperTransferOwnership,
  getWrapperWethContract,
}
