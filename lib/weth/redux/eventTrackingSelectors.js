"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWethWithdrawalHistoricalFetchStatus = exports.getWethWithdrawalEvents = exports.getWethDepositHistoricalFetchStatus = exports.getWethDepositEvents = exports.getWethTransferHistoricalFetchStatus = exports.getWethTransferEvents = exports.getWethApprovalHistoricalFetchStatus = exports.getWethApprovalEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _constants = _interopRequireDefault(require("../../constants"));

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getWethApprovalEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    address: _constants.default.WETH_CONTRACT_ADDRESS
  });
});
exports.getWethApprovalEvents = getWethApprovalEvents;
var getWethApprovalHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.wethApproval;
  var fetched = fetchedValues.wethApproval;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getWethApprovalHistoricalFetchStatus = getWethApprovalHistoricalFetchStatus;
var getWethTransferEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    address: _constants.default.WETH_CONTRACT_ADDRESS
  });
});
exports.getWethTransferEvents = getWethTransferEvents;
var getWethTransferHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.wethTransfer;
  var fetched = fetchedValues.wethTransfer;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getWethTransferHistoricalFetchStatus = getWethTransferHistoricalFetchStatus;
var getWethDepositEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
    address: _constants.default.WETH_CONTRACT_ADDRESS
  });
});
exports.getWethDepositEvents = getWethDepositEvents;
var getWethDepositHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.wethDeposit;
  var fetched = fetchedValues.wethDeposit;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getWethDepositHistoricalFetchStatus = getWethDepositHistoricalFetchStatus;
var getWethWithdrawalEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65',
    address: _constants.default.WETH_CONTRACT_ADDRESS
  });
});
exports.getWethWithdrawalEvents = getWethWithdrawalEvents;
var getWethWithdrawalHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.wethWithdrawal;
  var fetched = fetchedValues.wethWithdrawal;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getWethWithdrawalHistoricalFetchStatus = getWethWithdrawalHistoricalFetchStatus;