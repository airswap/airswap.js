"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateSetTradeWalletTransactions = exports.getDelegateProvideOrderTransactions = exports.getDelegateUnsetRuleAndIntentTransactions = exports.getDelegateSetRuleAndIntentTransactions = exports.getDelegateUnsetRuleTransactions = exports.getDelegateSetRuleTransactions = exports.getDelegateTransferOwnershipTransactions = exports.getDelegateRenounceOwnershipTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getDelegateRenounceOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'renounceOwnership',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateRenounceOwnershipTransactions = getDelegateRenounceOwnershipTransactions;
var getDelegateTransferOwnershipTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferOwnership',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateTransferOwnershipTransactions = getDelegateTransferOwnershipTransactions;
var getDelegateSetRuleTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setRule',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateSetRuleTransactions = getDelegateSetRuleTransactions;
var getDelegateUnsetRuleTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'unsetRule',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateUnsetRuleTransactions = getDelegateUnsetRuleTransactions;
var getDelegateSetRuleAndIntentTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setRuleAndIntent',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateSetRuleAndIntentTransactions = getDelegateSetRuleAndIntentTransactions;
var getDelegateUnsetRuleAndIntentTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'unsetRuleAndIntent',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateUnsetRuleAndIntentTransactions = getDelegateUnsetRuleAndIntentTransactions;
var getDelegateProvideOrderTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'provideOrder',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateProvideOrderTransactions = getDelegateProvideOrderTransactions;
var getDelegateSetTradeWalletTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setTradeWallet',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateSetTradeWalletTransactions = getDelegateSetTradeWalletTransactions;