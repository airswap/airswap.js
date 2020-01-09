"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackSwapLegacyFailed = exports.trackSwapLegacyCanceled = exports.trackSwapLegacyFilled = void 0;

var _require = require('../../constants'),
    abis = _require.abis,
    SWAP_LEGACY_CONTRACT_ADDRESS = _require.SWAP_LEGACY_CONTRACT_ADDRESS;

var trackSwapLegacyFilled = function trackSwapLegacyFilled() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      makerAddress = _ref.makerAddress,
      makerToken = _ref.makerToken,
      takerToken = _ref.takerToken,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    contract: SWAP_LEGACY_CONTRACT_ADDRESS,
    abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
    name: 'Filled',
    params: {
      makerAddress: makerAddress,
      makerToken: makerToken,
      takerToken: takerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swapLegacy'
  };
};

exports.trackSwapLegacyFilled = trackSwapLegacyFilled;

var trackSwapLegacyCanceled = function trackSwapLegacyCanceled() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      makerAddress = _ref2.makerAddress,
      makerToken = _ref2.makerToken,
      takerToken = _ref2.takerToken,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
    callback: callback,
    contract: SWAP_LEGACY_CONTRACT_ADDRESS,
    abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
    name: 'Canceled',
    params: {
      makerAddress: makerAddress,
      makerToken: makerToken,
      takerToken: takerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swapLegacy'
  };
};

exports.trackSwapLegacyCanceled = trackSwapLegacyCanceled;

var trackSwapLegacyFailed = function trackSwapLegacyFailed() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref3.callback,
      makerAddress = _ref3.makerAddress,
      makerToken = _ref3.makerToken,
      takerToken = _ref3.takerToken,
      fromBlock = _ref3.fromBlock,
      backFillBlockCount = _ref3.backFillBlockCount;

  return {
    callback: callback,
    contract: SWAP_LEGACY_CONTRACT_ADDRESS,
    abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
    name: 'Failed',
    params: {
      makerAddress: makerAddress,
      makerToken: makerToken,
      takerToken: takerToken
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    type: 'TRACK_EVENT',
    namespace: 'swapLegacy'
  };
};

exports.trackSwapLegacyFailed = trackSwapLegacyFailed;