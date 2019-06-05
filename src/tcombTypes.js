const _ = require('lodash')
const t = require('tcomb-validation')
const validator = require('validator')
const { GAS_LEVELS, FIAT_CURRENCIES } = require('./constants')

function isAddress(str) {
  return /^0x[a-f0-9]{40}$/.test(str)
}

function isAtomicAmount(str) {
  return /^[0-9]{1,}$/.test(str)
}

const Address = t.refinement(t.String, isAddress)
const AtomicAmount = t.refinement(t.String, isAtomicAmount)
const UUID = t.refinement(t.String, validator.isUUID)

const Order = t.struct({
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
})

const Quote = t.struct({
  makerAddress: Address,
  makerToken: Address,
  takerToken: Address,
  makerAmount: AtomicAmount,
  takerAmount: AtomicAmount,
})

const Query = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAmount: t.maybe(AtomicAmount),
  takerAmount: t.maybe(AtomicAmount),
})

const QueryContext = t.struct({
  specifiedAmount: t.refinement(t.String, s => _.includes(['token', 'base'], s)),
  side: t.refinement(t.String, s => _.includes(['buy', 'sell'], s)),
})

const Intent = t.struct({
  makerToken: Address,
  takerToken: Address,
  makerAddress: Address,
})

const DexIndexResponse = t.Object

const DexIndexResponses = t.list(DexIndexResponse)

const Intents = t.list(Intent)

const OrderResponses = t.list(Order)

const QuoteResponses = t.list(Quote)

const CheckoutFrame = t.struct({
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
})

const gasLevel = t.refinement(t.String, s => _.includes(GAS_LEVELS, s))

const Currency = t.refinement(t.String, s => _.includes(Object.keys(FIAT_CURRENCIES), s))

module.exports = { Address, Query, CheckoutFrame, gasLevel, Currency, Quote, Order }
