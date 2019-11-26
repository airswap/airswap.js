/** @namespace api */

import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { makeHTTPReducer, makeHTTPSelectors } from '../../utils/redux/templates/http'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { lowerCaseStringsInObject } from '../../utils/transformations'
import { getFormattedExchangeFills24Hour } from '../../swapLegacy/redux/selectors'

const connectedUsers = makeHTTPReducer('connectedUsers')
const indexerIntents = makeHTTPReducer('indexerIntents')
const quotes = makeHTTPReducer('quotes')
const maxQuotes = makeHTTPReducer('maxQuotes')

export default combineReducers({
  connectedUsers,
  indexerIntents,
  quotes,
  maxQuotes,
})

const { getAttemptedGettingQuotes, getGettingQuotes, getErrorGettingQuotes, getFetchedQuotes } = makeHTTPSelectors(
  'quotes',
  'api',
)

const {
  getAttemptedGettingMaxQuotes,
  getGettingMaxQuotes,
  getErrorGettingMaxQuotes,
  getFetchedMaxQuotes,
} = makeHTTPSelectors('maxQuotes', 'api')

const {
  getAttemptedGettingConnectedUsers,
  getGettingConnectedUsers,
  getErrorGettingConnectedUsers,
  getFetchedConnectedUsers,
} = makeHTTPSelectors('connectedUsers', 'api')

const {
  getAttemptedGettingIndexerIntents,
  getGettingIndexerIntents,
  getErrorGettingIndexerIntents,
  getFetchedIndexerIntents,
} = makeHTTPSelectors('indexerIntents', 'api')

/*
 the /intents endpoint groups intents kind of strangly, where they are grouped by arrays of maker addresses
 this selector groups them like a normal array of intents like [{ makerAddress, makerToken, takerToken }...]
 */
const getIndexerIntents = createSelector(getFetchedIndexerIntents, intents => intents)

const getMaxQuotes = createSelector(getFetchedMaxQuotes, qs => qs.map(quote => quote.response))

const getFormattedQuotes = createSelector(
  getFetchedQuotes,
  tokenSelectors.makeGetReadableOrder,
  (qs, getReadableOrder) =>
    qs
      .map(quote => quote.response)
      .map(lowerCaseStringsInObject)
      .map(getReadableOrder),
)

/**
 * @function makeGetHighestPriceByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the highest available price (number) for that token pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): string}
 */
const makeGetHighestPriceByTokenPair = createSelector(
  getFormattedQuotes,
  formattedQuotes => ({ makerToken, takerToken }) => {
    const filteredQuotes = _.filter(formattedQuotes, { makerToken, takerToken })
    const highest = _.first(_.sortBy(filteredQuotes, 'price'))
    return _.get(highest, 'price', 0)
  },
)

/**
 * @function makeGetLowestPriceByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the lowest available price (number) for that token pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): string}
 */
const makeGetLowestPriceByTokenPair = createSelector(
  getFormattedQuotes,
  formattedQuotes => ({ makerToken, takerToken }) => {
    const filteredQuotes = _.filter(formattedQuotes, { makerToken, takerToken })
    const lowest = _.last(_.sortBy(filteredQuotes, 'price'))
    return _.get(lowest, 'price', 0)
  },
)

/**
 * @function makeGet24HourVolumeByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the 24 Hour Volume (number) for that pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */
const makeGet24HourVolumeByTokenPair = createSelector(
  getFormattedExchangeFills24Hour,
  events => ({ makerToken, takerToken }) => {
    const filteredEvents = _.filter(events, { makerToken, takerToken })
    return _.reduce(filteredEvents, (sum, val) => sum + val.ethAmount, 0)
  },
)

/**
 * @function makeGet24HourTradesByTokenPair
 * @description A selector that returns a function that takes a token pair ({makerToken, takerToken}) and returns the # of trades that occurred in the past 24 hours for that pair
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */
const makeGet24HourTradesByTokenPair = createSelector(
  getFormattedExchangeFills24Hour,
  events => ({ makerToken, takerToken }) => {
    const filteredEvents = _.filter(events, { makerToken, takerToken })
    return filteredEvents.length
  },
)

export const selectors = {
  getAttemptedGettingConnectedUsers,
  getGettingConnectedUsers,
  getErrorGettingConnectedUsers,
  getFetchedConnectedUsers,
  getAttemptedGettingIndexerIntents,
  getGettingIndexerIntents,
  getErrorGettingIndexerIntents,
  getFetchedIndexerIntents,
  getIndexerIntents,
  getAttemptedGettingQuotes,
  getGettingQuotes,
  getErrorGettingQuotes,
  getFetchedQuotes,
  getAttemptedGettingMaxQuotes,
  getGettingMaxQuotes,
  getErrorGettingMaxQuotes,
  getFetchedMaxQuotes,
  makeGetHighestPriceByTokenPair,
  makeGetLowestPriceByTokenPair,
  makeGet24HourVolumeByTokenPair,
  makeGet24HourTradesByTokenPair,
  getFormattedQuotes,
  getMaxQuotes,
}
