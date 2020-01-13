"use strict";

var t = require('tcomb-validation');

var _require = require('../tcombTypes'),
    Address = _require.Address,
    AtomicAmount = _require.AtomicAmount,
    throwTypeError = _require.throwTypeError;

var LegacyOrder = throwTypeError(t.struct({
  makerAddress: Address,
  makerToken: Address,
  takerAddress: Address,
  takerToken: Address,
  makerAmount: AtomicAmount,
  takerAmount: AtomicAmount,
  nonce: t.String,
  expiration: t.Number,
  v: t.Number,
  r: t.String,
  s: t.String,
  swapVersion: t.Number
}));
var LegacyQuote = throwTypeError(t.struct({
  makerAddress: Address,
  makerToken: Address,
  takerToken: Address,
  makerAmount: AtomicAmount,
  takerAmount: AtomicAmount
}));
module.exports = {
  LegacyQuote: LegacyQuote,
  LegacyOrder: LegacyOrder
};