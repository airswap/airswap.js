"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwapRevokeSignerTransactions = exports.getSwapRevokeSenderTransactions = exports.getSwapAuthorizeSignerTransactions = exports.getSwapAuthorizeSenderTransactions = exports.getSwapCancelUpToTransactions = exports.getSwapCancelTransactions = exports.getSwapTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getSwapTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'swap',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapTransactions = getSwapTransactions;
var getSwapCancelTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'cancel',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapCancelTransactions = getSwapCancelTransactions;
var getSwapCancelUpToTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'cancelUpTo',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapCancelUpToTransactions = getSwapCancelUpToTransactions;
var getSwapAuthorizeSenderTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'authorizeSender',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapAuthorizeSenderTransactions = getSwapAuthorizeSenderTransactions;
var getSwapAuthorizeSignerTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'authorizeSigner',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapAuthorizeSignerTransactions = getSwapAuthorizeSignerTransactions;
var getSwapRevokeSenderTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'revokeSender',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapRevokeSenderTransactions = getSwapRevokeSenderTransactions;
var getSwapRevokeSignerTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'revokeSigner',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getSwapRevokeSignerTransactions = getSwapRevokeSignerTransactions;