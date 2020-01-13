"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwapSwapHistoricalFetchStatus = exports.getSwapSwapEvents = exports.getSwapRevokeSignerHistoricalFetchStatus = exports.getSwapRevokeSignerEvents = exports.getSwapRevokeSenderHistoricalFetchStatus = exports.getSwapRevokeSenderEvents = exports.getSwapCancelUpToHistoricalFetchStatus = exports.getSwapCancelUpToEvents = exports.getSwapCancelHistoricalFetchStatus = exports.getSwapCancelEvents = exports.getSwapAuthorizeSignerHistoricalFetchStatus = exports.getSwapAuthorizeSignerEvents = exports.getSwapAuthorizeSenderHistoricalFetchStatus = exports.getSwapAuthorizeSenderEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _constants = _interopRequireDefault(require("../../constants"));

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getSwapAuthorizeSenderEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xbe9299809b40c2eeb1ae326da30a511c24d70cbe3cd4ff384e4839b91de3b325',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapAuthorizeSenderEvents = getSwapAuthorizeSenderEvents;
var getSwapAuthorizeSenderHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapAuthorizeSender;
  var fetched = fetchedValues.swapAuthorizeSender;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapAuthorizeSenderHistoricalFetchStatus = getSwapAuthorizeSenderHistoricalFetchStatus;
var getSwapAuthorizeSignerEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xb9bdd0621c52f9a047fe2a048fa04cdf987438d068ac524be8ea382aa3e94d2c',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapAuthorizeSignerEvents = getSwapAuthorizeSignerEvents;
var getSwapAuthorizeSignerHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapAuthorizeSigner;
  var fetched = fetchedValues.swapAuthorizeSigner;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapAuthorizeSignerHistoricalFetchStatus = getSwapAuthorizeSignerHistoricalFetchStatus;
var getSwapCancelEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapCancelEvents = getSwapCancelEvents;
var getSwapCancelHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapCancel;
  var fetched = fetchedValues.swapCancel;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapCancelHistoricalFetchStatus = getSwapCancelHistoricalFetchStatus;
var getSwapCancelUpToEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x863123978d9b13946753a916c935c0688a01802440d3ffc668d04d2720c4e110',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapCancelUpToEvents = getSwapCancelUpToEvents;
var getSwapCancelUpToHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapCancelUpTo;
  var fetched = fetchedValues.swapCancelUpTo;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapCancelUpToHistoricalFetchStatus = getSwapCancelUpToHistoricalFetchStatus;
var getSwapRevokeSenderEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x92b544a2f54114da47550f9ee5b45cc343e5db8bfd148a7aba43219e33fceccd',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapRevokeSenderEvents = getSwapRevokeSenderEvents;
var getSwapRevokeSenderHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapRevokeSender;
  var fetched = fetchedValues.swapRevokeSender;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapRevokeSenderHistoricalFetchStatus = getSwapRevokeSenderHistoricalFetchStatus;
var getSwapRevokeSignerEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xfe558292b85125b7cf178f3456b09ce2fa79ca4b4fe2d7bb5da670ffecdb765e',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapRevokeSignerEvents = getSwapRevokeSignerEvents;
var getSwapRevokeSignerHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapRevokeSigner;
  var fetched = fetchedValues.swapRevokeSigner;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapRevokeSignerHistoricalFetchStatus = getSwapRevokeSignerHistoricalFetchStatus;
var getSwapSwapEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
    address: _constants.default.SWAP_CONTRACT_ADDRESS
  });
});
exports.getSwapSwapEvents = getSwapSwapEvents;
var getSwapSwapHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.swapSwap;
  var fetched = fetchedValues.swapSwap;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getSwapSwapHistoricalFetchStatus = getSwapSwapHistoricalFetchStatus;