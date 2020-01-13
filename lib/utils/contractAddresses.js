"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// node version: v9.10.0
// module versions:
// rlp@2.0.0
// keccak@1.4.0
var ethers = require('ethers');

var rlp = require('rlp');

var keccak = require('keccak');

var _ = require('lodash');

var _require = require('../constants'),
    NETWORK_NAME = _require.NETWORK_NAME;

var provider = ethers.getDefaultProvider(NETWORK_NAME);

function findDeployedContractsForSender(_x, _x2) {
  return _findDeployedContractsForSender.apply(this, arguments);
}

function _findDeployedContractsForSender() {
  _findDeployedContractsForSender = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(sender, bytecode) {
    var transactionCount, nonces, contracts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return provider.getTransactionCount(sender);

          case 2:
            transactionCount = _context2.sent;
            nonces = _.range(0, transactionCount);
            contracts = []; // now I iterate over it

            _context2.next = 7;
            return Promise.all(_.map(nonces,
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(intNonce) {
                var nonce, input_arr, rlp_encoded, contract_address_long, contract_address, code;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        nonce = parseInt(ethers.utils.hexlify(intNonce), 16);
                        input_arr = [sender, nonce];
                        rlp_encoded = rlp.encode(input_arr);
                        contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');
                        contract_address = "0x".concat(contract_address_long.substring(24)); // Trim the first 24 characters.

                        _context.next = 7;
                        return provider.getCode(contract_address);

                      case 7:
                        code = _context.sent;

                        if (code.replace(/^\s+|\s+$/g, '') === bytecode) {
                          contracts.push({
                            intNonce: intNonce,
                            address: contract_address
                          });
                        }

                        return _context.abrupt("return", code);

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 7:
            return _context2.abrupt("return", _.map(_.sortBy(contracts, 'intNonce'), 'address'));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _findDeployedContractsForSender.apply(this, arguments);
}

module.exports = {
  findDeployedContractsForSender: findDeployedContractsForSender
};