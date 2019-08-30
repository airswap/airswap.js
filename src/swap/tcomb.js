const t = require('tcomb-validation')
const { constants } = require('@airswap/order-utils')
const { Address, AtomicAmount, stringLiteral } = require('../tcombTypes')

const { ERC721_INTERFACE_ID, ERC20_INTERFACE_ID } = constants
const Kind = t.union([stringLiteral(ERC721_INTERFACE_ID), stringLiteral(ERC20_INTERFACE_ID)])

const Party = t.struct({
  wallet: Address,
  token: Address,
  param: AtomicAmount,
  kind: Kind,
})

const SignatureVersion = t.union([
  stringLiteral('0x45'), // personalSign
  stringLiteral('0x01'), // signTypedData
])

const Signature = t.struct({
  signer: Address,
  r: t.String,
  s: t.String,
  v: t.String,
  version: SignatureVersion,
})

const Order = t.struct({
  nonce: t.String,
  expiry: t.String,
  maker: Party,
  taker: Party,
  affiliate: Party,
  signature: Signature,
  swap: t.maybe(t.struct({ version: t.Number })),
})

const FlatOrder = t.Object

const QuoteParty = t.struct({
  token: Address,
  param: AtomicAmount,
})

const Quote = t.struct({
  affiliate: QuoteParty,
  maker: QuoteParty,
  taker: QuoteParty,
  swap: t.maybe(t.struct({ version: t.Number })),
})

const FlatQuote = t.Object

module.exports = { Order, Quote, FlatOrder, FlatQuote }
