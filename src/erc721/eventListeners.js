// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/erc721.json')

const trackERC721Transfer = ({
  callback,
  from,
  to,
  tokenId,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'Transfer',
    params: { from, to, tokenId },
    fromBlock,
    backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'ERC721',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC721Approval = ({
  callback,
  owner,
  approved,
  tokenId,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'Approval',
    params: { owner, approved, tokenId },
    fromBlock,
    backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'ERC721',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC721ApprovalForAll = ({
  callback,
  owner,
  operator,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'ApprovalForAll',
    params: { owner, operator },
    fromBlock,
    backFillBlockCount,
    topic: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
    namespace: 'ERC721',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackERC721Transfer, trackERC721Approval, trackERC721ApprovalForAll }
