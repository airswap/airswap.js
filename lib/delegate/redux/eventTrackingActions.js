"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackDelegateUnsetRule = exports.trackDelegateSetRule = exports.trackDelegateProvideOrder = exports.trackDelegateOwnershipTransferred = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/delegate.json');

var trackDelegateOwnershipTransferred = function trackDelegateOwnershipTransferred() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      previousOwner = _ref.previousOwner,
      newOwner = _ref.newOwner,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'OwnershipTransferred',
    params: {
      previousOwner: previousOwner,
      newOwner: newOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'delegate'
  };
};

exports.trackDelegateOwnershipTransferred = trackDelegateOwnershipTransferred;

var trackDelegateProvideOrder = function trackDelegateProvideOrder() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      owner = _ref2.owner,
      senderToken = _ref2.senderToken,
      signerToken = _ref2.signerToken,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'delegate'
  };
};

exports.trackDelegateProvideOrder = trackDelegateProvideOrder;

var trackDelegateSetRule = function trackDelegateSetRule() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      owner = _ref3.owner,
      senderToken = _ref3.senderToken,
      signerToken = _ref3.signerToken,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'delegate'
  };
};

exports.trackDelegateSetRule = trackDelegateSetRule;

var trackDelegateUnsetRule = function trackDelegateUnsetRule() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      owner = _ref4.owner,
      senderToken = _ref4.senderToken,
      signerToken = _ref4.signerToken,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'delegate'
  };
};

exports.trackDelegateUnsetRule = trackDelegateUnsetRule;