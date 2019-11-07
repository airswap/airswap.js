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

function getWrapperOwner() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.owner()
}

function submitWrapperRenounceOwnership(signer) {
  const contract = getWrapperContract(signer)
  return contract.renounceOwnership()
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

function submitWrapperSetPausedStatus(newStatus, signer) {
  const contract = getWrapperContract(signer)
  return contract.setPausedStatus(newStatus)
}

function submitWrapperKillContract(recipient, signer) {
  const contract = getWrapperContract(signer)
  return contract.killContract(recipient)
}

function submitWrapperSwap(ethAmount, order, signer) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}

module.exports = {
  getWrapperContractPaused,
  getWrapperIsOwner,
  getWrapperOwner,
  submitWrapperRenounceOwnership,
  getWrapperSwapContract,
  submitWrapperTransferOwnership,
  getWrapperWethContract,
  submitWrapperSetPausedStatus,
  submitWrapperKillContract,
  submitWrapperSwap,
}
