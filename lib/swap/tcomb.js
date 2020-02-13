"use strict";

var t = require('tcomb-validation');

var _require = require('@airswap/order-utils'),
    constants = _require.constants;

var _require2 = require('../tcombTypes'),
    Address = _require2.Address,
    AtomicAmount = _require2.AtomicAmount,
    stringLiteral = _require2.stringLiteral,
    throwTypeError = _require2.throwTypeError;

var _require3 = require('../constants'),
    SWAP_CONTRACT_ADDRESS = _require3.SWAP_CONTRACT_ADDRESS;

var ERC721_INTERFACE_ID = constants.ERC721_INTERFACE_ID,
    ERC20_INTERFACE_ID = constants.ERC20_INTERFACE_ID;
var Kind = t.union([stringLiteral(ERC721_INTERFACE_ID), stringLiteral(ERC20_INTERFACE_ID)]);
var Party = t.struct({
  wallet: Address,
  token: Address,
  amount: AtomicAmount,
  id: AtomicAmount,
  kind: Kind
});
var SignatureVersion = t.union([stringLiteral('0x45'), // personalSign
stringLiteral('0x01')]);
var Signature = t.struct({
  signatory: Address,
  validator: stringLiteral(SWAP_CONTRACT_ADDRESS),
  r: t.String,
  s: t.String,
  v: t.String,
  version: SignatureVersion
});
var Order = throwTypeError(t.struct({
  nonce: t.String,
  expiry: t.String,
  maker: Party,
  taker: Party,
  affiliate: Party,
  signature: Signature,
  swap: t.maybe(t.struct({
    version: t.Number
  })),
  locator: t.maybe(t.Object)
}));
var FlatOrder = t.Object;
var QuoteParty = t.struct({
  wallet: t.maybe(Address),
  token: Address,
  amount: AtomicAmount,
  id: t.maybe(AtomicAmount),
  kind: Kind
});
var Quote = throwTypeError(t.struct({
  maker: QuoteParty,
  taker: QuoteParty,
  swap: t.maybe(t.struct({
    version: t.Number
  })),
  locator: t.maybe(t.Object),
  nonce: t.maybe(t.String)
}));
var FlatQuote = t.Object;
module.exports = {
  Order: Order,
  Quote: Quote,
  FlatOrder: FlatOrder,
  FlatQuote: FlatQuote
};