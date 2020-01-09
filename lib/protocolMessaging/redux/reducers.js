"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectors = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

var _reducers = require("../../tokens/redux/reducers");

var _redux2 = require("../../swapLegacy/redux");

var _redux3 = require("../../gas/redux");

var _redux4 = require("../../tokens/redux");

var _redux5 = require("../../fiat/redux");

var _redux6 = require("../../transactionTracker/redux");

var _redux7 = require("../../deltaBalances/redux");

var _redux8 = require("../../erc20/redux");

var _order = require("../../utils/order");

var _utils = require("../../swap/utils");

var _tcomb = require("../tcomb");

var _actions = require("../../erc20/redux/actions");

var _actions2 = require("../../swap/redux/actions");

var _selectors = require("../../swap/redux/selectors");

var _selectors2 = require("../../erc20/redux/selectors");

var _reducers2 = require("../../wallet/redux/reducers");

var _constants = require("../../constants");

var _contractTransactionSelectors = require("../../erc20/redux/contractTransactionSelectors");

var _contractTransactionSelectors2 = require("../../swap/redux/contractTransactionSelectors");

var _index = require("../../delegate/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function updateCheckoutFrame(state, frameIndex, frameUpdateObj) {
  return [].concat(_toConsumableArray(state.slice(0, frameIndex)), [(0, _tcomb.CheckoutFrame)(_objectSpread({}, state[frameIndex], frameUpdateObj))], _toConsumableArray(state.slice(frameIndex + 1)));
}

var checkoutStack = function checkoutStack() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var frameIndex = _lodash.default.findIndex(state, {
    stackId: action.stackId
  });

  switch (action.type) {
    case 'NEW_CHECKOUT_FRAME':
      return [].concat(_toConsumableArray(state), [(0, _tcomb.CheckoutFrame)({
        stackId: action.stackId,
        orderResponses: [],
        alternativeOrderResponses: [],
        lowBalanceOrderResponses: [],
        quoteResponses: [],
        alternativeQuoteResponses: [],
        timeoutReached: false,
        allIntentsResolved: false,
        selectedOrderId: '',
        isDexIndexQuerying: false,
        dexIndexResponses: []
      })]);

    case 'SET_CHECKOUT_FRAME_QUERY':
      return updateCheckoutFrame(state, frameIndex, {
        query: action.query,
        queryContext: action.queryContext
      });

    case 'GOT_CHECKOUT_FRAME_INTENTS':
      return updateCheckoutFrame(state, frameIndex, {
        intents: action.intents
      });

    case 'GOT_CHECKOUT_FRAME_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        orderResponses: [].concat(_toConsumableArray(state[frameIndex].orderResponses), [action.orderResponse])
      });

    case 'GOT_CHECKOUT_FRAME_ALTERNATIVE_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        alternativeOrderResponses: [].concat(_toConsumableArray(state[frameIndex].alternativeOrderResponses), [action.alternativeOrderResponse])
      });

    case 'GOT_CHECKOUT_FRAME_LOW_BALANCE_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        lowBalanceOrderResponses: [].concat(_toConsumableArray(state[frameIndex].lowBalanceOrderResponses), [action.lowBalanceOrderResponse])
      });

    case 'GOT_CHECKOUT_FRAME_QUOTE_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        quoteResponses: [].concat(_toConsumableArray(state[frameIndex].quoteResponses), [action.quoteResponse])
      });

    case 'GOT_CHECKOUT_FRAME_ALTERNATIVE_QUOTE_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        alternativeQuoteResponses: [].concat(_toConsumableArray(state[frameIndex].alternativeQuoteResponses), [action.alternativeQuoteResponse])
      });

    case 'GOT_CHECKOUT_FRAME_DEXINDEX_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        dexIndexResponses: action.dexIndexResponse
      });

    case 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING':
      return updateCheckoutFrame(state, frameIndex, {
        isDexIndexQuerying: action.isDexIndexQuerying
      });

    case 'CHECKOUT_FRAME_TIMEOUT_REACHED':
      return updateCheckoutFrame(state, frameIndex, {
        timeoutReached: true
      });

    case 'CHECKOUT_FRAME_ALL_INTENTS_RESOLVED':
      return updateCheckoutFrame(state, frameIndex, {
        allIntentsResolved: true
      });

    case 'SELECT_CHECKOUT_FRAME_ORDER':
      return updateCheckoutFrame(state, frameIndex, {
        selectedOrderId: action.orderId // selectedOrderId is only used when overridding the "best" order with a custom choice

      });

    default:
      return state;
  }
};

