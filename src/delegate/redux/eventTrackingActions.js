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

export const trackDelegateProvideOrder = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'ProvideOrder',
  params: { owner, senderToken, signerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegate',
})

export const trackDelegateSetRule = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'SetRule',
  params: { owner, senderToken, signerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegate',
})

export const trackDelegateUnsetRule = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'UnsetRule',
  params: { owner, senderToken, signerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegate',
})
