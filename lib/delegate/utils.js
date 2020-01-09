"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var bn = require('bignumber.js');

var tokenMetadata = require('../tokens');

var _ = require('lodash');

bn.set({
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: 4
}); // TODO: work through & apply this optimizing function after fast-check has been integrated in the tests (https://github.com/dubzzz/fast-check)
// const PRECISION = 128
// const precision = str => {
//   const precisionStr = bn(str).toFixed(PRECISION)
//   const cutInsignificantDecimals = precisionStr.slice(0, precisionStr.length - 32)
//   const trimZero = _.trimEnd(cutInsignificantDecimals, '0') || '0'
//   const trimDot = _.trimEnd(trimZero, '.')
//   return trimDot
// }

var precision = function precision(str) {
  return str.toString ? str.toString() : str;
};
/** ***
 * MAPPING DISPLAY PRICES TO CONTRACT PRICES
 */


function getDisplayAmountsFromDisplayPrice(params) {
  var senderToken = params.senderToken,
      signerToken = params.signerToken,
      priceDisplayValue = params.priceDisplayValue,
      baseToken = params.baseToken;

  if (params.senderAmountDisplayValue) {
    var senderAmountDisplayValue = params.senderAmountDisplayValue;
    var signerAmountDisplayValue;

    if (baseToken === senderToken) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).div(priceDisplayValue));
    } else if (baseToken === signerToken) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).mul(priceDisplayValue));
    } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).div(priceDisplayValue));
    } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
      signerAmountDisplayValue = precision(bn(senderAmountDisplayValue).mul(priceDisplayValue));
    } else {
      throw new Error('unable to calculate baseAsset');
    }

    return {
      senderToken: senderToken,
      signerToken: signerToken,
      senderAmountDisplayValue: senderAmountDisplayValue,
      signerAmountDisplayValue: signerAmountDisplayValue
    };
  } else if (params.signerAmountDisplayValue) {
    var _signerAmountDisplayValue = params.signerAmountDisplayValue;

    var _senderAmountDisplayValue;

    if (baseToken === senderToken) {
      _senderAmountDisplayValue = precision(bn(_signerAmountDisplayValue).mul(priceDisplayValue));
    } else if (baseToken === signerToken) {
      _senderAmountDisplayValue = precision(bn(_signerAmountDisplayValue).div(priceDisplayValue));
    } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
      _senderAmountDisplayValue = precision(bn(_signerAmountDisplayValue).mul(priceDisplayValue));
    } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
      _senderAmountDisplayValue = precision(bn(_signerAmountDisplayValue).div(priceDisplayValue));
    } else {
      throw new Error('unable to calculate baseAsset');
    }

    return {
      senderToken: senderToken,
      signerToken: signerToken,
      senderAmountDisplayValue: _senderAmountDisplayValue,
      signerAmountDisplayValue: _signerAmountDisplayValue
    };
  }
}

function getAtomicAmountsFromDisplayAmounts(_ref) {
  var senderToken = _ref.senderToken,
      signerToken = _ref.signerToken,
      senderAmountDisplayValue = _ref.senderAmountDisplayValue,
      signerAmountDisplayValue = _ref.signerAmountDisplayValue;
  var senderAmountAtomic = tokenMetadata.formatAtomicValueByToken({
    address: senderToken
  }, senderAmountDisplayValue);
  var signerAmountAtomic = tokenMetadata.formatAtomicValueByToken( //eslint-disable-line
  {
    address: signerToken
  }, signerAmountDisplayValue);
  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountAtomic: senderAmountAtomic,
    signerAmountAtomic: signerAmountAtomic
  };
}

function getAtomicPriceFromAtomicAmounts(_ref2) {
  var senderToken = _ref2.senderToken,
      signerToken = _ref2.signerToken,
      senderAmountAtomic = _ref2.senderAmountAtomic,
      signerAmountAtomic = _ref2.signerAmountAtomic;
  var priceAtomic = bn(signerAmountAtomic).div(senderAmountAtomic);
  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountAtomic: senderAmountAtomic,
    atomicPrice: priceAtomic.toString()
  };
}

function getContractPriceFromAtomicPrice(_ref3) {
  var senderToken = _ref3.senderToken,
      signerToken = _ref3.signerToken,
      senderAmountAtomic = _ref3.senderAmountAtomic,
      atomicPrice = _ref3.atomicPrice;

  var _atomicPrice$split = atomicPrice.split('.'),
      _atomicPrice$split2 = _slicedToArray(_atomicPrice$split, 2),
      int = _atomicPrice$split2[0],
      decimalVal = _atomicPrice$split2[1]; // eslint-disable-line'


  var decimal = decimalVal || '';
  var priceExp;

  if (decimal === '') {
    priceExp = 0;
  } else {
    priceExp = decimal.length;
  }

  var priceCoef = _.trimStart("".concat(int).concat(decimal), '0'); // check


  var priceCheck = bn(priceCoef).times(bn(10).pow(-priceExp)).toString();

  if (atomicPrice === priceCheck) {
    // if calulation checks out, return values
    return {
      senderToken: senderToken,
      signerToken: signerToken,
      maxSenderAmount: senderAmountAtomic,
      priceCoef: priceCoef,
      priceExp: "".concat(priceExp)
    };
  }

  throw new Error('error calculating contract price');
}

