"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walletMiddleware;

var _uuid = _interopRequireDefault(require("uuid4"));

var _actions = require("../../wallet/redux/actions");

var _ethersTransactions = require("../../utils/redux/templates/ethersTransactions");

var ERC20 = _interopRequireWildcard(require("../index"));

var _actions2 = require("../../deltaBalances/redux/actions");

var _eventTrackingActions = require("./eventTrackingActions");

var _constants = require("../../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function approveToken(_x, _x2) {
  return _approveToken.apply(this, arguments);
}

function _approveToken() {
  _approveToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store, action) {
    var signer, tokenAddress, spender;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context.sent;
            tokenAddress = action.tokenAddress, spender = action.spender;
            return _context.abrupt("return", ERC20.approveToken(tokenAddress, spender, signer));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _approveToken.apply(this, arguments);
}

function wrapWeth(_x3, _x4) {
  return _wrapWeth.apply(this, arguments);
}

function _wrapWeth() {
  _wrapWeth = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(store, action) {
    var signer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context2.sent;
            return _context2.abrupt("return", ERC20.wrapWeth(action.amount, signer));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _wrapWeth.apply(this, arguments);
}

function unwrapWeth(_x5, _x6) {
  return _unwrapWeth.apply(this, arguments);
}

function _unwrapWeth() {
  _unwrapWeth = _asyncToGenerator(
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
            return _context3.abrupt("return", ERC20.unwrapWeth(action.amount, signer));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _unwrapWeth.apply(this, arguments);
}

function walletMiddleware(store) {
  return function (next) {
    return function (action) {
      next(action);

      switch (action.type) {
        case 'CONNECTED_WALLET':
          store.dispatch((0, _eventTrackingActions.trackERC20Approval)({
            owner: action.address.toLowerCase(),
            fromBlock: _constants.SWAP_CONTRACT_DEPLOY_BLOCK
          }));
          break;

        case 'APPROVE_TOKEN':
          (0, _ethersTransactions.makeMiddlewareEthersTransactionsFn)(approveToken, 'approveToken', store, action, action.tokenAddress);
          break;

        case (0, _ethersTransactions.makeEthersTxnsActionTypes)('approveToken').mined:
          store.dispatch((0, _actions2.getAllAllowancesForConnectedAddress)());
          break;

        case 'WRAP_WETH':
          (0, _ethersTransactions.makeMiddlewareEthersTransactionsFn)(wrapWeth, 'wrapWeth', store, action, (0, _uuid.default)());
          break;

        case 'UNWRAP_WETH':
          (0, _ethersTransactions.makeMiddlewareEthersTransactionsFn)(unwrapWeth, 'unwrapWeth', store, action, (0, _uuid.default)());
          break;

        default:
      }
    };
  };
}