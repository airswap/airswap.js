"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelHDWInitialization = exports.setHDWSubPath = exports.setHDWPageOffset = exports.prevHDWAccounts = exports.nextHDWAccounts = exports.confirmHDWPath = exports.initializeHDW = void 0;

var initializeHDW = function initializeHDW(walletType, path) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: 'INITIALIZE_HDW',
        walletType: walletType,
        path: path,
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.initializeHDW = initializeHDW;

var confirmHDWPath = function confirmHDWPath(path, pathIndex) {
  return {
    type: 'CONFIRM_HDW_PATH',
    path: path,
    pathIndex: pathIndex
  };
};

exports.confirmHDWPath = confirmHDWPath;

var nextHDWAccounts = function nextHDWAccounts() {
  return {
    type: 'NEXT_HDW_ACCOUNTS'
  };
};

exports.nextHDWAccounts = nextHDWAccounts;

var prevHDWAccounts = function prevHDWAccounts() {
  return {
    type: 'PREV_HDW_ACCOUNTS'
  };
};

exports.prevHDWAccounts = prevHDWAccounts;

var setHDWPageOffset = function setHDWPageOffset(pageOffset) {
  return {
    type: 'SET_HDW_PAGE_OFFSET',
    pageOffset: pageOffset
  };
};

exports.setHDWPageOffset = setHDWPageOffset;

var setHDWSubPath = function setHDWSubPath(path) {
  return {
    type: 'SET_HDW_SUBPATH',
    path: path
  };
};

exports.setHDWSubPath = setHDWSubPath;

var cancelHDWInitialization = function cancelHDWInitialization() {
  return {
    type: 'CANCEL_HDW_INITIALIZATION'
  };
};

exports.cancelHDWInitialization = cancelHDWInitialization;