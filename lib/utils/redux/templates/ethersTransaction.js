"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEthersTxnContainers = exports.makeEthersTxnSelectors = exports.makeEthersTxnReducer = exports.makeMiddlewareEthersTransactionFn = exports.makeEthersTxnActionTypes = exports.makeEthersTxnActionsCreators = void 0;

var _transformations = require("../../transformations");

var _index = require("../index");

var _constants = require("../../../constants");

var _reducers = require("../../../abis/redux/reducers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ETHERS_TXN_ACTIONS = [{
  action: 'submitting'
}, {
  action: 'errorSubmitting',
  paramsKeys: ['error']
}, {
  action: 'submitted',
  paramsKeys: ['transaction']
}, {
  action: 'mined',
  paramsKeys: ['transactionReceipt']
}, {
  action: 'errorMining',
  paramsKeys: ['error']
}];

var makeEthersTxnActionsCreators = function makeEthersTxnActionsCreators(id) {
  return (0, _index.makeActionCreators)(ETHERS_TXN_ACTIONS, id);
};

exports.makeEthersTxnActionsCreators = makeEthersTxnActionsCreators;

var makeEthersTxnActionTypes = function makeEthersTxnActionTypes(id) {
  return (0, _index.makeActionTypes)(ETHERS_TXN_ACTIONS, id);
};

exports.makeEthersTxnActionTypes = makeEthersTxnActionTypes;

var makeMiddlewareEthersTransactionFn =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(transactionFn, transactionName, store, action) {
    var _makeEthersTxnActions, submitting, errorSubmitting, submitted, mined, errorMining, txn, formattedTxn, abis, parsedInput, minedTxn;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _makeEthersTxnActions = makeEthersTxnActionsCreators(transactionName), submitting = _makeEthersTxnActions.submitting, errorSubmitting = _makeEthersTxnActions.errorSubmitting, submitted = _makeEthersTxnActions.submitted, mined = _makeEthersTxnActions.mined, errorMining = _makeEthersTxnActions.errorMining;
            store.dispatch(submitting());
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
            store.dispatch(errorSubmitting((0, _transformations.formatErrorMessage)(_context.t0)));
            return _context.abrupt("return");

          case 12:
            formattedTxn = (0, _transformations.stringBNValues)(txn);
            abis = (0, _reducers.getAbis)(store.getState());
            parsedInput = (0, _transformations.getParsedInputFromTransaction)(formattedTxn, abis);
            store.dispatch(submitted(_objectSpread({}, formattedTxn, parsedInput, {
              timestamp: Date.now()
            })));
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
            store.dispatch(errorMining((0, _transformations.formatErrorMessage)(_context.t1)));
            return _context.abrupt("return");

          case 26:
            store.dispatch(mined((0, _transformations.stringBNValues)(minedTxn)));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8], [16, 22]]);
  }));

  return function makeMiddlewareEthersTransactionFn(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeMiddlewareEthersTransactionFn = makeMiddlewareEthersTransactionFn;
var ETHERS_TXN_REDUCERS = {
  submitting: {
    defaultState: false,
    switch: {
      submitting: true,
      errorSubmitting: false,
      submitted: false
    }
  },
  errorSubmitting: {
    defaultState: '',
    switch: {
      submitting: '',
      errorSubmitting: function errorSubmitting(_ref2) {
        var error = _ref2.error;
        return error;
      },
      submitted: ''
    }
  },
  mining: {
    defaultState: false,
    switch: {
      submitting: false,
      submitted: true,
      mined: false,
      errorMining: false
    }
  },
  transaction: {
    defaultState: null,
    switch: {
      submitting: null,
      submitted: function submitted(_ref3) {
        var transaction = _ref3.transaction;
        return transaction;
      }
    }
  },
  mined: {
    defaultState: false,
    switch: {
      submitting: false,
      submitted: false,
      mined: true,
      errorMining: false
    }
  },
  transactionReceipt: {
    defaultState: null,
    switch: {
      submitting: null,
      mined: function mined(_ref4) {
        var transactionReceipt = _ref4.transactionReceipt;
        return transactionReceipt;
      }
    }
  },
  errorMining: {
    defaultState: '',
    switch: {
      submitting: '',
      submitted: '',
      mined: '',
      errorMining: function errorMining(_ref5) {
        var error = _ref5.error;
        return error;
      }
    }
  }
};

var makeEthersTxnReducer = function makeEthersTxnReducer(items) {
  return (0, _index.makeReducer)(ETHERS_TXN_REDUCERS, ETHERS_TXN_ACTIONS, items);
};

exports.makeEthersTxnReducer = makeEthersTxnReducer;

var makeEthersTxnSelectors = function makeEthersTxnSelectors(items, statePath) {
  return (0, _index.makeSelectors)(ETHERS_TXN_REDUCERS, items, statePath);
};

exports.makeEthersTxnSelectors = makeEthersTxnSelectors;

var makeEthersTxnContainers = function makeEthersTxnContainers(items, statePath) {
  return (0, _index.makeContainers)(makeEthersTxnSelectors(items, statePath));
};

exports.makeEthersTxnContainers = makeEthersTxnContainers;