"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/delegate.json');

var trackDelegateOwnershipTransferred = function trackDelegateOwnershipTransferred() {
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
    namespace: 'delegate',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackDelegateProvideOrder = function trackDelegateProvideOrder() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      senderToken = _ref2.senderToken,
      signerToken = _ref2.signerToken,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'ProvideOrder',
    params: {
      owner: owner,
      senderToken: senderToken,
      signerToken: signerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x0189daca1660a5f26ed6b6d45a91d45b31911dc06e9f69c24838beac4b3f502d',
    namespace: 'delegate',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackDelegateSetRule = function trackDelegateSetRule() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      senderToken = _ref3.senderToken,
      signerToken = _ref3.signerToken,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'SetRule',
    params: {
      owner: owner,
      senderToken: senderToken,
      signerToken: signerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e',
    namespace: 'delegate',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackDelegateUnsetRule = function trackDelegateUnsetRule() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      owner = _ref4.owner,
      senderToken = _ref4.senderToken,
      signerToken = _ref4.signerToken,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount,
      parser = _ref4.parser,
      onFetchingHistoricalEvents = _ref4.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref4.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'UnsetRule',
    params: {
      owner: owner,
      senderToken: senderToken,
      signerToken: signerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98',
    namespace: 'delegate',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackDelegateOwnershipTransferred: trackDelegateOwnershipTransferred,
  trackDelegateProvideOrder: trackDelegateProvideOrder,
  trackDelegateSetRule: trackDelegateSetRule,
  trackDelegateUnsetRule: trackDelegateUnsetRule
};