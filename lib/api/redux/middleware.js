"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiMiddleware;

var api = _interopRequireWildcard(require("../index"));

var _http = require("../../utils/redux/templates/http");

var _constants = require("../../constants");

var _actions = require("../../deltaBalances/redux/actions");

var _reducers = require("./reducers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var getIndexerIntents = _reducers.selectors.getIndexerIntents;
var connectedIntentsLength = 0;

function apiMiddleware(store) {
  var trackMakerTokens = function trackMakerTokens(connectedIntents) {
    if (connectedIntents.length !== connectedIntentsLength) {
      // only add new tracked addresses if the number of tracked intents changes
      connectedIntentsLength = connectedIntents.length;
      var trackedAddresses = connectedIntents.map(function (_ref) {
        var makerAddress = _ref.makerAddress,
            makerToken = _ref.makerToken;
        return {
          address: makerAddress,
          tokenAddress: makerToken
        };
      });
      store.dispatch((0, _actions.addTrackedAddresses)(trackedAddresses));
    }
  };

  if (_constants.IS_INSTANT) {
    (0, _http.makeMiddlewareHTTPFn)(api.fetchRouterConnectedUsers, 'connectedUsers', store, {
      increment: 60 * 1000 * 3
    });
    (0, _http.makeMiddlewareHTTPFn)(api.fetchIndexerIntents, 'indexerIntents', store, {
      increment: 1000 * 60 * 60
    });
  }

  return function (next) {
    return function (action) {
      switch (action.type) {
        default:
      }

      next(action);

      if (_constants.IS_INSTANT || _constants.IS_EXPLORER) {
        trackMakerTokens(getIndexerIntents(store.getState()));
      }
    };
  };
}