var connectingRouter = function connectingRouter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONNECTING_ROUTER':
      return true;

    case 'ROUTER_CONNECTED':
      return false;

    case 'ERROR_CONNECTING_ROUTER':
      return false;

    default:
      return state;
  }
};

var routerRequireAuth = function routerRequireAuth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONNECT_WALLET':
      return action.requireAuth;

    default:
      return state;
  }
};

var protocolMessaging = (0, _redux.combineReducers)({
  checkoutStack: checkoutStack,
  connectingRouter: connectingRouter,
  routerRequireAuth: routerRequireAuth
});
/**
 * A selector that returns true if the router is completing the initial authentication process.
 * @function getIsConnectingRouter
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsConnectingRouter = function getIsConnectingRouter(state) {
  return state.protocolMessaging.connectingRouter;
};

var getRouterRequireAuth = function getRouterRequireAuth(state) {
  return state.protocolMessaging.routerRequireAuth;
};

var getCheckoutStack = function getCheckoutStack(state) {
  return state.protocolMessaging.checkoutStack;
};

var getCurrentFrame = (0, _reselect.createSelector)(getCheckoutStack, function (stack) {
  return _lodash.default.last(stack) || {};
});
var getCurrentFrameQuery = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.query;
});
var getCurrentFrameQueryContext = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return _objectSpread({}, frame.queryContext, frame.query);
});
var makeGetReadableSwap = (0, _reselect.createSelector)(_reducers.makeGetReadableOrder, _reducers.makeGetReadableSwapOrder, function (getReadableOrder, getReadableSwapOrder) {
  return function (order) {
    return order.swapVersion === 2 ? _objectSpread({}, getReadableSwapOrder(order), {
      takerAmount: order.takerAmount,
      makerAmount: order.makerAmount
    }) : getReadableOrder(order);
  };
});
var getCurrentFrameStackId = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.stackId;
});
var getCurrentFrameSelectedOrderId = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.selectedOrderId;
});
var getCurrentFrameIntents = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.intents;
});
var getCurrentFrameTimeoutReached = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.timeoutReached;
});
var getCurrentFrameAllIntentsResolved = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.allIntentsResolved;
});
var getCurrentFrameOrderResponses = (0, _reselect.createSelector)(getCurrentFrame, makeGetReadableSwap, function (frame, getReadableOrder) {
  return frame.orderResponses.map(getReadableOrder);
});
var getCurrentFrameDexIndexResponses = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.dexIndexResponses;
});
var getCurrentFrameIsDexIndexQuerying = (0, _reselect.createSelector)(getCurrentFrame, function (frame) {
  return frame.isDexIndexQuerying;
});
var getCurrentFrameAlternativeOrderResponses = (0, _reselect.createSelector)(getCurrentFrame, makeGetReadableSwap, function (frame, getReadableOrder) {
  return frame.alternativeOrderResponses.map(getReadableOrder);
});
var getCurrentFrameLowBalanceOrderResponses = (0, _reselect.createSelector)(getCurrentFrame, makeGetReadableSwap, function (frame, getReadableOrder) {
  return frame.lowBalanceOrderResponses.map(getReadableOrder);
});
var getCurrentFrameQuoteResponses = (0, _reselect.createSelector)(getCurrentFrame, makeGetReadableSwap, function (frame, getReadableOrder) {
  return frame.quoteResponses.map(getReadableOrder);
});
var getCurrentFrameAlternativeQuoteResponses = (0, _reselect.createSelector)(getCurrentFrame, makeGetReadableSwap, function (frame, getReadableOrder) {
  return frame.alternativeQuoteResponses.map(getReadableOrder);
});
var getIsCurrentFrameQuerying = (0, _reselect.createSelector)(getCurrentFrameQuery, getCurrentFrameAllIntentsResolved, getCurrentFrameTimeoutReached, function (query, allIntentsResolved, currentFrameTimeoutReached) {
  return !!query && !allIntentsResolved && !currentFrameTimeoutReached;
});
var getIsCurrentFrameFinishedQuerying = (0, _reselect.createSelector)(getCurrentFrameQuery, getCurrentFrameAllIntentsResolved, getCurrentFrameTimeoutReached, function (query, allIntentsResolved, currentFrameTimeoutReached) {
  return !!query && (allIntentsResolved || currentFrameTimeoutReached);
});
/**
 * @typedef {Object} BestOrder
 * @memberof protocolMessaging
 * @property {string} makerAddress
 * @property {string} makerAmount
 * @property {string} makerToken
 * @property {string} takerAmount
 * @property {string} takerToken
 * @property {string} takerAddress
 * @property {string} nonce
 * @property {number} expiration
 * @property {number} v
 * @property {string} r
 * @property {string} s
 * @property {number} takerAmountFormatted
 * @property {number} makerAmountFormatted
 * @property {string} takerSymbol
 * @property {string} makerSymbol
 * @property {number} ethAmount
 * @property {string} tokenSymbol
 * @property {number} tokenAmount
 * @property {number} price
 * @property {string} priceInFiat
 * @property {string} ethAmountInFiat
 * @property {number} ethTotal
 * @property {string} ethTotalInFiat
 * @property {number} ethGasCost
 * @property {string} ethGasCostInFiat
 */

