"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexUpdateLocatorTransactions = exports.getIndexUnsetLocatorTransactions = exports.getIndexSetLocatorTransactions = exports.getIndexTransferOwnershipTransactions = exports.getIndexRenounceOwnershipTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getIndexRenounceOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'renounceOwnership',
    namespace: 'index'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexRenounceOwnershipTransactions = getIndexRenounceOwnershipTransactions;
var getIndexTransferOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferOwnership',
    namespace: 'index'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexTransferOwnershipTransactions = getIndexTransferOwnershipTransactions;
var getIndexSetLocatorTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setLocator',
    namespace: 'index'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexSetLocatorTransactions = getIndexSetLocatorTransactions;
var getIndexUnsetLocatorTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'unsetLocator',
    namespace: 'index'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexUnsetLocatorTransactions = getIndexUnsetLocatorTransactions;
var getIndexUpdateLocatorTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'updateLocator',
    namespace: 'index'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexUpdateLocatorTransactions = getIndexUpdateLocatorTransactions;