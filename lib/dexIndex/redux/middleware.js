"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dexIndexMiddleware;

var _index = require("../index");

var _actions = require("./actions");

var _redux = require("../../protocolMessaging/redux");

var getCurrentFrameQueryContext = _redux.selectors.getCurrentFrameQueryContext,
    getCurrentFrameBestOrder = _redux.selectors.getCurrentFrameBestOrder;

var makeDexIndexQuery = function makeDexIndexQuery(airswapQuery, airswapOrder) {
  var makerAmount = airswapQuery.makerAmount,
      takerAmount = airswapQuery.takerAmount,
      side = airswapQuery.side;
  if (makerAmount && takerAmount) throw new Error('should not specify both makerAmount and takerAmount');
  var symbol = airswapOrder.tokenSymbol;
  var amount = airswapOrder.tokenAmount;
  return {
    symbol: symbol,
    amount: amount,
    side: side
  };
};

function dexIndexMiddleware(store) {
  return function (next) {
    return function (action) {
      var state = store.getState();

      switch (action.type) {
        case 'GET_DEXINDEX_PRICES':
          var stackId = action.stackId;
          var queryContext = getCurrentFrameQueryContext(state);
          var bestAirswapOrder = getCurrentFrameBestOrder(state);

          if (Object.keys(bestAirswapOrder || {}).length === 0) {
            break;
          }

          var dexIndexQuery = makeDexIndexQuery(queryContext, bestAirswapOrder);
          store.dispatch((0, _actions.startDexIndexQuery)(stackId));
          (0, _index.fetchDexIndexPrices)(dexIndexQuery).then(function (dexIndexResponse) {
            store.dispatch((0, _actions.gotDexIndexResponse)({
              stackId: stackId,
              dexIndexResponse: dexIndexResponse
            }));
            store.dispatch((0, _actions.endDexIndexQuery)(stackId));
          }).catch(function (e) {
            store.dispatch((0, _actions.endDexIndexQuery)(stackId));
          });
          break;

        default:
      }

      return next(action);
    };
  };
}