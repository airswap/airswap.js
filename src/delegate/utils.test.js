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

/**
 * RULES FOR GENERATION
 * - decimal amounts for a display value must be less significant figures than the token decimals, or the conversion to & from atomic amounts will fail
 * - priceCoef in contract price can't be too large or the price will go to zero (need to find out the real max number)
 */

const initialDisplayPrice = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountDisplayValue: '25',
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

test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice', done =>
  getDisplayAmountsFromDisplayPrice(initialDisplayPrice)
    .then(displayAmounts => getDisplayPriceFromDisplayAmounts(displayAmounts))
    .then(displayPrice => {
      expect(displayPrice.senderAmountDisplayValue).toEqual(initialDisplayPrice.senderAmountDisplayValue)
      expect(displayPrice.priceDisplayValue).toEqual(initialDisplayPrice.priceDisplayValue)
      return done()
    }))

test('getDisplayAmountsFromDisplayPrice reverts getDisplayPriceFromDisplayAmounts', done =>
  getDisplayPriceFromDisplayAmounts(initialDisplayAmounts)
    .then(displayPrice => getDisplayAmountsFromDisplayPrice(displayPrice))
    .then(displayAmounts => {
      expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue)
      expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue)
      return done()
    }))

test('getAtomicAmountsFromDisplayAmounts reverts getDisplayAmountsFromAtomicAmounts', done =>
  getDisplayAmountsFromAtomicAmounts(initialAtomicAmounts)
    .then(displayAmounts => getAtomicAmountsFromDisplayAmounts(displayAmounts))
    .then(atomicAmounts => {
      expect(atomicAmounts.senderAmountAtomic).toEqual(initialAtomicAmounts.senderAmountAtomic)
      expect(atomicAmounts.signerAmountAtomic).toEqual(initialAtomicAmounts.signerAmountAtomic)
      return done()
    }))

test('getDisplayAmountsFromAtomicAmounts reverts getAtomicAmountsFromDisplayAmounts', done =>
  getAtomicAmountsFromDisplayAmounts(initialDisplayAmounts)
    .then(atomicAmounts => getDisplayAmountsFromAtomicAmounts(atomicAmounts))
    .then(displayAmounts => {
      expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue)
      expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue)
      return done()
    }))

test('getAtomicPriceFromAtomicAmounts reverts getAtomicAmountsFromAtomicPrice', done =>
  getAtomicAmountsFromAtomicPrice(initialAtomicPrice)
    .then(atomicAmounts => getAtomicPriceFromAtomicAmounts(atomicAmounts))
    .then(atomicPrice => {
      expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic)
      expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice)
      return done()
    }))

test('getAtomicAmountsFromAtomicPrice reverts getAtomicPriceFromAtomicAmounts', done =>
  getAtomicPriceFromAtomicAmounts(initialAtomicAmounts)
    .then(atomicPrice => getAtomicAmountsFromAtomicPrice(atomicPrice))
    .then(atomicAmounts => {
      expect(atomicAmounts.senderAmountDisplayValue).toEqual(initialAtomicAmounts.senderAmountDisplayValue)
      expect(atomicAmounts.signerAmountDisplayValue).toEqual(initialAtomicAmounts.signerAmountDisplayValue)
      return done()
    }))

test('getContractPriceFromAtomicPrice reverts getAtomicPriceFromContractPrice', done =>
  getAtomicPriceFromContractPrice(initialContractPrice)
    .then(atomicPrice => getContractPriceFromAtomicPrice(atomicPrice))
    .then(contractPrice => {
      expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount)
      expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef)
      expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp)
      return done()
    }))

test('getAtomicPriceFromContractPrice reverts getContractPriceFromAtomicPrice', done =>
  getContractPriceFromAtomicPrice(initialAtomicPrice)
    .then(contractPrice => getAtomicPriceFromContractPrice(contractPrice))
    .then(atomicPrice => {
      expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic)
      expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice)
      return done()
    }))

test('getContractPriceFromDisplayPrice reverts getDisplayPriceFromContractPrice', done =>
  getDisplayPriceFromContractPrice(initialContractPrice)
    .then(displayPrice => getContractPriceFromDisplayPrice(displayPrice))
    .then(contractPrice => {
      expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount)
      expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef)
      expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp)
      return done()
    }))

test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice', done =>
  getContractPriceFromDisplayPrice(initialDisplayPrice)
    .then(contractPrice => getDisplayPriceFromContractPrice(contractPrice))
    .then(displayPrice => {
      expect(displayPrice.senderAmountDisplayValue).toEqual(initialDisplayPrice.senderAmountDisplayValue)
      expect(displayPrice.priceDisplayValue).toEqual(initialDisplayPrice.priceDisplayValue)
      return done()
    }))
