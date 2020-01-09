"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/WETH_ABI.json');

var constants = require('../constants');

var trackWethApproval = function trackWethApproval() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      owner = _ref.owner,
      spender = _ref.spender,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Approval',
    params: {
      owner: owner,
      spender: spender
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'weth',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackWethTransfer = function trackWethTransfer() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      from = _ref2.from,
      to = _ref2.to,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Transfer',
    params: {
      from: from,
      to: to
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'weth',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackWethDeposit = function trackWethDeposit() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Deposit',
    params: {
      owner: owner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
    namespace: 'weth',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackWethWithdrawal = function trackWethWithdrawal() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      owner = _ref4.owner,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount,
      parser = _ref4.parser,
      onFetchingHistoricalEvents = _ref4.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref4.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Withdrawal',
    params: {
      owner: owner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65',
    namespace: 'weth',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackWethApproval: trackWethApproval,
  trackWethTransfer: trackWethTransfer,
  trackWethDeposit: trackWethDeposit,
  trackWethWithdrawal: trackWethWithdrawal
};