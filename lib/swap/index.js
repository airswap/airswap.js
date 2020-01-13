"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var ethers = require('ethers');

var _require = require('@airswap/order-utils'),
    getOrderHash = _require.hashes.getOrderHash,
    constants = _require.constants;

var _require2 = require('./utils'),
    nest = _require2.nest,
    mapNested20OrderTo22Order = _require2.mapNested20OrderTo22Order;

var _require3 = require('../constants'),
    SWAP_CONTRACT_ADDRESS = _require3.SWAP_CONTRACT_ADDRESS,
    abis = _require3.abis;

var removeFalsey = function removeFalsey(obj) {
  return _.pickBy(obj, _.identity);
};

var fillOrderDefaults = function fillOrderDefaults(signerAddress, _ref) {
  var expiry = _ref.expiry,
      nonce = _ref.nonce,
      signer = _ref.signer,
      sender = _ref.sender,
      affiliate = _ref.affiliate;
  var defaultExpiry = expiry || Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour in the future if not specified

  var defaultNonce = nonce || Date.now();
  return {
    expiry: "".concat(defaultExpiry),
    nonce: "".concat(defaultNonce),
    signer: _objectSpread({}, constants.defaults.Party, {
      wallet: signerAddress
    }, removeFalsey(signer)),
    sender: _objectSpread({}, constants.defaults.Party, removeFalsey(sender)),
    affiliate: _objectSpread({}, constants.defaults.Party, removeFalsey(affiliate))
  };
};

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer);
}

function swap(_x, _x2) {
  return _swap.apply(this, arguments);
}

function _swap() {
  _swap = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orderParams, signer) {
    var order, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order = orderParams;

            if (order.makerToken || order.signerToken) {
              // order is flat
              order = nest(order);
            } // now order is nested


            if (order.maker) {
              // order is in 2.0 format and we need to map to 2.2 format
              order = mapNested20OrderTo22Order(order);
            } // now order is in nested 2.2 format


            order.signature.v = Number(order.signature.v);
            contract = getSwapContract(signer);
            return _context.abrupt("return", contract.swap(order));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _swap.apply(this, arguments);
}

function signSwap(_x3, _x4) {
  return _signSwap.apply(this, arguments);
}

function _signSwap() {
  _signSwap = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(orderParams, signer) {
    var signerAddress, order, orderHashHex, signedMsg, sig, r, s, v, signedOrder;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return signer.getAddress();

          case 2:
            signerAddress = _context2.sent;
            order = fillOrderDefaults(signerAddress, mapNested20OrderTo22Order(orderParams, true));
            orderHashHex = getOrderHash(order, SWAP_CONTRACT_ADDRESS);
            _context2.next = 7;
            return signer.signMessage(ethers.utils.arrayify(orderHashHex));

          case 7:
            signedMsg = _context2.sent;
            sig = ethers.utils.splitSignature(signedMsg);
            r = sig.r, s = sig.s, v = sig.v;
            signedOrder = _objectSpread({}, order, {
              signature: {
                signatory: signerAddress.toLowerCase(),
                // Version 0x45: personal_sign
                version: constants.signatures.PERSONAL_SIGN,
                validator: SWAP_CONTRACT_ADDRESS,
                r: r,
                s: s,
                v: "".concat(v)
              }
            });
            return _context2.abrupt("return", signedOrder);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _signSwap.apply(this, arguments);
}

function signSwapTypedData(_x5, _x6) {
  return _signSwapTypedData.apply(this, arguments);
}

function _signSwapTypedData() {
  _signSwapTypedData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(orderParams, signer) {
    var signerAddress, order, data, sig, _ethers$utils$splitSi, r, s, v, signedOrder;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return signer.getAddress();

          case 2:
            signerAddress = _context3.sent;
            order = fillOrderDefaults(signerAddress, mapNested20OrderTo22Order(orderParams, true));
            data = {
              types: constants.types,
              // See: @airswap/order-utils/src/constants.js:4
              domain: {
                name: constants.DOMAIN_NAME,
                version: constants.DOMAIN_VERSION,
                verifyingContract: SWAP_CONTRACT_ADDRESS
              },
              primaryType: 'Order',
              message: order // remove falsey values on order

            };
            _context3.next = 7;
            return signer.signTypedData(data);

          case 7:
            sig = _context3.sent;
            _ethers$utils$splitSi = ethers.utils.splitSignature(sig), r = _ethers$utils$splitSi.r, s = _ethers$utils$splitSi.s, v = _ethers$utils$splitSi.v;
            signedOrder = _objectSpread({}, order, {
              signature: {
                signatory: signerAddress.toLowerCase(),
                version: constants.signatures.SIGN_TYPED_DATA,
                // Version 0x01: signTypedData
                validator: SWAP_CONTRACT_ADDRESS,
                r: r,
                s: s,
                v: "".concat(v)
              }
            });
            return _context3.abrupt("return", signedOrder);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _signSwapTypedData.apply(this, arguments);
}

function cancel(ids, signer) {
  var contract = getSwapContract(signer);
  return contract.cancel(ids);
}

function getMakerOrderStatus(makerAddress, nonce, signer) {
  var contract = getSwapContract(signer);
  return contract.makerOrderStatus(makerAddress, nonce);
}

module.exports = {
  swap: swap,
  cancel: cancel,
  signSwapTypedData: signSwapTypedData,
  signSwap: signSwap,
  getMakerOrderStatus: getMakerOrderStatus
};