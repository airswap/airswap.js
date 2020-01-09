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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @namespace gas */
var gasData = (0, _http.makeHTTPReducer)('gasData');

function gasLevel() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lodash.default.first(_constants.GAS_LEVELS);
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_GAS_LEVEL':
      return types.gasLevel(action.level);

    default:
      return state;
  }
}

var _default = (0, _redux.combineReducers)({
  gasData: gasData,
  gasLevel: gasLevel
});

exports.default = _default;

var _makeHTTPSelectors = (0, _http.makeHTTPSelectors)('gasData', 'gas'),
    getAttemptedGettingGasData = _makeHTTPSelectors.getAttemptedGettingGasData,
    getGettingGasData = _makeHTTPSelectors.getGettingGasData,
    getErrorGettingGasData = _makeHTTPSelectors.getErrorGettingGasData,
    getFetchedGasData = _makeHTTPSelectors.getFetchedGasData;

var getGas = function getGas(state) {
  return state.gas;
};
/**
 * A selector to get the current gas level, which must be one of the four levels returned by Eth Gas Station, defaults to 'fast'
 * @function getGasLevel
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {('fast'|'fastest'|'safeLow'|'average')}
 */


var getGasLevel = (0, _reselect.createSelector)(getGas, function (gas) {
  return gas.gasLevel;
});
/**
 * @typedef {Object} GasPrices
 * @memberof gas
 * @property {number} fast
 * @property {number} fastest
 * @property {number} safeLow
 * @property {number} average
 */

/**
 * A selector to get the current gas prices (in gwei) for all levels
 * @function getAllGasGweiPrices
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {gas.GasPrices}
 */

var getAllGasGweiPrices = (0, _reselect.createSelector)(getGasLevel, getFetchedGasData, function (level, data) {
  if (_lodash.default.isEmpty(data)) {
    return {};
  }

  return _lodash.default.mapValues(_lodash.default.pick(data, _constants.GAS_LEVELS), function (v) {
    return Number(v) / 10;
  }); // for some reason the API returns gwei * 10, so we have to adjust it back down
});
/**
 * @typedef {Object} GasWaitTimes
 * @memberof gas
 * @property {number} fastWait
 * @property {number} fastestWait
 * @property {number} safeLowWait
 * @property {number} averageWait
 */

/**
 * A selector to get the current gas wait times (in seconds) for all levels
 * @function getAllGasGweiPrices
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {gas.GasWaitTimes}
 */

var getAllGasWaitTimesInSeconds = (0, _reselect.createSelector)(getGasLevel, getFetchedGasData, function (level, data) {
  if (_lodash.default.isEmpty(data)) {
    return {};
  }

  return _lodash.default.mapValues(_lodash.default.pick(data, _lodash.default.map(_constants.GAS_LEVELS, function (l) {
    return "".concat(l, "Wait");
  })), function (v) {
    return Number(v) * 60;
  });
});
var getCurrentGasPriceSettings = (0, _reselect.createSelector)(getGasLevel, getFetchedGasData, function (level, data) {
  if (_lodash.default.isEmpty(data)) {
    return {};
  }

  var gwei = data[level] / 10; // for some reason the API returns gwei * 10, so we have to adjust it back down

  var waitInSeconds = data["".concat(level, "Wait")] * 60;
  return {
    gwei: gwei,
    waitInSeconds: waitInSeconds
  };
});
var selectors = {
  getAttemptedGettingGasData: getAttemptedGettingGasData,
  getGettingGasData: getGettingGasData,
  getErrorGettingGasData: getErrorGettingGasData,
  getFetchedGasData: getFetchedGasData,
  getGasLevel: getGasLevel,
  getCurrentGasPriceSettings: getCurrentGasPriceSettings,
  getAllGasGweiPrices: getAllGasGweiPrices,
  getAllGasWaitTimesInSeconds: getAllGasWaitTimesInSeconds
};
exports.selectors = selectors;