"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.getIsLoadingConnectedSwapApprovals = exports.getConnectedSwapApprovals = exports.getIsLoadingConnectedApprovals = exports.getConnectedApprovals = exports.getSwapApprovals = exports.getApprovals = exports.getConnectedBalancesInFiatUnisgned = exports.getConnectedBalancesInFiat = exports.getConnectedBalancesFormatted = exports.getConnectedBalances = exports.getBalancesFormatted = exports.getBalances = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

var _reducers = require("../../wallet/redux/reducers");

var _redux2 = require("../../tokens/redux");

var _redux3 = require("../../fiat/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var defaultState = {}; // REDUCER DEFINITION

function balancesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GOT_TOKEN_BALANCES':
      return _lodash.default.merge({}, state, action.balances);

    default:
      return state;
  }
}

function approvalsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GOT_TOKEN_ALLOWANCES':
      return _lodash.default.merge({}, state, action.approvals);

    default:
      return state;
  }
}

function swapApprovalsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GOT_SWAP_TOKEN_ALLOWANCES':
      return _lodash.default.merge({}, state, action.approvals);

    default:
      return state;
  }
}

function trackedAddressesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_TRACKED_ADDRESS':
      return _lodash.default.uniqBy([].concat(_toConsumableArray(state), [{
        address: action.address,
        tokenAddress: action.tokenAddress
      }]), function (_ref) {
        var address = _ref.address,
            tokenAddress = _ref.tokenAddress;
        return "".concat(address).concat(tokenAddress);
      });

    case 'ADD_TRACKED_ADDRESSES':
      return _lodash.default.uniqBy([].concat(_toConsumableArray(state), _toConsumableArray(action.trackedAddresses)), function (_ref2) {
        var address = _ref2.address,
            tokenAddress = _ref2.tokenAddress;
        return "".concat(address).concat(tokenAddress);
      });

    default:
      return state;
  }
}

var _default = (0, _redux.combineReducers)({
  balances: balancesReducer,
  approvals: approvalsReducer,
  swapApprovals: swapApprovalsReducer,
  trackedAddresses: trackedAddressesReducer
});

exports.default = _default;

var getBalances = function getBalances(state) {
  return state.deltaBalances.balances;
};

exports.getBalances = getBalances;
var getBalancesFormatted = (0, _reselect.createSelector)(getBalances, _redux2.selectors.makeDisplayByToken, function (balances, displayByToken) {
  return _lodash.default.mapValues(balances, function (addressBalances) {
    return _lodash.default.mapValues(addressBalances, function (balance, address) {
      return displayByToken({
        address: address
      }, balance);
    });
  });
});
exports.getBalancesFormatted = getBalancesFormatted;
var getConnectedBalances = (0, _reselect.createSelector)(getBalances, _reducers.getConnectedWalletAddress, function (balances, address) {
  return balances[address] || {};
});
exports.getConnectedBalances = getConnectedBalances;
var getConnectedBalancesFormatted = (0, _reselect.createSelector)(getConnectedBalances, _redux2.selectors.makeDisplayByToken, function (balances, displayByToken) {
  return _lodash.default.mapValues(balances, function (balance, address) {
    return displayByToken({
      address: address
    }, balance);
  });
});
/**
 * Returns the fiat string representation of all connected balances, ex: {[tokenAddress]: '$12.45'}
 * @function getConnectedBalancesInFiat
 * @memberof deltaBalances
 * @param {Object} state Redux store state
 * @returns {Object}
 */

exports.getConnectedBalancesFormatted = getConnectedBalancesFormatted;
var getConnectedBalancesInFiat = (0, _reselect.createSelector)(getConnectedBalancesFormatted, _redux3.selectors.makeGetTokenInFiatFromDisplayValue, function (balances, getTokenInFiatFromDisplayValue) {
  return _lodash.default.mapValues(balances, function (balance, address) {
    return getTokenInFiatFromDisplayValue({
      address: address
    }, balance);
  });
});
/**
 * Returns the unsigned fiat string representation of all connected balances, ex: {[tokenAddress]: '12.45'}
 * @function getConnectedBalancesInFiatUnisgned
 * @memberof deltaBalances
 * @param {Object} state Redux store state
 * @returns {Object}
 */

