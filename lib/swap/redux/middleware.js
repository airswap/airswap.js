"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walletMiddleware;

var _actions = require("../../wallet/redux/actions");

var _ethersTransactions = require("../../utils/redux/templates/ethersTransactions");

var Swap = _interopRequireWildcard(require("../index"));

var _utils = require("../../swap/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function fillSwap(_x, _x2) {
  return _fillSwap.apply(this, arguments);
}

function _fillSwap() {
  _fillSwap = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store, action) {
    var signer, order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context.sent;
            order = action.order;
            return _context.abrupt("return", Swap.swap(order, signer));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _fillSwap.apply(this, arguments);
}

function cancelSwap(_x3, _x4) {
  return _cancelSwap.apply(this, arguments);
}

function _cancelSwap() {
  _cancelSwap = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(store, action) {
    var signer, order;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context2.sent;
            order = action.order;
            return _context2.abrupt("return", Swap.cancel([order.nonce], signer));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _cancelSwap.apply(this, arguments);
}

function signSwap(_x5, _x6) {
  return _signSwap.apply(this, arguments);
}

function _signSwap() {
  _signSwap = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(store, action) {
    var signer;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context3.sent;

            if (signer.supportsSignTypedData) {
              Swap.signSwapTypedData(action, signer).then(function (order) {
                action.resolve(order);
              }).catch(function (err) {
                action.reject(err);
              });
            } else {
              Swap.signSwap(action, signer).then(function (order) {
                action.resolve(order);
              }).catch(function (err) {
                action.reject(err);
              });
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _signSwap.apply(this, arguments);
}

function walletMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FILL_SWAP':
          (0, _ethersTransactions.makeMiddlewareEthersTransactionsFn)(fillSwap, 'fillSwap', store, action, (0, _utils.getSwapOrderId)(action.order));
          break;

        case 'CANCEL_SWAP':
          (0, _ethersTransactions.makeMiddlewareEthersTransactionsFn)(cancelSwap, 'cancelSwap', store, action, (0, _utils.getSwapOrderId)(action.order));
          break;

        case 'SIGN_SWAP':
          signSwap(store, action);
          break;

        default:
      }

      return next(action);
    };
  };
}