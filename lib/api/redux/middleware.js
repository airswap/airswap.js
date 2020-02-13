"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiMiddleware;

function apiMiddleware() {
  return function (next) {
    return function (action) {
      switch (action.type) {
        default:
      }

      next(action);
    };
  };
}