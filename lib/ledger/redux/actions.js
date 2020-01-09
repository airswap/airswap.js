"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLedgerIndex = exports.setLedgerPathType = exports.getLedgerProvider = void 0;

var getLedgerProvider = function getLedgerProvider(path) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: 'GET_LEDGER_PROVIDER',
        path: path,
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.getLedgerProvider = getLedgerProvider;

var setLedgerPathType = function setLedgerPathType(pathType) {
  return {
    type: 'SET_LEDGER_PATH_TYPE',
    pathType: pathType
  };
};

exports.setLedgerPathType = setLedgerPathType;

var setLedgerIndex = function setLedgerIndex(index) {
  return {
    type: 'SET_LEDGER_INDEX',
    index: index
  };
};

exports.setLedgerIndex = setLedgerIndex;