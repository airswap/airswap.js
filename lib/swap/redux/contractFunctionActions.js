"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitSwapRevokeSigner = exports.submitSwapRevokeSender = exports.submitSwapAuthorizeSigner = exports.submitSwapAuthorizeSender = exports.submitSwapCancelUpTo = exports.submitSwapCancel = exports.submitSwap = exports.fetchSwapSignerNonceStatus = exports.fetchSwapSignerMinimumNonce = exports.fetchSwapSignerAuthorizations = exports.fetchSwapSenderAuthorizations = exports.fetchSwapRegistry = void 0;

// This file is generated code, edits will be overwritten
var fetchSwapRegistry = function fetchSwapRegistry() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_SWAP_REGISTRY',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSwapRegistry = fetchSwapRegistry;

var fetchSwapSenderAuthorizations = function fetchSwapSenderAuthorizations(_ref) {
  var authorizerAddress = _ref.authorizerAddress,
      authorizedSender = _ref.authorizedSender;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizerAddress: authorizerAddress,
        authorizedSender: authorizedSender,
        type: 'FETCH_SWAP_SENDER_AUTHORIZATIONS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSwapSenderAuthorizations = fetchSwapSenderAuthorizations;

var fetchSwapSignerAuthorizations = function fetchSwapSignerAuthorizations(_ref2) {
  var authorizerAddress = _ref2.authorizerAddress,
      authorizedSigner = _ref2.authorizedSigner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizerAddress: authorizerAddress,
        authorizedSigner: authorizedSigner,
        type: 'FETCH_SWAP_SIGNER_AUTHORIZATIONS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSwapSignerAuthorizations = fetchSwapSignerAuthorizations;

var fetchSwapSignerMinimumNonce = function fetchSwapSignerMinimumNonce(_ref3) {
  var signer = _ref3.signer;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signer: signer,
        type: 'FETCH_SWAP_SIGNER_MINIMUM_NONCE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSwapSignerMinimumNonce = fetchSwapSignerMinimumNonce;

var fetchSwapSignerNonceStatus = function fetchSwapSignerNonceStatus(_ref4) {
  var signer = _ref4.signer,
      nonce = _ref4.nonce;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signer: signer,
        nonce: nonce,
        type: 'FETCH_SWAP_SIGNER_NONCE_STATUS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSwapSignerNonceStatus = fetchSwapSignerNonceStatus;

var submitSwap = function submitSwap(_ref5) {
  var order = _ref5.order;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        order: order,
        type: 'SUBMIT_SWAP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwap = submitSwap;

var submitSwapCancel = function submitSwapCancel(_ref6) {
  var nonces = _ref6.nonces;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        nonces: nonces,
        type: 'SUBMIT_SWAP_CANCEL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapCancel = submitSwapCancel;

var submitSwapCancelUpTo = function submitSwapCancelUpTo(_ref7) {
  var minimumNonce = _ref7.minimumNonce;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        minimumNonce: minimumNonce,
        type: 'SUBMIT_SWAP_CANCEL_UP_TO',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapCancelUpTo = submitSwapCancelUpTo;

var submitSwapAuthorizeSender = function submitSwapAuthorizeSender(_ref8) {
  var authorizedSender = _ref8.authorizedSender;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizedSender: authorizedSender,
        type: 'SUBMIT_SWAP_AUTHORIZE_SENDER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapAuthorizeSender = submitSwapAuthorizeSender;

var submitSwapAuthorizeSigner = function submitSwapAuthorizeSigner(_ref9) {
  var authorizedSigner = _ref9.authorizedSigner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizedSigner: authorizedSigner,
        type: 'SUBMIT_SWAP_AUTHORIZE_SIGNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapAuthorizeSigner = submitSwapAuthorizeSigner;

var submitSwapRevokeSender = function submitSwapRevokeSender(_ref10) {
  var authorizedSender = _ref10.authorizedSender;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizedSender: authorizedSender,
        type: 'SUBMIT_SWAP_REVOKE_SENDER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapRevokeSender = submitSwapRevokeSender;

var submitSwapRevokeSigner = function submitSwapRevokeSigner(_ref11) {
  var authorizedSigner = _ref11.authorizedSigner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        authorizedSigner: authorizedSigner,
        type: 'SUBMIT_SWAP_REVOKE_SIGNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitSwapRevokeSigner = submitSwapRevokeSigner;