const _ = require('lodash')
const t = require('tcomb-validation')
const { Address, AtomicAmount, UUID, throwTypeError } = require('../tcombTypes')
const { FlatOrder, FlatQuote } = require('../swap/tcomb')
const { LegacyOrder, LegacyQuote } = require('../swapLegacy/tcomb')

const Query = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAmount: t.maybe(AtomicAmount),
  takerAmount: t.maybe(AtomicAmount),
})

const QueryContext = t.struct({
  specifiedAmount: t.refinement(t.String, s => _.includes(['token', 'base'], s)),
  side: t.refinement(t.String, s => _.includes(['buy', 'sell'], s)),
  baseToken: t.String,
})

const Intent = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAddress: Address,
})

const DexIndexResponse = t.Object

const DexIndexResponses = t.list(DexIndexResponse)

const Intents = t.list(Intent)

const OrderResponses = t.list(t.union([LegacyOrder, FlatOrder, FlatQuote]))

const QuoteResponses = t.list(t.union([LegacyQuote, FlatQuote]))

const CheckoutFrame = throwTypeError(
  t.struct({
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
    dexIndexResponses: DexIndexResponses,
  }),
)

module.exports = { Query, CheckoutFrame }
