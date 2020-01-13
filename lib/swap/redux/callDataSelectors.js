"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwapSignerNonceStatus = exports.getSwapSignerMinimumNonce = exports.getSwapSignerAuthorizations = exports.getSwapSenderAuthorizations = exports.getSwapRegistry = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getSwapRegistry = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'registry',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSwapRegistry = getSwapRegistry;
var getSwapSenderAuthorizations = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'senderAuthorizations',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSwapSenderAuthorizations = getSwapSenderAuthorizations;
var getSwapSignerAuthorizations = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'signerAuthorizations',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSwapSignerAuthorizations = getSwapSignerAuthorizations;
var getSwapSignerMinimumNonce = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'signerMinimumNonce',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSwapSignerMinimumNonce = getSwapSignerMinimumNonce;
var getSwapSignerNonceStatus = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'signerNonceStatus',
    namespace: 'swap'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSwapSignerNonceStatus = getSwapSignerNonceStatus;