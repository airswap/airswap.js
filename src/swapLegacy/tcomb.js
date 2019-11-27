const t = require('tcomb-validation')
const { Address, AtomicAmount, throwTypeError } = require('../tcombTypes')

const LegacyOrder = throwTypeError(
  t.struct({
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
  }),
)

const LegacyQuote = throwTypeError(
  t.struct({
    makerAddress: Address,
    makerToken: Address,
    takerToken: Address,
    makerAmount: AtomicAmount,
    takerAmount: AtomicAmount,
  }),
)

module.exports = { LegacyQuote, LegacyOrder }
