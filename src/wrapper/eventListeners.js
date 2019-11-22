// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/wrapper.json')
const constants = require('../constants')

const trackWrapperOwnershipTransferred = ({
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
    contract: constants.WRAPPER_CONTRACT_ADDRESS,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'wrapper',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackWrapperOwnershipTransferred }
