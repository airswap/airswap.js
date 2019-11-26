// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/delegate.json')

const trackDelegateOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'delegate',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackDelegateProvideOrder = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'ProvideOrder',
    params: { owner, senderToken, signerToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x0189daca1660a5f26ed6b6d45a91d45b31911dc06e9f69c24838beac4b3f502d',
    namespace: 'delegate',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackDelegateSetRule = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'SetRule',
    params: { owner, senderToken, signerToken },
    fromBlock,
    backFillBlockCount,
    topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e',
    namespace: 'delegate',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackDelegateUnsetRule = ({
  callback,
  owner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'UnsetRule',
    params: { owner, senderToken, signerToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98',
    namespace: 'delegate',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = {
  trackDelegateOwnershipTransferred,
  trackDelegateProvideOrder,
  trackDelegateSetRule,
  trackDelegateUnsetRule,
}
