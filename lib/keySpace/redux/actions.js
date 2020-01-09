"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeKeySpace = exports.getKeySpace = void 0;

var _redux = require("../../utils/redux");

var getKeySpace = (0, _redux.makePromiseAction)({
  type: 'GET_KEYSPACE'
});
exports.getKeySpace = getKeySpace;
var initializeKeySpace = (0, _redux.makePromiseAction)({
  type: 'INITIALIZE_KEYSPACE'
});
exports.initializeKeySpace = initializeKeySpace;