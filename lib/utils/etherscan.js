"use strict";

var _ = require('lodash');

var _require = require('../constants'),
    NETWORK_NAME = _require.NETWORK_NAME;

function makeEtherscanURL(hash, type) {
  return "https://".concat(_.isUndefined(NETWORK_NAME) ? '' : "".concat(NETWORK_NAME, "."), "etherscan.io/").concat(type, "/").concat(hash);
}

function makeEtherscanAddress(address) {
  return makeEtherscanURL(address, 'address');
}

function makeEtherscanTransaction(tx) {
  return makeEtherscanURL(tx, 'tx');
}

function openEtherscanLink(hash, type) {
  window.open(makeEtherscanURL(hash, type));
}

module.exports = {
  openEtherscanLink: openEtherscanLink,
  makeEtherscanURL: makeEtherscanURL,
  makeEtherscanAddress: makeEtherscanAddress,
  makeEtherscanTransaction: makeEtherscanTransaction
};