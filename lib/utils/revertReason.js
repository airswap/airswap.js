"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../constants'),
    NETWORK_NAME = _require.NETWORK_NAME;

var ethers = require('ethers');

var provider = new ethers.getDefaultProvider(NETWORK_NAME || 'homestead');

function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = '';

  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }

  return str;
}

function getRevertReason(_x) {
  return _getRevertReason.apply(this, arguments);
}

function _getRevertReason() {
  _getRevertReason = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(hash) {
    var tx, code;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return provider.getTransaction(hash);

          case 2:
            tx = _context.sent;

            if (tx) {
              _context.next = 6;
              break;
            }

            _context.next = 10;
            break;

          case 6:
            _context.next = 8;
            return provider.call(tx, tx.blockNumber);

          case 8:
            code = _context.sent;
            return _context.abrupt("return", hex_to_ascii(code.substr(138)));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getRevertReason.apply(this, arguments);
}

module.exports = getRevertReason;