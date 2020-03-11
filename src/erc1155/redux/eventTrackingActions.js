// This file is generated code, edits will be overwritten
const abi = require('../../abis/erc1155.json')

export const trackERC1155ApprovalForAll = ({ callback, owner, operator, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'ApprovalForAll',
  params: { owner, operator },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC1155',
})

export const trackERC1155TransferBatch = ({ callback, operator, from, to, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'TransferBatch',
  params: { operator, from, to },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC1155',
})

export const trackERC1155TransferSingle = ({ callback, operator, from, to, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'TransferSingle',
  params: { operator, from, to },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC1155',
})

export const trackERC1155URI = ({ callback, id, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'URI',
  params: { id },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC1155',
})
