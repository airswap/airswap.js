"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWethDepositTransactions = exports.getWethTransferTransactions = exports.getWethWithdrawTransactions = exports.getWethTransferFromTransactions = exports.getWethApproveTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getWethApproveTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'approve',
    namespace: 'weth'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWethApproveTransactions = getWethApproveTransactions;
var getWethTransferFromTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferFrom',
    namespace: 'weth'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWethTransferFromTransactions = getWethTransferFromTransactions;
var getWethWithdrawTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'withdraw',
    namespace: 'weth'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWethWithdrawTransactions = getWethWithdrawTransactions;
var getWethTransferTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transfer',
    namespace: 'weth'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWethTransferTransactions = getWethTransferTransactions;
var getWethDepositTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'deposit',
    namespace: 'weth'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWethDepositTransactions = getWethDepositTransactions;