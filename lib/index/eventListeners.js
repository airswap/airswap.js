"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/index.json');

var trackIndexOwnershipTransferred = function trackIndexOwnershipTransferred() {
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
    abi: abi,
    name: 'OwnershipTransferred',
    params: {
      previousOwner: previousOwner,
      newOwner: newOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'index',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexSetLocator = function trackIndexSetLocator() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      identifier = _ref2.identifier,
      locator = _ref2.locator,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'SetLocator',
    params: {
      identifier: identifier,
      locator: locator
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x62d8270f77cd1e7351e3e92e7001b363e90eed2ef3394dbd51201ceee3672630',
    namespace: 'index',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexUnsetLocator = function trackIndexUnsetLocator() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      identifier = _ref3.identifier,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'UnsetLocator',
    params: {
      identifier: identifier
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xded788c834b3ea8a384c1495466a3a4a827c378cd9eafe5c159d90291ce01844',
    namespace: 'index',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackIndexOwnershipTransferred: trackIndexOwnershipTransferred,
  trackIndexSetLocator: trackIndexSetLocator,
  trackIndexUnsetLocator: trackIndexUnsetLocator
};