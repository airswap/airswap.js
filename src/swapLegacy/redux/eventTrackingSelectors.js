import * as dateFns from 'date-fns'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { makeGetReadableOrder, makeParseByToken } from '../../tokens/redux/reducers'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { parseTransactionFailureEventCode } from '../../utils/transformations'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getFetchedSwapLegacyFilled = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xe59c5e56d85b2124f5e7f82cb5fcc6d28a4a241a9bdd732704ac9d3b6bfc98ab' }),
)

export const getFetchedSwapLegacyCanceled = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8ce0bae8f3488649f2f29762dfc77af336a695060bc787b9c813c6fdd79fdf25' }),
)

export const getFetchedSwapLegacyFailed = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8e49dd3f283d9a844668a6f422edaa50c4c22987511ec284cebec288ca54f37a' }),
)

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
export const getFormattedExchangeFills = createSelector(
  getFetchedSwapLegacyFilled,
  makeGetReadableOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

export const getFormattedExchangeCancels = createSelector(
  getFetchedSwapLegacyCanceled,
  makeGetReadableOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

export const getFormattedExchangeFailures = createSelector(
  getFetchedSwapLegacyFailed,
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

/**
 * Returns a feed of fills from the last 24 Hours, with new fills appended to the array in real time (if there are any in a new on each new block).
 * @function getFormattedExchangeFills24Hour
 * @memberof events
 * @param state Redux store state
 * @returns {events.FillEvent[]}
 */
export const getFormattedExchangeFills24Hour = createSelector(getFormattedExchangeFills, events => {
  const timeStamp24Hour = Number(dateFns.format(dateFns.subDays(new Date(), 1), 'X'))
  const [events24Hour] = _.partition(events, t => t.timestamp > timeStamp24Hour)
  return events24Hour
})

export const get24HourVolume = createSelector(
  makeParseByToken,
  getFormattedExchangeFills24Hour,
  (parseByToken, fills) => parseByToken({ symbol: 'ETH' }, _.reduce(fills, (sum, val) => sum + val.ethAmount, 0)),
)

export const get24HourLargestTrade = createSelector(getFormattedExchangeFills24Hour, fills =>
  _.reduce(fills, (largest, val) => (val.ethAmount > largest.ethAmount ? val : largest), _.first(fills)),
)