var makeGetBestOrder = (0, _reselect.createSelector)(getIsCurrentFrameFinishedQuerying, getCurrentFrameQueryContext, _redux3.selectors.getCurrentGasPriceSettings, _redux4.selectors.makeGetExchangeFillGasLimitByToken, _redux5.selectors.makeGetEthInFiat, _redux7.selectors.getConnectedSwapApprovals, _redux7.selectors.getConnectedApprovals, _selectors.getConnectedWrapperDelegateApproval, _selectors2.getConnectedWrapperWethApproval, _reducers2.getConnectedWalletAddress, _redux8.selectors.getMiningApproveToken, _redux8.selectors.getSubmittingApproveToken, _contractTransactionSelectors.getERC20ApproveTransactions, _contractTransactionSelectors2.getSwapAuthorizeSenderTransactions, function (isCurrentFrameFinishedQuerying, currentFrameQueryContext, _ref, getExchangeFillGasLimitByToken, getEthInFiat, connectedSwapApprovals, connectedApprovals, connectedWrapperDelegateApproval, connectedWrapperWethApproval, connectedWalletAddress, miningApproveToken, submittingApproveToken, ERC20ApproveTransactions, swapAuthorizeSenderTransactions) {
  var gwei = _ref.gwei;
  return function (orders) {
    if (!orders.length || !isCurrentFrameFinishedQuerying) return undefined;

    var sortedOrders = _lodash.default.sortBy(orders, 'price');

    var bestOrder = _lodash.default.first(_lodash.default.first(orders).makerSymbol === _lodash.default.first(orders).tokenSymbol ? sortedOrders : _toConsumableArray(sortedOrders).reverse());

    var ethGasPrice = Number(gwei) / Math.pow(10, 9);
    var ethGasLimit = Number(getExchangeFillGasLimitByToken({
      symbol: bestOrder.tokenSymbol
    }));
    var ethGasCost = ethGasLimit * ethGasPrice;
    var side = currentFrameQueryContext.side;
    var ethTotal = bestOrder.ethAmount;

    if (side !== 'sell') {
      ethTotal += ethGasCost;
    }

    var missingApprovals;

    if (bestOrder.swapVersion === 2) {
      var baseToken = _lodash.default.get(currentFrameQueryContext, 'baseToken');

      var miningTakerTokenSwapApproval = _lodash.default.get(miningApproveToken, bestOrder.takerToken, false) || _lodash.default.get(submittingApproveToken, bestOrder.takerToken, false);

      var wrapperDelegateApproval = _lodash.default.find(swapAuthorizeSenderTransactions, function (t) {
        return t.parameters.authorizedSender === _constants.WRAPPER_CONTRACT_ADDRESS;
      });

      var miningWrapperDelegateApproval = _lodash.default.get(wrapperDelegateApproval, 'mining', false) || _lodash.default.get(wrapperDelegateApproval, 'submitting', false);

      var wrapperWethApproval = _lodash.default.find(ERC20ApproveTransactions, function (t) {
        return t.parameters.spender === _constants.WRAPPER_CONTRACT_ADDRESS && t.parameters.contractAddress === _constants.WETH_CONTRACT_ADDRESS;
      });

      var miningWrapperWethApproval = _lodash.default.get(wrapperWethApproval, 'mining', false) || _lodash.default.get(wrapperWethApproval, 'submitting', false);

      var takerTokenSwapApproval = _lodash.default.get(connectedSwapApprovals, bestOrder.takerToken, false);

      var wrapperApprovals = baseToken === 'ETH' ? [{
        id: 'wrapperDelegateApproval',
        payload: (0, _actions2.submitEthWrapperAuthorize)(),
        approved: connectedWrapperDelegateApproval,
        isMining: miningWrapperDelegateApproval
      }, {
        id: 'wrapperWethApproval',
        payload: (0, _actions.approveWrapperWethToken)(),
        approved: connectedWrapperWethApproval,
        isMining: miningWrapperWethApproval
      }] : [];
      missingApprovals = [{
        id: 'takerTokenSwapApproval',
        payload: (0, _actions.approveAirswapTokenSwap)(bestOrder.takerToken),
        approved: takerTokenSwapApproval,
        isMining: miningTakerTokenSwapApproval
      }].concat(wrapperApprovals);
    } else {
      var takerTokenApproval = _lodash.default.get(connectedApprovals, bestOrder.takerToken, false);

      var _miningTakerTokenSwapApproval = _lodash.default.get(miningApproveToken, bestOrder.takerToken, false) || _lodash.default.get(submittingApproveToken, bestOrder.takerToken, false);

      missingApprovals = [{
        id: 'takerTokenSwapApproval',
        payload: (0, _actions.approveAirswapToken)(bestOrder.takerToken),
        approved: takerTokenApproval,
        isMining: _miningTakerTokenSwapApproval
      }];
    }

    missingApprovals = _lodash.default.filter(missingApprovals, function (a) {
      return !a.approved;
    }).map(function (a) {
      return _lodash.default.omit(a, 'approved');
    });
    return _objectSpread({}, bestOrder, {
      priceInFiat: getEthInFiat(bestOrder.price),
      // TODO: this will need to be redone for tokens other than eth as base token
      ethAmountInFiat: getEthInFiat(bestOrder.ethAmount),
      ethTotal: ethTotal,
      ethTotalInFiat: getEthInFiat(ethTotal),
      ethGasCost: ethGasCost,
      ethGasCostInFiat: getEthInFiat(ethGasCost),
      missingApprovals: missingApprovals
    });
  };
});
/**
 * A selector that returns the best order for the current frame (if it exists)
 * @function getCurrentFrameBestOrder
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */

