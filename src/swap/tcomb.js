const t = require('tcomb-validation')
const { constants } = require('@airswap/order-utils')
const { Address, AtomicAmount, stringLiteral, throwTypeError } = require('../tcombTypes')

const { ERC721_INTERFACE_ID, ERC20_INTERFACE_ID } = constants

const Kind = t.union([stringLiteral(ERC721_INTERFACE_ID), stringLiteral(ERC20_INTERFACE_ID)])

const Party = t.struct({
  wallet: Address,
  token: Address,
  amount: AtomicAmount,
  id: AtomicAmount,
  kind: Kind,
})

const SignatureVersion = t.union([
  stringLiteral('0x45'), // personalSign
  stringLiteral('0x01'), // signTypedData
])

const Signature = t.struct({
  signatory: Address,
  validator: Address,
  r: t.String,
  s: t.String,
  v: t.String,
  version: SignatureVersion,
})

const Order = throwTypeError(
  t.struct({
    nonce: t.String,
    expiry: t.String,
    maker: Party,
    taker: Party,
    affiliate: Party,
    signature: Signature,
    swap: t.maybe(t.struct({ version: t.Number })),
    locator: t.maybe(t.Object),
  }),
)

const FlatOrder = t.Object

const QuoteParty = t.struct({
  wallet: t.maybe(Address),
  token: Address,
  amount: AtomicAmount,
  id: t.maybe(AtomicAmount),
  kind: Kind,
})

const Quote = throwTypeError(
  t.struct({
    maker: QuoteParty,
    taker: QuoteParty,
    swap: t.maybe(t.struct({ version: t.Number })),
    locator: t.maybe(t.Object),
    nonce: t.maybe(t.String),
  }),
)

const FlatQuote = t.Object

module.exports = { Order, Quote, FlatOrder, FlatQuote }
