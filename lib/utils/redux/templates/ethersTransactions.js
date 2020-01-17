"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEthersTxnsContainers = exports.makeEthersTxnsSelectors = exports.makeEthersTxnsReducer = exports.makeMiddlewareEthersTransactionsFn = exports.makeEthersTxnsActionTypes = exports.makeEthersTxnsActionsCreators = void 0;

var _transformations = require("../../transformations");

var _index = require("../index");

var _constants = require("../../../constants");

var _revertReason = _interopRequireDefault(require("../../revertReason"));

var _reducers = require("../../../abis/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ETHERS_TXNS_ACTIONS = [{
  action: 'submitting',
  paramsKeys: ['id']
}, {
  action: 'errorSubmitting',
  paramsKeys: ['error', 'id']
}, {
  action: 'submitted',
  paramsKeys: ['transaction', 'id']
}, {
  action: 'mined',
  paramsKeys: ['transactionReceipt', 'id']
}, {
  action: 'errorMining',
  paramsKeys: ['error', 'id', 'transactionReceipt']
}];

var makeEthersTxnsActionsCreators = function makeEthersTxnsActionsCreators(id) {
  return (0, _index.makeActionCreators)(ETHERS_TXNS_ACTIONS, id);
};

exports.makeEthersTxnsActionsCreators = makeEthersTxnsActionsCreators;

var makeEthersTxnsActionTypes = function makeEthersTxnsActionTypes(id) {
  return (0, _index.makeActionTypes)(ETHERS_TXNS_ACTIONS, id);
};

exports.makeEthersTxnsActionTypes = makeEthersTxnsActionTypes;

