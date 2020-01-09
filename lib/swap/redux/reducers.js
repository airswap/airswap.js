"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _redux = require("redux");

var _ethersTransactions = require("../../utils/redux/templates/ethersTransactions");

// import { createSelector } from 'reselect'
// import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
var fillSwapSimple = (0, _ethersTransactions.makeEthersTxnsReducer)('fillSwapSimple');
var fillSwap = (0, _ethersTransactions.makeEthersTxnsReducer)('fillSwap');
var cancelSwap = (0, _ethersTransactions.makeEthersTxnsReducer)('cancelSwap');

var _default = (0, _redux.combineReducers)({
  fillSwapSimple: fillSwapSimple,
  fillSwap: fillSwap,
  cancelSwap: cancelSwap
});

exports.default = _default;

var _makeEthersTxnsSelect = (0, _ethersTransactions.makeEthersTxnsSelectors)('fillSwapSimple', 'swap'),
    getSubmittingFillSwapSimple = _makeEthersTxnsSelect.getSubmittingFillSwapSimple,
    getErrorSubmittingFillSwapSimple = _makeEthersTxnsSelect.getErrorSubmittingFillSwapSimple,
    getMiningFillSwapSimple = _makeEthersTxnsSelect.getMiningFillSwapSimple,
    getTransactionsFillSwapSimple = _makeEthersTxnsSelect.getTransactionsFillSwapSimple,
    getMinedFillSwapSimple = _makeEthersTxnsSelect.getMinedFillSwapSimple,
    getTransactionReceiptsFillSwapSimple = _makeEthersTxnsSelect.getTransactionReceiptsFillSwapSimple,
    getErrorMiningFillSwapSimple = _makeEthersTxnsSelect.getErrorMiningFillSwapSimple;

var _makeEthersTxnsSelect2 = (0, _ethersTransactions.makeEthersTxnsSelectors)('fillSwap', 'swap'),
    getSubmittingFillSwap = _makeEthersTxnsSelect2.getSubmittingFillSwap,
    getErrorSubmittingFillSwap = _makeEthersTxnsSelect2.getErrorSubmittingFillSwap,
    getMiningFillSwap = _makeEthersTxnsSelect2.getMiningFillSwap,
    getTransactionsFillSwap = _makeEthersTxnsSelect2.getTransactionsFillSwap,
    getMinedFillSwap = _makeEthersTxnsSelect2.getMinedFillSwap,
    getTransactionReceiptsFillSwap = _makeEthersTxnsSelect2.getTransactionReceiptsFillSwap,
    getErrorMiningFillSwap = _makeEthersTxnsSelect2.getErrorMiningFillSwap;

var _makeEthersTxnsSelect3 = (0, _ethersTransactions.makeEthersTxnsSelectors)('cancelSwap', 'swap'),
    getSubmittingCancelSwap = _makeEthersTxnsSelect3.getSubmittingCancelSwap,
    getErrorSubmittingCancelSwap = _makeEthersTxnsSelect3.getErrorSubmittingCancelSwap,
    getMiningCancelSwap = _makeEthersTxnsSelect3.getMiningCancelSwap,
    getTransactionsCancelSwap = _makeEthersTxnsSelect3.getTransactionsCancelSwap,
    getMinedCancelSwap = _makeEthersTxnsSelect3.getMinedCancelSwap,
    getTransactionReceiptsCancelSwap = _makeEthersTxnsSelect3.getTransactionReceiptsCancelSwap,
    getErrorMiningCancelSwap = _makeEthersTxnsSelect3.getErrorMiningCancelSwap;

var selectors = {
  getSubmittingFillSwapSimple: getSubmittingFillSwapSimple,
  getErrorSubmittingFillSwapSimple: getErrorSubmittingFillSwapSimple,
  getMiningFillSwapSimple: getMiningFillSwapSimple,
  getTransactionsFillSwapSimple: getTransactionsFillSwapSimple,
  getMinedFillSwapSimple: getMinedFillSwapSimple,
  getTransactionReceiptsFillSwapSimple: getTransactionReceiptsFillSwapSimple,
  getErrorMiningFillSwapSimple: getErrorMiningFillSwapSimple,
  getSubmittingFillSwap: getSubmittingFillSwap,
  getErrorSubmittingFillSwap: getErrorSubmittingFillSwap,
  getMiningFillSwap: getMiningFillSwap,
  getTransactionsFillSwap: getTransactionsFillSwap,
  getMinedFillSwap: getMinedFillSwap,
  getTransactionReceiptsFillSwap: getTransactionReceiptsFillSwap,
  getErrorMiningFillSwap: getErrorMiningFillSwap,
  getSubmittingCancelSwap: getSubmittingCancelSwap,
  getErrorSubmittingCancelSwap: getErrorSubmittingCancelSwap,
  getMiningCancelSwap: getMiningCancelSwap,
  getTransactionsCancelSwap: getTransactionsCancelSwap,
  getMinedCancelSwap: getMinedCancelSwap,
  getTransactionReceiptsCancelSwap: getTransactionReceiptsCancelSwap,
  getErrorMiningCancelSwap: getErrorMiningCancelSwap
};
exports.selectors = selectors;