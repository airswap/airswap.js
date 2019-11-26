// This file is generated code, edits will be overwritten
const abi = require('../../abis/indexer.json')
const constants = require('../../constants')

export const trackIndexerAddTokenToBlacklist = ({ callback, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'AddTokenToBlacklist',
  params: {},
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})

export const trackIndexerCreateIndex = ({
  callback,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'CreateIndex',
  params: { signerToken, senderToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})

export const trackIndexerOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'OwnershipTransferred',
  params: { previousOwner, newOwner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})

export const trackIndexerRemoveTokenFromBlacklist = ({ callback, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'RemoveTokenFromBlacklist',
  params: {},
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})

export const trackIndexerStake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'Stake',
  params: { staker, signerToken, senderToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})

export const trackIndexerUnstake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.INDEXER_CONTRACT_ADDRESS,
  abi,
  name: 'Unstake',
  params: { staker, signerToken, senderToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'indexer',
})
