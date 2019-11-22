// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/WETH_ABI.json')
const constants = require('../constants')

const trackWethApproval = ({
  callback,
  owner,
  spender,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi,
    name: 'Approval',
    params: { owner, spender },
    fromBlock,
    backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'weth',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackWethTransfer = ({
  callback,
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
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi,
    name: 'Transfer',
    params: { from, to },
    fromBlock,
    backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'weth',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackWethDeposit = ({
  callback,
  owner,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi,
    name: 'Deposit',
    params: { owner },
    fromBlock,
    backFillBlockCount,
    topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
    namespace: 'weth',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackWethWithdrawal = ({
  callback,
  owner,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi,
    name: 'Withdrawal',
    params: { owner },
    fromBlock,
    backFillBlockCount,
    topic: '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65',
    namespace: 'weth',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackWethApproval, trackWethTransfer, trackWethDeposit, trackWethWithdrawal }
