const ethers = require('ethers')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

function getWrapperContract(provider) {
  return new ethers.Contract(constants.WRAPPER_CONTRACT_ADDRESS, abi, provider)
}

export function getWrapperWethContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.wethContract()
}

export function getWrapperSwapContract() {
  const contract = getWrapperContract(constants.httpProvider)
  return contract.swapContract()
}

export function submitWrapperSwap(ethAmount, order, signer) {
  const contract = getWrapperContract(signer)
  return contract.swap(order, { value: ethers.utils.bigNumberify(ethAmount || '0') })
}
