"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackIndexUnsetLocator = exports.trackIndexSetLocator = exports.trackIndexOwnershipTransferred = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/index.json');

var trackIndexOwnershipTransferred = function trackIndexOwnershipTransferred() {
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
    namespace: 'index'
  };
};

exports.trackIndexOwnershipTransferred = trackIndexOwnershipTransferred;

var trackIndexSetLocator = function trackIndexSetLocator() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      identifier = _ref2.identifier,
      locator = _ref2.locator,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'SetLocator',
    params: {
      identifier: identifier,
      locator: locator
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'index'
  };
};

exports.trackIndexSetLocator = trackIndexSetLocator;

var trackIndexUnsetLocator = function trackIndexUnsetLocator() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      identifier = _ref3.identifier,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
    callback: callback,
    abi: abi,
    name: 'UnsetLocator',
    params: {
      identifier: identifier
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'index'
  };
};

exports.trackIndexUnsetLocator = trackIndexUnsetLocator;