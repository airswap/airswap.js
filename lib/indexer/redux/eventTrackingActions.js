"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackIndexerUnstake = exports.trackIndexerStake = exports.trackIndexerRemoveTokenFromBlacklist = exports.trackIndexerOwnershipTransferred = exports.trackIndexerCreateIndex = exports.trackIndexerAddTokenToBlacklist = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/indexer.json');

var constants = require('../../constants');

var trackIndexerAddTokenToBlacklist = function trackIndexerAddTokenToBlacklist() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'AddTokenToBlacklist',
    params: {},
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerAddTokenToBlacklist = trackIndexerAddTokenToBlacklist;

var trackIndexerCreateIndex = function trackIndexerCreateIndex() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      signerToken = _ref2.signerToken,
      senderToken = _ref2.senderToken,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerCreateIndex = trackIndexerCreateIndex;

var trackIndexerOwnershipTransferred = function trackIndexerOwnershipTransferred() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      previousOwner = _ref3.previousOwner,
      newOwner = _ref3.newOwner,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerOwnershipTransferred = trackIndexerOwnershipTransferred;

var trackIndexerRemoveTokenFromBlacklist = function trackIndexerRemoveTokenFromBlacklist() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi: abi,
    name: 'RemoveTokenFromBlacklist',
    params: {},
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerRemoveTokenFromBlacklist = trackIndexerRemoveTokenFromBlacklist;

var trackIndexerStake = function trackIndexerStake() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref5.callback,
      staker = _ref5.staker,
      signerToken = _ref5.signerToken,
      senderToken = _ref5.senderToken,
      fromBlock = _ref5.fromBlock,
      backFillBlockCount = _ref5.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerStake = trackIndexerStake;

var trackIndexerUnstake = function trackIndexerUnstake() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref6.callback,
      staker = _ref6.staker,
      signerToken = _ref6.signerToken,
      senderToken = _ref6.senderToken,
      fromBlock = _ref6.fromBlock,
      backFillBlockCount = _ref6.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'indexer'
  };
};

exports.trackIndexerUnstake = trackIndexerUnstake;