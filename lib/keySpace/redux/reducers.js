"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectors = void 0;

var _reselect = require("reselect");

var _reducers = require("../../wallet/redux/reducers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  initializingKeyspace: false,
  signedSeed: {}
};

var keySpace = function keySpace() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_SIGNED_SEED':
      return _objectSpread({}, state, {
        signedSeed: _objectSpread({}, state.signedSeed, _defineProperty({}, action.address, action.signedSeed))
      });

    case 'INITIALIZE_KEYSPACE':
      return _objectSpread({}, state, {
        initializingKeyspace: true
      });

    case 'KEYSPACE_READY':
      return _objectSpread({}, state, {
        initializingKeyspace: false
      });

    case 'KEYSPACE_INIT_ERROR':
      return _objectSpread({}, state, {
        initializingKeyspace: false
      });

    default:
      return state;
  }
};

var getKeySpace = function getKeySpace(state) {
  return state.keySpace;
};

var getSignedSeed = (0, _reselect.createSelector)(getKeySpace, _reducers.getConnectedWalletAddress, function (Ks, address) {
  return Ks.signedSeed[address];
});
/**
 * @function getIsInitializingKeyspace
 * @description The currently connected wallet type
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletType}
 */

var getIsInitializingKeyspace = (0, _reselect.createSelector)(getKeySpace, function (_ref) {
  var initializingKeyspace = _ref.initializingKeyspace;
  return initializingKeyspace;
});
var selectors = {
  getSignedSeed: getSignedSeed,
  getIsInitializingKeyspace: getIsInitializingKeyspace
};
exports.selectors = selectors;
var _default = keySpace;
exports.default = _default;