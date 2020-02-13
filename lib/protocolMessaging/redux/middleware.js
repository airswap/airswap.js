"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routerMiddleware;

var _lodash = _interopRequireDefault(require("lodash"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _utils = require("../../swap/utils");

var _index = _interopRequireDefault(require("../index"));

var _actions = require("../../wallet/redux/actions");

var _reducers = require("../../deltaBalances/redux/reducers");

var _reducers2 = require("./reducers");

var _actions2 = require("./actions");

var _actions3 = require("../../swapLegacy/redux/actions");

var _actions4 = require("../../keySpace/redux/actions");

var _actions5 = require("../../dexIndex/redux/actions");

var _constants = require("../../constants");

var _tcomb = require("../../swapLegacy/tcomb");

var _tcomb2 = require("../../swap/tcomb");

var _contractFunctionActions = require("../../swap/redux/contractFunctionActions");

var _actions6 = require("../../swap/redux/actions");

var _actions7 = require("../../erc20/redux/actions");

var _contractFunctionActions2 = require("../../wrapper/redux/contractFunctionActions");

var _actions8 = require("../../deltaBalances/redux/actions");

var _reducers3 = require("../../wallet/redux/reducers");

var _waitForState = require("../../utils/redux/waitForState");

var _combinedSelectors = require("../../redux/combinedSelectors");

var _contractFunctionActions3 = require("../../delegate/redux/contractFunctionActions");

var _selectors = require("../../indexer/redux/selectors");

var _index2 = require("../../delegate/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initialzeRouter(_x) {
  return _initialzeRouter.apply(this, arguments);
}

function _initialzeRouter() {
  _initialzeRouter = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store) {
    var signer, address, config, requireAuthentication, keySpace, messageSigner;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store.dispatch({
              type: 'CONNECTING_ROUTER'
            });
            _context.next = 3;
            return store.dispatch((0, _actions.getSigner)());

          case 3:
            signer = _context.sent;
            _context.next = 6;
            return signer.getAddress();

          case 6:
            address = _context.sent;
            requireAuthentication = _reducers2.selectors.getRouterRequireAuth(store.getState());

            if (!requireAuthentication) {
              _context.next = 16;
              break;
            }

            _context.next = 11;
            return store.dispatch((0, _actions4.getKeySpace)());

          case 11:
            keySpace = _context.sent;

            messageSigner = function messageSigner(message) {
              return keySpace.sign(message);
            };

            config = {
              address: address,
              keyspace: true,
              messageSigner: messageSigner,
              requireAuthentication: requireAuthentication
            };
            _context.next = 17;
            break;

          case 16:
            config = {
              address: address,
              requireAuthentication: requireAuthentication
            };

          case 17:
            router = new _index.default(config);
            return _context.abrupt("return", true);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _initialzeRouter.apply(this, arguments);
}

var router;

var gotIntents = function gotIntents(intents, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_INTENTS',
    intents: intents,
    stackId: stackId
  };
};

var gotOrderResponse = function gotOrderResponse(orderResponse, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_ORDER_RESPONSE',
    orderResponse: orderResponse,
    stackId: stackId
  };
};

var gotAlternativeOrderResponse = function gotAlternativeOrderResponse(alternativeOrderResponse, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_ALTERNATIVE_ORDER_RESPONSE',
    alternativeOrderResponse: alternativeOrderResponse,
    stackId: stackId
  };
};

var gotLowBalanceOrderResponse = function gotLowBalanceOrderResponse(lowBalanceOrderResponse, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_LOW_BALANCE_ORDER_RESPONSE',
    lowBalanceOrderResponse: lowBalanceOrderResponse,
    stackId: stackId
  };
};

var gotAlternativeQuoteResponse = function gotAlternativeQuoteResponse(alternativeQuoteResponse, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_ALTERNATIVE_QUOTE_RESPONSE',
    alternativeQuoteResponse: alternativeQuoteResponse,
    stackId: stackId
  };
};

var gotQuoteResponse = function gotQuoteResponse(quoteResponse, stackId) {
  return {
    type: 'GOT_CHECKOUT_FRAME_QUOTE_RESPONSE',
    quoteResponse: quoteResponse,
    stackId: stackId
  };
};

var frameTimeoutReached = function frameTimeoutReached(stackId) {
  return {
    type: 'CHECKOUT_FRAME_TIMEOUT_REACHED',
    stackId: stackId
  };
};

