"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIndexerGetStakedAmount = exports.fetchIndexerGetLocators = exports.submitIndexerUnsetIntent = exports.submitIndexerSetIntent = exports.submitIndexerRemoveTokenFromBlacklist = exports.submitIndexerAddTokenToBlacklist = exports.submitIndexerCreateIndex = exports.submitIndexerSetLocatorWhitelist = exports.submitIndexerTransferOwnership = exports.fetchIndexerTokenBlacklist = exports.fetchIndexerStakingToken = exports.submitIndexerRenounceOwnership = exports.fetchIndexerOwner = exports.fetchIndexerLocatorWhitelists = exports.fetchIndexerIsOwner = exports.fetchIndexerIndexes = void 0;

// This file is generated code, edits will be overwritten
var fetchIndexerIndexes = function fetchIndexerIndexes(_ref) {
  var signerToken = _ref.signerToken,
      senderToken = _ref.senderToken,
      protocol = _ref.protocol;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        type: 'FETCH_INDEXER_INDEXES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerIndexes = fetchIndexerIndexes;

var fetchIndexerIsOwner = function fetchIndexerIsOwner() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_INDEXER_IS_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerIsOwner = fetchIndexerIsOwner;

var fetchIndexerLocatorWhitelists = function fetchIndexerLocatorWhitelists(_ref2) {
  var protocol = _ref2.protocol;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        protocol: protocol,
        type: 'FETCH_INDEXER_LOCATOR_WHITELISTS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerLocatorWhitelists = fetchIndexerLocatorWhitelists;

var fetchIndexerOwner = function fetchIndexerOwner() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_INDEXER_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerOwner = fetchIndexerOwner;

var submitIndexerRenounceOwnership = function submitIndexerRenounceOwnership() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'SUBMIT_INDEXER_RENOUNCE_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerRenounceOwnership = submitIndexerRenounceOwnership;

var fetchIndexerStakingToken = function fetchIndexerStakingToken() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'FETCH_INDEXER_STAKING_TOKEN',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerStakingToken = fetchIndexerStakingToken;

var fetchIndexerTokenBlacklist = function fetchIndexerTokenBlacklist(_ref3) {
  var token = _ref3.token;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        token: token,
        type: 'FETCH_INDEXER_TOKEN_BLACKLIST',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerTokenBlacklist = fetchIndexerTokenBlacklist;

var submitIndexerTransferOwnership = function submitIndexerTransferOwnership(_ref4) {
  var newOwner = _ref4.newOwner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        newOwner: newOwner,
        type: 'SUBMIT_INDEXER_TRANSFER_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerTransferOwnership = submitIndexerTransferOwnership;

var submitIndexerSetLocatorWhitelist = function submitIndexerSetLocatorWhitelist(_ref5) {
  var protocol = _ref5.protocol,
      newLocatorWhitelist = _ref5.newLocatorWhitelist;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        protocol: protocol,
        newLocatorWhitelist: newLocatorWhitelist,
        type: 'SUBMIT_INDEXER_SET_LOCATOR_WHITELIST',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerSetLocatorWhitelist = submitIndexerSetLocatorWhitelist;

var submitIndexerCreateIndex = function submitIndexerCreateIndex(_ref6) {
  var signerToken = _ref6.signerToken,
      senderToken = _ref6.senderToken,
      protocol = _ref6.protocol;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        type: 'SUBMIT_INDEXER_CREATE_INDEX',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerCreateIndex = submitIndexerCreateIndex;

var submitIndexerAddTokenToBlacklist = function submitIndexerAddTokenToBlacklist(_ref7) {
  var token = _ref7.token;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        token: token,
        type: 'SUBMIT_INDEXER_ADD_TOKEN_TO_BLACKLIST',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerAddTokenToBlacklist = submitIndexerAddTokenToBlacklist;

var submitIndexerRemoveTokenFromBlacklist = function submitIndexerRemoveTokenFromBlacklist(_ref8) {
  var token = _ref8.token;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        token: token,
        type: 'SUBMIT_INDEXER_REMOVE_TOKEN_FROM_BLACKLIST',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerRemoveTokenFromBlacklist = submitIndexerRemoveTokenFromBlacklist;

var submitIndexerSetIntent = function submitIndexerSetIntent(_ref9) {
  var signerToken = _ref9.signerToken,
      senderToken = _ref9.senderToken,
      protocol = _ref9.protocol,
      stakingAmount = _ref9.stakingAmount,
      locator = _ref9.locator;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        stakingAmount: stakingAmount,
        locator: locator,
        type: 'SUBMIT_INDEXER_SET_INTENT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerSetIntent = submitIndexerSetIntent;

var submitIndexerUnsetIntent = function submitIndexerUnsetIntent(_ref10) {
  var signerToken = _ref10.signerToken,
      senderToken = _ref10.senderToken,
      protocol = _ref10.protocol;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        type: 'SUBMIT_INDEXER_UNSET_INTENT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexerUnsetIntent = submitIndexerUnsetIntent;

var fetchIndexerGetLocators = function fetchIndexerGetLocators(_ref11) {
  var signerToken = _ref11.signerToken,
      senderToken = _ref11.senderToken,
      protocol = _ref11.protocol,
      cursor = _ref11.cursor,
      limit = _ref11.limit;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        cursor: cursor,
        limit: limit,
        type: 'FETCH_INDEXER_GET_LOCATORS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerGetLocators = fetchIndexerGetLocators;

var fetchIndexerGetStakedAmount = function fetchIndexerGetStakedAmount(_ref12) {
  var user = _ref12.user,
      signerToken = _ref12.signerToken,
      senderToken = _ref12.senderToken,
      protocol = _ref12.protocol;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        user: user,
        signerToken: signerToken,
        senderToken: senderToken,
        protocol: protocol,
        type: 'FETCH_INDEXER_GET_STAKED_AMOUNT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexerGetStakedAmount = fetchIndexerGetStakedAmount;