"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackSwapSwap = exports.trackSwapRevokeSigner = exports.trackSwapRevokeSender = exports.trackSwapCancelUpTo = exports.trackSwapCancel = exports.trackSwapAuthorizeSigner = exports.trackSwapAuthorizeSender = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/swap.json');

var constants = require('../../constants');

var trackSwapAuthorizeSender = function trackSwapAuthorizeSender() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      authorizerAddress = _ref.authorizerAddress,
      authorizedSender = _ref.authorizedSender,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'AuthorizeSender',
    params: {
      authorizerAddress: authorizerAddress,
      authorizedSender: authorizedSender
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapAuthorizeSender = trackSwapAuthorizeSender;

var trackSwapAuthorizeSigner = function trackSwapAuthorizeSigner() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      authorizerAddress = _ref2.authorizerAddress,
      authorizedSigner = _ref2.authorizedSigner,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'AuthorizeSigner',
    params: {
      authorizerAddress: authorizerAddress,
      authorizedSigner: authorizedSigner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapAuthorizeSigner = trackSwapAuthorizeSigner;

var trackSwapCancel = function trackSwapCancel() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      nonce = _ref3.nonce,
      signerWallet = _ref3.signerWallet,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Cancel',
    params: {
      nonce: nonce,
      signerWallet: signerWallet
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapCancel = trackSwapCancel;

var trackSwapCancelUpTo = function trackSwapCancelUpTo() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      nonce = _ref4.nonce,
      signerWallet = _ref4.signerWallet,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'CancelUpTo',
    params: {
      nonce: nonce,
      signerWallet: signerWallet
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapCancelUpTo = trackSwapCancelUpTo;

var trackSwapRevokeSender = function trackSwapRevokeSender() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref5.callback,
      authorizerAddress = _ref5.authorizerAddress,
      revokedSender = _ref5.revokedSender,
      fromBlock = _ref5.fromBlock,
      backFillBlockCount = _ref5.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'RevokeSender',
    params: {
      authorizerAddress: authorizerAddress,
      revokedSender: revokedSender
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapRevokeSender = trackSwapRevokeSender;

var trackSwapRevokeSigner = function trackSwapRevokeSigner() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref6.callback,
      authorizerAddress = _ref6.authorizerAddress,
      revokedSigner = _ref6.revokedSigner,
      fromBlock = _ref6.fromBlock,
      backFillBlockCount = _ref6.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'RevokeSigner',
    params: {
      authorizerAddress: authorizerAddress,
      revokedSigner: revokedSigner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapRevokeSigner = trackSwapRevokeSigner;

var trackSwapSwap = function trackSwapSwap() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref7.callback,
      nonce = _ref7.nonce,
      signerWallet = _ref7.signerWallet,
      senderWallet = _ref7.senderWallet,
      fromBlock = _ref7.fromBlock,
      backFillBlockCount = _ref7.backFillBlockCount;

  return {
    callback: callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi: abi,
    name: 'Swap',
    params: {
      nonce: nonce,
      signerWallet: signerWallet,
      senderWallet: senderWallet
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swap'
  };
};

exports.trackSwapSwap = trackSwapSwap;