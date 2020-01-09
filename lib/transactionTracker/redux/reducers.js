"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transactionInitialState = {
  submitting: true,
  errorSubmitting: '',
  mining: false,
  transaction: undefined,
  mined: false,
  transactionReceipt: undefined,
  errorMining: ''
};

function transactions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SUBMITTING_TRANSACTION':
      return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, transactionInitialState, {
        id: action.id,
        namespace: action.namespace,
        name: action.name,
        parameters: action.parameters
      })));

    case 'ERROR_SUBMITTING_TRANSACTION':
      return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, state[action.id], {
        submitting: false,
        errorSubmitting: action.error
      })));

    case 'SUBMITTED_TRANSACTION':
      return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, state[action.id], {
        submitting: false,
        mining: true,
        transaction: action.transaction
      })));

    case 'MINED_TRANSACTION':
      return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, state[action.id], {
        mining: false,
        mined: true,
        transactionReceipt: action.transactionReceipt
      })));

    case 'ERROR_MINING_TRANSACTION':
      return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, state[action.id], {
        transactionReceipt: action.transactionReceipt,
        errorMining: action.error,
        mining: false,
        mined: true
      })));

    default:
      return state;
  }
}

var _default = transactions;
exports.default = _default;

var getTransactionTracker = function getTransactionTracker(state) {
  return state.transactionTracker;
};

var getTransactions = (0, _reselect.createSelector)(getTransactionTracker, function (t) {
  return _lodash.default.values(t);
});
var selectors = {
  getTransactions: getTransactions
};
exports.selectors = selectors;