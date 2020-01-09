"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateGetMaxQuote = exports.getDelegateGetSenderSideQuote = exports.getDelegateGetSignerSideQuote = exports.getDelegateTradeWallet = exports.getDelegateSwapContract = exports.getDelegateRules = exports.getDelegateProtocol = exports.getDelegateOwner = exports.getDelegateIsOwner = exports.getDelegateIndexer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getDelegateIndexer = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'indexer',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateIndexer = getDelegateIndexer;
var getDelegateIsOwner = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'isOwner',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateIsOwner = getDelegateIsOwner;
var getDelegateOwner = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'owner',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateOwner = getDelegateOwner;
var getDelegateProtocol = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'protocol',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateProtocol = getDelegateProtocol;
var getDelegateRules = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'rules',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateRules = getDelegateRules;
var getDelegateSwapContract = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'swapContract',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateSwapContract = getDelegateSwapContract;
var getDelegateTradeWallet = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'tradeWallet',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateTradeWallet = getDelegateTradeWallet;
var getDelegateGetSignerSideQuote = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getSignerSideQuote',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateGetSignerSideQuote = getDelegateGetSignerSideQuote;
var getDelegateGetSenderSideQuote = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getSenderSideQuote',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateGetSenderSideQuote = getDelegateGetSenderSideQuote;
var getDelegateGetMaxQuote = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getMaxQuote',
    namespace: 'delegate'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateGetMaxQuote = getDelegateGetMaxQuote;