"use strict";

var _ = require('lodash');

var t = require('tcomb-validation');

var _require = require('../tcombTypes'),
    Address = _require.Address,
    AtomicAmount = _require.AtomicAmount,
    UUID = _require.UUID,
    throwTypeError = _require.throwTypeError;

var _require2 = require('../swap/tcomb'),
    FlatOrder = _require2.FlatOrder,
    FlatQuote = _require2.FlatQuote;

var _require3 = require('../swapLegacy/tcomb'),
    LegacyOrder = _require3.LegacyOrder,
    LegacyQuote = _require3.LegacyQuote;

var Query = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAmount: t.maybe(AtomicAmount),
  takerAmount: t.maybe(AtomicAmount)
});
var QueryContext = t.struct({
  specifiedAmount: t.refinement(t.String, function (s) {
    return _.includes(['token', 'base'], s);
  }),
  side: t.refinement(t.String, function (s) {
    return _.includes(['buy', 'sell'], s);
  }),
  baseToken: t.String
});
var Intent = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAddress: Address
});
var DexIndexResponse = t.Object;
var DexIndexResponses = t.list(DexIndexResponse);
var Intents = t.list(Intent);
var OrderResponses = t.list(t.union([LegacyOrder, FlatOrder, FlatQuote]));
var QuoteResponses = t.list(t.union([LegacyQuote, FlatQuote]));
var CheckoutFrame = throwTypeError(t.struct({
  stackId: UUID,
  query: t.maybe(Query),
  queryContext: t.maybe(QueryContext),
  intents: t.maybe(Intents),
  orderResponses: OrderResponses,
  alternativeOrderResponses: OrderResponses,
  lowBalanceOrderResponses: OrderResponses,
  quoteResponses: QuoteResponses,
  alternativeQuoteResponses: QuoteResponses,
  timeoutReached: t.Boolean,
  allIntentsResolved: t.Boolean,
  selectedOrderId: t.String,
  isDexIndexQuerying: t.maybe(t.Boolean),
  dexIndexResponses: DexIndexResponses
}));
module.exports = {
  Query: Query,
  CheckoutFrame: CheckoutFrame
};