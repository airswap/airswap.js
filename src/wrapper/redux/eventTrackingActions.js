// This file is generated code, edits will be overwritten
const abi = require('../../abis/wrapper.json')
const constants = require('../../constants')

export const trackWrapperOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.WRAPPER_CONTRACT_ADDRESS,
  abi,
  name: 'OwnershipTransferred',
  params: { previousOwner, newOwner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'wrapper',
})