var allIntentsResolved = function allIntentsResolved(stackId) {
  return {
    type: 'CHECKOUT_FRAME_ALL_INTENTS_RESOLVED',
    stackId: stackId
  };
};

var orderFetchingTimeout = 3000; // 3 seconds

function intentSupportsQuotes(_ref) {
  var supportedMethods = _ref.supportedMethods;
  return _lodash.default.intersection(supportedMethods, ['getQuote', 'getMaxQuote']).length === 2 || _lodash.default.intersection(supportedMethods, ['getSignerSideQuote', 'getSenderSideQuote', 'getMaxQuote']).length === 3;
}

function isMakerSide(query) {
  return query.makerAmount && !query.takerAmount;
}

function isTakerSide(query) {
  return query.takerAmount && !query.makerAmount;
}

function takerTokenBalanceIsZero(store, takerToken) {
  var state = store.getState();

  var connectedBalances = _reducers.selectors.getConnectedBalances(state);

  return Number(connectedBalances[takerToken]) === 0;
}

function makerTokenBalanceIsZero(maxQuote, swapVersion) {
  return swapVersion === 2 ? Number(maxQuote.makerAmount) === 0 : Number(maxQuote.makerAmount) === 0;
}

function takerTokenBalanceIsLessThanTakerAmount(store, takerToken, takerAmount) {
  var connectedBalances = _reducers.selectors.getConnectedBalances(store.getState());

  return (0, _bignumber.default)(connectedBalances[takerToken]).lt(takerAmount);
}

function getOrderTakerTokenWithQuotes(_x2, _x3, _x4) {
  return _getOrderTakerTokenWithQuotes.apply(this, arguments);
}

function _getOrderTakerTokenWithQuotes() {
  _getOrderTakerTokenWithQuotes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(intent, store, action) {
    var takerAmount, makerToken, takerToken, locator, locatorType, makerAddress, swapVersion, quotePromise, maxQuotePromise, maxQuote, quote, maxQuoteResponse, quoteResponse, OrderResponseType, takerTokenBalance, adjustedTokenBalance, lowBalanceResponse, lowBalanceOrder, alternativeOrderResponse, alternativeOrder, orderResponse, order;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            takerAmount = action.query.takerAmount;
            makerToken = intent.makerToken, takerToken = intent.takerToken, locator = intent.locator, locatorType = intent.locatorType;
            makerAddress = intent.connectionAddress || intent.makerAddress;
            swapVersion = intent.swapVersion || 1;
            quotePromise = router.getQuote(makerAddress, {
              takerAmount: takerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });
            maxQuotePromise = router.getMaxQuote(makerAddress, {
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });
            _context2.prev = 6;
            _context2.next = 9;
            return maxQuotePromise;

          case 9:
            maxQuoteResponse = _context2.sent;
            maxQuote = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Quote)(maxQuoteResponse)) : (0, _tcomb.LegacyQuote)(maxQuoteResponse);

            if (!makerTokenBalanceIsZero(maxQuote, swapVersion)) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", null);

          case 13:
            _context2.next = 17;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](6);

          case 17:
            _context2.prev = 17;
            _context2.next = 20;
            return quotePromise;

          case 20:
            quoteResponse = _context2.sent;
            quote = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Quote)(quoteResponse)) : (0, _tcomb.LegacyQuote)(quoteResponse);
            _context2.next = 26;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t1 = _context2["catch"](17);

          case 26:
            OrderResponseType = locatorType === 'contract' ? _tcomb2.Quote : _tcomb2.Order;
            takerTokenBalance = _lodash.default.get(_reducers.selectors.getConnectedBalances(store.getState()), action.query.takerToken);
            adjustedTokenBalance = action.query.takerToken === _constants.ETH_ADDRESS ? "".concat(Number(takerTokenBalance) * 0.9) : takerTokenBalance; // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas

            if (!takerTokenBalanceIsZero(store, action.query.takerToken)) {
              _context2.next = 38;
              break;
            }

            if (!(maxQuote && (0, _bignumber.default)(takerAmount).gt(maxQuote.takerAmount || maxQuote.takerAmount))) {
              _context2.next = 34;
              break;
            }

            return _context2.abrupt("return", store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId)));

          case 34:
            if (!quote) {
              _context2.next = 36;
              break;
            }

            return _context2.abrupt("return", store.dispatch(gotQuoteResponse(quote, action.stackId)));

          case 36:
            _context2.next = 50;
            break;

          case 38:
            if (!(quote && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, quote.takerAmount || quote.takerAmount))) {
              _context2.next = 50;
              break;
            }

            _context2.prev = 39;
            _context2.next = 42;
            return router.getOrder(makerAddress, {
              takerAmount: adjustedTokenBalance,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 42:
            lowBalanceResponse = _context2.sent;
            lowBalanceOrder = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(lowBalanceResponse)) : (0, _tcomb.LegacyOrder)(lowBalanceResponse);
            store.dispatch(gotQuoteResponse(quote, action.stackId));
            return _context2.abrupt("return", store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId)));

          case 48:
            _context2.prev = 48;
            _context2.t2 = _context2["catch"](39);

          case 50:
            if (!(maxQuote && (0, _bignumber.default)(takerAmount).gt(maxQuote.takerAmount || maxQuote.takerAmount))) {
              _context2.next = 61;
              break;
            }

            _context2.prev = 51;
            _context2.next = 54;
            return router.getOrder(makerAddress, {
              takerAmount: maxQuote.takerAmount || maxQuote.takerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 54:
            alternativeOrderResponse = _context2.sent;
            alternativeOrder = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(alternativeOrderResponse)) : (0, _tcomb.LegacyOrder)(alternativeOrderResponse);
            return _context2.abrupt("return", store.dispatch(gotAlternativeOrderResponse(alternativeOrder, action.stackId)));

          case 59:
            _context2.prev = 59;
            _context2.t3 = _context2["catch"](51);

          case 61:
            _context2.prev = 61;
            _context2.next = 64;
            return router.getOrder(makerAddress, {
              takerAmount: takerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 64:
            orderResponse = _context2.sent;
            order = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(orderResponse)) : (0, _tcomb.LegacyOrder)(orderResponse);
            return _context2.abrupt("return", store.dispatch(gotOrderResponse(order, action.stackId)));

          case 69:
            _context2.prev = 69;
            _context2.t4 = _context2["catch"](61);

          case 71:
            return _context2.abrupt("return", null);

          case 72:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 15], [17, 24], [39, 48], [51, 59], [61, 69]]);
  }));
  return _getOrderTakerTokenWithQuotes.apply(this, arguments);
}

