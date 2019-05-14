/** @namespace fiat */
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import * as types from '../../tcombTypes'
import { FIAT_CURRENCIES, ETH_BASE_ADDRESSES } from '../../constants'
import { makeHTTPReducer, makeHTTPSelectors } from '../../utils/redux/templates/http'
import { selectors as apiSelectors } from '../../api/redux'
import { selectors as tokenSelectors } from '../../tokens/redux'

const ethPrices = makeHTTPReducer('ethPrices')

function currencySymbol(state = _.first(Object.keys(FIAT_CURRENCIES)), action) {
  switch (action.type) {
    case 'SET_CURRENCY_SYMBOL':
      return types.Currency(action.currencySymbol)
    default:
      return state
  }
}

export default combineReducers({
  ethPrices,
  currencySymbol,
})

const getFiat = state => state.fiat

const {
  getAttemptedGettingEthPrices,
  getGettingEthPrices,
  getErrorGettingEthPrices,
  getFetchedEthPrices,
} = makeHTTPSelectors('ethPrices', 'fiat')

/**
 * A selector to get the current currency symbol
 * @function getSelectedCurrencySymbol
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {fiat.currencySymbol}
 */
const getSelectedCurrencySymbol = createSelector(getFiat, fiat => fiat.currencySymbol)
const getSelectedCurrencySymbolAscii = createSelector(getSelectedCurrencySymbol, symbol => FIAT_CURRENCIES[symbol])

const makeGetEthInFiat = createSelector(
  getFetchedEthPrices,
  getSelectedCurrencySymbol,
  (prices, symbol) => ethAmount => {
    const price = prices[symbol] ? prices[symbol] : 0
    return `${FIAT_CURRENCIES[symbol]}${(price * Number(ethAmount)).toFixed(2)}`
  },
)

const makeGetEthInFiatUnsigned = createSelector(
  getFetchedEthPrices,
  getSelectedCurrencySymbol,
  (prices, symbol) => ethAmount => {
    const price = prices[symbol] ? prices[symbol] : 0
    return `${(price * Number(ethAmount)).toFixed(2)}`
  },
)

/**
 * A selector that returns a function that converts a token amount (ETH included) into a fiat amount priced in the currently selected symbol's (USD is default) value (with currency symbol prepended)
 * @function makeGetTokenInFiatFromDisplayValue
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */
const makeGetTokenInFiatFromDisplayValue = createSelector(
  apiSelectors.getFormattedQuotes,
  tokenSelectors.getTokens,
  makeGetEthInFiat,
  (quotes, tokens, getEthInFiat) => (tokenQuery, amount) => {
    const token = _.find(tokens, tokenQuery)
    if (!token) {
      return getEthInFiat(0)
    }
    let priceAverage
    if (_.includes(ETH_BASE_ADDRESSES, token.address)) {
      // this just allows the function to be overloaded to service ETH & WETH in addition to all other tokens
      priceAverage = 1
    } else {
      const prices = _.map(_.filter(quotes, { tokenAddress: token.address }), 'price')
      if (prices.length === 0) {
        return getEthInFiat(0)
      }
      priceAverage = prices.reduce((sum, val) => sum + val, 0) / prices.length
    }
    const tokenEthEquivalent = priceAverage * Number(amount)
    return getEthInFiat(tokenEthEquivalent)
  },
)

/**
 * A selector that returns a function that converts a token amount (ETH included) into a fiat amount priced in the currently selected symbol's (USD is default) value (without currency symbol prepended)
 * @function makeGetTokenInFiatFromDisplayValueUnisgned
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */
const makeGetTokenInFiatFromDisplayValueUnisgned = createSelector(
  apiSelectors.getFormattedQuotes,
  tokenSelectors.getTokens,
  makeGetEthInFiatUnsigned,
  (quotes, tokens, getEthInFiatUnisigned) => (tokenQuery, amount) => {
    const token = _.find(tokens, tokenQuery)
    if (!token) {
      return getEthInFiatUnisigned(0)
    }
    let priceAverage
    if (_.includes(ETH_BASE_ADDRESSES, token.address)) {
      // this just allows the function to be overloaded to service ETH & WETH in addition to all other tokens
      priceAverage = 1
    } else {
      const prices = _.map(_.filter(quotes, { tokenAddress: token.address }), 'price')
      if (prices.length === 0) {
        return getEthInFiatUnisigned(0)
      }
      priceAverage = prices.reduce((sum, val) => sum + val, 0) / prices.length
    }
    const tokenEthEquivalent = priceAverage * Number(amount)
    return getEthInFiatUnisigned(tokenEthEquivalent)
  },
)

/**
 * Same as makeGetTokenInFiatFromDisplayValue but it can take an atomic value and convert it to a display value before converting it to a fiat value
 * @function makeGetTokenInFiatFromAtomicValue
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */
const makeGetTokenInFiatFromAtomicValue = createSelector(
  makeGetTokenInFiatFromDisplayValue,
  tokenSelectors.makeDisplayByToken,
  (getTokenInFiatFromDisplayValue, displayByToken) => (tokenQuery, amount) =>
    getTokenInFiatFromDisplayValue(tokenQuery, displayByToken(tokenQuery, amount)),
)

/**
 * Same as makeGetTokenInFiatFromDisplayValueUnisgned but it can take an atomic value and convert it to a display value before converting it to a fiat value
 * @function makeGetTokenInFiatFromAtomicValueUnsigned
 * @memberof fiat
 * @param {Object} state Redux store state
 * @returns {function(): string}
 */
const makeGetTokenInFiatFromAtomicValueUnsigned = createSelector(
  makeGetTokenInFiatFromDisplayValueUnisgned,
  tokenSelectors.makeDisplayByToken,
  (getTokenInFiatFromDisplayValueUnisgned, displayByToken) => (tokenQuery, amount) =>
    getTokenInFiatFromDisplayValueUnisgned(tokenQuery, displayByToken(tokenQuery, amount)),
)

export const selectors = {
  getAttemptedGettingEthPrices,
  getGettingEthPrices,
  getErrorGettingEthPrices,
  getFetchedEthPrices,
  getSelectedCurrencySymbol,
  getSelectedCurrencySymbolAscii,
  makeGetEthInFiat,
  makeGetTokenInFiatFromDisplayValue,
  makeGetTokenInFiatFromAtomicValue,
  makeGetEthInFiatUnsigned,
  makeGetTokenInFiatFromDisplayValueUnisgned,
  makeGetTokenInFiatFromAtomicValueUnsigned,
}
