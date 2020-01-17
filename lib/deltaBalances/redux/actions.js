"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTrackedAddresses = exports.addTrackedAddress = exports.getTokenAllowancesForConnectedAddress = exports.getAllAllowancesForConnectedAddress = exports.getTokenBalancesForConnectedAddress = exports.getAllBalancesForConnectedAddress = void 0;

var getAllBalancesForConnectedAddress = function getAllBalancesForConnectedAddress(address) {
  return {
    type: 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS',
    address: address
  };
};

exports.getAllBalancesForConnectedAddress = getAllBalancesForConnectedAddress;

var getTokenBalancesForConnectedAddress = function getTokenBalancesForConnectedAddress(tokens) {
  return {
    type: 'GET_TOKEN_BALANCES_FOR_CONNECTED_ADDRESS',
    tokens: tokens
  };
};

exports.getTokenBalancesForConnectedAddress = getTokenBalancesForConnectedAddress;

var getAllAllowancesForConnectedAddress = function getAllAllowancesForConnectedAddress(address) {
  return {
    type: 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS',
    address: address
  };
};

exports.getAllAllowancesForConnectedAddress = getAllAllowancesForConnectedAddress;

var getTokenAllowancesForConnectedAddress = function getTokenAllowancesForConnectedAddress(tokens) {
  return {
    type: 'GET_TOKEN_ALLOWANCES_FOR_CONNECTED_ADDRESS',
    tokens: tokens
  };
};

exports.getTokenAllowancesForConnectedAddress = getTokenAllowancesForConnectedAddress;

var addTrackedAddress = function addTrackedAddress(_ref) {
  var address = _ref.address,
      tokenAddress = _ref.tokenAddress;
  return {
    type: 'ADD_TRACKED_ADDRESS',
    address: address,
    tokenAddress: tokenAddress
  };
};

exports.addTrackedAddress = addTrackedAddress;

var addTrackedAddresses = function addTrackedAddresses(trackedAddresses) {
  return {
    type: 'ADD_TRACKED_ADDRESSES',
    trackedAddresses: trackedAddresses
  };
};

exports.addTrackedAddresses = addTrackedAddresses;