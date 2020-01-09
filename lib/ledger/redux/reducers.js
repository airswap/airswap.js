"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.getLedgerPathType = exports.getLedgerIndex = exports.getLedgerState = exports.default = void 0;

var _redux = require("redux");

var _reselect = require("reselect");

function ledgerPathType() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'live';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'SET_LEDGER_PATH_TYPE') {
    return action.pathType;
  }

  return state;
}

function ledgerIndex() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'SET_LEDGER_PATH_TYPE') {
    return action.index;
  }

  return state;
}

var ledger = (0, _redux.combineReducers)({
  pathType: ledgerPathType,
  index: ledgerIndex
});
var _default = ledger;
exports.default = _default;

var getLedgerState = function getLedgerState(state) {
  return state.ledger;
};
/**
 * @function getLedgerIndex
 * @description Index of currently selected ledger path
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {number}
 */


exports.getLedgerState = getLedgerState;
var getLedgerIndex = (0, _reselect.createSelector)(getLedgerState, function (_ref) {
  var index = _ref.index;
  return index;
});
/**
 * @function getLedgerPathType
 * @description Index of currently selected ledger path
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {string}
 */

exports.getLedgerIndex = getLedgerIndex;
var getLedgerPathType = (0, _reselect.createSelector)(getLedgerState, function (_ref2) {
  var pathType = _ref2.pathType;
  return pathType;
});
exports.getLedgerPathType = getLedgerPathType;
var selectors = {
  getLedgerIndex: getLedgerIndex,
  getLedgerPathType: getLedgerPathType
};
exports.selectors = selectors;