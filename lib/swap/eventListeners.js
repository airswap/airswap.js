"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/swap.json');

var constants = require('../constants');

var trackSwapAuthorizeSender = function trackSwapAuthorizeSender() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      authorizerAddress = _ref.authorizerAddress,
      authorizedSender = _ref.authorizedSender,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0xbe9299809b40c2eeb1ae326da30a511c24d70cbe3cd4ff384e4839b91de3b325',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapAuthorizeSigner = function trackSwapAuthorizeSigner() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      authorizerAddress = _ref2.authorizerAddress,
      authorizedSigner = _ref2.authorizedSigner,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount,
      parser = _ref2.parser,
      onFetchingHistoricalEvents = _ref2.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref2.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0xb9bdd0621c52f9a047fe2a048fa04cdf987438d068ac524be8ea382aa3e94d2c',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapCancel = function trackSwapCancel() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      nonce = _ref3.nonce,
      signerWallet = _ref3.signerWallet,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount,
      parser = _ref3.parser,
      onFetchingHistoricalEvents = _ref3.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref3.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapCancelUpTo = function trackSwapCancelUpTo() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref4.callback,
      nonce = _ref4.nonce,
      signerWallet = _ref4.signerWallet,
      fromBlock = _ref4.fromBlock,
      backFillBlockCount = _ref4.backFillBlockCount,
      parser = _ref4.parser,
      onFetchingHistoricalEvents = _ref4.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref4.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0x863123978d9b13946753a916c935c0688a01802440d3ffc668d04d2720c4e110',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapRevokeSender = function trackSwapRevokeSender() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref5.callback,
      authorizerAddress = _ref5.authorizerAddress,
      revokedSender = _ref5.revokedSender,
      fromBlock = _ref5.fromBlock,
      backFillBlockCount = _ref5.backFillBlockCount,
      parser = _ref5.parser,
      onFetchingHistoricalEvents = _ref5.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref5.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0x92b544a2f54114da47550f9ee5b45cc343e5db8bfd148a7aba43219e33fceccd',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapRevokeSigner = function trackSwapRevokeSigner() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref6.callback,
      authorizerAddress = _ref6.authorizerAddress,
      revokedSigner = _ref6.revokedSigner,
      fromBlock = _ref6.fromBlock,
      backFillBlockCount = _ref6.backFillBlockCount,
      parser = _ref6.parser,
      onFetchingHistoricalEvents = _ref6.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref6.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0xfe558292b85125b7cf178f3456b09ce2fa79ca4b4fe2d7bb5da670ffecdb765e',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

var trackSwapSwap = function trackSwapSwap() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref7.callback,
      nonce = _ref7.nonce,
      signerWallet = _ref7.signerWallet,
      senderWallet = _ref7.senderWallet,
      fromBlock = _ref7.fromBlock,
      backFillBlockCount = _ref7.backFillBlockCount,
      parser = _ref7.parser,
      onFetchingHistoricalEvents = _ref7.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref7.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
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
    topic: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
    namespace: 'swap',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackSwapAuthorizeSender: trackSwapAuthorizeSender,
  trackSwapAuthorizeSigner: trackSwapAuthorizeSigner,
  trackSwapCancel: trackSwapCancel,
  trackSwapCancelUpTo: trackSwapCancelUpTo,
  trackSwapRevokeSender: trackSwapRevokeSender,
  trackSwapRevokeSigner: trackSwapRevokeSigner,
  trackSwapSwap: trackSwapSwap
};