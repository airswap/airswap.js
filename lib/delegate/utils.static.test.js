"use strict";

var _require = require('./utils'),
    getDisplayAmountsFromDisplayPrice = _require.getDisplayAmountsFromDisplayPrice,
    getDisplayPriceFromDisplayAmounts = _require.getDisplayPriceFromDisplayAmounts;

var tokenMetadata = require('../tokens');

beforeAll(function () {
  return tokenMetadata.ready;
});
var AST = '0x27054b13b1b798b345b591a4d22e6562d47ea75a';
var WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
describe('getDisplayAmountsFromDisplayPrice', function () {
  describe('given senderAmountDisplayValue and signerToken as base', function () {
    var senderDisplayPriceSell = {
      senderToken: AST,
      // AST
      signerToken: WETH,
      // WETH
      senderAmountDisplayValue: '1',
      priceDisplayValue: '0.0001'
    };
    var expectedResult = {
      senderToken: AST,
      // AST
      signerToken: WETH,
      // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayAmountsFromDisplayPrice(senderDisplayPriceSell);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
    });
  });
  describe('given senderAmountDisplayValue and senderToken as base', function () {
    var senderDisplayPriceBuy = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      priceDisplayValue: '0.0001'
    };
    var expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '10000'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayAmountsFromDisplayPrice(senderDisplayPriceBuy);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
    });
  });
  describe('given signerAmountDisplayValue and signerToken as base', function () {
    var signerDisplayPriceSell = {
      senderToken: AST,
      signerToken: WETH,
      signerAmountDisplayValue: '1',
      priceDisplayValue: '0.0001'
    };
    var expectedResult = {
      senderToken: AST,
      signerToken: WETH,
      signerAmountDisplayValue: '1',
      senderAmountDisplayValue: '10000'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayAmountsFromDisplayPrice(signerDisplayPriceSell);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
    });
  });
  describe('given signerAmountDisplayValue and senderToken as base', function () {
    var signerDisplayPriceBuy = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '1',
      priceDisplayValue: '0.0001'
    };
    var expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '1',
      senderAmountDisplayValue: '0.0001'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayAmountsFromDisplayPrice(signerDisplayPriceBuy);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
    });
  });
});
describe('getDisplayPriceFromDisplayAmounts', function () {
  describe('given signerToken as base', function () {
    var input = {
      senderToken: AST,
      // AST
      signerToken: WETH,
      // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001'
    };
    var expectedResult = {
      senderToken: AST,
      // AST
      signerToken: WETH,
      // WETH
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '0.0001',
      priceDisplayValue: '0.0001'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayPriceFromDisplayAmounts(input);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
      expect(computedResults.priceDisplayValue).toEqual(expectedResult.priceDisplayValue);
    });
  });
  describe('given senderToken as base', function () {
    var input = {
      signerToken: AST,
      senderToken: WETH,
      signerAmountDisplayValue: '10000',
      senderAmountDisplayValue: '1'
    };
    var expectedResult = {
      signerToken: AST,
      senderToken: WETH,
      senderAmountDisplayValue: '1',
      signerAmountDisplayValue: '10000',
      priceDisplayValue: '0.0001'
    };
    test('computes correct result', function () {
      var computedResults = getDisplayPriceFromDisplayAmounts(input);
      expect(computedResults.signerAmountDisplayValue).toEqual(expectedResult.signerAmountDisplayValue);
      expect(computedResults.senderAmountDisplayValue).toEqual(expectedResult.senderAmountDisplayValue);
      expect(computedResults.senderToken).toEqual(expectedResult.senderToken);
      expect(computedResults.signerToken).toEqual(expectedResult.signerToken);
      expect(computedResults.priceDisplayValue).toEqual(expectedResult.priceDisplayValue);
    });
  });
});