"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDelegateFactoryHas = exports.submitDelegateFactoryCreateDelegate = exports.fetchDelegateFactorySwapContract = exports.fetchDelegateFactoryProtocol = exports.fetchDelegateFactoryIndexerContract = void 0;

// This file is generated code, edits will be overwritten
var fetchDelegateFactoryIndexerContract = function fetchDelegateFactoryIndexerContract() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_DELEGATE_FACTORY_INDEXER_CONTRACT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateFactoryIndexerContract = fetchDelegateFactoryIndexerContract;

var fetchDelegateFactoryProtocol = function fetchDelegateFactoryProtocol() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_DELEGATE_FACTORY_PROTOCOL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateFactoryProtocol = fetchDelegateFactoryProtocol;

var fetchDelegateFactorySwapContract = function fetchDelegateFactorySwapContract() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_DELEGATE_FACTORY_SWAP_CONTRACT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateFactorySwapContract = fetchDelegateFactorySwapContract;

var submitDelegateFactoryCreateDelegate = function submitDelegateFactoryCreateDelegate(_ref) {
  var delegateTradeWallet = _ref.delegateTradeWallet;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        delegateTradeWallet: delegateTradeWallet,
        type: 'SUBMIT_DELEGATE_FACTORY_CREATE_DELEGATE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateFactoryCreateDelegate = submitDelegateFactoryCreateDelegate;

var fetchDelegateFactoryHas = function fetchDelegateFactoryHas(_ref2) {
  var locator = _ref2.locator;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        locator: locator,
        type: 'FETCH_DELEGATE_FACTORY_HAS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateFactoryHas = fetchDelegateFactoryHas;