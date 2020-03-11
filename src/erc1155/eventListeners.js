// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/erc1155.json')

const trackERC1155ApprovalForAll = ({
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
    namespace: 'ERC1155',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC1155TransferBatch = ({
  callback,
  operator,
  from,
  to,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'TransferBatch',
    params: { operator, from, to },
    fromBlock,
    backFillBlockCount,
    topic: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
    namespace: 'ERC1155',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC1155TransferSingle = ({
  callback,
  operator,
  from,
  to,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'TransferSingle',
    params: { operator, from, to },
    fromBlock,
    backFillBlockCount,
    topic: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
    namespace: 'ERC1155',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC1155URI = ({
  callback,
  id,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'URI',
    params: { id },
    fromBlock,
    backFillBlockCount,
    topic: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
    namespace: 'ERC1155',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackERC1155ApprovalForAll, trackERC1155TransferBatch, trackERC1155TransferSingle, trackERC1155URI }
