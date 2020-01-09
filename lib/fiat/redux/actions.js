"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrencySymbol = void 0;

/**
 * An action that can be dispatched to set the current currency symbol
 * @function setCurrencySymbol
 * @memberof fiat
 * @param {fiat.currencySymbol}
 */
var setCurrencySymbol = function setCurrencySymbol(currencySymbol) {
  return {
    type: 'SET_CURRENCY_SYMBOL',
    currencySymbol: currencySymbol
  };
};

exports.setCurrencySymbol = setCurrencySymbol;