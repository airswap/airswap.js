const {
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
} = require('./utils')

const tokenMetadata = require('../tokens')

beforeAll(() => tokenMetadata.ready)

/**
 * RULES FOR GENERATION
 * - decimal amounts for a display value must be less significant figures than the token decimals, or the conversion to & from atomic amounts will fail
 * - priceCoef in contract price can't be too large or the price will go to zero (need to find out the real max number)
 */

const initialSenderDisplayPriceSell = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a', // AST
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  senderAmountDisplayValue: '1',
  priceDisplayValue: '0.0001',
}

const initialSenderDisplayPriceBuy = {
  signerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a', // AST
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  senderAmountDisplayValue: '1',
  priceDisplayValue: '0.0001',
}

const initialSignerDisplayPriceSell = {
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerToken: '0x123ab195dd38b1b40510d467a6a359b201af056f',
  signerAmountDisplayValue: '1',
  priceDisplayValue: '0.0001',
}

const initialSignerDisplayPriceBuy = {
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderToken: '0x123ab195dd38b1b40510d467a6a359b201af056f',
  signerAmountDisplayValue: '1',
  priceDisplayValue: '0.0001',
}

const initialDisplayPriceSignerValue = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerAmountDisplayValue: '25',
  priceDisplayValue: '0.5',
}

const initialDisplayAmounts = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountDisplayValue: '500',
  signerAmountDisplayValue: '15',
}

const initialAtomicAmounts = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountAtomic: '87624875628764852158',
  signerAmountAtomic: '476582634',
}

const initialAtomicPrice = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountAtomic: '87624875628764852158',
  atomicPrice: '87624875.628764852158',
}

const initialContractPrice = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxSenderAmount: '7634534',
  priceCoef: '1',
  priceExp: '0',
}

describe('every function has a reversal function', () => {
  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (signerAmountDisplayValue & Sell)', () => {
    const displayAmounts = getDisplayAmountsFromDisplayPrice(initialSignerDisplayPriceSell)
    const displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts)
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceSell.signerAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceSell.priceDisplayValue)
  })

  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (signerAmountDisplayValue & Buy)', () => {
    const displayAmounts = getDisplayAmountsFromDisplayPrice(initialSignerDisplayPriceBuy)
    const displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts)
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceBuy.signerAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceBuy.priceDisplayValue)
  })

  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (with senderAmountDisplayValue & Sell)', () => {
    const displayAmounts = getDisplayAmountsFromDisplayPrice(initialSenderDisplayPriceSell)
    const displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts)
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceSell.senderAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceSell.priceDisplayValue)
  })

  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (with senderAmountDisplayValue & Buy)', () => {
    const displayAmounts = getDisplayAmountsFromDisplayPrice(initialSenderDisplayPriceBuy)
    const displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts)
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceBuy.senderAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceBuy.priceDisplayValue)
  })

  test('getDisplayAmountsFromDisplayPrice reverts getDisplayPriceFromDisplayAmounts', () => {
    const displayAmounts = getDisplayAmountsFromDisplayPrice(getDisplayPriceFromDisplayAmounts(initialDisplayAmounts))
    expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue)
    expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue)
  })

  test('getAtomicAmountsFromDisplayAmounts reverts getDisplayAmountsFromAtomicAmounts', () => {
    const atomicAmounts = getAtomicAmountsFromDisplayAmounts(getDisplayAmountsFromAtomicAmounts(initialAtomicAmounts))
    expect(atomicAmounts.senderAmountAtomic).toEqual(initialAtomicAmounts.senderAmountAtomic)
    expect(atomicAmounts.signerAmountAtomic).toEqual(initialAtomicAmounts.signerAmountAtomic)
  })

  test('getDisplayAmountsFromAtomicAmounts reverts getAtomicAmountsFromDisplayAmounts', () => {
    const displayAmounts = getDisplayAmountsFromAtomicAmounts(getAtomicAmountsFromDisplayAmounts(initialDisplayAmounts))
    expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue)
    expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue)
  })

  test('getAtomicPriceFromAtomicAmounts reverts getAtomicAmountsFromAtomicPrice', () => {
    const atomicPrice = getAtomicPriceFromAtomicAmounts(getAtomicAmountsFromAtomicPrice(initialAtomicPrice))
    expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic)
    expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice)
  })

  test('getAtomicAmountsFromAtomicPrice reverts getAtomicPriceFromAtomicAmounts', () => {
    const atomicAmounts = getAtomicAmountsFromAtomicPrice(getAtomicPriceFromAtomicAmounts(initialAtomicAmounts))
    expect(atomicAmounts.senderAmountDisplayValue).toEqual(initialAtomicAmounts.senderAmountDisplayValue)
    expect(atomicAmounts.signerAmountDisplayValue).toEqual(initialAtomicAmounts.signerAmountDisplayValue)
  })

  test('getContractPriceFromAtomicPrice reverts getAtomicPriceFromContractPrice', () => {
    const contractPrice = getContractPriceFromAtomicPrice(getAtomicPriceFromContractPrice(initialContractPrice))
    expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount)
    expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef)
    expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp)
  })

  test('getAtomicPriceFromContractPrice reverts getContractPriceFromAtomicPrice', () => {
    const atomicPrice = getAtomicPriceFromContractPrice(getContractPriceFromAtomicPrice(initialAtomicPrice))
    expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic)
    expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice)
  })

  test('getContractPriceFromDisplayPrice reverts getDisplayPriceFromContractPrice', () => {
    const contractPrice = getContractPriceFromDisplayPrice(getDisplayPriceFromContractPrice(initialContractPrice))
    expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount)
    expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef)
    expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp)
  })

  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified sender amount (Sell)', () => {
    const displayPrice = getDisplayPriceFromContractPrice(
      getContractPriceFromDisplayPrice(initialSenderDisplayPriceSell),
    )
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceSell.senderAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceSell.priceDisplayValue)
  })

  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified sender amount (Buy)', () => {
    const displayPrice = getDisplayPriceFromContractPrice(
      getContractPriceFromDisplayPrice(initialSenderDisplayPriceBuy),
    )
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceBuy.senderAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceBuy.priceDisplayValue)
  })

  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount', () => {
    const displayPrice = getDisplayPriceFromContractPrice(
      getContractPriceFromDisplayPrice(initialDisplayPriceSignerValue),
    )
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialDisplayPriceSignerValue.signerAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialDisplayPriceSignerValue.priceDisplayValue)
  })

  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount (Sell)', () => {
    const displayPrice = getDisplayPriceFromContractPrice(
      getContractPriceFromDisplayPrice(initialSignerDisplayPriceSell),
    )
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceSell.signerAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceSell.priceDisplayValue)
  })

  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount (Buy)', () => {
    const displayPrice = getDisplayPriceFromContractPrice(
      getContractPriceFromDisplayPrice(initialSignerDisplayPriceBuy),
    )
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceBuy.signerAmountDisplayValue)
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceBuy.priceDisplayValue)
  })
})
