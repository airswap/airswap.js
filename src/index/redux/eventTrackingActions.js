// This file is generated code, edits will be overwritten
const abi = require('../../abis/index.json')

export const trackIndexOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'OwnershipTransferred',
  params: { previousOwner, newOwner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'index',
})

export const trackIndexSetLocator = ({ callback, identifier, locator, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'SetLocator',
  params: { identifier, locator },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'index',
})

export const trackIndexUnsetLocator = ({ callback, identifier, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'UnsetLocator',
  params: { identifier },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'index',
})
