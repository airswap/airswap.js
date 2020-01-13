"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getERC721ApprovalForAllHistoricalFetchStatus = exports.getERC721ApprovalForAllEvents = exports.getERC721ApprovalHistoricalFetchStatus = exports.getERC721ApprovalEvents = exports.getERC721TransferHistoricalFetchStatus = exports.getERC721TransferEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getERC721TransferEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  });
});
exports.getERC721TransferEvents = getERC721TransferEvents;
var getERC721TransferHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.ERC721Transfer;
  var fetched = fetchedValues.ERC721Transfer;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getERC721TransferHistoricalFetchStatus = getERC721TransferHistoricalFetchStatus;
var getERC721ApprovalEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
  });
});
exports.getERC721ApprovalEvents = getERC721ApprovalEvents;
var getERC721ApprovalHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.ERC721Approval;
  var fetched = fetchedValues.ERC721Approval;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getERC721ApprovalHistoricalFetchStatus = getERC721ApprovalHistoricalFetchStatus;
var getERC721ApprovalForAllEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
  });
});
exports.getERC721ApprovalForAllEvents = getERC721ApprovalForAllEvents;
var getERC721ApprovalForAllHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.ERC721ApprovalForAll;
  var fetched = fetchedValues.ERC721ApprovalForAll;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getERC721ApprovalForAllHistoricalFetchStatus = getERC721ApprovalForAllHistoricalFetchStatus;