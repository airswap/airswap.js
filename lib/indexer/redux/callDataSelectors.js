"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexerGetStakedAmount = exports.getIndexerGetLocators = exports.getIndexerTokenBlacklist = exports.getIndexerStakingToken = exports.getIndexerOwner = exports.getIndexerLocatorWhitelists = exports.getIndexerIsOwner = exports.getIndexerIndexes = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getIndexerIndexes = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'indexes',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerIndexes = getIndexerIndexes;
var getIndexerIsOwner = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'isOwner',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerIsOwner = getIndexerIsOwner;
var getIndexerLocatorWhitelists = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'locatorWhitelists',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerLocatorWhitelists = getIndexerLocatorWhitelists;
var getIndexerOwner = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'owner',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerOwner = getIndexerOwner;
var getIndexerStakingToken = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'stakingToken',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerStakingToken = getIndexerStakingToken;
var getIndexerTokenBlacklist = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'tokenBlacklist',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerTokenBlacklist = getIndexerTokenBlacklist;
var getIndexerGetLocators = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getLocators',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerGetLocators = getIndexerGetLocators;
var getIndexerGetStakedAmount = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getStakedAmount',
    namespace: 'indexer'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getIndexerGetStakedAmount = getIndexerGetStakedAmount;