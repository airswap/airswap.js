"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDelegateForConnectedWallet = void 0;

var _reducers = require("../../wallet/redux/reducers");

var _contractFunctionActions = require("./contractFunctionActions");

var createDelegateForConnectedWallet = function createDelegateForConnectedWallet() {
  return function (dispatch, getState) {
    var address = (0, _reducers.getConnectedWalletAddress)(getState());
    dispatch((0, _contractFunctionActions.submitDelegateFactoryCreateDelegate)({
      delegateTradeWallet: address
    }));
  };
};

exports.createDelegateForConnectedWallet = createDelegateForConnectedWallet;