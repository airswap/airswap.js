const t = require('tcomb-validation')
const { Address, AtomicAmount } = require('../tcombTypes')

const LegacyOrder = t.struct({
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
  swapVersion: t.Number,
})

const LegacyQuote = t.struct({
  makerAddress: Address,
  makerToken: Address,
  takerToken: Address,
  makerAmount: AtomicAmount,
  takerAmount: AtomicAmount,
})

module.exports = { LegacyQuote, LegacyOrder }
