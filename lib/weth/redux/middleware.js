"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wethMiddleware;

var _reducers = require("../../wallet/redux/reducers");

var _eventTrackingActions = require("./eventTrackingActions");

var _constants = require("../../constants");

var _actions = require("../../deltaBalances/redux/actions");

var initTrackWeth = function initTrackWeth(store) {
  var connectedWalletAddress = (0, _reducers.getConnectedWalletAddress)(store.getState());
  store.dispatch((0, _eventTrackingActions.trackWethDeposit)({
    owner: connectedWalletAddress.toLowerCase(),
    callback: function callback() {
      return store.dispatch((0, _actions.getTokenBalancesForConnectedAddress)([_constants.WETH_CONTRACT_ADDRESS, _constants.ETH_ADDRESS]));
    }
  }));
  store.dispatch((0, _eventTrackingActions.trackWethWithdrawal)({
    owner: connectedWalletAddress.toLowerCase(),
    callback: function callback() {
      return store.dispatch((0, _actions.getTokenBalancesForConnectedAddress)([_constants.WETH_CONTRACT_ADDRESS, _constants.ETH_ADDRESS]));
    }
  }));
};

function wethMiddleware(store) {
  return function (next) {
    return function (action) {
      next(action);

      switch (action.type) {
        case 'CONNECTED_WALLET':
          initTrackWeth(store);
          break;

        default:
      }
    };
  };
}