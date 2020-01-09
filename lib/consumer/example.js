"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../swap/utils'),
    mapNested20QuoteTo22Quote = _require.mapNested20QuoteTo22Quote;

var Router = require('../protocolMessaging');

var Indexer = require('../indexer');

var _require2 = require('../constants'),
    AST_CONTRACT_ADDRESS = _require2.AST_CONTRACT_ADDRESS,
    WETH_CONTRACT_ADDRESS = _require2.WETH_CONTRACT_ADDRESS;

var indexer = new Indexer();
var router = new Router({
  supportLegacy: false,
  address: '0xddc2aade47c619e902b79619346d3682089b2d63'
});

function queryHttpIntents(_x) {
  return _queryHttpIntents.apply(this, arguments);
}

function _queryHttpIntents() {
  _queryHttpIntents = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(query) {
    var intents, filteredIntents, promiseResults;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return indexer.ready;

          case 2:
            intents = indexer.getIntents();
            filteredIntents = intents.filter(function (i) {
              return i.senderToken === query.senderToken && i.signerToken === query.signerToken;
            });
            promiseResults = filteredIntents.map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(intent) {
                var senderToken, signerToken, swapVersion, locator, locatorType, maxQuote, requestAmount, quote, order;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        senderToken = intent.senderToken, signerToken = intent.signerToken, swapVersion = intent.swapVersion, locator = intent.locator, locatorType = intent.locatorType;
                        _context.prev = 1;
                        _context.t0 = mapNested20QuoteTo22Quote;
                        _context.next = 5;
                        return router.getMaxQuote(intent.makerAddress, {
                          senderToken: senderToken,
                          signerToken: signerToken,
                          swapVersion: swapVersion,
                          locator: locator,
                          locatorType: locatorType
                        });

                      case 5:
                        _context.t1 = _context.sent;
                        maxQuote = (0, _context.t0)(_context.t1);
                        _context.next = 12;
                        break;

                      case 9:
                        _context.prev = 9;
                        _context.t2 = _context["catch"](1);
                        return _context.abrupt("return", {
                          error: _context.t2,
                          intent: intent,
                          type: 'getMaxQuote'
                        });

                      case 12:
                        requestAmount = '10000'; // 1 AST

                        _context.prev = 13;
                        _context.t3 = mapNested20QuoteTo22Quote;
                        _context.next = 17;
                        return router.getSenderSideOrder(intent.makerAddress, {
                          senderToken: senderToken,
                          signerToken: signerToken,
                          signerAmount: requestAmount,
                          swapVersion: swapVersion,
                          locator: locator,
                          locatorType: locatorType
                        });

                      case 17:
                        _context.t4 = _context.sent;
                        quote = (0, _context.t3)(_context.t4);
                        _context.next = 24;
                        break;

                      case 21:
                        _context.prev = 21;
                        _context.t5 = _context["catch"](13);
                        return _context.abrupt("return", {
                          error: _context.t5,
                          intent: intent,
                          type: 'getSignerSideQuote'
                        });

                      case 24:
                        _context.prev = 24;
                        _context.t6 = mapNested20QuoteTo22Quote;
                        _context.next = 28;
                        return router.getSenderSideOrder(intent.makerAddress, {
                          senderToken: senderToken,
                          signerToken: signerToken,
                          signerAmount: requestAmount,
                          swapVersion: swapVersion,
                          locator: locator,
                          locatorType: locatorType
                        });

                      case 28:
                        _context.t7 = _context.sent;
                        order = (0, _context.t6)(_context.t7);
                        _context.next = 35;
                        break;

                      case 32:
                        _context.prev = 32;
                        _context.t8 = _context["catch"](24);
                        return _context.abrupt("return", {
                          error: _context.t8,
                          intent: intent,
                          type: 'getOrder'
                        });

                      case 35:
                        return _context.abrupt("return", {
                          intent: intent,
                          maxQuote: maxQuote,
                          quote: quote,
                          order: order
                        });

                      case 36:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[1, 9], [13, 21], [24, 32]]);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", Promise.all(promiseResults));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _queryHttpIntents.apply(this, arguments);
}

var query = {
  signerToken: AST_CONTRACT_ADDRESS,
  senderToken: WETH_CONTRACT_ADDRESS
};
queryHttpIntents(query).then(function (results) {
  return void 0;
});