var makeMiddlewareEthersTransactionsFn =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(transactionFn, transactionName, store, action, uniqueId) {
    var _makeEthersTxnsAction, submitting, errorSubmitting, submitted, mined, errorMining, txn, formattedTxn, abis, parsedInput, minedTxn, formattedMinedTxn, reason;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _makeEthersTxnsAction = makeEthersTxnsActionsCreators(transactionName), submitting = _makeEthersTxnsAction.submitting, errorSubmitting = _makeEthersTxnsAction.errorSubmitting, submitted = _makeEthersTxnsAction.submitted, mined = _makeEthersTxnsAction.mined, errorMining = _makeEthersTxnsAction.errorMining;
            store.dispatch(submitting(uniqueId));
            _context.prev = 2;
            _context.next = 5;
            return transactionFn(store, action);

          case 5:
            txn = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            store.dispatch(errorSubmitting((0, _transformations.formatErrorMessage)(_context.t0), uniqueId));
            return _context.abrupt("return");

          case 12:
            formattedTxn = (0, _transformations.stringBNValues)(txn);
            abis = (0, _reducers.getAbis)(store.getState());
            parsedInput = (0, _transformations.getParsedInputFromTransaction)(formattedTxn, abis);
            store.dispatch(submitted(_objectSpread({}, formattedTxn, parsedInput, {
              timestamp: Date.now()
            }), uniqueId));
            _context.prev = 16;
            _context.next = 19;
            return _constants.httpProvider.waitForTransaction(txn.hash).then(function () {
              return _constants.httpProvider.getTransactionReceipt(txn.hash);
            });

          case 19:
            minedTxn = _context.sent;
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](16);
            store.dispatch(errorMining((0, _transformations.formatErrorMessage)(_context.t1), uniqueId));
            return _context.abrupt("return");

          case 26:
            formattedMinedTxn = (0, _transformations.stringBNValues)(minedTxn);

            if (!(formattedMinedTxn.status === 0)) {
              _context.next = 33;
              break;
            }

            _context.next = 30;
            return (0, _revertReason.default)(formattedMinedTxn.transactionHash);

          case 30:
            reason = _context.sent;
            store.dispatch(errorMining((0, _transformations.formatErrorMessage)(reason) || 'Transaction Failed', uniqueId, _objectSpread({}, formattedMinedTxn, {
              revertReason: reason
            })));
            return _context.abrupt("return");

          case 33:
            store.dispatch(mined(formattedMinedTxn, uniqueId));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8], [16, 22]]);
  }));

  return function makeMiddlewareEthersTransactionsFn(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeMiddlewareEthersTransactionsFn = makeMiddlewareEthersTransactionsFn;
var ETHERS_TXNS_REDUCERS = {
  submitting: {
    defaultState: {},
    switch: {
      submitting: function submitting(_ref2, state) {
        var id = _ref2.id;
        return _objectSpread({}, state, _defineProperty({}, id, true));
      },
      errorSubmitting: function errorSubmitting(_ref3, state) {
        var id = _ref3.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      submitted: function submitted(_ref4, state) {
        var id = _ref4.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      }
    }
  },
  errorSubmitting: {
    defaultState: {},
    switch: {
      submitting: function submitting(_ref5, state) {
        var id = _ref5.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      errorSubmitting: function errorSubmitting(_ref6, state) {
        var error = _ref6.error,
            id = _ref6.id;
        return _objectSpread({}, state, _defineProperty({}, id, error));
      },
      submitted: function submitted(_ref7, state) {
        var id = _ref7.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      }
    }
  },
  mining: {
    defaultState: {},
    switch: {
      submitting: function submitting(_ref8, state) {
        var id = _ref8.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      submitted: function submitted(_ref9, state) {
        var id = _ref9.id;
        return _objectSpread({}, state, _defineProperty({}, id, true));
      },
      mined: function mined(_ref10, state) {
        var id = _ref10.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      errorMining: function errorMining(_ref11, state) {
        var id = _ref11.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      }
    }
  },
  transactions: {
    defaultState: {},
    switch: {
      submitted: function submitted(_ref12, state) {
        var transaction = _ref12.transaction,
            id = _ref12.id;
        return _objectSpread({}, state, _defineProperty({}, id, transaction));
      }
    }
  },
  mined: {
    defaultState: {},
    switch: {
      submitting: function submitting(_ref13, state) {
        var id = _ref13.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      submitted: function submitted(_ref14, state) {
        var id = _ref14.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      },
      mined: function mined(_ref15, state) {
        var id = _ref15.id;
        return _objectSpread({}, state, _defineProperty({}, id, true));
      },
      errorMining: function errorMining(_ref16, state) {
        var id = _ref16.id;
        return _objectSpread({}, state, _defineProperty({}, id, false));
      }
    }
  },
  transactionReceipts: {
    defaultState: {},
    switch: {
      mined: function mined(_ref17, state) {
        var transactionReceipt = _ref17.transactionReceipt,
            id = _ref17.id;
        return _objectSpread({}, state, _defineProperty({}, id, transactionReceipt));
      },
      errorMining: function errorMining(_ref18, state) {
        var transactionReceipt = _ref18.transactionReceipt,
            id = _ref18.id;
        return _objectSpread({}, state, _defineProperty({}, id, transactionReceipt));
      }
    }
  },
  errorMining: {
    defaultState: {},
    switch: {
      submitting: function submitting(_ref19, state) {
        var id = _ref19.id;
        return _objectSpread({}, state, _defineProperty({}, id, ''));
      },
      submitted: function submitted(_ref20, state) {
        var id = _ref20.id;
        return _objectSpread({}, state, _defineProperty({}, id, ''));
      },
      mined: function mined(_ref21, state) {
        var id = _ref21.id;
        return _objectSpread({}, state, _defineProperty({}, id, ''));
      },
      errorMining: function errorMining(_ref22, state) {
        var error = _ref22.error,
            id = _ref22.id;
        return _objectSpread({}, state, _defineProperty({}, id, error));
      }
    }
  }
};

var makeEthersTxnsReducer = function makeEthersTxnsReducer(items) {
  return (0, _index.makeReducer)(ETHERS_TXNS_REDUCERS, ETHERS_TXNS_ACTIONS, items);
};

exports.makeEthersTxnsReducer = makeEthersTxnsReducer;

var makeEthersTxnsSelectors = function makeEthersTxnsSelectors(items, statePath) {
  return (0, _index.makeSelectors)(ETHERS_TXNS_REDUCERS, items, statePath);
};

exports.makeEthersTxnsSelectors = makeEthersTxnsSelectors;

var makeEthersTxnsContainers = function makeEthersTxnsContainers(items, statePath) {
  return (0, _index.makeContainers)(makeEthersTxnsSelectors(items, statePath));
};

exports.makeEthersTxnsContainers = makeEthersTxnsContainers;