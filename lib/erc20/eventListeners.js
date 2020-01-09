"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/hst.json');

var trackERC20Transfer = function trackERC20Transfer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      from = _ref.from,
      to = _ref.to,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'Transfer',
    params: {
      from: from,
      to: to
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'ERC20',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackERC20Approval = function trackERC20Approval() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      spender = _ref2.spender,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'Approval',
    params: {
      owner: owner,
      spender: spender
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'ERC20',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackERC20Transfer: trackERC20Transfer,
  trackERC20Approval: trackERC20Approval
};