"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gasMiddleware;

var _index = require("../index");

var _http = require("../../utils/redux/templates/http");

function gasMiddleware(store) {
  (0, _http.makeMiddlewareHTTPFn)(_index.fetchGasSettings, 'gasData', store, {
    increment: 60 * 1000
  });
  return function (next) {
    return function (action) {
      switch (action.type) {
        default:
      }

      return next(action);
    };
  };
}