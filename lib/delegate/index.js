"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var _require = require('@airswap/order-utils'),
    constants = _require.constants;

var _require2 = require('./contractFunctions'),
    getDelegateGetMaxQuote = _require2.getDelegateGetMaxQuote,
    getDelegateGetSenderSideQuote = _require2.getDelegateGetSenderSideQuote,
    getDelegateGetSignerSideQuote = _require2.getDelegateGetSignerSideQuote;

var bn = require('bignumber.js');

var _require3 = require('../erc20/contractFunctions'),
    getERC20BalanceOf = _require3.getERC20BalanceOf;

var _require4 = require('../swap/utils'),
    nest = _require4.nest;

var ERC20_INTERFACE_ID = constants.ERC20_INTERFACE_ID;

var resolveBigNumbers = require('../utils/resolveBigNumbers');

function format(resp) {
  return nest(reverseObjectMethods(_objectSpread({}, resp, {
    senderKind: ERC20_INTERFACE_ID,
    signerKind: ERC20_INTERFACE_ID,
    senderId: '0',
    signerId: '0'
  })));
}

function toggleMethod(str) {
  if (str.includes('Signer')) {
    return str.replace('Signer', 'Sender');
  } else if (str.includes('Sender')) {
    return str.replace('Sender', 'Signer');
  } else if (str.includes('signer')) {
    return str.replace('signer', 'sender');
  } else if (str.includes('sender')) {
    return str.replace('sender', 'signer');
  } else if (str.includes('Maker')) {
    return str.replace('Maker', 'Taker');
  } else if (str.includes('Taker')) {
    return str.replace('Taker', 'Maker');
  } else if (str.includes('maker')) {
    return str.replace('maker', 'taker');
  } else if (str.includes('taker')) {
    return str.replace('taker', 'maker');
  }

  return str;
}

function reverseObjectMethods(params) {
  return _.mapKeys(params, function (p, k) {
    return toggleMethod(k);
  });
}

function reverseParams(_ref) {
  var method = _ref.method,
      params = _ref.params;
  return {
    method: toggleMethod(method),
    params: reverseObjectMethods(params)
  };
}

function routeDelegateCall(_x, _x2, _x3, _x4) {
  return _routeDelegateCall.apply(this, arguments);
}

function _routeDelegateCall() {
  _routeDelegateCall = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(receiver, request, tradeWallet, signerWallet) {
    var _reverseParams, method, _reverseParams$params, signerToken, senderToken, signerAmount, senderAmount, tradeWalletBalance;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _reverseParams = reverseParams(request), method = _reverseParams.method, _reverseParams$params = _reverseParams.params, signerToken = _reverseParams$params.signerToken, senderToken = _reverseParams$params.senderToken, signerAmount = _reverseParams$params.signerAmount, senderAmount = _reverseParams$params.senderAmount;
            _context.t0 = method;
            _context.next = _context.t0 === 'getSignerSideQuote' ? 4 : _context.t0 === 'getSenderSideQuote' ? 5 : _context.t0 === 'getSignerSideOrder' ? 6 : _context.t0 === 'getSenderSideOrder' ? 7 : _context.t0 === 'getMaxQuote' ? 8 : 12;
            break;

          case 4:
            return _context.abrupt("return", getDelegateGetSignerSideQuote(receiver, senderAmount, senderToken, signerToken).then(function (resp) {
              return format({
                signerToken: signerToken,
                senderToken: senderToken,
                signerAmount: resolveBigNumbers(resp),
                senderAmount: senderAmount
              });
            }));

          case 5:
            return _context.abrupt("return", getDelegateGetSenderSideQuote(receiver, signerAmount, signerToken, senderToken).then(function (resp) {
              return format({
                signerToken: signerToken,
                senderToken: senderToken,
                signerAmount: signerAmount,
                senderAmount: resolveBigNumbers(resp)
              });
            }));

          case 6:
            return _context.abrupt("return", getDelegateGetSignerSideQuote(receiver, senderAmount, senderToken, signerToken).then(function (resp) {
              return format({
                senderWallet: tradeWallet,
                signerWallet: signerWallet,
                signerToken: signerToken,
                senderToken: senderToken,
                signerAmount: resolveBigNumbers(resp),
                senderAmount: senderAmount,
                nonce: "".concat(Date.now())
              });
            }));

          case 7:
            return _context.abrupt("return", getDelegateGetSenderSideQuote(receiver, signerAmount, signerToken, senderToken).then(function (resp) {
              return format({
                senderWallet: tradeWallet,
                signerWallet: signerWallet,
                signerToken: signerToken,
                senderToken: senderToken,
                signerAmount: signerAmount,
                senderAmount: resolveBigNumbers(resp),
                nonce: "".concat(Date.now())
              });
            }));

          case 8:
            _context.next = 10;
            return getERC20BalanceOf(senderToken, tradeWallet);

          case 10:
            tradeWalletBalance = _context.sent.toString();
            return _context.abrupt("return", getDelegateGetMaxQuote(receiver, senderToken, signerToken).then(function (resp) {
              var formattedResp = resolveBigNumbers(resp); // trade wallet has sufficient balance

              if (bn(tradeWalletBalance).gte(formattedResp.senderAmount)) {
                return format({
                  signerToken: signerToken,
                  senderToken: senderToken,
                  senderAmount: formattedResp.senderAmount,
                  signerAmount: formattedResp.signerAmount
                });
              } // trade wallet doesn't have sufficient balance


              var alternativeMaxSenderAmount = tradeWalletBalance; // calculate the price of the maxQuote using the original amount, and multiply it by the alternativeMaxSenderAmount to get the alternativeMaxSignerAmount

              var alternativeMaxSignerAmount = bn(formattedResp.signerAmount).div(formattedResp.senderAmount).mul(alternativeMaxSenderAmount).floor().toString();
              return format({
                signerToken: signerToken,
                senderToken: senderToken,
                senderAmount: alternativeMaxSenderAmount,
                signerAmount: alternativeMaxSignerAmount
              });
            }));

          case 12:
            throw new Error("invalid delegate method name ".concat(method));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _routeDelegateCall.apply(this, arguments);
}

module.exports = {
  routeDelegateCall: routeDelegateCall,
  reverseObjectMethods: reverseObjectMethods
};