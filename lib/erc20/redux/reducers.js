"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _redux = require("redux");

var _ethersTransactions = require("../../utils/redux/templates/ethersTransactions");

var approveToken = (0, _ethersTransactions.makeEthersTxnsReducer)('approveToken');
var wrapWeth = (0, _ethersTransactions.makeEthersTxnsReducer)('wrapWeth');
var unwrapWeth = (0, _ethersTransactions.makeEthersTxnsReducer)('unwrapWeth');

var _default = (0, _redux.combineReducers)({
  approveToken: approveToken,
  wrapWeth: wrapWeth,
  unwrapWeth: unwrapWeth
});

exports.default = _default;

var _makeEthersTxnsSelect = (0, _ethersTransactions.makeEthersTxnsSelectors)('approveToken', 'erc20'),
    getSubmittingApproveToken = _makeEthersTxnsSelect.getSubmittingApproveToken,
    getErrorSubmittingApproveToken = _makeEthersTxnsSelect.getErrorSubmittingApproveToken,
    getMiningApproveToken = _makeEthersTxnsSelect.getMiningApproveToken,
    getTransactionsApproveToken = _makeEthersTxnsSelect.getTransactionsApproveToken,
    getMinedApproveToken = _makeEthersTxnsSelect.getMinedApproveToken,
    getTransactionReceiptsApproveToken = _makeEthersTxnsSelect.getTransactionReceiptsApproveToken,
    getErrorMiningApproveToken = _makeEthersTxnsSelect.getErrorMiningApproveToken;

var _makeEthersTxnsSelect2 = (0, _ethersTransactions.makeEthersTxnsSelectors)('wrapWeth', 'erc20'),
    getSubmittingWrapWeth = _makeEthersTxnsSelect2.getSubmittingWrapWeth,
    getErrorSubmittingWrapWeth = _makeEthersTxnsSelect2.getErrorSubmittingWrapWeth,
    getMiningWrapWeth = _makeEthersTxnsSelect2.getMiningWrapWeth,
    getTransactionsWrapWeth = _makeEthersTxnsSelect2.getTransactionsWrapWeth,
    getMinedWrapWeth = _makeEthersTxnsSelect2.getMinedWrapWeth,
    getTransactionReceiptsWrapWeth = _makeEthersTxnsSelect2.getTransactionReceiptsWrapWeth,
    getErrorMiningWrapWeth = _makeEthersTxnsSelect2.getErrorMiningWrapWeth;

var _makeEthersTxnsSelect3 = (0, _ethersTransactions.makeEthersTxnsSelectors)('unwrapWeth', 'erc20'),
    getSubmittingUnwrapWeth = _makeEthersTxnsSelect3.getSubmittingUnwrapWeth,
    getErrorSubmittingUnwrapWeth = _makeEthersTxnsSelect3.getErrorSubmittingUnwrapWeth,
    getMiningUnwrapWeth = _makeEthersTxnsSelect3.getMiningUnwrapWeth,
    getTransactionsUnwrapWeth = _makeEthersTxnsSelect3.getTransactionsUnwrapWeth,
    getMinedUnwrapWeth = _makeEthersTxnsSelect3.getMinedUnwrapWeth,
    getTransactionReceiptsUnwrapWeth = _makeEthersTxnsSelect3.getTransactionReceiptsUnwrapWeth,
    getErrorMiningUnwrapWeth = _makeEthersTxnsSelect3.getErrorMiningUnwrapWeth;

var selectors = {
  getSubmittingApproveToken: getSubmittingApproveToken,
  getErrorSubmittingApproveToken: getErrorSubmittingApproveToken,
  getMiningApproveToken: getMiningApproveToken,
  getTransactionsApproveToken: getTransactionsApproveToken,
  getMinedApproveToken: getMinedApproveToken,
  getTransactionReceiptsApproveToken: getTransactionReceiptsApproveToken,
  getErrorMiningApproveToken: getErrorMiningApproveToken,
  getSubmittingWrapWeth: getSubmittingWrapWeth,
  getErrorSubmittingWrapWeth: getErrorSubmittingWrapWeth,
  getMiningWrapWeth: getMiningWrapWeth,
  getTransactionsWrapWeth: getTransactionsWrapWeth,
  getMinedWrapWeth: getMinedWrapWeth,
  getTransactionReceiptsWrapWeth: getTransactionReceiptsWrapWeth,
  getErrorMiningWrapWeth: getErrorMiningWrapWeth,
  getSubmittingUnwrapWeth: getSubmittingUnwrapWeth,
  getErrorSubmittingUnwrapWeth: getErrorSubmittingUnwrapWeth,
  getMiningUnwrapWeth: getMiningUnwrapWeth,
  getTransactionsUnwrapWeth: getTransactionsUnwrapWeth,
  getMinedUnwrapWeth: getMinedUnwrapWeth,
  getTransactionReceiptsUnwrapWeth: getTransactionReceiptsUnwrapWeth,
  getErrorMiningUnwrapWeth: getErrorMiningUnwrapWeth
};
exports.selectors = selectors;