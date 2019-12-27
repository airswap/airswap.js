const { getDisplayAmountsFromDisplayPrice, getDisplayPriceFromDisplayAmounts } = require('./utils')

const tokenMetadata = require('../tokens')

beforeAll(() => tokenMetadata.ready)

const AST = '0x27054b13b1b798b345b591a4d22e6562d47ea75a'
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

describe('getDisplayAmountsFromDisplayPrice', () => {
  describe('given senderAmountDisplayValue and signerToken as base', () => {
    const senderDisplayPriceSell = {
      senderToken: AST, // AST
      signerToken: WETH, // WETH
      senderAmountDisplayValue: '1',
      priceDisplayValue: '0.0001',
    }

    const expectedResult = {
      senderToken: AST, // AST
      signerToken: WETH, // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayAmountsFromDisplayPrice(senderDisplayPriceSell)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
    })
  })

  describe('given senderAmountDisplayValue and senderToken as base', () => {
    const senderDisplayPriceBuy = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      priceDisplayValue: '0.0001',
    }

    const expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '10000',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayAmountsFromDisplayPrice(senderDisplayPriceBuy)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
    })
  })

  describe('given signerAmountDisplayValue and signerToken as base', () => {
    const signerDisplayPriceSell = {
      senderToken: AST,
      signerToken: WETH,
      signerAmountDisplayValue: '1',
      priceDisplayValue: '0.0001',
    }

    const expectedResult = {
      senderToken: AST,
      signerToken: WETH,
      signerAmountDisplayValue: '1',
      senderAmountDisplayValue: '10000',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayAmountsFromDisplayPrice(signerDisplayPriceSell)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
    })
  })

  describe('given signerAmountDisplayValue and senderToken as base', () => {
    const signerDisplayPriceBuy = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '1',
      priceDisplayValue: '0.0001',
    }

    const expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '1',
      senderAmountDisplayValue: '0.0001',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayAmountsFromDisplayPrice(signerDisplayPriceBuy)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
    })
  })
})

describe('getDisplayPriceFromDisplayAmounts', () => {
  describe('given signerToken as base', () => {
    const input = {
      senderToken: AST, // AST
      signerToken: WETH, // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001',
    }

    const expectedResult = {
      senderToken: AST, // AST
      signerToken: WETH, // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001',
      priceDisplayValue: '0.0001',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayPriceFromDisplayAmounts(input)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
      expect(computedResults.priceDisplayValue).toEqual(expectedResult.priceDisplayValue)
    })
  })

  describe('given senderToken as base', () => {
    const input = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '10000',
      senderAmountDisplayValue: '1',
    }

    const expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '10000',
      priceDisplayValue: '0.0001',
    }

    test('computes correct result', () => {
      const computedResults = getDisplayPriceFromDisplayAmounts(input)
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue)
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue)
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken)
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken)
      expect(computedResults.priceDisplayValue).toEqual(expectedResult.priceDisplayValue)
    })
  })
})
