// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/indexer.json')
const constants = require('../constants')

const trackIndexerAddTokenToBlacklist = ({
  callback,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'AddTokenToBlacklist',
    params: {},
    fromBlock,
    backFillBlockCount,
    topic: '0xe53b519de693da0496205f0705fa49c937a9045cb26b6f67711cd22051955401',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexerCreateIndex = ({
  callback,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'CreateIndex',
    params: { signerToken, senderToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x7a28ddb7cee538734c8afbb914e80f6fa30503635c435868db561163b5a7e84b',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexerOwnershipTransferred = ({
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
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexerRemoveTokenFromBlacklist = ({
  callback,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'RemoveTokenFromBlacklist',
    params: {},
    fromBlock,
    backFillBlockCount,
    topic: '0xa1f26e166f408721b7578234199103d95e0aea4308d683b2f6c0ec86ac9e9e73',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexerStake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'Stake',
    params: { staker, signerToken, senderToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x5065254984dfd953a97f48da9330ed3a61d8bc8cd2df88176b58f99d3ce81c3e',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexerUnstake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'Unstake',
    params: { staker, signerToken, senderToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x71735c1604645e893048a8e669bd75b5c1829b76fe6bd5a6cc0f2ac86eca6ff6',
    namespace: 'indexer',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = {
  trackIndexerAddTokenToBlacklist,
  trackIndexerCreateIndex,
  trackIndexerOwnershipTransferred,
  trackIndexerRemoveTokenFromBlacklist,
  trackIndexerStake,
  trackIndexerUnstake,
}
