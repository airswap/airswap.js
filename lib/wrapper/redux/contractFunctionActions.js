"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitWrapperProvideDelegateOrder = exports.submitWrapperSwap = exports.fetchWrapperWethContract = exports.fetchWrapperSwapContract = void 0;

// This file is generated code, edits will be overwritten
var fetchWrapperSwapContract = function fetchWrapperSwapContract() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WRAPPER_SWAP_CONTRACT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWrapperSwapContract = fetchWrapperSwapContract;

var fetchWrapperWethContract = function fetchWrapperWethContract() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WRAPPER_WETH_CONTRACT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWrapperWethContract = fetchWrapperWethContract;

var submitWrapperSwap = function submitWrapperSwap(_ref) {
  var order = _ref.order,
      ethAmount = _ref.ethAmount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        order: order,
        ethAmount: ethAmount,
        type: 'SUBMIT_WRAPPER_SWAP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWrapperSwap = submitWrapperSwap;

var submitWrapperProvideDelegateOrder = function submitWrapperProvideDelegateOrder(_ref2) {
  var order = _ref2.order,
      delegate = _ref2.delegate,
      ethAmount = _ref2.ethAmount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        order: order,
        delegate: delegate,
        ethAmount: ethAmount,
        type: 'SUBMIT_WRAPPER_PROVIDE_DELEGATE_ORDER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWrapperProvideDelegateOrder = submitWrapperProvideDelegateOrder;