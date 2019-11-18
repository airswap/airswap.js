const bn = require('bignumber.js')
const tokenMetadata = require('../tokens')
const _ = require('lodash')

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
    signerAmountDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: signerToken },
      Number(senderAmountDisplayValue) / Number(priceDisplayValue),
    )
  } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
    signerAmountDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: signerToken },
      Number(senderAmountDisplayValue) * Number(priceDisplayValue),
    )
  } else {
    throw new Error('unable to calculate baseAsset')
  }

  return { senderToken, signerToken, senderAmountDisplayValue, signerAmountDisplayValue: `${signerAmountDisplayValue}` }
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
      priceExp,
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
  return getContractPriceFromAtomicPrice(
    await getAtomicPriceFromAtomicAmounts(
      await getAtomicAmountsFromDisplayAmounts(
        await getDisplayAmountsFromDisplayPrice({
          senderToken,
          signerToken,
          senderAmountDisplayValue,
          priceDisplayValue,
        }),
      ),
    ),
  )
}

/** ***
 * MAPPING CONTRACT PRICES TO DISPLAY PRICES
 */

async function getAtomicPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) {
  const atomicPrice = bn(priceCoef)
    .times(bn(10).pow(-Number(priceExp)))
    .toString()
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
  const signerAmountDisplayValue = tokenMetadata.formatDisplayValueByToken({ address: signerToken }, signerAmountAtomic)
  const senderAmountDisplayValue = tokenMetadata.formatDisplayValueByToken({ address: senderToken }, senderAmountAtomic)
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
    priceDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: signerToken },
      Number(senderAmountDisplayValue) / Number(signerAmountDisplayValue),
    )
  } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
    priceDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: signerToken },
      Number(signerAmountDisplayValue) / Number(senderAmountDisplayValue),
    )
  } else {
    throw new Error('unable to calculate baseAsset')
  }

  return {
    senderToken,
    signerToken,
    senderAmountDisplayValue: `${senderAmountDisplayValue}`,
    priceDisplayValue: `${priceDisplayValue}`,
  }
}

async function getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) {
  return getDisplayPriceFromDisplayAmounts(
    await getDisplayAmountsFromAtomicAmounts(
      await getAtomicAmountsFromAtomicPrice(
        await getAtomicPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }),
      ),
    ),
  )
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
