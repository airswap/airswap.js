"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWrapperWethTokenApproval = exports.approveWrapperWethToken = exports.approveAirswapTokenSwap = exports.approveAirswapToken = exports.unwrapWeth = exports.wrapWeth = exports.approveToken = void 0;

var _constants = require("../../constants");

var _contractFunctionActions = require("./contractFunctionActions");

var _reducers = require("../../wallet/redux/reducers");

var approveToken = function approveToken(tokenAddress, spender) {
  return {
    type: 'APPROVE_TOKEN',
    tokenAddress: tokenAddress,
    spender: spender
  };
};

exports.approveToken = approveToken;

var wrapWeth = function wrapWeth(amount) {
  return {
    type: 'WRAP_WETH',
    amount: amount
  };
};

exports.wrapWeth = wrapWeth;

var unwrapWeth = function unwrapWeth(amount) {
  return {
    type: 'UNWRAP_WETH',
    amount: amount
  };
};

exports.unwrapWeth = unwrapWeth;

var approveAirswapToken = function approveAirswapToken(tokenAddress) {
  return approveToken(tokenAddress, _constants.SWAP_LEGACY_CONTRACT_ADDRESS);
};

exports.approveAirswapToken = approveAirswapToken;

var approveAirswapTokenSwap = function approveAirswapTokenSwap(tokenAddress) {
  return approveToken(tokenAddress, _constants.SWAP_CONTRACT_ADDRESS);
};

exports.approveAirswapTokenSwap = approveAirswapTokenSwap;

var approveWrapperWethToken = function approveWrapperWethToken() {
  return (0, _contractFunctionActions.submitERC20Approve)({
    contractAddress: _constants.WETH_CONTRACT_ADDRESS,
    spender: _constants.WRAPPER_CONTRACT_ADDRESS,
    value: _constants.TOKEN_APPROVAL_AMOUNT
  });
};

exports.approveWrapperWethToken = approveWrapperWethToken;

var getWrapperWethTokenApproval = function getWrapperWethTokenApproval() {
  return function (dispatch, getState) {
    return dispatch((0, _contractFunctionActions.fetchERC20Allowance)({
      contractAddress: _constants.WETH_CONTRACT_ADDRESS,
      owner: (0, _reducers.getConnectedWalletAddress)(getState()),
      spender: _constants.WRAPPER_CONTRACT_ADDRESS
    }));
  };
};

exports.getWrapperWethTokenApproval = getWrapperWethTokenApproval;