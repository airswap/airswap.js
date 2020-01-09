"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSigner = exports.connectWallet = exports.clearWallet = exports.initWalletLink = exports.initTrezor = exports.initLedger = exports.initPrivateKeySigner = exports.initMobileWallet = exports.initEqual = exports.initFortmatic = exports.initPortis = exports.initMetamask = void 0;

var _redux = require("../../utils/redux");

/**
 * @typedef {('metamask' | 'portis' | 'privateKey' | 'web3')} WalletType
 * @description The type of wallet being connected
 * @memberof wallet
 */
var initMetamask = function initMetamask() {
  return connectWallet('metamask');
};

exports.initMetamask = initMetamask;

var initPortis = function initPortis() {
  return connectWallet('portis');
};

exports.initPortis = initPortis;

var initFortmatic = function initFortmatic() {
  return connectWallet('fortmatic');
};

exports.initFortmatic = initFortmatic;

var initEqual = function initEqual() {
  return connectWallet('equal');
};

exports.initEqual = initEqual;

var initMobileWallet = function initMobileWallet() {
  return connectWallet('web3');
};

exports.initMobileWallet = initMobileWallet;

var initPrivateKeySigner = function initPrivateKeySigner() {
  return connectWallet('privateKey');
};

exports.initPrivateKeySigner = initPrivateKeySigner;

var initLedger = function initLedger() {
  return connectWallet('ledger');
};

exports.initLedger = initLedger;

var initTrezor = function initTrezor() {
  return connectWallet('trezor');
};

exports.initTrezor = initTrezor;

var initWalletLink = function initWalletLink() {
  return connectWallet('walletLink');
};

exports.initWalletLink = initWalletLink;

var clearWallet = function clearWallet() {
  return {
    type: 'CLEAR_WALLET'
  };
};

exports.clearWallet = clearWallet;

var connectWallet = function connectWallet(walletType) {
  var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    type: 'CONNECT_WALLET',
    walletType: walletType,
    requireAuth: requireAuth
  };
};

exports.connectWallet = connectWallet;
var getSigner = (0, _redux.makePromiseAction)({
  type: 'GET_SIGNER'
});
exports.getSigner = getSigner;