"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/erc721.json');

var trackERC721Transfer = function trackERC721Transfer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      from = _ref.from,
      to = _ref.to,
      tokenId = _ref.tokenId,
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
      to: to,
      tokenId: tokenId
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    namespace: 'ERC721',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackERC721Approval = function trackERC721Approval() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      approved = _ref2.approved,
      tokenId = _ref2.tokenId,
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
      approved: approved,
      tokenId: tokenId
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    namespace: 'ERC721',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackERC721ApprovalForAll = function trackERC721ApprovalForAll() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      operator = _ref3.operator,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    abi: abi,
    name: 'ApprovalForAll',
    params: {
      owner: owner,
      operator: operator
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
    namespace: 'ERC721',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackERC721Transfer: trackERC721Transfer,
  trackERC721Approval: trackERC721Approval,
  trackERC721ApprovalForAll: trackERC721ApprovalForAll
};