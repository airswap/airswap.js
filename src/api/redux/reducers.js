/** @namespace api */

import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { ETH_BASE_ADDRESSES, BASE_ASSET_TOKENS_SYMBOLS } from '../../constants'
import { makeHTTPReducer, makeHTTPSelectors } from '../../utils/redux/templates/http'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { lowerCaseStringsInObject } from '../../utils/transformations'
import { getFormattedExchangeFills24Hour } from '../../swapLegacy/redux/selectors'
import { getTokensBySymbol } from '../../tokens/redux/reducers'
// import { selectors as protocolMessagingSelectors } from '../../protocolMessaging/redux/reducers'

// const { getCurrentFrameQueryContext } = protocolMessagingSelectors

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

/*
 filters down all indexer intents to only those that have a makerAddress that is router-connected
 */
const getConnectedIndexerIntents = createSelector(
  getIndexerIntents,
  getFetchedConnectedUsers,
  (intents, connectedMakers) => _.filter(intents, ({ makerAddress }) => _.includes(connectedMakers, makerAddress)),
)

/*
 filters down all indexer intents to only those that have a makerAddress that is router-connected
 */
const getConnectedMakerAddressesWithIndexerIntents = createSelector(getConnectedIndexerIntents, intents =>
  _.map(intents, 'makerAddress'),
)

/*
 filters down router-connected intents to tokenAddresses that are
 - router-connected
 - have an intent
 */
const getConnectedIndexerTokenAddresses = createSelector(getConnectedIndexerIntents, intents => [
  ..._.reduce(
    intents,
    (set, intent) => {
      set.add(intent.makerToken)
      set.add(intent.takerToken)
      return set
    },
    new Set(),
  ),
])

/*
"INDEXER" TOKENS MEET THE FOLLOWING REQUIREMENTS
 - there exist an intent on the indexer for this token
*/

const getIndexerTokens = createSelector(getFetchedIndexerIntents, intents => [
  ..._.reduce(
    intents,
    (set, intent) => {
      set.add(intent.makerToken)
      set.add(intent.takerToken)
      return set
    },
    new Set(),
  ),
])

/*
"AVAILABLE MARKETS" ARE INTENTS THAT MEET BOTH CRITERIA BELOW
 - either the makertoken or takertoken of the intent involves a "BASE ASSET"
 - the maker responsible for the intent is connected to the network
*/

const getAvailableMarketsByBaseTokenAddress = createSelector(
  getConnectedIndexerIntents,
  getTokensBySymbol,
  (intents, tokensBySymbol) => {
    const markets = {}

    if (!tokensBySymbol || !Object.keys(tokensBySymbol).length) return
    BASE_ASSET_TOKENS_SYMBOLS.map(symbol => tokensBySymbol[symbol]).forEach(token => {
      markets[token.address] = 0
    })

    intents.forEach(intent => {
      if (Object.prototype.hasOwnProperty.call(markets, intent.takerToken)) {
        markets[intent.takerToken]++
        return
      }

      if (Object.prototype.hasOwnProperty.call(markets, intent.makerToken)) {
        markets[intent.makerToken]++
      }
    })

    return markets
  },
)

/*
"AVAILABLE" TOKENS MEET THE FOLLOWING REQUIREMENTS
 - APPROVED (airswapUI: 'yes')
 - INDEXER (there exist an intent on the indexer for this token)
 - CONNECTED (the makerAddress of that intent is currently connected to the router)
*/

const getAvailableTokens = createSelector(
  tokenSelectors.getAirSwapApprovedTokens, // APPROVED
  getConnectedIndexerTokenAddresses, // INDEXER & CONNECTED
  (approvedTokens, indexerTokenAddresses) =>
    _.filter(approvedTokens, token => _.includes(indexerTokenAddresses, token.address)),
)

/*
AVAILABLE MARKETPLACE TOKENS MEET THE FOLLOWING REQUIREMENTS
 - APPROVED (airswapUI: 'yes')
 - INDEXER (there exist an intent on the indexer for this token)
 - CONNECTED (the makerAddress of that intent is currently connected to the router)
 - Current base tokens are excluded (by default this is ETH/WETH)
*/

const getAvailableMarketplaceTokens = createSelector(
  tokenSelectors.getAirSwapApprovedTokens, // APPROVED
  getConnectedIndexerTokenAddresses, // INDEXER & CONNECTED
  (approvedTokens, indexerTokenAddresses) =>
    _.filter(
      approvedTokens,
      token => _.includes(indexerTokenAddresses, token.address) && !_.includes(ETH_BASE_ADDRESSES, token.address),
    ),
)

/*
TOKENS BY ADDRESS
*/
const getAvailableTokensByAddress = createSelector(getAvailableTokens, tokens => _.keyBy(tokens, 'address'))
const getAvailableMarketplaceTokensByAddress = createSelector(getAvailableMarketplaceTokens, tokens =>
  _.keyBy(tokens, 'address'),
)

/*
TOKEN ADDRESSES
*/
const getAvailableTokenAddresses = createSelector(getAvailableTokensByAddress, tokens =>
  _.uniq([...ETH_BASE_ADDRESSES, ...Object.keys(tokens)]),
)
const getAvailableMarketplaceTokenAddresses = createSelector(getAvailableMarketplaceTokensByAddress, tokens =>
  Object.keys(tokens),
)

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
  getIndexerTokens,
  getIndexerIntents,
  getConnectedIndexerIntents,
  getConnectedMakerAddressesWithIndexerIntents,
  getAvailableMarketsByBaseTokenAddress,
  getAvailableTokens,
  getAvailableTokensByAddress,
  getAvailableTokenAddresses,
  getAvailableMarketplaceTokens,
  getAvailableMarketplaceTokensByAddress,
  getAvailableMarketplaceTokenAddresses,
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