function getOrderMakerTokenWithQuotes(_x5, _x6, _x7) {
  return _getOrderMakerTokenWithQuotes.apply(this, arguments);
}

function _getOrderMakerTokenWithQuotes() {
  _getOrderMakerTokenWithQuotes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(intent, store, action) {
    var makerAmount, makerToken, takerToken, locator, locatorType, makerAddress, swapVersion, quotePromise, maxQuotePromise, maxQuote, quote, maxQuoteResponse, quoteResponse, OrderResponseType, takerTokenBalance, adjustedTokenBalance, lowBalanceResponse, lowBalanceOrder, alternativeOrderResponse, alternativeOrder, orderResponse, order;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            makerAmount = action.query.makerAmount;
            makerToken = intent.makerToken, takerToken = intent.takerToken, locator = intent.locator, locatorType = intent.locatorType;
            makerAddress = intent.connectionAddress || intent.makerAddress;
            swapVersion = intent.swapVersion || 1;
            quotePromise = router.getQuote(makerAddress, {
              makerAmount: makerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });
            maxQuotePromise = router.getMaxQuote(makerAddress, {
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });
            _context3.prev = 6;
            _context3.next = 9;
            return maxQuotePromise;

          case 9:
            maxQuoteResponse = _context3.sent;
            maxQuote = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Quote)(maxQuoteResponse)) : (0, _tcomb.LegacyQuote)(maxQuoteResponse);

            if (!makerTokenBalanceIsZero(maxQuote, swapVersion)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", null);

          case 13:
            _context3.next = 17;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](6);

          case 17:
            _context3.prev = 17;
            _context3.next = 20;
            return quotePromise;

          case 20:
            quoteResponse = _context3.sent;
            quote = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Quote)(quoteResponse)) : (0, _tcomb.LegacyQuote)(quoteResponse);
            _context3.next = 26;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t1 = _context3["catch"](17);

          case 26:
            OrderResponseType = locatorType === 'contract' ? _tcomb2.Quote : _tcomb2.Order;
            takerTokenBalance = _lodash.default.get(_reducers.selectors.getConnectedBalances(store.getState()), action.query.takerToken);
            adjustedTokenBalance = action.query.takerToken === _constants.ETH_ADDRESS ? "".concat(Number(takerTokenBalance) * 0.9) : takerTokenBalance; // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas

            if (!takerTokenBalanceIsZero(store, action.query.takerToken)) {
              _context3.next = 38;
              break;
            }

            if (!(maxQuote && (0, _bignumber.default)(makerAmount).gt(maxQuote.makerAmount || maxQuote.makerAmount))) {
              _context3.next = 34;
              break;
            }

            return _context3.abrupt("return", store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId)));

          case 34:
            if (!quote) {
              _context3.next = 36;
              break;
            }

            return _context3.abrupt("return", store.dispatch(gotQuoteResponse(quote, action.stackId)));

          case 36:
            _context3.next = 50;
            break;

          case 38:
            if (!(quote && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, quote.takerAmount || quote.takerAmount))) {
              _context3.next = 50;
              break;
            }

            _context3.prev = 39;
            _context3.next = 42;
            return router.getOrder(makerAddress, {
              takerAmount: adjustedTokenBalance,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 42:
            lowBalanceResponse = _context3.sent;
            lowBalanceOrder = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(lowBalanceResponse)) : (0, _tcomb.LegacyOrder)(lowBalanceResponse);
            store.dispatch(gotQuoteResponse(quote, action.stackId));
            return _context3.abrupt("return", store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId)));

          case 48:
            _context3.prev = 48;
            _context3.t2 = _context3["catch"](39);

          case 50:
            if (!(maxQuote && (0, _bignumber.default)(makerAmount).gt(maxQuote.makerAmount || maxQuote.makerAmount))) {
              _context3.next = 67;
              break;
            }

            _context3.prev = 51;

            if (!takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, maxQuote.takerAmount || maxQuote.takerAmount)) {
              _context3.next = 58;
              break;
            }

            _context3.next = 55;
            return router.getOrder(makerAddress, {
              takerAmount: adjustedTokenBalance,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 55:
            alternativeOrderResponse = _context3.sent;
            _context3.next = 61;
            break;

          case 58:
            _context3.next = 60;
            return router.getOrder(makerAddress, {
              makerAmount: maxQuote.makerAmount || maxQuote.makerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 60:
            alternativeOrderResponse = _context3.sent;

          case 61:
            alternativeOrder = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(alternativeOrderResponse)) : (0, _tcomb.LegacyOrder)(alternativeOrderResponse);
            return _context3.abrupt("return", store.dispatch(gotAlternativeOrderResponse(alternativeOrder, action.stackId)));

          case 65:
            _context3.prev = 65;
            _context3.t3 = _context3["catch"](51);

          case 67:
            _context3.prev = 67;
            _context3.next = 70;
            return router.getOrder(makerAddress, {
              makerAmount: makerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion,
              locator: locator,
              locatorType: locatorType
            });

          case 70:
            orderResponse = _context3.sent;
            order = swapVersion === 2 ? (0, _utils.flatten)(OrderResponseType(orderResponse)) : (0, _tcomb.LegacyOrder)(orderResponse);
            return _context3.abrupt("return", store.dispatch(gotOrderResponse(order, action.stackId)));

          case 75:
            _context3.prev = 75;
            _context3.t4 = _context3["catch"](67);

          case 77:
            return _context3.abrupt("return", null);

          case 78:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[6, 15], [17, 24], [39, 48], [51, 65], [67, 75]]);
  }));
  return _getOrderMakerTokenWithQuotes.apply(this, arguments);
}

