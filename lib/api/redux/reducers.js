"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

var _http = require("../../utils/redux/templates/http");

var _redux2 = require("../../tokens/redux");

var _transformations = require("../../utils/transformations");

var _selectors = require("../../swapLegacy/redux/selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @namespace api */
var connectedUsers = (0, _http.makeHTTPReducer)('connectedUsers');
var indexerIntents = (0, _http.makeHTTPReducer)('indexerIntents');
var quotes = (0, _http.makeHTTPReducer)('quotes');
var maxQuotes = (0, _http.makeHTTPReducer)('maxQuotes');

var _default = (0, _redux.combineReducers)({
  connectedUsers: connectedUsers,
  indexerIntents: indexerIntents,
  quotes: quotes,
  maxQuotes: maxQuotes
});

exports.default = _default;

var _makeHTTPSelectors = (0, _http.makeHTTPSelectors)('quotes', 'api'),
    getAttemptedGettingQuotes = _makeHTTPSelectors.getAttemptedGettingQuotes,
    getGettingQuotes = _makeHTTPSelectors.getGettingQuotes,
    getErrorGettingQuotes = _makeHTTPSelectors.getErrorGettingQuotes,
    getFetchedQuotes = _makeHTTPSelectors.getFetchedQuotes;

var _makeHTTPSelectors2 = (0, _http.makeHTTPSelectors)('maxQuotes', 'api'),
    getAttemptedGettingMaxQuotes = _makeHTTPSelectors2.getAttemptedGettingMaxQuotes,
    getGettingMaxQuotes = _makeHTTPSelectors2.getGettingMaxQuotes,
    getErrorGettingMaxQuotes = _makeHTTPSelectors2.getErrorGettingMaxQuotes,
    getFetchedMaxQuotes = _makeHTTPSelectors2.getFetchedMaxQuotes;

var _makeHTTPSelectors3 = (0, _http.makeHTTPSelectors)('connectedUsers', 'api'),
    getAttemptedGettingConnectedUsers = _makeHTTPSelectors3.getAttemptedGettingConnectedUsers,
    getGettingConnectedUsers = _makeHTTPSelectors3.getGettingConnectedUsers,
    getErrorGettingConnectedUsers = _makeHTTPSelectors3.getErrorGettingConnectedUsers,
    getFetchedConnectedUsers = _makeHTTPSelectors3.getFetchedConnectedUsers;

var _makeHTTPSelectors4 = (0, _http.makeHTTPSelectors)('indexerIntents', 'api'),
    getAttemptedGettingIndexerIntents = _makeHTTPSelectors4.getAttemptedGettingIndexerIntents,
    getGettingIndexerIntents = _makeHTTPSelectors4.getGettingIndexerIntents,
    getErrorGettingIndexerIntents = _makeHTTPSelectors4.getErrorGettingIndexerIntents,
    getFetchedIndexerIntents = _makeHTTPSelectors4.getFetchedIndexerIntents;
/*
 the /intents endpoint groups intents kind of strangly, where they are grouped by arrays of maker addresses
 this selector groups them like a normal array of intents like [{ makerAddress, makerToken, takerToken }...]
 */


var getIndexerIntents = (0, _reselect.createSelector)(getFetchedIndexerIntents, function (intents) {
  return intents;
});
var getMaxQuotes = (0, _reselect.createSelector)(getFetchedMaxQuotes, function (qs) {
  return qs.map(function (quote) {
    return quote.response;
  });
});
var getFormattedQuotes = (0, _reselect.createSelector)(getFetchedQuotes, _redux2.selectors.makeGetReadableOrder, function (qs, getReadableOrder) {
  return qs.map(function (quote) {
    return quote.response;
  }).map(_transformations.lowerCaseStringsInObject).map(getReadableOrder);
});
/**
 * @function makeGetHighestPriceByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the highest available price (number) for that token pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): string}
 */

var makeGetHighestPriceByTokenPair = (0, _reselect.createSelector)(getFormattedQuotes, function (formattedQuotes) {
  return function (_ref) {
    var makerToken = _ref.makerToken,
        takerToken = _ref.takerToken;

    var filteredQuotes = _lodash.default.filter(formattedQuotes, {
      makerToken: makerToken,
      takerToken: takerToken
    });

    var highest = _lodash.default.first(_lodash.default.sortBy(filteredQuotes, 'price'));

    return _lodash.default.get(highest, 'price', 0);
  };
});
/**
 * @function makeGetLowestPriceByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the lowest available price (number) for that token pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): string}
 */

var makeGetLowestPriceByTokenPair = (0, _reselect.createSelector)(getFormattedQuotes, function (formattedQuotes) {
  return function (_ref2) {
    var makerToken = _ref2.makerToken,
        takerToken = _ref2.takerToken;

    var filteredQuotes = _lodash.default.filter(formattedQuotes, {
      makerToken: makerToken,
      takerToken: takerToken
    });

    var lowest = _lodash.default.last(_lodash.default.sortBy(filteredQuotes, 'price'));

    return _lodash.default.get(lowest, 'price', 0);
  };
});
/**
 * @function makeGet24HourVolumeByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the 24 Hour Volume (number) for that pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */

var makeGet24HourVolumeByTokenPair = (0, _reselect.createSelector)(_selectors.getFormattedExchangeFills24Hour, function (events) {
  return function (_ref3) {
    var makerToken = _ref3.makerToken,
        takerToken = _ref3.takerToken;

    var filteredEvents = _lodash.default.filter(events, {
      makerToken: makerToken,
      takerToken: takerToken
    });

    return _lodash.default.reduce(filteredEvents, function (sum, val) {
      return sum + val.ethAmount;
    }, 0);
  };
});
/**
 * @function makeGet24HourTradesByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the # of trades that occurred in the past 24 hours for that pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */

var makeGet24HourTradesByTokenPair = (0, _reselect.createSelector)(_selectors.getFormattedExchangeFills24Hour, function (events) {
  return function (_ref4) {
    var makerToken = _ref4.makerToken,
        takerToken = _ref4.takerToken;

    var filteredEvents = _lodash.default.filter(events, {
      makerToken: makerToken,
      takerToken: takerToken
    });

    return filteredEvents.length;
  };
});
var selectors = {
  getAttemptedGettingConnectedUsers: getAttemptedGettingConnectedUsers,
  getGettingConnectedUsers: getGettingConnectedUsers,
  getErrorGettingConnectedUsers: getErrorGettingConnectedUsers,
  getFetchedConnectedUsers: getFetchedConnectedUsers,
  getAttemptedGettingIndexerIntents: getAttemptedGettingIndexerIntents,
  getGettingIndexerIntents: getGettingIndexerIntents,
  getErrorGettingIndexerIntents: getErrorGettingIndexerIntents,
  getFetchedIndexerIntents: getFetchedIndexerIntents,
  getIndexerIntents: getIndexerIntents,
  getAttemptedGettingQuotes: getAttemptedGettingQuotes,
  getGettingQuotes: getGettingQuotes,
  getErrorGettingQuotes: getErrorGettingQuotes,
  getFetchedQuotes: getFetchedQuotes,
  getAttemptedGettingMaxQuotes: getAttemptedGettingMaxQuotes,
  getGettingMaxQuotes: getGettingMaxQuotes,
  getErrorGettingMaxQuotes: getErrorGettingMaxQuotes,
  getFetchedMaxQuotes: getFetchedMaxQuotes,
  makeGetHighestPriceByTokenPair: makeGetHighestPriceByTokenPair,
  makeGetLowestPriceByTokenPair: makeGetLowestPriceByTokenPair,
  makeGet24HourVolumeByTokenPair: makeGet24HourVolumeByTokenPair,
  makeGet24HourTradesByTokenPair: makeGet24HourTradesByTokenPair,
  getFormattedQuotes: getFormattedQuotes,
  getMaxQuotes: getMaxQuotes
};
exports.selectors = selectors;