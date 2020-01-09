"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackWethWithdrawal = exports.trackWethDeposit = exports.trackWethTransfer = exports.trackWethApproval = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/WETH_ABI.json');

var constants = require('../../constants');

var trackWethApproval = function trackWethApproval() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      owner = _ref.owner,
      spender = _ref.spender,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'weth'
  };
};

exports.trackWethApproval = trackWethApproval;

var trackWethTransfer = function trackWethTransfer() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      from = _ref2.from,
      to = _ref2.to,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'weth'
  };
};

exports.trackWethTransfer = trackWethTransfer;

var trackWethDeposit = function trackWethDeposit() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Deposit',
    params: {
      owner: owner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'weth'
  };
};

exports.trackWethDeposit = trackWethDeposit;

var trackWethWithdrawal = function trackWethWithdrawal() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      owner = _ref4.owner,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.WETH_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Withdrawal',
    params: {
      owner: owner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'weth'
  };
};

exports.trackWethWithdrawal = trackWethWithdrawal;