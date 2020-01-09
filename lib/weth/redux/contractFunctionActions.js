"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWethAllowance = exports.submitWethDeposit = exports.submitWethTransfer = exports.fetchWethSymbol = exports.fetchWethBalanceOf = exports.fetchWethDecimals = exports.submitWethWithdraw = exports.submitWethTransferFrom = exports.fetchWethTotalSupply = exports.submitWethApprove = exports.fetchWethName = void 0;

// This file is generated code, edits will be overwritten
var fetchWethName = function fetchWethName() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WETH_NAME',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethName = fetchWethName;

var submitWethApprove = function submitWethApprove(_ref) {
  var spender = _ref.spender,
      amount = _ref.amount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        spender: spender,
        amount: amount,
        type: 'SUBMIT_WETH_APPROVE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWethApprove = submitWethApprove;

var fetchWethTotalSupply = function fetchWethTotalSupply() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WETH_TOTAL_SUPPLY',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethTotalSupply = fetchWethTotalSupply;

var submitWethTransferFrom = function submitWethTransferFrom(_ref2) {
  var from = _ref2.from,
      to = _ref2.to,
      amount = _ref2.amount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        from: from,
        to: to,
        amount: amount,
        type: 'SUBMIT_WETH_TRANSFER_FROM',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWethTransferFrom = submitWethTransferFrom;

var submitWethWithdraw = function submitWethWithdraw(_ref3) {
  var amount = _ref3.amount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        amount: amount,
        type: 'SUBMIT_WETH_WITHDRAW',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWethWithdraw = submitWethWithdraw;

var fetchWethDecimals = function fetchWethDecimals() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WETH_DECIMALS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethDecimals = fetchWethDecimals;

var fetchWethBalanceOf = function fetchWethBalanceOf(_ref4) {
  var owner = _ref4.owner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        owner: owner,
        type: 'FETCH_WETH_BALANCE_OF',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethBalanceOf = fetchWethBalanceOf;

var fetchWethSymbol = function fetchWethSymbol() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_WETH_SYMBOL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethSymbol = fetchWethSymbol;

var submitWethTransfer = function submitWethTransfer(_ref5) {
  var to = _ref5.to,
      amount = _ref5.amount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        to: to,
        amount: amount,
        type: 'SUBMIT_WETH_TRANSFER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWethTransfer = submitWethTransfer;

var submitWethDeposit = function submitWethDeposit(_ref6) {
  var ethAmount = _ref6.ethAmount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        ethAmount: ethAmount,
        type: 'SUBMIT_WETH_DEPOSIT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitWethDeposit = submitWethDeposit;

var fetchWethAllowance = function fetchWethAllowance(_ref7) {
  var owner = _ref7.owner,
      spender = _ref7.spender;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        owner: owner,
        spender: spender,
        type: 'FETCH_WETH_ALLOWANCE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchWethAllowance = fetchWethAllowance;