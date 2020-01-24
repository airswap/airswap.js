"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSecuritizePreTransferCheck = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getSecuritizePreTransferCheck = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'preTransferCheck',
    namespace: 'securitize'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getSecuritizePreTransferCheck = getSecuritizePreTransferCheck;