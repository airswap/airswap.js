"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackWrapperOwnershipTransferred = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/wrapper.json');

var constants = require('../../constants');

var trackWrapperOwnershipTransferred = function trackWrapperOwnershipTransferred() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      previousOwner = _ref.previousOwner,
      newOwner = _ref.newOwner,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.WRAPPER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'OwnershipTransferred',
    params: {
      previousOwner: previousOwner,
      newOwner: newOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'wrapper'
  };
};

exports.trackWrapperOwnershipTransferred = trackWrapperOwnershipTransferred;