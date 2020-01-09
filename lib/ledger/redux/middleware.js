"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LedgerMiddleware;

var _index = require("../index");

function LedgerMiddleware() {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'GET_HDW_CHAIN_KEY':
          if (action.walletType === 'ledger') {
            (0, _index.getLedgerAccount)(action.path).then(action.resolve).catch(action.reject);
          }

          break;

        case 'GET_LEDGER_PROVIDER':
          (0, _index.makeLedgerProvider)(action.path).then(action.resolve).catch(action.reject);
          break;

        default:
      }

      return next(action);
    };
  };
}