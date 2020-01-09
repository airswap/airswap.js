"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getERC721KittyIndexToApproved = exports.getERC721IsApprovedForAll = exports.getERC721GetApproved = exports.getERC721OwnerOf = exports.getERC721BalanceOf = exports.getERC721SupportsInterface = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getCallData = function getCallData(state) {
  return state.callData;
};

var getERC721SupportsInterface = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'supportsInterface',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721SupportsInterface = getERC721SupportsInterface;
var getERC721BalanceOf = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'balanceOf',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721BalanceOf = getERC721BalanceOf;
var getERC721OwnerOf = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'ownerOf',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721OwnerOf = getERC721OwnerOf;
var getERC721GetApproved = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'getApproved',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721GetApproved = getERC721GetApproved;
var getERC721IsApprovedForAll = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'isApprovedForAll',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721IsApprovedForAll = getERC721IsApprovedForAll;
var getERC721KittyIndexToApproved = (0, _reselect.createSelector)(getCallData, function (values) {
  var filteredValues = _lodash.default.filter(values, {
    name: 'kittyIndexToApproved',
    namespace: 'ERC721'
  });

  var sortedValues = _lodash.default.sortBy(filteredValues, 'timestamp').reverse();

  return _lodash.default.uniqBy(sortedValues, function (v) {
    return JSON.stringify(v.parameters);
  });
});
exports.getERC721KittyIndexToApproved = getERC721KittyIndexToApproved;