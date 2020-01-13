"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateFactoryHas = exports.getDelegateFactorySwapContract = exports.getDelegateFactoryProtocol = exports.getDelegateFactoryIndexerContract = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getDelegateFactoryIndexerContract = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'indexerContract',
    namespace: 'delegateFactory'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateFactoryIndexerContract = getDelegateFactoryIndexerContract;
var getDelegateFactoryProtocol = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'protocol',
    namespace: 'delegateFactory'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateFactoryProtocol = getDelegateFactoryProtocol;
var getDelegateFactorySwapContract = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'swapContract',
    namespace: 'delegateFactory'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateFactorySwapContract = getDelegateFactorySwapContract;
var getDelegateFactoryHas = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'has',
    namespace: 'delegateFactory'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDelegateFactoryHas = getDelegateFactoryHas;