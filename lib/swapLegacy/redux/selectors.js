"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get24HourLargestTrade = exports.get24HourVolume = exports.getFormattedExchangeFills24Hour = exports.getFormattedExchangeFailures = exports.getFormattedExchangeCancels = exports.getFormattedExchangeFills = void 0;

var dateFns = _interopRequireWildcard(require("date-fns"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../tokens/redux/reducers");

var _redux = require("../../blockTracker/redux");

var _transformations = require("../../utils/transformations");

var _eventTrackingSelectors = require("./eventTrackingSelectors");

var _redux2 = require("../../swap/redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @typedef {Object} FillEvent a fill that occurred on the AirSwap exchange contract, queried as a log from Geth
 * @memberof events
 * @property transactionHash {string}
 * @property makerAddress {string}
 * @property makerAmount {string}
 * @property makerToken {string}
 * @property takerAddress {string}
 * @property takerAmount {string}
 * @property takerToken {string}
 * @property expiration {string}
 * @property nonce {string}
 * @property takerAmountFormatted {number}
 * @property makerAmountFormatted {number}
 * @property takerSymbol {string}
 * @property makerSymbol {string}
 * @property ethAmount {number}
 * @property tokenSymbol {string}
 * @property tokenAddress {string}
 * @property timestamp {number}
 */

/**
 * Returns a feed of fills from the last 20,000 blocks, with new fills appended to the array in real time (if there are any in a new on each new block).
 * @function getFormattedExchangeFills
 * @memberof events
 * @param state Redux store state
 * @returns {events.FillEvent[]}
 */
var getFormattedExchangeFills = (0, _reselect.createSelector)(_eventTrackingSelectors.getFetchedSwapLegacyFilled, _reducers.makeGetReadableOrder, _redux.selectors.getBlocks, function (events, getReadableOrder, blockObj) {
  return events.map(function (_ref) {
    var transactionHash = _ref.transactionHash,
        blockNumber = _ref.blockNumber,
        values = _ref.values;
    return _objectSpread({
      transactionHash: transactionHash
    }, getReadableOrder(values), {
      timestamp: _lodash.default.get(blockObj, "".concat(blockNumber, ".timestamp"))
    });
  });
});
exports.getFormattedExchangeFills = getFormattedExchangeFills;
var getFormattedExchangeCancels = (0, _reselect.createSelector)(_eventTrackingSelectors.getFetchedSwapLegacyCanceled, _reducers.makeGetReadableOrder, _redux.selectors.getBlocks, function (events, getReadableOrder, blockObj) {
  return events.map(function (_ref2) {
    var transactionHash = _ref2.transactionHash,
        blockNumber = _ref2.blockNumber,
        values = _ref2.values;
    return _objectSpread({
      transactionHash: transactionHash
    }, getReadableOrder(values), {
      timestamp: _lodash.default.get(blockObj, "".concat(blockNumber, ".timestamp"))
    });
  });
});
exports.getFormattedExchangeCancels = getFormattedExchangeCancels;
var getFormattedExchangeFailures = (0, _reselect.createSelector)(_eventTrackingSelectors.getFetchedSwapLegacyFailed, _reducers.makeGetReadableOrder, _redux.selectors.getBlocks, function (events, getReadableOrder, blockObj) {
  return events.map(function (_ref3) {
    var transactionHash = _ref3.transactionHash,
        blockNumber = _ref3.blockNumber,
        values = _ref3.values;
    return _objectSpread({
      transactionHash: transactionHash
    }, getReadableOrder(values), {
      timestamp: _lodash.default.get(blockObj, "".concat(blockNumber, ".timestamp")),
      reason: (0, _transformations.parseTransactionFailureEventCode)(Number(values.code))
    });
  });
});
/**
 * Returns a feed of fills from the last 24 Hours, with new fills appended to the array in real time (if there are any in a new on each new block).
 * @function getFormattedExchangeFills24Hour
 * @memberof events
 * @param state Redux store state
 * @returns {events.FillEvent[]}
 */

exports.getFormattedExchangeFailures = getFormattedExchangeFailures;
var getFormattedExchangeFills24Hour = (0, _reselect.createSelector)(getFormattedExchangeFills, _redux2.selectors.getFormattedSwapFills, function (swapLegacyFills, swapFills) {
  var events = [].concat(_toConsumableArray(swapLegacyFills), _toConsumableArray(swapFills));
  var timeStamp24Hour = Number(dateFns.format(dateFns.subDays(new Date(), 1), 'X'));

  var _$partition = _lodash.default.partition(events, function (t) {
    return t.timestamp > timeStamp24Hour;
  }),
      _$partition2 = _slicedToArray(_$partition, 1),
      events24Hour = _$partition2[0];

  return _lodash.default.filter(events24Hour, function (_ref4) {
    var tokenSymbol = _ref4.tokenSymbol;
    return !!tokenSymbol;
  }); // this filter removes non-weth/eth trades
});
exports.getFormattedExchangeFills24Hour = getFormattedExchangeFills24Hour;
var get24HourVolume = (0, _reselect.createSelector)(_reducers.makeParseByToken, getFormattedExchangeFills24Hour, function (parseByToken, fills) {
  return parseByToken({
    symbol: 'ETH'
  }, _lodash.default.reduce(fills, function (sum, val) {
    return sum + val.ethAmount;
  }, 0));
});
exports.get24HourVolume = get24HourVolume;
var get24HourLargestTrade = (0, _reselect.createSelector)(getFormattedExchangeFills24Hour, function (fills) {
  return _lodash.default.reduce(fills, function (largest, val) {
    return val.ethAmount > largest.ethAmount ? val : largest;
  }, _lodash.default.first(fills));
});
exports.get24HourLargestTrade = get24HourLargestTrade;