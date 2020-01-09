"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectors = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  isDoingLookup: false,
  isReady: false,
  error: null,
  nameToAddressMap: {},
  addressToNameMap: {}
};

var ens = function ens() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ENS_READY':
      return _objectSpread({}, state, {
        isReady: true
      });

    case 'FIND_ADDRESS_BY_ENS_NAME':
      return _objectSpread({}, state, {
        isDoingLookup: true
      });

    case 'FIND_ENS_NAME_BY_ADDRESS':
      return _objectSpread({}, state, {
        isDoingLookup: true
      });

    case 'ENS_LOOKUP_ERROR':
      return _objectSpread({}, state, {
        error: action.error,
        isDoingLookup: false
      });

    case 'ENS_LOOKUP_SUCCESS':
      return _objectSpread({}, state, {
        nameToAddressMap: _objectSpread({}, state.nameToAddressMap, _defineProperty({}, action.ensName, action.address)),
        addressToNameMap: _objectSpread({}, state.addressToNameMap, _defineProperty({}, action.address, action.ensName)),
        error: null,
        isDoingLookup: false
      });

    default:
      return state;
  }
};

var getIsENSReady = function getIsENSReady(state) {
  return state.ens.isReady;
};

var getIsDoingENSLookup = function getIsDoingENSLookup(state) {
  return state.ens.isDoingLookup;
};

var getENSError = function getENSError(state) {
  return state.ens.error;
};

var getENSNamesByAddress = function getENSNamesByAddress(state) {
  return state.ens.addressToNameMap;
};

var getENSAddressesByName = function getENSAddressesByName(state) {
  return state.ens.nameToAddressMap;
};

var selectors = {
  getIsENSReady: getIsENSReady,
  getIsDoingENSLookup: getIsDoingENSLookup,
  getENSError: getENSError,
  getENSNamesByAddress: getENSNamesByAddress,
  getENSAddressesByName: getENSAddressesByName
};
exports.selectors = selectors;
var _default = ens;
exports.default = _default;