function getOrderTakerTokenWithoutQuotes(_x8, _x9, _x10) {
  return _getOrderTakerTokenWithoutQuotes.apply(this, arguments);
}

function _getOrderTakerTokenWithoutQuotes() {
  _getOrderTakerTokenWithoutQuotes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(intent, store, action) {
    var takerAmount, makerToken, takerToken, makerAddress, swapVersion, takerTokenBalance, adjustedTokenBalance, lowBalanceResponse, lowBalanceOrder, orderResponse, order;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            takerAmount = action.query.takerAmount;
            makerToken = intent.makerToken, takerToken = intent.takerToken;
            makerAddress = intent.connectionAddress || intent.makerAddress;
            swapVersion = intent.swapVersion || 1;

            if (!takerTokenBalanceIsZero(store, action.query.takerToken)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", null);

          case 6:
            if (!(takerAmount && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, takerAmount))) {
              _context4.next = 20;
              break;
            }

            takerTokenBalance = _lodash.default.get(_reducers.selectors.getConnectedBalances(store.getState()), takerToken);
            adjustedTokenBalance = action.query.takerToken === _constants.ETH_ADDRESS ? "".concat(Number(takerTokenBalance) * 0.9) : takerTokenBalance; // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas

            _context4.prev = 9;
            _context4.next = 12;
            return router.getOrder(makerAddress, {
              takerAmount: adjustedTokenBalance,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion
            });

          case 12:
            lowBalanceResponse = _context4.sent;
            lowBalanceOrder = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Order)(lowBalanceResponse)) : (0, _tcomb.LegacyOrder)(lowBalanceResponse);
            return _context4.abrupt("return", store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId)));

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](9);
            return _context4.abrupt("return", null);

          case 20:
            _context4.prev = 20;
            _context4.next = 23;
            return router.getOrder(makerAddress, {
              takerAmount: takerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion
            });

          case 23:
            orderResponse = _context4.sent;
            order = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Order)(orderResponse)) : (0, _tcomb.LegacyOrder)(orderResponse);
            return _context4.abrupt("return", store.dispatch(gotOrderResponse(order, action.stackId)));

          case 28:
            _context4.prev = 28;
            _context4.t1 = _context4["catch"](20);

          case 30:
            return _context4.abrupt("return", null);

          case 31:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[9, 17], [20, 28]]);
  }));
  return _getOrderTakerTokenWithoutQuotes.apply(this, arguments);
}

