"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexerUnstakeHistoricalFetchStatus = exports.getIndexerUnstakeEvents = exports.getIndexerStakeHistoricalFetchStatus = exports.getIndexerStakeEvents = exports.getIndexerRemoveTokenFromBlacklistHistoricalFetchStatus = exports.getIndexerRemoveTokenFromBlacklistEvents = exports.getIndexerOwnershipTransferredHistoricalFetchStatus = exports.getIndexerOwnershipTransferredEvents = exports.getIndexerCreateIndexHistoricalFetchStatus = exports.getIndexerCreateIndexEvents = exports.getIndexerAddTokenToBlacklistHistoricalFetchStatus = exports.getIndexerAddTokenToBlacklistEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _constants = _interopRequireDefault(require("../../constants"));

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getIndexerAddTokenToBlacklistEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xe53b519de693da0496205f0705fa49c937a9045cb26b6f67711cd22051955401',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerAddTokenToBlacklistEvents = getIndexerAddTokenToBlacklistEvents;
var getIndexerAddTokenToBlacklistHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerAddTokenToBlacklist;
  var fetched = fetchedValues.indexerAddTokenToBlacklist;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerAddTokenToBlacklistHistoricalFetchStatus = getIndexerAddTokenToBlacklistHistoricalFetchStatus;
var getIndexerCreateIndexEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x7a28ddb7cee538734c8afbb914e80f6fa30503635c435868db561163b5a7e84b',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerCreateIndexEvents = getIndexerCreateIndexEvents;
var getIndexerCreateIndexHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerCreateIndex;
  var fetched = fetchedValues.indexerCreateIndex;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerCreateIndexHistoricalFetchStatus = getIndexerCreateIndexHistoricalFetchStatus;
var getIndexerOwnershipTransferredEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerOwnershipTransferredEvents = getIndexerOwnershipTransferredEvents;
var getIndexerOwnershipTransferredHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerOwnershipTransferred;
  var fetched = fetchedValues.indexerOwnershipTransferred;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerOwnershipTransferredHistoricalFetchStatus = getIndexerOwnershipTransferredHistoricalFetchStatus;
var getIndexerRemoveTokenFromBlacklistEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xa1f26e166f408721b7578234199103d95e0aea4308d683b2f6c0ec86ac9e9e73',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerRemoveTokenFromBlacklistEvents = getIndexerRemoveTokenFromBlacklistEvents;
var getIndexerRemoveTokenFromBlacklistHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerRemoveTokenFromBlacklist;
  var fetched = fetchedValues.indexerRemoveTokenFromBlacklist;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerRemoveTokenFromBlacklistHistoricalFetchStatus = getIndexerRemoveTokenFromBlacklistHistoricalFetchStatus;
var getIndexerStakeEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x5065254984dfd953a97f48da9330ed3a61d8bc8cd2df88176b58f99d3ce81c3e',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerStakeEvents = getIndexerStakeEvents;
var getIndexerStakeHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerStake;
  var fetched = fetchedValues.indexerStake;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerStakeHistoricalFetchStatus = getIndexerStakeHistoricalFetchStatus;
var getIndexerUnstakeEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x71735c1604645e893048a8e669bd75b5c1829b76fe6bd5a6cc0f2ac86eca6ff6',
    address: _constants.default.INDEXER_CONTRACT_ADDRESS
  });
});
exports.getIndexerUnstakeEvents = getIndexerUnstakeEvents;
var getIndexerUnstakeHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexerUnstake;
  var fetched = fetchedValues.indexerUnstake;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexerUnstakeHistoricalFetchStatus = getIndexerUnstakeHistoricalFetchStatus;