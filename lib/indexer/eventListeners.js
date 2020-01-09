"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/indexer.json');

var constants = require('../constants');

var trackIndexerAddTokenToBlacklist = function trackIndexerAddTokenToBlacklist() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'AddTokenToBlacklist',
    params: {},
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xe53b519de693da0496205f0705fa49c937a9045cb26b6f67711cd22051955401',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexerCreateIndex = function trackIndexerCreateIndex() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      signerToken = _ref2.signerToken,
      senderToken = _ref2.senderToken,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'CreateIndex',
    params: {
      signerToken: signerToken,
      senderToken: senderToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x7a28ddb7cee538734c8afbb914e80f6fa30503635c435868db561163b5a7e84b',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexerOwnershipTransferred = function trackIndexerOwnershipTransferred() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      previousOwner = _ref3.previousOwner,
      newOwner = _ref3.newOwner,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'OwnershipTransferred',
    params: {
      previousOwner: previousOwner,
      newOwner: newOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexerRemoveTokenFromBlacklist = function trackIndexerRemoveTokenFromBlacklist() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount,
      parser = _ref4.parser,
      onFetchingHistoricalEvents = _ref4.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref4.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'RemoveTokenFromBlacklist',
    params: {},
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xa1f26e166f408721b7578234199103d95e0aea4308d683b2f6c0ec86ac9e9e73',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexerStake = function trackIndexerStake() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref5.callback,
      staker = _ref5.staker,
      signerToken = _ref5.signerToken,
      senderToken = _ref5.senderToken,
      fromBlock = _ref5.fromBlock,
      backFillBlockCount = _ref5.backFillBlockCount,
      parser = _ref5.parser,
      onFetchingHistoricalEvents = _ref5.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref5.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Stake',
    params: {
      staker: staker,
      signerToken: signerToken,
      senderToken: senderToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x5065254984dfd953a97f48da9330ed3a61d8bc8cd2df88176b58f99d3ce81c3e',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackIndexerUnstake = function trackIndexerUnstake() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref6.callback,
      staker = _ref6.staker,
      signerToken = _ref6.signerToken,
      senderToken = _ref6.senderToken,
      fromBlock = _ref6.fromBlock,
      backFillBlockCount = _ref6.backFillBlockCount,
      parser = _ref6.parser,
      onFetchingHistoricalEvents = _ref6.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref6.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Unstake',
    params: {
      staker: staker,
      signerToken: signerToken,
      senderToken: senderToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x71735c1604645e893048a8e669bd75b5c1829b76fe6bd5a6cc0f2ac86eca6ff6',
    namespace: 'indexer',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackIndexerAddTokenToBlacklist: trackIndexerAddTokenToBlacklist,
  trackIndexerCreateIndex: trackIndexerCreateIndex,
  trackIndexerOwnershipTransferred: trackIndexerOwnershipTransferred,
  trackIndexerRemoveTokenFromBlacklist: trackIndexerRemoveTokenFromBlacklist,
  trackIndexerStake: trackIndexerStake,
  trackIndexerUnstake: trackIndexerUnstake
};