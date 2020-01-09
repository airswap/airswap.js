"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexUnsetLocatorHistoricalFetchStatus = exports.getIndexUnsetLocatorEvents = exports.getIndexSetLocatorHistoricalFetchStatus = exports.getIndexSetLocatorEvents = exports.getIndexOwnershipTransferredHistoricalFetchStatus = exports.getIndexOwnershipTransferredEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getIndexOwnershipTransferredEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
  });
});
exports.getIndexOwnershipTransferredEvents = getIndexOwnershipTransferredEvents;
var getIndexOwnershipTransferredHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexOwnershipTransferred;
  var fetched = fetchedValues.indexOwnershipTransferred;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexOwnershipTransferredHistoricalFetchStatus = getIndexOwnershipTransferredHistoricalFetchStatus;
var getIndexSetLocatorEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x62d8270f77cd1e7351e3e92e7001b363e90eed2ef3394dbd51201ceee3672630'
  });
});
exports.getIndexSetLocatorEvents = getIndexSetLocatorEvents;
var getIndexSetLocatorHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexSetLocator;
  var fetched = fetchedValues.indexSetLocator;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexSetLocatorHistoricalFetchStatus = getIndexSetLocatorHistoricalFetchStatus;
var getIndexUnsetLocatorEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xded788c834b3ea8a384c1495466a3a4a827c378cd9eafe5c159d90291ce01844'
  });
});
exports.getIndexUnsetLocatorEvents = getIndexUnsetLocatorEvents;
var getIndexUnsetLocatorHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.indexUnsetLocator;
  var fetched = fetchedValues.indexUnsetLocator;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getIndexUnsetLocatorHistoricalFetchStatus = getIndexUnsetLocatorHistoricalFetchStatus;