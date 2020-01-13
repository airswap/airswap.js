"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getERC20ApprovalHistoricalFetchStatus = exports.getERC20ApprovalEvents = exports.getERC20TransferHistoricalFetchStatus = exports.getERC20TransferEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getERC20TransferEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  });
});
exports.getERC20TransferEvents = getERC20TransferEvents;
var getERC20TransferHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.ERC20Transfer;
  var fetched = fetchedValues.ERC20Transfer;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getERC20TransferHistoricalFetchStatus = getERC20TransferHistoricalFetchStatus;
var getERC20ApprovalEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
  });
});
exports.getERC20ApprovalEvents = getERC20ApprovalEvents;
var getERC20ApprovalHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.ERC20Approval;
  var fetched = fetchedValues.ERC20Approval;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getERC20ApprovalHistoricalFetchStatus = getERC20ApprovalHistoricalFetchStatus;