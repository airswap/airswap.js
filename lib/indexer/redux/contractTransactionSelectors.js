"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexerUnsetIntentTransactions = exports.getIndexerSetIntentTransactions = exports.getIndexerRemoveTokenFromBlacklistTransactions = exports.getIndexerAddTokenToBlacklistTransactions = exports.getIndexerCreateIndexTransactions = exports.getIndexerSetLocatorWhitelistTransactions = exports.getIndexerTransferOwnershipTransactions = exports.getIndexerRenounceOwnershipTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getIndexerRenounceOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'renounceOwnership',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerRenounceOwnershipTransactions = getIndexerRenounceOwnershipTransactions;
var getIndexerTransferOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferOwnership',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerTransferOwnershipTransactions = getIndexerTransferOwnershipTransactions;
var getIndexerSetLocatorWhitelistTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setLocatorWhitelist',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerSetLocatorWhitelistTransactions = getIndexerSetLocatorWhitelistTransactions;
var getIndexerCreateIndexTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'createIndex',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerCreateIndexTransactions = getIndexerCreateIndexTransactions;
var getIndexerAddTokenToBlacklistTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'addTokenToBlacklist',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerAddTokenToBlacklistTransactions = getIndexerAddTokenToBlacklistTransactions;
var getIndexerRemoveTokenFromBlacklistTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'removeTokenFromBlacklist',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerRemoveTokenFromBlacklistTransactions = getIndexerRemoveTokenFromBlacklistTransactions;
var getIndexerSetIntentTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setIntent',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerSetIntentTransactions = getIndexerSetIntentTransactions;
var getIndexerUnsetIntentTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'unsetIntent',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getIndexerUnsetIntentTransactions = getIndexerUnsetIntentTransactions;