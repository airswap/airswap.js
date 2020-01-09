"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchIndexGetLocators = exports.fetchIndexGetLocator = exports.fetchIndexGetScore = exports.submitIndexUpdateLocator = exports.submitIndexUnsetLocator = exports.submitIndexSetLocator = exports.submitIndexTransferOwnership = exports.submitIndexRenounceOwnership = exports.fetchIndexOwner = exports.fetchIndexLength = exports.fetchIndexIsOwner = exports.fetchIndexEntries = void 0;

// This file is generated code, edits will be overwritten
var fetchIndexEntries = function fetchIndexEntries(_ref) {
  var contractAddress = _ref.contractAddress,
      identifier = _ref.identifier;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        type: 'FETCH_INDEX_ENTRIES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexEntries = fetchIndexEntries;

var fetchIndexIsOwner = function fetchIndexIsOwner(_ref2) {
  var contractAddress = _ref2.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_INDEX_IS_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexIsOwner = fetchIndexIsOwner;

var fetchIndexLength = function fetchIndexLength(_ref3) {
  var contractAddress = _ref3.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_INDEX_LENGTH',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexLength = fetchIndexLength;

var fetchIndexOwner = function fetchIndexOwner(_ref4) {
  var contractAddress = _ref4.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_INDEX_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexOwner = fetchIndexOwner;

var submitIndexRenounceOwnership = function submitIndexRenounceOwnership(_ref5) {
  var contractAddress = _ref5.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'SUBMIT_INDEX_RENOUNCE_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexRenounceOwnership = submitIndexRenounceOwnership;

var submitIndexTransferOwnership = function submitIndexTransferOwnership(_ref6) {
  var contractAddress = _ref6.contractAddress,
      newOwner = _ref6.newOwner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        newOwner: newOwner,
        type: 'SUBMIT_INDEX_TRANSFER_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexTransferOwnership = submitIndexTransferOwnership;

var submitIndexSetLocator = function submitIndexSetLocator(_ref7) {
  var contractAddress = _ref7.contractAddress,
      identifier = _ref7.identifier,
      score = _ref7.score,
      locator = _ref7.locator;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        score: score,
        locator: locator,
        type: 'SUBMIT_INDEX_SET_LOCATOR',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexSetLocator = submitIndexSetLocator;

var submitIndexUnsetLocator = function submitIndexUnsetLocator(_ref8) {
  var contractAddress = _ref8.contractAddress,
      identifier = _ref8.identifier;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        type: 'SUBMIT_INDEX_UNSET_LOCATOR',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexUnsetLocator = submitIndexUnsetLocator;

var submitIndexUpdateLocator = function submitIndexUpdateLocator(_ref9) {
  var contractAddress = _ref9.contractAddress,
      identifier = _ref9.identifier,
      score = _ref9.score,
      locator = _ref9.locator;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        score: score,
        locator: locator,
        type: 'SUBMIT_INDEX_UPDATE_LOCATOR',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitIndexUpdateLocator = submitIndexUpdateLocator;

var fetchIndexGetScore = function fetchIndexGetScore(_ref10) {
  var contractAddress = _ref10.contractAddress,
      identifier = _ref10.identifier;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        type: 'FETCH_INDEX_GET_SCORE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexGetScore = fetchIndexGetScore;

var fetchIndexGetLocator = function fetchIndexGetLocator(_ref11) {
  var contractAddress = _ref11.contractAddress,
      identifier = _ref11.identifier;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        identifier: identifier,
        type: 'FETCH_INDEX_GET_LOCATOR',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexGetLocator = fetchIndexGetLocator;

var fetchIndexGetLocators = function fetchIndexGetLocators(_ref12) {
  var contractAddress = _ref12.contractAddress,
      cursor = _ref12.cursor,
      limit = _ref12.limit;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        cursor: cursor,
        limit: limit,
        type: 'FETCH_INDEX_GET_LOCATORS',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchIndexGetLocators = fetchIndexGetLocators;