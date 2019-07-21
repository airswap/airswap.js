/** @namespace events */
import * as dateFns from 'date-fns'
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { makeEventReducer, makeEventSelectors } from '../../utils/redux/templates/event'
import { makeGetReadableSwapOrder, makeGetReadableOrder, makeParseByToken } from '../../tokens/redux/reducers'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { parseTransactionFailureEventCode } from '../../utils/transformations'

const exchangeFills = makeEventReducer('exchangeFills')
const exchangeCancels = makeEventReducer('exchangeCancels')
const exchangeFailures = makeEventReducer('exchangeFailures')
const swapFills = makeEventReducer('swapFills')
const swapCancels = makeEventReducer('swapCancels')

export default combineReducers({ exchangeFills, exchangeCancels, exchangeFailures, swapFills, swapCancels })

const getEvents = state => state.events //eslint-disable-line

const {
  getAttemptedGettingExchangeFills,
  getGettingExchangeFills,
  getErrorGettingExchangeFills,
  getFetchedExchangeFills,
} = makeEventSelectors('exchangeFills', 'events')

const {
  getAttemptedGettingExchangeCancels,
  getGettingExchangeCancels,
  getErrorGettingExchangeCancels,
  getFetchedExchangeCancels,
} = makeEventSelectors('exchangeCancels', 'events')

const {
  getAttemptedGettingExchangeFailures,
  getGettingExchangeFailures,
  getErrorGettingExchangeFailures,
  getFetchedExchangeFailures,
} = makeEventSelectors('exchangeFailures', 'events')

const {
  getAttemptedGettingSwapFills,
  getGettingSwapFills,
  getErrorGettingSwapFills,
  getFetchedSwapFills,
} = makeEventSelectors('swapFills', 'events')

const {
  getAttemptedGettingSwapCancels,
  getGettingSwapCancels,
  getErrorGettingSwapCancels,
  getFetchedSwapCancels,
} = makeEventSelectors('swapCancels', 'events')

/**
 * @typedef {Object} FillEvent a fill that occurred on the AirSwap exchange contract, queried as a log from Geth
 * @memberof events
 * @property transactionHash {string}
 * @property makerAddress {string}
 * @property makerAmount {string}
 * @property makerToken {string}
 * @property takerAddress {string}
 * @property takerAmount {string}
 * @property takerToken {string}
 * @property expiration {string}
 * @property nonce {string}
 * @property takerAmountFormatted {number}
 * @property makerAmountFormatted {number}
 * @property takerSymbol {string}
 * @property makerSymbol {string}
 * @property ethAmount {number}
 * @property tokenSymbol {string}
 * @property tokenAddress {string}
 * @property timestamp {number}
 */

/**
 * Returns a feed of fills from the last 20,000 blocks, with new fills appended to the array in real time (if there are any in a new on each new block).
 * @function getFormattedExchangeFills
 * @memberof events
 * @param state Redux store state
 * @returns {events.FillEvent[]}
 */
const getFormattedExchangeFills = createSelector(
  getFetchedExchangeFills,
  makeGetReadableOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

const getFormattedExchangeCancels = createSelector(
  getFetchedExchangeCancels,
  makeGetReadableOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

const getFormattedExchangeFailures = createSelector(
  getFetchedExchangeFailures,
  makeGetReadableOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
      reason: parseTransactionFailureEventCode(Number(values.code)),
    })),
)

const getFormattedSwapFills = createSelector(
  getFetchedSwapFills,
  makeGetReadableSwapOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableSwapOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

const getFormattedSwapCancels = createSelector(
  getFetchedSwapCancels,
  blockTrackerSelectors.getBlocks,
  (events, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...values,
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

/**
 * Returns a feed of fills from the last 24 Hours, with new fills appended to the array in real time (if there are any in a new on each new block).
 * @function getFormattedExchangeFills24Hour
 * @memberof events
 * @param state Redux store state
 * @returns {events.FillEvent[]}
 */
const getFormattedExchangeFills24Hour = createSelector(getFormattedExchangeFills, events => {
  const timeStamp24Hour = Number(dateFns.format(dateFns.subDays(new Date(), 1), 'X'))
  const [events24Hour] = _.partition(events, t => t.timestamp > timeStamp24Hour)
  return events24Hour
})

const get24HourVolume = createSelector(makeParseByToken, getFormattedExchangeFills24Hour, (parseByToken, fills) =>
  parseByToken({ symbol: 'ETH' }, _.reduce(fills, (sum, val) => sum + val.ethAmount, 0)),
)

const get24HourLargestTrade = createSelector(getFormattedExchangeFills24Hour, fills =>
  _.reduce(fills, (largest, val) => (val.ethAmount > largest.ethAmount ? val : largest), _.first(fills)),
)

export const selectors = {
  getAttemptedGettingExchangeFills,
  getGettingExchangeFills,
  getErrorGettingExchangeFills,
  getFetchedExchangeFills,
  getFormattedExchangeFills,
  getFormattedExchangeFills24Hour,
  get24HourVolume,
  get24HourLargestTrade,
  getAttemptedGettingExchangeCancels,
  getGettingExchangeCancels,
  getErrorGettingExchangeCancels,
  getFetchedExchangeCancels,
  getAttemptedGettingExchangeFailures,
  getGettingExchangeFailures,
  getErrorGettingExchangeFailures,
  getFetchedExchangeFailures,
  getFormattedExchangeCancels,
  getFormattedExchangeFailures,
  getAttemptedGettingSwapFills,
  getGettingSwapFills,
  getErrorGettingSwapFills,
  getFetchedSwapFills,
  getAttemptedGettingSwapCancels,
  getGettingSwapCancels,
  getErrorGettingSwapCancels,
  getFetchedSwapCancels,
  getFormattedSwapFills,
  getFormattedSwapCancels,
}
