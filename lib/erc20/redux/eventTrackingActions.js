"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackERC20Approval = exports.trackERC20Transfer = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/hst.json');

var trackERC20Transfer = function trackERC20Transfer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      from = _ref.from,
      to = _ref.to,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'Transfer',
    params: {
      from: from,
      to: to
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'ERC20'
  };
};

exports.trackERC20Transfer = trackERC20Transfer;

var trackERC20Approval = function trackERC20Approval() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      spender = _ref2.spender,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'Approval',
    params: {
      owner: owner,
      spender: spender
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'ERC20'
  };
};

exports.trackERC20Approval = trackERC20Approval;