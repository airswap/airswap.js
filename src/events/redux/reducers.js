/** @namespace events */
import * as dateFns from 'date-fns'
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { makeEventReducer, makeEventSelectors } from '../../utils/redux/templates/event'
import { makeGetReadableOrder, makeParseByToken } from '../../tokens/redux/reducers'

const exchangeFills = makeEventReducer('exchangeFills')

function blocks(state = {}, action) {
  switch (action.type) {
    case 'GOT_BLOCK':
      return {
        ...state,
        [action.block.number]: action.block,
      }
    case 'GOT_BLOCKS':
      const blockNumbers = _.map(action.blocks, 'number')
      return {
        ...state,
        ..._.zipObject(blockNumbers, action.blocks),
      }
    default:
      return state
  }
}

export default combineReducers({
  exchangeFills,
  blocks,
})

const getEvents = state => state.events
const getBlocks = createSelector(getEvents, events => events.blocks)
const getBlockNumbers = createSelector(getBlocks, b => _.map(_.values(b), 'number'))

const {
  getAttemptedGettingExchangeFills,
  getGettingExchangeFills,
  getErrorGettingExchangeFills,
  getFetchedExchangeFills,
} = makeEventSelectors('exchangeFills', 'events')

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
  getBlocks,
  (events, getReadableOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableOrder(values),
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
  getBlockNumbers,
}