var getCurrentFrameBestOrder = (0, _reselect.createSelector)(getCurrentFrameOrderResponses, makeGetBestOrder, function (orders, getBestOrder) {
  return getBestOrder(orders);
});
/**
 * A selector that returns the best alternative quote for the current frame (if it exists)
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */

var getCurrentFrameBestAlternativeOrder = (0, _reselect.createSelector)(getCurrentFrameAlternativeOrderResponses, makeGetBestOrder, function (quotes, getBestOrder) {
  return getBestOrder(quotes);
});
/**
 * A selector that returns the best low balance order for the current frame (if it exists)
 * @function getCurrentFrameBestLowBalanceOrder
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */

var getCurrentFrameBestLowBalanceOrder = (0, _reselect.createSelector)(getCurrentFrameLowBalanceOrderResponses, makeGetBestOrder, function (orders, getBestOrder) {
  return getBestOrder(orders);
});
/**
 * A selector that returns the best quote for the current frame (if it exists)
 * @function getCurrentFrameBestQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */

var getCurrentFrameBestQuote = (0, _reselect.createSelector)(getCurrentFrameQuoteResponses, makeGetBestOrder, function (quotes, getBestOrder) {
  return getBestOrder(quotes);
});
/**
 * A selector that returns the best alternative quote for the current frame (if it exists)
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */

