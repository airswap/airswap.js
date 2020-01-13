"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWrapperProvideDelegateOrderTransactions = exports.getWrapperSwapTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getWrapperSwapTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'swap',
    namespace: 'wrapper'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWrapperSwapTransactions = getWrapperSwapTransactions;
var getWrapperProvideDelegateOrderTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'provideDelegateOrder',
    namespace: 'wrapper'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getWrapperProvideDelegateOrderTransactions = getWrapperProvideDelegateOrderTransactions;