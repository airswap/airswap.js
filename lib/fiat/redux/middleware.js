"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gasMiddleware;

var _http = require("../../utils/redux/templates/http");

var _index = require("../index");

var _constants = require("../../constants");

function fetchEthPrice() {
  return (0, _index.fetchTokenPrice)('ETH');
}

function gasMiddleware(store) {
  if (_constants.IS_INSTANT) {
    (0, _http.makeMiddlewareHTTPFn)(fetchEthPrice, 'ethPrices', store, {
      increment: 60 * 1000
    });
  }

  return function (next) {
    return function (action) {
      switch (action.type) {
        default:
      }

      return next(action);
    };
  };
}