function getOrderMakerTokenWithoutQuotes(_x11, _x12, _x13) {
  return _getOrderMakerTokenWithoutQuotes.apply(this, arguments);
}

function _getOrderMakerTokenWithoutQuotes() {
  _getOrderMakerTokenWithoutQuotes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(intent, store, action) {
    var makerAmount, makerToken, takerToken, makerAddress, swapVersion, orderResponse, order, takerAmount;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            makerAmount = action.query.makerAmount;
            makerToken = intent.makerToken, takerToken = intent.takerToken;
            makerAddress = intent.connectionAddress || intent.makerAddress;
            swapVersion = intent.swapVersion || 1;

            if (!takerTokenBalanceIsZero(store, action.query.takerToken)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", null);

          case 6:
            _context5.prev = 6;
            _context5.next = 9;
            return router.getOrder(makerAddress, {
              makerAmount: makerAmount,
              makerToken: makerToken,
              takerToken: takerToken,
              swapVersion: swapVersion
            });

          case 9:
            orderResponse = _context5.sent;
            order = swapVersion === 2 ? (0, _utils.flatten)((0, _tcomb2.Order)(orderResponse)) : (0, _tcomb.LegacyOrder)(orderResponse);
            takerAmount = swapVersion === 2 ? order.takerAmount : order.takerAmount;

            if (!(takerAmount && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, takerAmount))) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", null);

          case 14:
            return _context5.abrupt("return", store.dispatch(gotOrderResponse(order, action.stackId)));

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](6);

          case 19:
            return _context5.abrupt("return", null);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[6, 17]]);
  }));
  return _getOrderMakerTokenWithoutQuotes.apply(this, arguments);
}

function mapIntentFetchProtocolOrder(_x14, _x15, _x16) {
  return _mapIntentFetchProtocolOrder.apply(this, arguments);
}

function _mapIntentFetchProtocolOrder() {
  _mapIntentFetchProtocolOrder = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(intent, store, action) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return waitForConnectedTakerTokenBalance(action.query.takerToken, store);

          case 2:
            if (!(intentSupportsQuotes(intent) && isTakerSide(action.query))) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", getOrderTakerTokenWithQuotes(intent, store, action));

          case 6:
            if (!(intentSupportsQuotes(intent) && isMakerSide(action.query))) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", getOrderMakerTokenWithQuotes(intent, store, action));

          case 10:
            if (!(!intentSupportsQuotes(intent) && isTakerSide(action.query))) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt("return", getOrderTakerTokenWithoutQuotes(intent, store, action));

          case 14:
            if (!(!intentSupportsQuotes(intent) && isMakerSide(action.query))) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", getOrderMakerTokenWithoutQuotes(intent, store, action));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _mapIntentFetchProtocolOrder.apply(this, arguments);
}

function fillFrameBestOrder(_x17) {
  return _fillFrameBestOrder.apply(this, arguments);
} // assumes that instant passes WETH as the baseAsset
// and that we force ETH


