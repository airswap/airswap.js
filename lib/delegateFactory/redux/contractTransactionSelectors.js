"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateFactoryCreateDelegateTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getDelegateFactoryCreateDelegateTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'createDelegate',
    namespace: 'delegateFactory'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getDelegateFactoryCreateDelegateTransactions = getDelegateFactoryCreateDelegateTransactions;