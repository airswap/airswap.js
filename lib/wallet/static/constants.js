"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3WalletTypes = exports.walletByType = exports.walletTypes = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _walletTypes = _interopRequireDefault(require("./walletTypes.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var walletTypes = _walletTypes.default.map(function (wallet) {
  return wallet.type;
});

exports.walletTypes = walletTypes;

var walletByType = _lodash.default.keyBy(_walletTypes.default, 'type');

exports.walletByType = walletByType;
var web3WalletTypes = walletTypes.filter(function (walletType) {
  return !!walletByType[walletType].web3;
});
exports.web3WalletTypes = web3WalletTypes;