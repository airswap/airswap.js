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

const stringLiteral = str => t.refinement(t.String, val => val === str)

const gasLevel = t.refinement(t.String, s => _.includes(GAS_LEVELS, s))

const Currency = t.refinement(t.String, s => _.includes(Object.keys(FIAT_CURRENCIES), s))

module.exports = { Address, gasLevel, Currency, AtomicAmount, stringLiteral, UUID }