function getContractPriceFromDisplayPrice(_ref4) {
  var senderToken = _ref4.senderToken,
      signerToken = _ref4.signerToken,
      senderAmountDisplayValue = _ref4.senderAmountDisplayValue,
      signerAmountDisplayValue = _ref4.signerAmountDisplayValue,
      priceDisplayValue = _ref4.priceDisplayValue,
      baseToken = _ref4.baseToken;
  var displayAmounts = getDisplayAmountsFromDisplayPrice({
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountDisplayValue: senderAmountDisplayValue,
    signerAmountDisplayValue: signerAmountDisplayValue,
    priceDisplayValue: priceDisplayValue,
    baseToken: baseToken
  });
  var atomicAmounts = getAtomicAmountsFromDisplayAmounts(displayAmounts);
  var atomicPrice = getAtomicPriceFromAtomicAmounts(atomicAmounts);
  var contractPrice = getContractPriceFromAtomicPrice(atomicPrice);
  return contractPrice;
}
/** ***
 * MAPPING CONTRACT PRICES TO DISPLAY PRICES
 */


function getAtomicPriceFromContractPrice(_ref5) {
  var senderToken = _ref5.senderToken,
      signerToken = _ref5.signerToken,
      maxSenderAmount = _ref5.maxSenderAmount,
      priceCoef = _ref5.priceCoef,
      priceExp = _ref5.priceExp;
  var atomicPrice = bn(priceCoef).times(bn(10).pow(-Number(priceExp))).toString();
  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountAtomic: maxSenderAmount,
    atomicPrice: atomicPrice
  };
}

function getAtomicAmountsFromAtomicPrice(_ref6) {
  var senderToken = _ref6.senderToken,
      signerToken = _ref6.signerToken,
      senderAmountAtomic = _ref6.senderAmountAtomic,
      atomicPrice = _ref6.atomicPrice;
  var signerAmountAtomic = bn(senderAmountAtomic).mul(atomicPrice).toFixed(0).toString();
  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountAtomic: senderAmountAtomic,
    signerAmountAtomic: signerAmountAtomic
  };
}

function getDisplayAmountsFromAtomicAmounts(_ref7) {
  var senderToken = _ref7.senderToken,
      signerToken = _ref7.signerToken,
      senderAmountAtomic = _ref7.senderAmountAtomic,
      signerAmountAtomic = _ref7.signerAmountAtomic;
  var signerAmountDisplayValue = tokenMetadata.formatFullValueByToken({
    address: signerToken
  }, signerAmountAtomic);
  var senderAmountDisplayValue = tokenMetadata.formatFullValueByToken({
    address: senderToken
  }, senderAmountAtomic);
  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountDisplayValue: senderAmountDisplayValue,
    signerAmountDisplayValue: signerAmountDisplayValue
  };
}

function getDisplayPriceFromDisplayAmounts(_ref8) {
  var senderToken = _ref8.senderToken,
      signerToken = _ref8.signerToken,
      senderAmountDisplayValue = _ref8.senderAmountDisplayValue,
      signerAmountDisplayValue = _ref8.signerAmountDisplayValue,
      baseToken = _ref8.baseToken;
  var priceDisplayValue;

  if (senderToken === baseToken) {
    priceDisplayValue = precision(bn(senderAmountDisplayValue).div(signerAmountDisplayValue), 24);
  } else if (signerToken === baseToken) {
    priceDisplayValue = precision(bn(signerAmountDisplayValue).div(senderAmountDisplayValue), 24);
  } else if (tokenMetadata.isBaseAsset(senderToken, [senderToken, signerToken])) {
    priceDisplayValue = precision(bn(senderAmountDisplayValue).div(signerAmountDisplayValue), 24);
  } else if (tokenMetadata.isBaseAsset(signerToken, [senderToken, signerToken])) {
    priceDisplayValue = precision(bn(signerAmountDisplayValue).div(senderAmountDisplayValue), 24);
  } else {
    throw new Error('unable to calculate baseAsset');
  }

  return {
    senderToken: senderToken,
    signerToken: signerToken,
    senderAmountDisplayValue: senderAmountDisplayValue,
    signerAmountDisplayValue: signerAmountDisplayValue,
    priceDisplayValue: priceDisplayValue
  };
}

function getDisplayPriceFromContractPrice(_ref9) {
  var senderToken = _ref9.senderToken,
      signerToken = _ref9.signerToken,
      maxSenderAmount = _ref9.maxSenderAmount,
      priceCoef = _ref9.priceCoef,
      priceExp = _ref9.priceExp,
      baseToken = _ref9.baseToken;
  var atomicPrice = getAtomicPriceFromContractPrice({
    senderToken: senderToken,
    signerToken: signerToken,
    maxSenderAmount: maxSenderAmount,
    priceCoef: priceCoef,
    priceExp: priceExp
  });
  var atomicAmounts = getAtomicAmountsFromAtomicPrice(atomicPrice);
  var displayAmounts = getDisplayAmountsFromAtomicAmounts(atomicAmounts);
  var displayPrice = getDisplayPriceFromDisplayAmounts(_objectSpread({}, displayAmounts, {
    baseToken: baseToken
  }));
  return displayPrice;
}
/** ***
 * EXPORTS
 */


module.exports = {
  getDisplayAmountsFromDisplayPrice: getDisplayAmountsFromDisplayPrice,
  getAtomicAmountsFromDisplayAmounts: getAtomicAmountsFromDisplayAmounts,
  getAtomicPriceFromAtomicAmounts: getAtomicPriceFromAtomicAmounts,
  getContractPriceFromAtomicPrice: getContractPriceFromAtomicPrice,
  getContractPriceFromDisplayPrice: getContractPriceFromDisplayPrice,
  getAtomicPriceFromContractPrice: getAtomicPriceFromContractPrice,
  getAtomicAmountsFromAtomicPrice: getAtomicAmountsFromAtomicPrice,
  getDisplayAmountsFromAtomicAmounts: getDisplayAmountsFromAtomicAmounts,
  getDisplayPriceFromDisplayAmounts: getDisplayPriceFromDisplayAmounts,
  getDisplayPriceFromContractPrice: getDisplayPriceFromContractPrice
};