"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegateFactoryMiddleware;

var _constants = require("../../constants");

var _eventTrackingActions = require("./eventTrackingActions");

/*
 import { createDelegateForConnectedWallet } from 'airswap.js/src/delegateFactory/redux/actions'
 import { getDelegateFactoryCreateDelegateTransactions } from 'airswap.js/src/delegateFactory/redux/contractTransactionSelectors'
 import { getConnectedDelegateContract } from 'airswap.js/src/delegateFactory/redux/selectors'

 submit transaction:
    store.dispatch(createDelegateForConnectedWallet())
 track transaction:
    getDelegateFactoryCreateDelegateTransactions(store.getState())
 get delegate contract for connected wallet:
    getConnectedDelegateContract(store.getState())
 */
function delegateFactoryMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'REDUX_STORAGE_LOAD':
          if (_constants.IS_INSTANT) {
            store.dispatch((0, _eventTrackingActions.trackDelegateFactoryCreateDelegate)({
              fromBlock: _constants.DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK
            }));
          }

          next(action);
          break;

        default:
          next(action);
      }
    };
  };
}