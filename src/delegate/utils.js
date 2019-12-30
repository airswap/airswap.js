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

function getDisplayAmountsFromDisplayPrice(params) {
  const { senderToken, signerToken, priceDisplayValue, baseToken } = params
  if (params.senderAmountDisplayValue) {
    const { senderAmountDisplayValue } = params
    let signerAmountDisplayValue

    if (baseToken === senderToken) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).div(priceDisplayValue))
    } else if (baseToken === signerToken) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).mul(priceDisplayValue))
    } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).div(priceDisplayValue))
    } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).mul(priceDisplayValue))
    } else {
      throw new Error('unable to calculate baseAsset')
    }

    return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue }
  } else if (params.signerAmountDisplayValue) {
    const { signerAmountDisplayValue } = params
    let senderAmountDisplayValue

    if (baseToken === senderToken) {
      senderAmountDisplayValue = precision(bn(signerAmountDisplayValue).mul(priceDisplayValue))
    } else if (baseToken === signerToken) {
      senderAmountDisplayValue = precision(bn(signerAmountDisplayValue).div(priceDisplayValue))
    } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
      senderAmountDisplayValue = precision(bn(signerAmountDisplayValue).mul(priceDisplayValue))
    } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
      senderAmountDisplayValue = precision(bn(signerAmountDisplayValue).div(priceDisplayValue))
    } else {
      throw new Error('unable to calculate baseAsset')
    }

    return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue }
  }
}

function getAtomicAmountsFromDisplayAmounts({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  signerAmountDisplayValue,
}) {
  const senderAmountAtomic = tokenMetadata.formatAtomicValueByToken({ address: senderToken }, senderAmountDisplayValue)
  const signerAmountAtomic = tokenMetadata.formatAtomicValueByToken(
    //eslint-disable-line
    { address: signerToken },
    signerAmountDisplayValue,
  )
  return { senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }
}

function getAtomicPriceFromAtomicAmounts({ senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }) {
  const priceAtomic = bn(signerAmountAtomic).div(senderAmountAtomic)
  return { senderToken, signerToken, senderAmountAtomic, atomicPrice: priceAtomic.toString() }
}

function getContractPriceFromAtomicPrice({ senderToken, signerToken, senderAmountAtomic, atomicPrice }) {
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

function getContractPriceFromDisplayPrice({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  signerAmountDisplayValue,
  priceDisplayValue,
  baseToken,
}) {
  const displayAmounts = getDisplayAmountsFromDisplayPrice({
    senderToken,
    signerToken,
    senderAmountDisplayValue,
    signerAmountDisplayValue,
    priceDisplayValue,
    baseToken,
  })

  const atomicAmounts = getAtomicAmountsFromDisplayAmounts(displayAmounts)

  const atomicPrice = getAtomicPriceFromAtomicAmounts(atomicAmounts)

  const contractPrice = getContractPriceFromAtomicPrice(atomicPrice)

  return contractPrice
}

/** ***
 * MAPPING CONTRACT PRICES TO DISPLAY PRICES
 */

function getAtomicPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) {
  const atomicPrice = bn(priceCoef)
    .times(bn(10).pow(-Number(priceExp)))
    .toString()

  return { senderToken, signerToken, senderAmountAtomic: maxSenderAmount, atomicPrice }
}

function getAtomicAmountsFromAtomicPrice({ senderToken, signerToken, senderAmountAtomic, atomicPrice }) {
  const signerAmountAtomic = bn(senderAmountAtomic)
    .mul(atomicPrice)
    .toFixed(0)
    .toString()
  return { senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }
}

function getDisplayAmountsFromAtomicAmounts({ senderToken, signerToken, senderAmountAtomic, signerAmountAtomic }) {
  const signerAmountDisplayValue = tokenMetadata.formatFullValueByToken({ address: signerToken }, signerAmountAtomic)
  const senderAmountDisplayValue = tokenMetadata.formatFullValueByToken({ address: senderToken }, senderAmountAtomic)
  return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue }
}

function getDisplayPriceFromDisplayAmounts({
  senderToken,
  signerToken,
  senderAmountDisplayValue,
  signerAmountDisplayValue,
  baseToken,
}) {
  let priceDisplayValue

  if (senderToken === baseToken) {
    priceDisplayValue = precision(bn(senderAmountDisplayValue).div(signerAmountDisplayValue), 24)
  } else if (signerToken === baseToken) {
    priceDisplayValue = precision(bn(signerAmountDisplayValue).div(senderAmountDisplayValue), 24)
  } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
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
    signerAmountDisplayValue,
    priceDisplayValue,
  }
}

function getDisplayPriceFromContractPrice({
  senderToken,
  signerToken,
  maxSenderAmount,
  priceCoef,
  priceExp,
  baseToken,
}) {
  const atomicPrice = getAtomicPriceFromContractPrice({
    senderToken,
    signerToken,
    maxSenderAmount,
    priceCoef,
    priceExp,
  })

  const atomicAmounts = getAtomicAmountsFromAtomicPrice(atomicPrice)

  const displayAmounts = getDisplayAmountsFromAtomicAmounts(atomicAmounts)

  const displayPrice = getDisplayPriceFromDisplayAmounts({ ...displayAmounts, baseToken })

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