exports.getConnectedBalancesInFiat = getConnectedBalancesInFiat;
var getConnectedBalancesInFiatUnisgned = (0, _reselect.createSelector)(getConnectedBalancesInFiat, _redux3.selectors.getSelectedCurrencySymbolAscii, function (balances, symbol) {
  return _lodash.default.mapValues(balances, function (balance) {
    return Number(_lodash.default.trimStart(balance, symbol));
  });
});
exports.getConnectedBalancesInFiatUnisgned = getConnectedBalancesInFiatUnisgned;

var getApprovals = function getApprovals(state) {
  return state.deltaBalances.approvals;
};

exports.getApprovals = getApprovals;

var getSwapApprovals = function getSwapApprovals(state) {
  return state.deltaBalances.swapApprovals;
};

exports.getSwapApprovals = getSwapApprovals;
var getConnectedApprovals = (0, _reselect.createSelector)(getApprovals, _reducers.getConnectedWalletAddress, function (approvals, address) {
  return approvals[address];
});
exports.getConnectedApprovals = getConnectedApprovals;
var getIsLoadingConnectedApprovals = (0, _reselect.createSelector)(getConnectedApprovals, function (approvals) {
  return _lodash.default.isUndefined(approvals);
});
exports.getIsLoadingConnectedApprovals = getIsLoadingConnectedApprovals;
var getConnectedSwapApprovals = (0, _reselect.createSelector)(getSwapApprovals, _reducers.getConnectedWalletAddress, function (approvals, address) {
  return approvals[address];
});
exports.getConnectedSwapApprovals = getConnectedSwapApprovals;
var getIsLoadingConnectedSwapApprovals = (0, _reselect.createSelector)(getConnectedSwapApprovals, function (approvals) {
  return _lodash.default.isUndefined(approvals);
});
exports.getIsLoadingConnectedSwapApprovals = getIsLoadingConnectedSwapApprovals;

var getTrackedAddresses = function getTrackedAddresses(state) {
  return state.deltaBalances.trackedAddresses;
};

var getTrackedTokensByAddress = (0, _reselect.createSelector)(getTrackedAddresses, function (trackedAddresses) {
  return _lodash.default.reduce(trackedAddresses, function (obj, _ref3) {
    var address = _ref3.address,
        tokenAddress = _ref3.tokenAddress;

    if (_lodash.default.isArray(obj[address])) {
      obj[address] = _lodash.default.uniq([].concat(_toConsumableArray(obj[address]), [tokenAddress])); // eslint-disable-line
    } else {
      obj[address] = [tokenAddress]; // eslint-disable-line
    }

    return obj;
  }, {});
});
var getTrackedWalletAddresses = (0, _reselect.createSelector)(getTrackedTokensByAddress, function (trackedAddresses) {
  return _lodash.default.keys(trackedAddresses);
});
var selectors = {
  getBalances: getBalances,
  getBalancesFormatted: getBalancesFormatted,
  getConnectedBalances: getConnectedBalances,
  getConnectedBalancesFormatted: getConnectedBalancesFormatted,
  getApprovals: getApprovals,
  getConnectedApprovals: getConnectedApprovals,
  getSwapApprovals: getSwapApprovals,
  getConnectedSwapApprovals: getConnectedSwapApprovals,
  getConnectedBalancesInFiat: getConnectedBalancesInFiat,
  getConnectedBalancesInFiatUnisgned: getConnectedBalancesInFiatUnisgned,
  getTrackedAddresses: getTrackedAddresses,
  getTrackedTokensByAddress: getTrackedTokensByAddress,
  getTrackedWalletAddresses: getTrackedWalletAddresses,
  getIsLoadingConnectedApprovals: getIsLoadingConnectedApprovals,
  getIsLoadingConnectedSwapApprovals: getIsLoadingConnectedSwapApprovals
};
exports.selectors = selectors;