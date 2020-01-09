"use strict";

var _require = require('./utils'),
    getDisplayAmountsFromDisplayPrice = _require.getDisplayAmountsFromDisplayPrice,
    getAtomicAmountsFromDisplayAmounts = _require.getAtomicAmountsFromDisplayAmounts,
    getAtomicPriceFromAtomicAmounts = _require.getAtomicPriceFromAtomicAmounts,
    getContractPriceFromAtomicPrice = _require.getContractPriceFromAtomicPrice,
    getContractPriceFromDisplayPrice = _require.getContractPriceFromDisplayPrice,
    getAtomicPriceFromContractPrice = _require.getAtomicPriceFromContractPrice,
    getAtomicAmountsFromAtomicPrice = _require.getAtomicAmountsFromAtomicPrice,
    getDisplayAmountsFromAtomicAmounts = _require.getDisplayAmountsFromAtomicAmounts,
    getDisplayPriceFromDisplayAmounts = _require.getDisplayPriceFromDisplayAmounts,
    getDisplayPriceFromContractPrice = _require.getDisplayPriceFromContractPrice;

var tokenMetadata = require('../tokens');

beforeAll(function () {
  return tokenMetadata.ready;
});
/**
 * RULES FOR GENERATION
 * - decimal amounts for a display value must be less significant figures than the token decimals, or the conversion to & from atomic amounts will fail
 * - priceCoef in contract price can't be too large or the price will go to zero (need to find out the real max number)
 */

