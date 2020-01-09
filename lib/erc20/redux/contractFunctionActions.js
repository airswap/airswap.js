"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchERC20Allowance = exports.submitERC20ApproveAndCall = exports.submitERC20Transfer = exports.fetchERC20Symbol = exports.fetchERC20BalanceOf = exports.fetchERC20Version = exports.fetchERC20Decimals = exports.submitERC20TransferFrom = exports.fetchERC20TotalSupply = exports.submitERC20Approve = exports.fetchERC20Name = void 0;

// This file is generated code, edits will be overwritten
var fetchERC20Name = function fetchERC20Name(_ref) {
  var contractAddress = _ref.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_ERC_20_NAME',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20Name = fetchERC20Name;

var submitERC20Approve = function submitERC20Approve(_ref2) {
  var contractAddress = _ref2.contractAddress,
      spender = _ref2.spender,
      value = _ref2.value;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        spender: spender,
        value: value,
        type: 'SUBMIT_ERC_20_APPROVE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC20Approve = submitERC20Approve;

var fetchERC20TotalSupply = function fetchERC20TotalSupply(_ref3) {
  var contractAddress = _ref3.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_ERC_20_TOTAL_SUPPLY',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20TotalSupply = fetchERC20TotalSupply;

var submitERC20TransferFrom = function submitERC20TransferFrom(_ref4) {
  var contractAddress = _ref4.contractAddress,
      from = _ref4.from,
      to = _ref4.to,
      value = _ref4.value;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        from: from,
        to: to,
        value: value,
        type: 'SUBMIT_ERC_20_TRANSFER_FROM',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC20TransferFrom = submitERC20TransferFrom;

var fetchERC20Decimals = function fetchERC20Decimals(_ref5) {
  var contractAddress = _ref5.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_ERC_20_DECIMALS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20Decimals = fetchERC20Decimals;

var fetchERC20Version = function fetchERC20Version(_ref6) {
  var contractAddress = _ref6.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_ERC_20_VERSION',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20Version = fetchERC20Version;

var fetchERC20BalanceOf = function fetchERC20BalanceOf(_ref7) {
  var contractAddress = _ref7.contractAddress,
      owner = _ref7.owner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        owner: owner,
        type: 'FETCH_ERC_20_BALANCE_OF',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20BalanceOf = fetchERC20BalanceOf;

var fetchERC20Symbol = function fetchERC20Symbol(_ref8) {
  var contractAddress = _ref8.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_ERC_20_SYMBOL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20Symbol = fetchERC20Symbol;

var submitERC20Transfer = function submitERC20Transfer(_ref9) {
  var contractAddress = _ref9.contractAddress,
      to = _ref9.to,
      value = _ref9.value;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        to: to,
        value: value,
        type: 'SUBMIT_ERC_20_TRANSFER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC20Transfer = submitERC20Transfer;

var submitERC20ApproveAndCall = function submitERC20ApproveAndCall(_ref10) {
  var contractAddress = _ref10.contractAddress,
      spender = _ref10.spender,
      value = _ref10.value,
      extraData = _ref10.extraData;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        spender: spender,
        value: value,
        extraData: extraData,
        type: 'SUBMIT_ERC_20_APPROVE_AND_CALL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC20ApproveAndCall = submitERC20ApproveAndCall;

var fetchERC20Allowance = function fetchERC20Allowance(_ref11) {
  var contractAddress = _ref11.contractAddress,
      owner = _ref11.owner,
      spender = _ref11.spender;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        owner: owner,
        spender: spender,
        type: 'FETCH_ERC_20_ALLOWANCE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC20Allowance = fetchERC20Allowance;