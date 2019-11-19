const bn = require('bignumber.js')
const tokenMetadata = require('../tokens')
const _ = require('lodash')

bn.set({ DECIMAL_PLACES: 18, ROUNDING_MODE: 4 })

// TODO: work through & apply this optimizing function after fast-check has been integrated in the tests (https://github.com/dubzzz/fast-check)
// const PRECISION = 128
// const precision = str => {
//   const precisionStr = bn(str).toFixed(PRECISION)
//   const cutInsignificantDecimals = precisionStr.slice(0, precisionStr.length - 32)
//   const trimZero = _.trimEnd(cutInsignificantDecimals, '0') || '0'
//   const trimDot = _.trimEnd(trimZero, '.')
//   return trimDot
// }

const precision = str => (str.toString ? str.toString() : str)

/** ***
 * MAPPING DISPLAY PRICES TO CONTRACT PRICES
 */

async function getDisplayAmountsFromDisplayPrice({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  priceDisplayValue,
}) {
  await tokenMetadata.ready
  let signerAmountDisplayValue

  if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
    signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).div(priceDisplayValue))
  } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
    signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).mul(priceDisplayValue))
  } else {
    throw new Error('unable to calculate baseAsset')
  }

  return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue }
}

async function getAtomicAmountsFromDisplayAmounts({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  signerAmountDisplayValue,
}) {
  await tokenMetadata.ready
  const senderAmountAtomic = tokenMetadata.formatAtomicValueByToken({ address: senderToken }, senderAmountDisplayValue)
  const signerAmountAtomic = tokenMetadata.formatAtomicValueByToken(
    //eslint-disable-line
    { address: signerToken },
    signerAmountDisplayValue,
  )
  return { senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }
}

async function getAtomicPriceFromAtomicAmounts({ senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }) {
  const priceAtomic = bn(senderAmountAtomic).div(signerAmountAtomic)
  return { senderToken, signerToken, senderAmountAtomic, atomicPrice: priceAtomic.toString() }
}

async function getContractPriceFromAtomicPrice({ senderToken, signerToken, senderAmountAtomic, atomicPrice }) {
  const [int, decimalVal] = atomicPrice.split('.') // eslint-disable-line'
  const decimal = decimalVal || ''
  let priceExp
  if (decimal === '') {
    priceExp = 0
  } else {
    priceExp = decimal.length
  }
  const priceCoef = _.trimStart(`${int}${decimal}`, '0')
  // check
  const priceCheck = bn(priceCoef)
    .times(bn(10).pow(-priceExp))
    .toString()
  if (atomicPrice === priceCheck) {
    // if calulation checks out, return values
    return {
      senderToken,
      signerToken,
      maxSenderAmount: senderAmountAtomic,
      priceCoef,
      priceExp: `${priceExp}`,
    }
  }

  throw new Error('error calculating contract price')
}

async function getContractPriceFromDisplayPrice({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  priceDisplayValue,
}) {
  const displayAmounts = await getDisplayAmountsFromDisplayPrice({
    senderToken,
    signerToken,
    senderAmountDisplayValue,
    priceDisplayValue,
  })

  const atomicAmounts = await getAtomicAmountsFromDisplayAmounts(displayAmounts)

  const atomicPrice = await getAtomicPriceFromAtomicAmounts(atomicAmounts)

  const contractPrice = await getContractPriceFromAtomicPrice(atomicPrice)

  return contractPrice
}

/** ***
 * MAPPING CONTRACT PRICES TO DISPLAY PRICES
 */

async function getAtomicPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) {
  const atomicPrice = bn(priceCoef)
    .times(bn(10).pow(-Number(priceExp)))
    .toString()

  if (atomicPrice === '0') {
    throw new Error('atomicPrice cannot be 0')
  }
  return { senderToken, signerToken, senderAmountAtomic: maxSenderAmount, atomicPrice }
}

async function getAtomicAmountsFromAtomicPrice({ senderToken, signerToken, senderAmountAtomic, atomicPrice }) {
  const signerAmountAtomic = bn(senderAmountAtomic)
    .div(atomicPrice)
    .toFixed(0)
    .toString()
  return { senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }
}

async function getDisplayAmountsFromAtomicAmounts({
  senderToken,
  signerToken,
  senderAmountAtomic,
  signerAmountAtomic,
}) {
  await tokenMetadata.ready
  const signerAmountDisplayValue = tokenMetadata.formatFullValueByToken({ address: signerToken }, signerAmountAtomic)
  const senderAmountDisplayValue = tokenMetadata.formatFullValueByToken({ address: senderToken }, senderAmountAtomic)
  return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue }
}

async function getDisplayPriceFromDisplayAmounts({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  signerAmountDisplayValue,
}) {
  await tokenMetadata.ready

  let priceDisplayValue
  if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
    priceDisplayValue = precision(bn(senderAmountDisplayValue).div(signerAmountDisplayValue), 24)
  } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
    priceDisplayValue = precision(bn(signerAmountDisplayValue).div(senderAmountDisplayValue), 24)
  } else {
    throw new Error('unable to calculate baseAsset')
  }

  return {
    senderToken,
    signerToken,
    senderAmountDisplayValue,
    priceDisplayValue,
  }
}

async function getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) {
  const atomicPrice = await getAtomicPriceFromContractPrice({
    senderToken,
    signerToken,
    maxSenderAmount,
    priceCoef,
    priceExp,
  })

  const atomicAmounts = await getAtomicAmountsFromAtomicPrice(atomicPrice)

  const displayAmounts = await getDisplayAmountsFromAtomicAmounts(atomicAmounts)

  const displayPrice = await getDisplayPriceFromDisplayAmounts(displayAmounts)

  return displayPrice
}

/** ***
 * EXPORTS
 */

module.exports = {
  getDisplayAmountsFromDisplayPrice,
  getAtomicAmountsFromDisplayAmounts,
  getAtomicPriceFromAtomicAmounts,
  getContractPriceFromAtomicPrice,
  getContractPriceFromDisplayPrice,
  getAtomicPriceFromContractPrice,
  getAtomicAmountsFromAtomicPrice,
  getDisplayAmountsFromAtomicAmounts,
  getDisplayPriceFromDisplayAmounts,
  getDisplayPriceFromContractPrice,
}
