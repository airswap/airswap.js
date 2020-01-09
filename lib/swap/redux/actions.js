"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackSwapCancelAllContracts = exports.trackSwapAllContracts = exports.submitEthWrapperAuthorize = exports.getEthWrapperApproval = exports.approveTokenForSwap = exports.signSwap = exports.cancelSwap = exports.fillSwap = void 0;

var _swap = _interopRequireDefault(require("../../abis/swap.json"));

var _redux = require("../../utils/redux");

var _constants = require("../../constants");

var _reducers = require("../../wallet/redux/reducers");

var _contractFunctionActions = require("./contractFunctionActions");

var _actions = require("../../erc20/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fillSwap = function fillSwap(order) {
  return {
    type: 'FILL_SWAP',
    order: order
  };
};

exports.fillSwap = fillSwap;

var cancelSwap = function cancelSwap(order) {
  return {
    type: 'CANCEL_SWAP',
    order: order
  };
};

exports.cancelSwap = cancelSwap;
var signSwap = (0, _redux.makePromiseAction)({
  type: 'SIGN_SWAP'
});
exports.signSwap = signSwap;

var approveTokenForSwap = function approveTokenForSwap(tokenAddress) {
  return (0, _actions.approveToken)(tokenAddress, _constants.SWAP_LEGACY_CONTRACT_ADDRESS);
};

exports.approveTokenForSwap = approveTokenForSwap;

var getEthWrapperApproval = function getEthWrapperApproval() {
  return function (dispatch, getState) {
    return dispatch((0, _contractFunctionActions.fetchSwapSenderAuthorizations)({
      authorizerAddress: (0, _reducers.getConnectedWalletAddress)(getState()),
      authorizedSender: _constants.WRAPPER_CONTRACT_ADDRESS
    }));
  };
};

exports.getEthWrapperApproval = getEthWrapperApproval;

var submitEthWrapperAuthorize = function submitEthWrapperAuthorize() {
  return (0, _contractFunctionActions.submitSwapAuthorizeSender)({
    authorizedSender: _constants.WRAPPER_CONTRACT_ADDRESS
  });
};

exports.submitEthWrapperAuthorize = submitEthWrapperAuthorize;

var trackSwapAllContracts = function trackSwapAllContracts() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      nonce = _ref.nonce,
      signerWallet = _ref.signerWallet,
      senderWallet = _ref.senderWallet,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
    callback: callback,
    abi: _swap.default,
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

exports.trackSwapAllContracts = trackSwapAllContracts;

var trackSwapCancelAllContracts = function trackSwapCancelAllContracts() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref2.callback,
      nonce = _ref2.nonce,
      signerWallet = _ref2.signerWallet,
      fromBlock = _ref2.fromBlock,
      backFillBlockCount = _ref2.backFillBlockCount;

  return {
    callback: callback,
    abi: _swap.default,
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

exports.trackSwapCancelAllContracts = trackSwapCancelAllContracts;