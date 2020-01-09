"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getERC20ApproveAndCallTransactions = exports.getERC20TransferTransactions = exports.getERC20TransferFromTransactions = exports.getERC20ApproveTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getERC20ApproveTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'approve',
    namespace: 'ERC20'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC20ApproveTransactions = getERC20ApproveTransactions;
var getERC20TransferFromTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferFrom',
    namespace: 'ERC20'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC20TransferFromTransactions = getERC20TransferFromTransactions;
var getERC20TransferTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transfer',
    namespace: 'ERC20'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC20TransferTransactions = getERC20TransferTransactions;
var getERC20ApproveAndCallTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'approveAndCall',
    namespace: 'ERC20'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC20ApproveAndCallTransactions = getERC20ApproveAndCallTransactions;