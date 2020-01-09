"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeltaBalancesAdmin = exports.getDeltaBalancesAllAllowancesForManyAccounts = exports.getDeltaBalancesAllWETHbalances = exports.getDeltaBalancesTokenAllowance = exports.getDeltaBalancesWalletBalances = exports.getDeltaBalancesWalletAllowances = exports.getDeltaBalancesTokenBalance = exports.getDeltaBalancesAllBalancesForManyAccounts = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getDeltaBalancesAllBalancesForManyAccounts = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'allBalancesForManyAccounts',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesAllBalancesForManyAccounts = getDeltaBalancesAllBalancesForManyAccounts;
var getDeltaBalancesTokenBalance = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'tokenBalance',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesTokenBalance = getDeltaBalancesTokenBalance;
var getDeltaBalancesWalletAllowances = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'walletAllowances',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesWalletAllowances = getDeltaBalancesWalletAllowances;
var getDeltaBalancesWalletBalances = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'walletBalances',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesWalletBalances = getDeltaBalancesWalletBalances;
var getDeltaBalancesTokenAllowance = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'tokenAllowance',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesTokenAllowance = getDeltaBalancesTokenAllowance;
var getDeltaBalancesAllWETHbalances = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'allWETHbalances',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesAllWETHbalances = getDeltaBalancesAllWETHbalances;
var getDeltaBalancesAllAllowancesForManyAccounts = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'allAllowancesForManyAccounts',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesAllAllowancesForManyAccounts = getDeltaBalancesAllAllowancesForManyAccounts;
var getDeltaBalancesAdmin = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'admin',
    namespace: 'deltaBalances'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getDeltaBalancesAdmin = getDeltaBalancesAdmin;