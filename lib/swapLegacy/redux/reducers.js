"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _redux = require("redux");

var _ethersTransactions = require("../../utils/redux/templates/ethersTransactions");

var fillOrder = (0, _ethersTransactions.makeEthersTxnsReducer)('fillOrder');
var cancelOrder = (0, _ethersTransactions.makeEthersTxnsReducer)('cancelOrder');

var _default = (0, _redux.combineReducers)({
  fillOrder: fillOrder,
  cancelOrder: cancelOrder
});

exports.default = _default;

var _makeEthersTxnsSelect = (0, _ethersTransactions.makeEthersTxnsSelectors)('fillOrder', 'swapLegacy'),
    getSubmittingFillOrder = _makeEthersTxnsSelect.getSubmittingFillOrder,
    getErrorSubmittingFillOrder = _makeEthersTxnsSelect.getErrorSubmittingFillOrder,
    getMiningFillOrder = _makeEthersTxnsSelect.getMiningFillOrder,
    getTransactionsFillOrder = _makeEthersTxnsSelect.getTransactionsFillOrder,
    getMinedFillOrder = _makeEthersTxnsSelect.getMinedFillOrder,
    getTransactionReceiptsFillOrder = _makeEthersTxnsSelect.getTransactionReceiptsFillOrder,
    getErrorMiningFillOrder = _makeEthersTxnsSelect.getErrorMiningFillOrder;

var _makeEthersTxnsSelect2 = (0, _ethersTransactions.makeEthersTxnsSelectors)('cancelOrder', 'swapLegacy'),
    getSubmittingCancelOrder = _makeEthersTxnsSelect2.getSubmittingCancelOrder,
    getErrorSubmittingCancelOrder = _makeEthersTxnsSelect2.getErrorSubmittingCancelOrder,
    getMiningCancelOrder = _makeEthersTxnsSelect2.getMiningCancelOrder,
    getTransactionsCancelOrder = _makeEthersTxnsSelect2.getTransactionsCancelOrder,
    getMinedCancelOrder = _makeEthersTxnsSelect2.getMinedCancelOrder,
    getTransactionReceiptsCancelOrder = _makeEthersTxnsSelect2.getTransactionReceiptsCancelOrder,
    getErrorMiningCancelOrder = _makeEthersTxnsSelect2.getErrorMiningCancelOrder;

var selectors = {
  getSubmittingFillOrder: getSubmittingFillOrder,
  getErrorSubmittingFillOrder: getErrorSubmittingFillOrder,
  getMiningFillOrder: getMiningFillOrder,
  getTransactionsFillOrder: getTransactionsFillOrder,
  getMinedFillOrder: getMinedFillOrder,
  getTransactionReceiptsFillOrder: getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder: getErrorMiningFillOrder,
  getSubmittingCancelOrder: getSubmittingCancelOrder,
  getErrorSubmittingCancelOrder: getErrorSubmittingCancelOrder,
  getMiningCancelOrder: getMiningCancelOrder,
  getTransactionsCancelOrder: getTransactionsCancelOrder,
  getMinedCancelOrder: getMinedCancelOrder,
  getTransactionReceiptsCancelOrder: getTransactionReceiptsCancelOrder,
  getErrorMiningCancelOrder: getErrorMiningCancelOrder
};
exports.selectors = selectors;