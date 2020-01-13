"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "reducers", {
  enumerable: true,
  get: function get() {
    return _reducers.default;
  }
});
exports.middleware = void 0;

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = [];
exports.middleware = middleware;