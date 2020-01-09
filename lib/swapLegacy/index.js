"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ethers = require('ethers');

var _require = require('../constants'),
    SWAP_LEGACY_CONTRACT_ADDRESS = _require.SWAP_LEGACY_CONTRACT_ADDRESS,
    ETH_ADDRESS = _require.ETH_ADDRESS,
    abis = _require.abis;

function getSwapLegacyContract(signer) {
  return new ethers.Contract(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], signer);
}

window.bignumberify = ethers.utils.bigNumberify;

function fillOrder(order, signer) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var contract = getSwapLegacyContract(signer);
  return contract.fill(order.makerAddress, order.makerAmount, order.makerToken, order.takerAddress, order.takerAmount, order.takerToken, order.expiration, order.nonce, order.v, order.r, order.s, _objectSpread({
    value: ethers.utils.bigNumberify(order.takerToken === ETH_ADDRESS ? order.takerAmount : 0)
  }, params));
}

function cancelOrder(order, signer) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var contract = getSwapLegacyContract(signer);
  return contract.cancel(order.makerAddress, order.makerAmount, order.makerToken, order.takerAddress, order.takerAmount, order.takerToken, order.expiration, order.nonce, order.v, order.r, order.s, _objectSpread({
    value: 0
  }, params));
}

function signOrder(_x, _x2) {
  return _signOrder.apply(this, arguments);
}

function _signOrder() {
  _signOrder = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(order, signer) {
    var makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce, types, hashedOrder, signedMsg, sig;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            makerAddress = order.makerAddress, makerAmount = order.makerAmount, makerToken = order.makerToken, takerAddress = order.takerAddress, takerAmount = order.takerAmount, takerToken = order.takerToken, expiration = order.expiration, nonce = order.nonce;
            types = ['address', // makerAddress
            'uint256', // makerAmount
            'address', // makerToken
            'address', // takerAddress
            'uint256', // takerAmount
            'address', // takertoken
            'uint256', // expiration
            'uint256'];
            hashedOrder = ethers.utils.solidityKeccak256(types, [makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce]);
            _context.next = 5;
            return signer.signMessage(ethers.utils.arrayify(hashedOrder));

          case 5:
            signedMsg = _context.sent;
            sig = ethers.utils.splitSignature(signedMsg);
            return _context.abrupt("return", _objectSpread({
              makerAddress: makerAddress,
              makerAmount: makerAmount,
              makerToken: makerToken,
              takerAddress: takerAddress,
              takerAmount: takerAmount,
              takerToken: takerToken,
              expiration: expiration,
              nonce: nonce
            }, sig));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _signOrder.apply(this, arguments);
}

module.exports = {
  fillOrder: fillOrder,
  signOrder: signOrder,
  cancelOrder: cancelOrder
};