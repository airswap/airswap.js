"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitDeltaBalancesConstructor = exports.fetchDeltaBalancesAdmin = exports.fetchDeltaBalancesAllAllowancesForManyAccounts = exports.fetchDeltaBalancesAllWETHbalances = exports.submitDeltaBalancesWithdrawToken = exports.fetchDeltaBalancesTokenAllowance = exports.fetchDeltaBalancesWalletBalances = exports.submitDeltaBalancesWithdraw = exports.fetchDeltaBalancesWalletAllowances = exports.submitDeltaBalancesDestruct = exports.fetchDeltaBalancesTokenBalance = exports.fetchDeltaBalancesAllBalancesForManyAccounts = void 0;

// This file is generated code, edits will be overwritten
var fetchDeltaBalancesAllBalancesForManyAccounts = function fetchDeltaBalancesAllBalancesForManyAccounts(_ref) {
  var users = _ref.users,
      tokens = _ref.tokens;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        users: users,
        tokens: tokens,
        type: 'FETCH_DELTA_BALANCES_ALL_BALANCES_FOR_MANY_ACCOUNTS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesAllBalancesForManyAccounts = fetchDeltaBalancesAllBalancesForManyAccounts;

var fetchDeltaBalancesTokenBalance = function fetchDeltaBalancesTokenBalance(_ref2) {
  var user = _ref2.user,
      token = _ref2.token;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        user: user,
        token: token,
        type: 'FETCH_DELTA_BALANCES_TOKEN_BALANCE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesTokenBalance = fetchDeltaBalancesTokenBalance;

var submitDeltaBalancesDestruct = function submitDeltaBalancesDestruct() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'SUBMIT_DELTA_BALANCES_DESTRUCT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDeltaBalancesDestruct = submitDeltaBalancesDestruct;

var fetchDeltaBalancesWalletAllowances = function fetchDeltaBalancesWalletAllowances(_ref3) {
  var user = _ref3.user,
      spender = _ref3.spender,
      tokens = _ref3.tokens;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        user: user,
        spender: spender,
        tokens: tokens,
        type: 'FETCH_DELTA_BALANCES_WALLET_ALLOWANCES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesWalletAllowances = fetchDeltaBalancesWalletAllowances;

var submitDeltaBalancesWithdraw = function submitDeltaBalancesWithdraw() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'SUBMIT_DELTA_BALANCES_WITHDRAW',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDeltaBalancesWithdraw = submitDeltaBalancesWithdraw;

var fetchDeltaBalancesWalletBalances = function fetchDeltaBalancesWalletBalances(_ref4) {
  var user = _ref4.user,
      tokens = _ref4.tokens;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        user: user,
        tokens: tokens,
        type: 'FETCH_DELTA_BALANCES_WALLET_BALANCES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesWalletBalances = fetchDeltaBalancesWalletBalances;

var fetchDeltaBalancesTokenAllowance = function fetchDeltaBalancesTokenAllowance(_ref5) {
  var user = _ref5.user,
      spender = _ref5.spender,
      token = _ref5.token;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        user: user,
        spender: spender,
        token: token,
        type: 'FETCH_DELTA_BALANCES_TOKEN_ALLOWANCE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesTokenAllowance = fetchDeltaBalancesTokenAllowance;

var submitDeltaBalancesWithdrawToken = function submitDeltaBalancesWithdrawToken(_ref6) {
  var token = _ref6.token,
      amount = _ref6.amount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        token: token,
        amount: amount,
        type: 'SUBMIT_DELTA_BALANCES_WITHDRAW_TOKEN',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDeltaBalancesWithdrawToken = submitDeltaBalancesWithdrawToken;

var fetchDeltaBalancesAllWETHbalances = function fetchDeltaBalancesAllWETHbalances(_ref7) {
  var wethAddress = _ref7.wethAddress,
      users = _ref7.users;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        wethAddress: wethAddress,
        users: users,
        type: 'FETCH_DELTA_BALANCES_ALL_WET_HBALANCES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesAllWETHbalances = fetchDeltaBalancesAllWETHbalances;

var fetchDeltaBalancesAllAllowancesForManyAccounts = function fetchDeltaBalancesAllAllowancesForManyAccounts(_ref8) {
  var users = _ref8.users,
      spender = _ref8.spender,
      tokens = _ref8.tokens;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        users: users,
        spender: spender,
        tokens: tokens,
        type: 'FETCH_DELTA_BALANCES_ALL_ALLOWANCES_FOR_MANY_ACCOUNTS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesAllAllowancesForManyAccounts = fetchDeltaBalancesAllAllowancesForManyAccounts;

var fetchDeltaBalancesAdmin = function fetchDeltaBalancesAdmin() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_DELTA_BALANCES_ADMIN',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDeltaBalancesAdmin = fetchDeltaBalancesAdmin;

var submitDeltaBalancesConstructor = function submitDeltaBalancesConstructor(_ref9) {
  var _deployer = _ref9._deployer;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        _deployer: _deployer,
        type: 'SUBMIT_DELTA_BALANCES_CONSTRUCTOR',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDeltaBalancesConstructor = submitDeltaBalancesConstructor;