function _fillFrameBestOrder() {
  _fillFrameBestOrder = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(store) {
    var state, bestOrder, baseToken, bestSwap, ethAmount, reversedOrder, signedOrder;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            state = store.getState();
            bestOrder = _lodash.default.omit(_reducers2.selectors.getCurrentFrameSelectedOrder(state) || _reducers2.selectors.getCurrentFrameBestOrder(state) || _reducers2.selectors.getCurrentFrameBestLowBalanceOrder(state) || _reducers2.selectors.getCurrentFrameBestAlternativeOrder(state), ['takerAmountFormatted', 'makerAmountFormatted']);
            baseToken = _lodash.default.get(_reducers2.selectors.getCurrentFrameQueryContext(state), 'baseToken');
            bestSwap = (0, _utils.mapNested20OrderTo22Order)((0, _utils.nest)(bestOrder), true);
            ethAmount = bestSwap.sender.token === _constants.WETH_CONTRACT_ADDRESS ? bestSwap.sender.amount : '0';

            if (!(bestOrder.locatorType === 'contract')) {
              _context7.next = 13;
              break;
            }

            reversedOrder = (0, _index2.reverseObjectMethods)(bestOrder);
            _context7.next = 9;
            return store.dispatch((0, _actions6.signSwap)((0, _utils.nest)(reversedOrder)));

          case 9:
            signedOrder = _context7.sent;

            if (baseToken === _constants.ETH_ADDRESS) {
              store.dispatch((0, _contractFunctionActions2.submitWrapperProvideDelegateOrder)({
                order: signedOrder,
                delegate: bestOrder.locatorValue,
                ethAmount: ethAmount
              }));
            } else {
              store.dispatch((0, _contractFunctionActions3.submitDelegateProvideOrder)({
                contractAddress: bestOrder.locatorValue,
                order: signedOrder
              }));
            }

            _context7.next = 14;
            break;

          case 13:
            if (bestOrder.swapVersion === 2) {
              if (baseToken === _constants.ETH_ADDRESS) {
                store.dispatch((0, _contractFunctionActions2.submitWrapperSwap)({
                  order: bestSwap,
                  ethAmount: ethAmount
                }));
              } else {
                store.dispatch((0, _contractFunctionActions.submitSwap)({
                  order: bestSwap
                }));
              }
            } else {
              store.dispatch((0, _actions3.fillOrder)(bestOrder));
            }

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _fillFrameBestOrder.apply(this, arguments);
}

function filterIntents(intents, query, queryContext) {
  var makerToken = query.makerToken,
      takerToken = query.takerToken;
  var side = queryContext.side,
      specifiedMakerAddress = queryContext.specifiedMakerAddress;
  return _lodash.default.filter(intents, function (intent) {
    // user is filtering to only query one specific maker
    if (specifiedMakerAddress && specifiedMakerAddress !== intent.address) {
      return false;
    } // for 2.0 special cases (wrapper)


    if (intent.swapVersion === 2) {
      if (query.takerToken === _constants.ETH_ADDRESS) {
        return intent.makerToken === makerToken && intent.takerToken === _constants.WETH_CONTRACT_ADDRESS;
      } else if (query.makerToken === _constants.ETH_ADDRESS) {
        return intent.makerToken === _constants.WETH_CONTRACT_ADDRESS && intent.takerToken === takerToken;
      }
    } // for 1.0 special cases (no ETH on sells)


    if (side === 'sell') {
      if (query.makerToken === _constants.ETH_ADDRESS) {
        return intent.makerToken === _constants.WETH_CONTRACT_ADDRESS && intent.takerToken === takerToken;
      }
    } // normal matches


    return intent.makerToken === makerToken && intent.takerToken === takerToken;
  });
} // this is useful in the widget, or anywhere else where a token is being queried that isn't being tracked
// it's helpful in preventing edge cases while not causing bloat in the number of tracked tokens


function trackMissingTokensForConnectedAddress(query, store) {
  var state = store.getState();
  var makerToken = query.makerToken,
      takerToken = query.takerToken;
  var address = (0, _reducers3.getConnectedWalletAddress)(state);

  var connectedBalances = _reducers.selectors.getConnectedBalances(state);

  if (_lodash.default.isUndefined(connectedBalances[makerToken])) {
    store.dispatch((0, _actions8.addTrackedAddress)({
      address: address,
      tokenAddress: makerToken
    }));
  }

  if (_lodash.default.isUndefined(connectedBalances[takerToken])) {
    store.dispatch((0, _actions8.addTrackedAddress)({
      address: address,
      tokenAddress: takerToken
    }));
  }
}

function waitForConnectedTakerTokenBalance(_x18, _x19) {
  return _waitForConnectedTakerTokenBalance.apply(this, arguments);
}

function _waitForConnectedTakerTokenBalance() {
  _waitForConnectedTakerTokenBalance = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(takerToken, store) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", store.dispatch((0, _waitForState.waitForState)({
              selector: function selector(state) {
                return !_lodash.default.isUndefined(_lodash.default.get(_reducers.selectors.getConnectedBalances(state), takerToken.toLowerCase()));
              },
              result: true
            })));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _waitForConnectedTakerTokenBalance.apply(this, arguments);
}

