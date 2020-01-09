"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeltaBalancesConstructorTransactions = exports.getDeltaBalancesWithdrawTokenTransactions = exports.getDeltaBalancesWithdrawTransactions = exports.getDeltaBalancesDestructTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getDeltaBalancesDestructTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'destruct',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDeltaBalancesDestructTransactions = getDeltaBalancesDestructTransactions;
var getDeltaBalancesWithdrawTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'withdraw',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDeltaBalancesWithdrawTransactions = getDeltaBalancesWithdrawTransactions;
var getDeltaBalancesWithdrawTokenTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'withdrawToken',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDeltaBalancesWithdrawTokenTransactions = getDeltaBalancesWithdrawTokenTransactions;
var getDeltaBalancesConstructorTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'constructor',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDeltaBalancesConstructorTransactions = getDeltaBalancesConstructorTransactions;