var initialSenderDisplayPriceSell = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  // AST
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  // WETH
  senderAmountDisplayValue: '1',
  priceDisplayValue: '0.0001'
};
var initialSenderDisplayPriceBuy = {
  signerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  // AST
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  // WETH
  senderAmountDisplayValue: '1',
  priceDisplayValue: '0.0001'
};
var initialSignerDisplayPriceSell = {
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerToken: '0x123ab195dd38b1b40510d467a6a359b201af056f',
  signerAmountDisplayValue: '1',
  priceDisplayValue: '0.0001'
};
var initialSignerDisplayPriceBuy = {
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderToken: '0x123ab195dd38b1b40510d467a6a359b201af056f',
  signerAmountDisplayValue: '1',
  priceDisplayValue: '0.0001'
};
var initialDisplayPriceSignerValue = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerAmountDisplayValue: '25',
  priceDisplayValue: '0.5'
};
var initialDisplayAmounts = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountDisplayValue: '500',
  signerAmountDisplayValue: '15'
};
var initialAtomicAmounts = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountAtomic: '87624875628764852158',
  signerAmountAtomic: '476582634'
};
var initialAtomicPrice = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountAtomic: '87624875628764852158',
  atomicPrice: '87624875.628764852158'
};
var initialContractPrice = {
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxSenderAmount: '7634534',
  priceCoef: '1',
  priceExp: '0'
};
describe('every function has a reversal function', function () {
  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (signerAmountDisplayValue & Sell)', function () {
    var displayAmounts = getDisplayAmountsFromDisplayPrice(initialSignerDisplayPriceSell);
    var displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts);
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceSell.signerAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceSell.priceDisplayValue);
  });
  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (signerAmountDisplayValue & Buy)', function () {
    var displayAmounts = getDisplayAmountsFromDisplayPrice(initialSignerDisplayPriceBuy);
    var displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts);
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceBuy.signerAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceBuy.priceDisplayValue);
  });
  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (with senderAmountDisplayValue & Sell)', function () {
    var displayAmounts = getDisplayAmountsFromDisplayPrice(initialSenderDisplayPriceSell);
    var displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts);
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceSell.senderAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceSell.priceDisplayValue);
  });
  test('getDisplayPriceFromDisplayAmounts reverts getDisplayAmountsFromDisplayPrice (with senderAmountDisplayValue & Buy)', function () {
    var displayAmounts = getDisplayAmountsFromDisplayPrice(initialSenderDisplayPriceBuy);
    var displayPrice = getDisplayPriceFromDisplayAmounts(displayAmounts);
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceBuy.senderAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceBuy.priceDisplayValue);
  });
  test('getDisplayAmountsFromDisplayPrice reverts getDisplayPriceFromDisplayAmounts', function () {
    var displayAmounts = getDisplayAmountsFromDisplayPrice(getDisplayPriceFromDisplayAmounts(initialDisplayAmounts));
    expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue);
    expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue);
  });
  test('getAtomicAmountsFromDisplayAmounts reverts getDisplayAmountsFromAtomicAmounts', function () {
    var atomicAmounts = getAtomicAmountsFromDisplayAmounts(getDisplayAmountsFromAtomicAmounts(initialAtomicAmounts));
    expect(atomicAmounts.senderAmountAtomic).toEqual(initialAtomicAmounts.senderAmountAtomic);
    expect(atomicAmounts.signerAmountAtomic).toEqual(initialAtomicAmounts.signerAmountAtomic);
  });
  test('getDisplayAmountsFromAtomicAmounts reverts getAtomicAmountsFromDisplayAmounts', function () {
    var displayAmounts = getDisplayAmountsFromAtomicAmounts(getAtomicAmountsFromDisplayAmounts(initialDisplayAmounts));
    expect(displayAmounts.senderAmountDisplayValue).toEqual(initialDisplayAmounts.senderAmountDisplayValue);
    expect(displayAmounts.signerAmountDisplayValue).toEqual(initialDisplayAmounts.signerAmountDisplayValue);
  });
  test('getAtomicPriceFromAtomicAmounts reverts getAtomicAmountsFromAtomicPrice', function () {
    var atomicPrice = getAtomicPriceFromAtomicAmounts(getAtomicAmountsFromAtomicPrice(initialAtomicPrice));
    expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic);
    expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice);
  });
  test('getAtomicAmountsFromAtomicPrice reverts getAtomicPriceFromAtomicAmounts', function () {
    var atomicAmounts = getAtomicAmountsFromAtomicPrice(getAtomicPriceFromAtomicAmounts(initialAtomicAmounts));
    expect(atomicAmounts.senderAmountDisplayValue).toEqual(initialAtomicAmounts.senderAmountDisplayValue);
    expect(atomicAmounts.signerAmountDisplayValue).toEqual(initialAtomicAmounts.signerAmountDisplayValue);
  });
  test('getContractPriceFromAtomicPrice reverts getAtomicPriceFromContractPrice', function () {
    var contractPrice = getContractPriceFromAtomicPrice(getAtomicPriceFromContractPrice(initialContractPrice));
    expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount);
    expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef);
    expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp);
  });
  test('getAtomicPriceFromContractPrice reverts getContractPriceFromAtomicPrice', function () {
    var atomicPrice = getAtomicPriceFromContractPrice(getContractPriceFromAtomicPrice(initialAtomicPrice));
    expect(atomicPrice.senderAmountAtomic).toEqual(initialAtomicPrice.senderAmountAtomic);
    expect(atomicPrice.atomicPrice).toEqual(initialAtomicPrice.atomicPrice);
  });
  test('getContractPriceFromDisplayPrice reverts getDisplayPriceFromContractPrice', function () {
    var contractPrice = getContractPriceFromDisplayPrice(getDisplayPriceFromContractPrice(initialContractPrice));
    expect(contractPrice.maxSenderAmount).toEqual(initialContractPrice.maxSenderAmount);
    expect(contractPrice.priceCoef).toEqual(initialContractPrice.priceCoef);
    expect(contractPrice.priceExp).toEqual(initialContractPrice.priceExp);
  });
  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified sender amount (Sell)', function () {
    var displayPrice = getDisplayPriceFromContractPrice(getContractPriceFromDisplayPrice(initialSenderDisplayPriceSell));
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceSell.senderAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceSell.priceDisplayValue);
  });
  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified sender amount (Buy)', function () {
    var displayPrice = getDisplayPriceFromContractPrice(getContractPriceFromDisplayPrice(initialSenderDisplayPriceBuy));
    expect(displayPrice.senderAmountDisplayValue).toEqual(initialSenderDisplayPriceBuy.senderAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSenderDisplayPriceBuy.priceDisplayValue);
  });
  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount', function () {
    var displayPrice = getDisplayPriceFromContractPrice(getContractPriceFromDisplayPrice(initialDisplayPriceSignerValue));
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialDisplayPriceSignerValue.signerAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialDisplayPriceSignerValue.priceDisplayValue);
  });
  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount (Sell)', function () {
    var displayPrice = getDisplayPriceFromContractPrice(getContractPriceFromDisplayPrice(initialSignerDisplayPriceSell));
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceSell.signerAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceSell.priceDisplayValue);
  });
  test('getDisplayPriceFromContractPrice reverts getContractPriceFromDisplayPrice with specified signer amount (Buy)', function () {
    var displayPrice = getDisplayPriceFromContractPrice(getContractPriceFromDisplayPrice(initialSignerDisplayPriceBuy));
    expect(displayPrice.signerAmountDisplayValue).toEqual(initialSignerDisplayPriceBuy.signerAmountDisplayValue);
    expect(displayPrice.priceDisplayValue).toEqual(initialSignerDisplayPriceBuy.priceDisplayValue);
  });
});