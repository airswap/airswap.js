"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackERC721ApprovalForAll = exports.trackERC721Approval = exports.trackERC721Transfer = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/erc721.json');

var trackERC721Transfer = function trackERC721Transfer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      from = _ref.from,
      to = _ref.to,
      tokenId = _ref.tokenId,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'ERC721'
  };
};

exports.trackERC721Transfer = trackERC721Transfer;

var trackERC721Approval = function trackERC721Approval() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      approved = _ref2.approved,
      tokenId = _ref2.tokenId,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'ERC721'
  };
};

exports.trackERC721Approval = trackERC721Approval;

var trackERC721ApprovalForAll = function trackERC721ApprovalForAll() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      operator = _ref3.operator,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'ApprovalForAll',
    params: {
      owner: owner,
      operator: operator
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'ERC721'
  };
};

exports.trackERC721ApprovalForAll = trackERC721ApprovalForAll;