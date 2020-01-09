"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

var types = _interopRequireWildcard(require("../../tcombTypes"));

var _constants = require("../../constants");

var _http = require("../../utils/redux/templates/http");

var _redux2 = require("../../api/redux");

var _redux3 = require("../../tokens/redux");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @namespace fiat */
var ethPrices = (0, _http.makeHTTPReducer)('ethPrices');

function currencySymbol() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash.default.first(Object.keys(_constants.FIAT_CURRENCIES));
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_CURRENCY_SYMBOL':
      return types.Currency(action.currencySymbol);

    default:
      return state;
  }
}

var _default = (0, _redux.combineReducers)({
  ethPrices: ethPrices,
  currencySymbol: currencySymbol
});

exports.default = _default;

var getFiat = function getFiat(state) {
  return state.fiat;
};

var _makeHTTPSelectors = (0, _http.makeHTTPSelectors)('ethPrices', 'fiat'),
    getAttemptedGettingEthPrices = _makeHTTPSelectors.getAttemptedGettingEthPrices,
    getGettingEthPrices = _makeHTTPSelectors.getGettingEthPrices,
    getErrorGettingEthPrices = _makeHTTPSelectors.getErrorGettingEthPrices,
    getFetchedEthPrices = _makeHTTPSelectors.getFetchedEthPrices;
/**
 * A selector to get the current currency symbol
 * @function getSelectedCurrencySymbol
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {fiat.currencySymbol}
 */


var getSelectedCurrencySymbol = (0, _reselect.createSelector)(getFiat, function (fiat) {
  return fiat.currencySymbol;
});
var getSelectedCurrencySymbolAscii = (0, _reselect.createSelector)(getSelectedCurrencySymbol, function (symbol) {
  return _constants.FIAT_CURRENCIES[symbol];
});
var makeGetEthInFiat = (0, _reselect.createSelector)(getFetchedEthPrices, getSelectedCurrencySymbol, function (prices, symbol) {
  return function (ethAmount) {
    var price = prices[symbol] ? prices[symbol] : 0;
    return "".concat(_constants.FIAT_CURRENCIES[symbol]).concat((price * Number(ethAmount)).toFixed(2));
  };
});
var makeGetEthInFiatUnsigned = (0, _reselect.createSelector)(getFetchedEthPrices, getSelectedCurrencySymbol, function (prices, symbol) {
  return function (ethAmount) {
    var price = prices[symbol] ? prices[symbol] : 0;
    return "".concat((price * Number(ethAmount)).toFixed(2));
  };
});
/**
 * A selector that returns a function that converts a token amount (ETH included) into a fiat amount priced in the currently selected symbol's (USD is default) value (with currency symbol prepended)
 * @function makeGetTokenInFiatFromDisplayValue
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */

var makeGetTokenInFiatFromDisplayValue = (0, _reselect.createSelector)(_redux2.selectors.getFormattedQuotes, _redux3.selectors.getTokens, makeGetEthInFiat, function (quotes, tokens, getEthInFiat) {
  return function (tokenQuery, amount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) {
      return getEthInFiat(0);
    }

    var priceAverage;

    if (_lodash.default.includes(_constants.ETH_BASE_ADDRESSES, token.address)) {
      // this just allows the function to be overloaded to service ETH & WETH in addition to all other tokens
      priceAverage = 1;
    } else {
      var prices = _lodash.default.map(_lodash.default.filter(quotes, {
        tokenAddress: token.address
      }), 'price');

      if (prices.length === 0) {
        return getEthInFiat(0);
      }

      priceAverage = prices.reduce(function (sum, val) {
        return sum + val;
      }, 0) / prices.length;
    }

    var tokenEthEquivalent = priceAverage * Number(amount);
    return getEthInFiat(tokenEthEquivalent);
  };
});
/**
 * A selector that returns a function that converts a token amount (ETH included) into a fiat amount priced in the currently selected symbol's (USD is default) value (without currency symbol prepended)
 * @function makeGetTokenInFiatFromDisplayValueUnisgned
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */

var makeGetTokenInFiatFromDisplayValueUnisgned = (0, _reselect.createSelector)(_redux2.selectors.getFormattedQuotes, _redux3.selectors.getTokens, makeGetEthInFiatUnsigned, function (quotes, tokens, getEthInFiatUnisigned) {
  return function (tokenQuery, amount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) {
      return getEthInFiatUnisigned(0);
    }

    var priceAverage;

    if (_lodash.default.includes(_constants.ETH_BASE_ADDRESSES, token.address)) {
      // this just allows the function to be overloaded to service ETH & WETH in addition to all other tokens
      priceAverage = 1;
    } else {
      var prices = _lodash.default.map(_lodash.default.filter(quotes, {
        tokenAddress: token.address
      }), 'price');

      if (prices.length === 0) {
        return getEthInFiatUnisigned(0);
      }

      priceAverage = prices.reduce(function (sum, val) {
        return sum + val;
      }, 0) / prices.length;
    }

    var tokenEthEquivalent = priceAverage * Number(amount);
    return getEthInFiatUnisigned(tokenEthEquivalent);
  };
});
/**
 * Same as makeGetTokenInFiatFromDisplayValue but it can take an atomic value and convert it to a display value before converting it to a fiat value
 * @function makeGetTokenInFiatFromAtomicValue
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */

var makeGetTokenInFiatFromAtomicValue = (0, _reselect.createSelector)(makeGetTokenInFiatFromDisplayValue, _redux3.selectors.makeDisplayByToken, function (getTokenInFiatFromDisplayValue, displayByToken) {
  return function (tokenQuery, amount) {
    return getTokenInFiatFromDisplayValue(tokenQuery, displayByToken(tokenQuery, amount));
  };
});
/**
 * Same as makeGetTokenInFiatFromDisplayValueUnisgned but it can take an atomic value and convert it to a display value before converting it to a fiat value
 * @function makeGetTokenInFiatFromAtomicValueUnsigned
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */

var makeGetTokenInFiatFromAtomicValueUnsigned = (0, _reselect.createSelector)(makeGetTokenInFiatFromDisplayValueUnisgned, _redux3.selectors.makeDisplayByToken, function (getTokenInFiatFromDisplayValueUnisgned, displayByToken) {
  return function (tokenQuery, amount) {
    return getTokenInFiatFromDisplayValueUnisgned(tokenQuery, displayByToken(tokenQuery, amount));
  };
});
var selectors = {
  getAttemptedGettingEthPrices: getAttemptedGettingEthPrices,
  getGettingEthPrices: getGettingEthPrices,
  getErrorGettingEthPrices: getErrorGettingEthPrices,
  getFetchedEthPrices: getFetchedEthPrices,
  getSelectedCurrencySymbol: getSelectedCurrencySymbol,
  getSelectedCurrencySymbolAscii: getSelectedCurrencySymbolAscii,
  makeGetEthInFiat: makeGetEthInFiat,
  makeGetTokenInFiatFromDisplayValue: makeGetTokenInFiatFromDisplayValue,
  makeGetTokenInFiatFromAtomicValue: makeGetTokenInFiatFromAtomicValue,
  makeGetEthInFiatUnsigned: makeGetEthInFiatUnsigned,
  makeGetTokenInFiatFromDisplayValueUnisgned: makeGetTokenInFiatFromDisplayValueUnisgned,
  makeGetTokenInFiatFromAtomicValueUnsigned: makeGetTokenInFiatFromAtomicValueUnsigned
};
exports.selectors = selectors;