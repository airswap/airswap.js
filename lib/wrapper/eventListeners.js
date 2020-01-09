"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/wrapper.json');

var constants = require('../constants');

var trackWrapperOwnershipTransferred = function trackWrapperOwnershipTransferred() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      previousOwner = _ref.previousOwner,
      newOwner = _ref.newOwner,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.WRAPPER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'OwnershipTransferred',
    params: {
      previousOwner: previousOwner,
      newOwner: newOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'wrapper',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackWrapperOwnershipTransferred: trackWrapperOwnershipTransferred
};