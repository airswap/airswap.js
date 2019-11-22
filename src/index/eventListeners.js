// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/index.json')

const trackIndexOwnershipTransferred = ({
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
    namespace: 'index',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexSetLocator = ({
  callback,
  identifier,
  locator,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'SetLocator',
    params: { identifier, locator },
    fromBlock,
    backFillBlockCount,
    topic: '0x62d8270f77cd1e7351e3e92e7001b363e90eed2ef3394dbd51201ceee3672630',
    namespace: 'index',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackIndexUnsetLocator = ({
  callback,
  identifier,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'UnsetLocator',
    params: { identifier },
    fromBlock,
    backFillBlockCount,
    topic: '0xded788c834b3ea8a384c1495466a3a4a827c378cd9eafe5c159d90291ce01844',
    namespace: 'index',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackIndexOwnershipTransferred, trackIndexSetLocator, trackIndexUnsetLocator }
