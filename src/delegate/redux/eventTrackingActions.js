// This file is generated code, edits will be overwritten
const abi = require('../../abis/delegate.json')

export const trackDelegateOwnershipTransferred = ({
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
  namespace: 'delegate',
})

export const trackDelegateSetRule = ({
  callback,
  ruleOwner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'SetRule',
  params: { ruleOwner, senderToken, signerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegate',
})

export const trackDelegateUnsetRule = ({
  callback,
  ruleOwner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'UnsetRule',
  params: { ruleOwner, senderToken, signerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegate',
})
