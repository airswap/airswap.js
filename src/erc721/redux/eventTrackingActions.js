// This file is generated code, edits will be overwritten
const abi = require('../../abis/erc721.json')

export const trackERC721Transfer = ({ callback, from, to, tokenId, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Transfer',
  params: { from, to, tokenId },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC721',
})

export const trackERC721Approval = ({ callback, owner, approved, tokenId, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Approval',
  params: { owner, approved, tokenId },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC721',
})

export const trackERC721ApprovalForAll = ({ callback, owner, operator, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'ApprovalForAll',
  params: { owner, operator },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC721',
})
