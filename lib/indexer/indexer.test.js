"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var assert = require('assert');

var contractFunctions = require('./contractFunctions');

var constants = require('../constants');

var getSigner = require('../wallet/getSigner');

var walletActions = {
  startWalletAction: function startWalletAction() {
    return {
      gasPrice: 10000000000
    };
  }
};
var signer = getSigner({
  privateKey: process.env.PRIVATE_KEY
}, walletActions);
describe('Indexer Tests',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee11() {
  return regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          it('Test getIndexerIndexes()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return contractFunctions.getIndexerIndexes('0x6b175474e89094c44da98b954eedeac495271d0f', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', constants.PROTOCOL_0);

                  case 2:
                    response = _context.sent;
                    assert.equal(response, '0xc712741B7f7C055A07fa4e93dC62F82994eC0D1c');

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          })));
          it('Test getIndexerIsOwner()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return contractFunctions.getIndexerIsOwner();

                  case 2:
                    response = _context2.sent;
                    assert.equal(response, true);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          })));
          it('Test getIndexerLocatorWhitelists()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            var response;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_0);

                  case 2:
                    response = _context3.sent;
                    assert.equal(response, '0x0000000000000000000000000000000000000000');
                    _context3.next = 6;
                    return contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_1);

                  case 6:
                    response = _context3.sent;
                    assert.equal(response, '0x0000000000000000000000000000000000000000');
                    _context3.next = 10;
                    return contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_2);

                  case 10:
                    response = _context3.sent;
                    assert.equal(response, '0x0000000000000000000000000000000000000000');

                  case 12:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          })));
          it('Test getIndexerOwner()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            var response;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return contractFunctions.getIndexerOwner();

                  case 2:
                    response = _context4.sent;
                    assert.equal(response, '0x7eeAb4F134fcFA6FCAF3987D391f1d626f75F6E1');

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          })));
          it.skip('Test submitIndexerRenounceOwnership()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5() {
            var response;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return contractFunctions.submitIndexerRenounceOwnership(signer);

                  case 2:
                    _context5.next = 4;
                    return contractFunctions.getIndexerOwner();

                  case 4:
                    response = _context5.sent;
                    assert.equal(response, '0x0000000000000000000000000000000000000000');

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          })));
          it('Test getIndexerStakingToken()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee6() {
            var response;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return contractFunctions.getIndexerStakingToken();

                  case 2:
                    response = _context6.sent;
                    assert.equal(response, '0x27054b13b1B798B345b591a4d22e6562d47eA75a');

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          })));
          it('Test getIndexerTokenBlacklist()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee7() {
            var response_dai, response_weth;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return contractFunctions.getIndexerTokenBlacklist('0x6b175474e89094c44da98b954eedeac495271d0f');

                  case 2:
                    response_dai = _context7.sent;
                    assert.equal(response_dai, false);
                    _context7.next = 6;
                    return contractFunctions.getIndexerTokenBlacklist('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');

                  case 6:
                    response_weth = _context7.sent;
                    assert.equal(response_weth, false);

                  case 8:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          })));
          it.skip('Test submitIndexerTransferOwnership()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee8() {
            var response;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return contractFunctions.submitIndexerTransferOwnership('0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE', signer);

                  case 2:
                    _context8.next = 4;
                    return contractFunctions.getIndexerOwner();

                  case 4:
                    response = _context8.sent;
                    assert.equal(response, '0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE');

                  case 6:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          })));
          it.skip('Test submitIndexerSetLocatorWhitelist()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee9() {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          })));
          it('Test submitIndexerCreateIndex()',
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee10() {
            var response;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return contractFunctions.submitIndexerCreateIndex('0x64c86899bc02dd9af823b131e5acd4369f72bd39', '0x5c508f6bdcde0c809a28fa58e61e280500da4677', constants.PROTOCOL_0, signer);

                  case 2:
                    _context10.next = 4;
                    return contractFunctions.getIndexerIndexes('0x64c86899bc02dd9af823b131e5acd4369f72bd39', '0x5c508f6bdcde0c809a28fa58e61e280500da4677', constants.PROTOCOL_0);

                  case 4:
                    response = _context10.sent;
                    // should always hash to the following
                    assert.notEqual(response, '0x06d2FEBDeCa66845687c093964f96845A2B53f8D');

                  case 6:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          })));

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11, this);
})));