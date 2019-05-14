/**
 * An action that can be dispatched to set the current currency symbol
 * @function setCurrencySymbol
 * @memberof fiat
 * @param {fiat.currencySymbol}
 */
export const setCurrencySymbol = currencySymbol => ({
  type: 'SET_CURRENCY_SYMBOL',
  currencySymbol,
})
