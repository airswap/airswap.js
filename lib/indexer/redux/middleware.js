"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexerMiddleware;

var _constants = require("../../constants");

var _eventTrackingActions = require("./eventTrackingActions");

function indexerMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'REDUX_STORAGE_LOAD':
          if (_constants.IS_INSTANT) {
            store.dispatch((0, _eventTrackingActions.trackIndexerCreateIndex)({
              fromBlock: _constants.INDEXER_CONTRACT_DEPLOY_BLOCK
            }));
          }

          break;

        default:
      }

      next(action);
    };
  };
}