"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexMiddleware;

var _constants = require("../../constants");

var _eventTrackingActions = require("./eventTrackingActions");

function indexMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'REDUX_STORAGE_LOAD':
          if (_constants.IS_INSTANT) {
            // this initializes data for indexer/redux/selectors/getLocatorIntents
            store.dispatch((0, _eventTrackingActions.trackIndexSetLocator)({
              fromBlock: _constants.INDEXER_CONTRACT_DEPLOY_BLOCK
            }));
            store.dispatch((0, _eventTrackingActions.trackIndexUnsetLocator)({
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