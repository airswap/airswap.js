"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateUnsetRuleHistoricalFetchStatus = exports.getDelegateUnsetRuleEvents = exports.getDelegateSetRuleHistoricalFetchStatus = exports.getDelegateSetRuleEvents = exports.getDelegateProvideOrderHistoricalFetchStatus = exports.getDelegateProvideOrderEvents = exports.getDelegateOwnershipTransferredHistoricalFetchStatus = exports.getDelegateOwnershipTransferredEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getDelegateOwnershipTransferredEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
  });
});
exports.getDelegateOwnershipTransferredEvents = getDelegateOwnershipTransferredEvents;
var getDelegateOwnershipTransferredHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.delegateOwnershipTransferred;
  var fetched = fetchedValues.delegateOwnershipTransferred;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getDelegateOwnershipTransferredHistoricalFetchStatus = getDelegateOwnershipTransferredHistoricalFetchStatus;
var getDelegateProvideOrderEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x0189daca1660a5f26ed6b6d45a91d45b31911dc06e9f69c24838beac4b3f502d'
  });
});
exports.getDelegateProvideOrderEvents = getDelegateProvideOrderEvents;
var getDelegateProvideOrderHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.delegateProvideOrder;
  var fetched = fetchedValues.delegateProvideOrder;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getDelegateProvideOrderHistoricalFetchStatus = getDelegateProvideOrderHistoricalFetchStatus;
var getDelegateSetRuleEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e'
  });
});
exports.getDelegateSetRuleEvents = getDelegateSetRuleEvents;
var getDelegateSetRuleHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.delegateSetRule;
  var fetched = fetchedValues.delegateSetRule;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getDelegateSetRuleHistoricalFetchStatus = getDelegateSetRuleHistoricalFetchStatus;
var getDelegateUnsetRuleEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98'
  });
});
exports.getDelegateUnsetRuleEvents = getDelegateUnsetRuleEvents;
var getDelegateUnsetRuleHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.delegateUnsetRule;
  var fetched = fetchedValues.delegateUnsetRule;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getDelegateUnsetRuleHistoricalFetchStatus = getDelegateUnsetRuleHistoricalFetchStatus;