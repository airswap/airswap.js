"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockTrackerMiddleware;

var _index = _interopRequireDefault(require("../index"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blockTrackerMiddleware(store) {
  _index.default.onBlock(function (block) {
    return store.dispatch((0, _actions.gotLatestBlock)(block));
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