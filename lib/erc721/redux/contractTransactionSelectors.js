"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getERC721SafeTransferFromTransactions = exports.getERC721SetApprovalForAllTransactions = exports.getERC721ApproveTransactions = exports.getERC721TransferFromTransactions = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _redux = require("../../transactionTracker/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getTransactions = _redux.selectors.getTransactions;
var getERC721TransferFromTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'transferFrom',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC721TransferFromTransactions = getERC721TransferFromTransactions;
var getERC721ApproveTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'approve',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC721ApproveTransactions = getERC721ApproveTransactions;
var getERC721SetApprovalForAllTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'setApprovalForAll',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC721SetApprovalForAllTransactions = getERC721SetApprovalForAllTransactions;
var getERC721SafeTransferFromTransactions = (0, _reselect.createSelector)(getTransactions, function (transactions) {
  var filteredValues = _lodash.default.filter(transactions, {
    name: 'safeTransferFrom',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'id');

  return sortedValues;
});
exports.getERC721SafeTransferFromTransactions = getERC721SafeTransferFromTransactions;