function waitForOnChainIntents(_x20) {
  return _waitForOnChainIntents.apply(this, arguments);
}

function _waitForOnChainIntents() {
  _waitForOnChainIntents = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(store) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", store.dispatch((0, _waitForState.waitForState)({
              selector: function selector(state) {
                return (0, _selectors.getIndexerIntentsLoaded)(state);
              },
              result: true
            })));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _waitForOnChainIntents.apply(this, arguments);
}

function routerMiddleware(store) {
  store.dispatch((0, _actions2.newCheckoutFrame)());
  return function (next) {
    return function (action) {
      var state = store.getState();

      switch (action.type) {
        case 'CONNECTED_WALLET':
          if (!_reducers2.selectors.getRouterRequireAuth(state) && _constants.IS_INSTANT) {
            var routerPromise = initialzeRouter(store).then(function () {
              return store.dispatch({
                type: 'ROUTER_CONNECTED'
              });
            });
            routerPromise.catch(function (error) {
              return store.dispatch({
                type: 'ROUTER_CONNECTED',
                error: error
              });
            });
          }

          break;

        case 'KEYSPACE_READY':
          if (_reducers2.selectors.getRouterRequireAuth(state)) {
            var _routerPromise = initialzeRouter(store).then(function () {
              return store.dispatch({
                type: 'ROUTER_CONNECTED'
              });
            });

            _routerPromise.catch(function (error) {
              return store.dispatch({
                type: 'ERROR_CONNECTING_ROUTER',
                error: error
              });
            });
          }

          break;

        case 'SET_CHECKOUT_FRAME_QUERY':
          action.stackId = _reducers2.selectors.getCurrentFrameStackId(state); //eslint-disable-line

          waitForOnChainIntents(store).then(function () {
            trackMissingTokensForConnectedAddress(action.query, store);
            var intents = (0, _combinedSelectors.getOnAndOffChainIntents)(store.getState());
            var filteredIntents = filterIntents(intents, action.query, action.queryContext);
            store.dispatch(gotIntents(filteredIntents, action.stackId));
            store.dispatch((0, _actions6.getEthWrapperApproval)());
            store.dispatch((0, _actions7.getWrapperWethTokenApproval)());
            Promise.all(filteredIntents.map(function (intent) {
              return mapIntentFetchProtocolOrder(intent, store, action);
            })).then(function () {
              return store.dispatch(allIntentsResolved(action.stackId));
            }); // we don't start querying intents until connected takerToken balance is loaded
            // so the timeout for the query also shouldn't begin until the connected takerToken balance is loaded

            waitForConnectedTakerTokenBalance(action.query.takerToken, store).then(function () {
              window.setTimeout(function () {
                store.dispatch(frameTimeoutReached(action.stackId));
              }, orderFetchingTimeout);
            });
          });
          break;

        case 'FILL_FRAME_BEST_ORDER':
          action.stackId = _reducers2.selectors.getCurrentFrameStackId(state); //eslint-disable-line

          fillFrameBestOrder(store);
          break;

        case 'SELECT_CHECKOUT_FRAME_ORDER':
          action.stackId = _reducers2.selectors.getCurrentFrameStackId(state); //eslint-disable-line

          break;

        case 'CHECKOUT_FRAME_TIMEOUT_REACHED':
          // once we've hit the cutoff threshold waiting for orders, check the best order on DexIndex
          store.dispatch((0, _actions5.fetchSetDexIndexPrices)(action.stackId));
          break;

        default:
      }

      return next(action);
    };
  };
}