var getCurrentFrameBestAlternativeQuote = (0, _reselect.createSelector)(getCurrentFrameAlternativeQuoteResponses, makeGetBestOrder, function (quotes, getBestOrder) {
  return getBestOrder(quotes);
});
/**
 * A selector that returns all order responses generated by a checkout frame query
 * @function getCurrentFrameAllOrderResponses
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Array}
 */

var getCurrentFrameAllOrderResponses = (0, _reselect.createSelector)(getCurrentFrameOrderResponses, getCurrentFrameAlternativeOrderResponses, getCurrentFrameLowBalanceOrderResponses, function (orders, alternativeOrders, lowBalanceOrders) {
  return [].concat(_toConsumableArray(orders), _toConsumableArray(alternativeOrders), _toConsumableArray(lowBalanceOrders));
});
/**
 * A selector that returns the currently selected order override
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */

var getCurrentFrameSelectedOrder = (0, _reselect.createSelector)(getCurrentFrameAllOrderResponses, getCurrentFrameSelectedOrderId, makeGetBestOrder, function (orders, orderId, getBestOrder) {
  var selectedOrder = _lodash.default.find(orders, function (order) {
    return (0, _order.getOrderId)(order) === orderId;
  });

  if (!selectedOrder) return selectedOrder;
  return getBestOrder([selectedOrder]);
});
/**
 * A selector that returns a boolean indicating whether or not the best order
 * on the current frame is also the best order according to DexIndex
 * @function getIsAirswapBestPrice
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsAirswapBestPrice = (0, _reselect.createSelector)(getCurrentFrameDexIndexResponses, getCurrentFrameQueryContext, getCurrentFrameBestOrder, function (dexIndexQueryResponse, queryContext, bestAirswapOrder) {
  var side = queryContext.side;
  if (!dexIndexQueryResponse.length) return false;

  var _dexIndexQueryRespons = _slicedToArray(dexIndexQueryResponse, 1),
      firstResponse = _dexIndexQueryRespons[0];

  var isFirstResponseAirswap = Object.keys(firstResponse)[0].toLowerCase() === 'airswap';
  var firstResponseData = Object.values(firstResponse)[0];

  if (isFirstResponseAirswap) {
    return true;
  } else if (!firstResponseData.avgPrice) {
    // no price means the next best dex couldn't serve the order, so airswap is the best
    return true;
  } else if (side === 'buy') {
    if (_lodash.default.get(bestAirswapOrder, 'price') < _lodash.default.get(firstResponseData, 'avgPrice')) return true;
  } else if (side === 'sell') {
    if (_lodash.default.get(bestAirswapOrder, 'price') > _lodash.default.get(firstResponseData, 'avgPrice')) return true;
  }

  return false;
});
var getCurrentFrameNoPeersFound = (0, _reselect.createSelector)(getIsCurrentFrameFinishedQuerying, getCurrentFrameOrderResponses, getCurrentFrameAlternativeOrderResponses, getCurrentFrameLowBalanceOrderResponses, getCurrentFrameQuoteResponses, getCurrentFrameAlternativeQuoteResponses, function (isCurrentFrameFinishedQuerying, orders, alternativeOrders, lowBalanceOrders, quotes, alternativeQuotes) {
  if (!isCurrentFrameFinishedQuerying) return false;
  if (isCurrentFrameFinishedQuerying && !orders.length && !alternativeOrders.length && !lowBalanceOrders.length && !quotes.length && !alternativeQuotes.length) return true;
  return false;
});
var getSubmittingFillOrder = _redux2.selectors.getSubmittingFillOrder,
    getErrorSubmittingFillOrder = _redux2.selectors.getErrorSubmittingFillOrder,
    getMiningFillOrder = _redux2.selectors.getMiningFillOrder,
    getTransactionsFillOrder = _redux2.selectors.getTransactionsFillOrder,
    getMinedFillOrder = _redux2.selectors.getMinedFillOrder,
    getTransactionReceiptsFillOrder = _redux2.selectors.getTransactionReceiptsFillOrder,
    getErrorMiningFillOrder = _redux2.selectors.getErrorMiningFillOrder;
var getCurrentFrameBestOrderExecution = (0, _reselect.createSelector)(getCurrentFrameSelectedOrder, getCurrentFrameBestOrder, getCurrentFrameBestAlternativeOrder, getCurrentFrameBestLowBalanceOrder, getSubmittingFillOrder, getErrorSubmittingFillOrder, getMiningFillOrder, getTransactionsFillOrder, getMinedFillOrder, getTransactionReceiptsFillOrder, getErrorMiningFillOrder, _redux6.selectors.getTransactions, function (currentFrameSelectedOrder, currentFrameBestOrder, currentFrameBestAlternativeOrder, currentFrameBestLowBalanceOrder, submittingFillOrder, errorSubmittingFillOrder, miningFillOrder, transactionsFillOrder, minedFillOrder, transactionReceiptsFillOrder, errorMiningFillOrder, transactions) {
  var order = currentFrameSelectedOrder || currentFrameBestOrder || currentFrameBestAlternativeOrder || currentFrameBestLowBalanceOrder; // TODO: This will need to be re-done by an order filling mechanic driven by order IDs

  if (!order) return {};
  var vals;

  if (order.swapVersion === 2) {
    var lookupOrder = order.locatorType === 'contract' ? (0, _index.reverseObjectMethods)(order) : order;
    var orderId = (0, _utils.getSwapOrderId)(lookupOrder);

    var tx = _lodash.default.find(transactions, function (t) {
      return (0, _utils.getSwapOrderId)(t.parameters.order) === orderId;
    });

    vals = _lodash.default.mapKeys(tx, function (val, key) {
      return ['transaction', 'transactionReceipt'].includes(key) ? "".concat(key, "sFillOrder") : "".concat(key, "FillOrder");
    });
  } else {
    var _orderId = (0, _order.getOrderId)(order);

    vals = _lodash.default.mapValues({
      submittingFillOrder: submittingFillOrder,
      errorSubmittingFillOrder: errorSubmittingFillOrder,
      miningFillOrder: miningFillOrder,
      transactionsFillOrder: transactionsFillOrder,
      minedFillOrder: minedFillOrder,
      transactionReceiptsFillOrder: transactionReceiptsFillOrder,
      errorMiningFillOrder: errorMiningFillOrder
    }, function (v) {
      return v[_orderId];
    });
  }

  return vals;
});
var getCurrentFrameState = (0, _reselect.createSelector)(getCurrentFrameQuery, getIsCurrentFrameQuerying, getCurrentFrameBestOrder, getCurrentFrameBestAlternativeOrder, getCurrentFrameBestLowBalanceOrder, getCurrentFrameBestQuote, getCurrentFrameBestAlternativeQuote, getCurrentFrameNoPeersFound, getCurrentFrameBestOrderExecution, getCurrentFrameSelectedOrder, function (currentFrameQuery, currentFrameQuerying, currentFrameBestOrder, currentFrameBestAlternativeOrder, currentFrameBestLowBalanceOrder, currentFrameBestQuote, currentFrameBestAlternativeQuote, currentFrameNoPeersFound, currentFrameBestOrderExecution, currentFrameSelectedOrder) {
  if (currentFrameBestOrderExecution.minedFillOrder) return 'minedBestOrder';
  if (currentFrameBestOrderExecution.miningFillOrder) return 'miningBestOrder';
  if (currentFrameNoPeersFound) return 'noPeersFound';
  if (currentFrameSelectedOrder) return 'selectedOrder';
  if (currentFrameBestOrder) return 'bestOrder';
  if (currentFrameBestLowBalanceOrder) return 'bestLowBalanceOrder';
  if (currentFrameBestAlternativeOrder) return 'bestAlternativeOrder';
  if (currentFrameBestQuote) return 'bestQuote';
  if (currentFrameBestAlternativeQuote) return 'bestAlternativeQuote';
  if (currentFrameQuerying) return 'querying';
  if (!currentFrameQuery) return 'new';
  throw new Error('checkout log has bug, state feel outside of route conditionals');
});
var getCurrentFrameStateSummaryProperties = (0, _reselect.createSelector)(getCurrentFrameState, getCurrentFrameQuery, getIsCurrentFrameQuerying, getCurrentFrameBestOrder, getCurrentFrameBestAlternativeOrder, getCurrentFrameBestLowBalanceOrder, getCurrentFrameBestQuote, getCurrentFrameBestAlternativeQuote, getCurrentFrameSelectedOrder, function (currentFrameState, currentFrameQuery, currentFrameQuerying, currentFrameBestOrder, currentFrameBestAlternativeOrder, currentFrameBestLowBalanceOrder, currentFrameBestQuote, currentFrameBestAlternativeQuote, currentFrameSelectedOrder) {
  switch (currentFrameState) {
    case 'selectedOrder':
      return currentFrameSelectedOrder;

    case 'bestOrder':
      return currentFrameBestOrder;

    case 'bestAlternativeOrder':
      return currentFrameBestAlternativeOrder;

    case 'bestLowBalanceOrder':
      return _objectSpread({}, currentFrameBestLowBalanceOrder, {
        quote: currentFrameBestQuote
      });

    case 'bestQuote':
      return currentFrameBestQuote;

    case 'bestAlternativeQuote':
      return currentFrameBestAlternativeQuote;

    default:
      return currentFrameSelectedOrder || currentFrameBestOrder || currentFrameBestAlternativeOrder || currentFrameBestLowBalanceOrder || currentFrameBestQuote || currentFrameBestAlternativeQuote || undefined;
  }
});
var makeLookUpCheckoutFrameByOrderId = (0, _reselect.createSelector)(getCheckoutStack, function (stack) {
  return function (orderId) {
    return _lodash.default.find(stack, function (_ref2) {
      var orderResponses = _ref2.orderResponses,
          alternativeOrderResponses = _ref2.alternativeOrderResponses,
          lowBalanceOrderResponses = _ref2.lowBalanceOrderResponses;
      var orders = [].concat(_toConsumableArray(orderResponses), _toConsumableArray(alternativeOrderResponses), _toConsumableArray(lowBalanceOrderResponses));
      return !!_lodash.default.find(orders, function (o) {
        return (0, _order.getOrderId)(o) === orderId || (0, _utils.getSwapOrderId)(o) === orderId;
      });
    });
  };
});
var selectors = {
  getCheckoutStack: getCheckoutStack,
  getIsAirswapBestPrice: getIsAirswapBestPrice,
  getIsConnectingRouter: getIsConnectingRouter,
  getRouterRequireAuth: getRouterRequireAuth,
  getCurrentFrame: getCurrentFrame,
  getCurrentFrameIsDexIndexQuerying: getCurrentFrameIsDexIndexQuerying,
  getCurrentFrameStackId: getCurrentFrameStackId,
  getCurrentFrameIntents: getCurrentFrameIntents,
  getCurrentFrameAllIntentsResolved: getCurrentFrameAllIntentsResolved,
  getCurrentFrameBestOrder: getCurrentFrameBestOrder,
  getCurrentFrameBestAlternativeOrder: getCurrentFrameBestAlternativeOrder,
  getCurrentFrameBestLowBalanceOrder: getCurrentFrameBestLowBalanceOrder,
  getCurrentFrameBestQuote: getCurrentFrameBestQuote,
  getCurrentFrameBestAlternativeQuote: getCurrentFrameBestAlternativeQuote,
  getCurrentFrameNoPeersFound: getCurrentFrameNoPeersFound,
  getCurrentFrameState: getCurrentFrameState,
  getCurrentFrameBestOrderExecution: getCurrentFrameBestOrderExecution,
  getCurrentFrameQueryContext: getCurrentFrameQueryContext,
  getCurrentFrameStateSummaryProperties: getCurrentFrameStateSummaryProperties,
  getCurrentFrameAllOrderResponses: getCurrentFrameAllOrderResponses,
  getCurrentFrameSelectedOrder: getCurrentFrameSelectedOrder,
  makeLookUpCheckoutFrameByOrderId: makeLookUpCheckoutFrameByOrderId
};
exports.selectors = selectors;
var _default = protocolMessaging;
exports.default = _default;