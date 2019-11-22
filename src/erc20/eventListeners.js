// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/hst.json')

const trackERC20Transfer = ({
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
    abi,
    name: 'Transfer',
    params: { from, to },
    fromBlock,
    backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'ERC20',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackERC20Approval = ({
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
    abi,
    name: 'Approval',
    params: { owner, spender },
    fromBlock,
    backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'ERC20',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackERC20Transfer, trackERC20Approval }
