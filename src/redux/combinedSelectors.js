import t from 'tcomb-validation'
import _ from 'lodash'
import BigNumber from 'bignumber.js/bignumber'
import { createSelector } from 'reselect'
import { selectors as erc20Selectors } from '../erc20/redux'
import { selectors as swapLegacySelectors } from '../swapLegacy/redux'
import { selectors as swapSelectors } from '../swap/redux'
import { selectors as tokenSelectors } from '../tokens/redux/reducers'
import { selectors as deltaBalancesSelectors } from '../deltaBalances/redux/reducers'
import { selectors as apiSelectors } from '../api/redux/reducers'
import { selectors as transactionSelectors } from '../transactionTracker/redux/reducers'
import { BASE_ASSET_TOKENS_SYMBOLS, ETH_BASE_ADDRESSES } from '../constants'

import { getTransactionDescription, getTransactionTextStatus } from '../utils/transformations'
import { Quote } from '../swap/tcomb'
import { LegacyQuote } from '../swapLegacy/tcomb'
import { getAbis } from '../abis/redux/reducers'
import { getConnectedOnChainMakerAddresses, getLocatorIntentsFormatted } from '../indexer/redux/selectors'

/**
 * @typedef {Object} TransactionHistoryItem
 * @memberof wallet
 * @property {string} transactionHash Unique ID of the transaction
 * @property {Object} transaction The transaction Object returned by ethers
 * @property {Object} transactionReceipt The transaction receipt Object returned by ethers
 * @property {('Failed' | 'Pending' | 'Confirmed')} textStatus
 * @property {('' | 'Invalid Order' | 'Expired' | 'Already Filled' | 'Invalid ETH Amount' | 'Sender is not Taker' | 'Order Cancelled')} eventStatus
 * @property {string} description A text summary of what this transaction is doing
 * @property {number} timestamp Unix timestamp of when transaction was submitted
 */

/**
 * @function getTransactionHistory
 * @description A selector that returns an array of all transactions that have been submitted by the connected wallet during the lifetime of the application, with attached derived metadata
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.TransactionHistoryItem}
 */
const getTransactionHistory = createSelector(
  swapLegacySelectors.getTransactionsFillOrder,
  swapLegacySelectors.getTransactionReceiptsFillOrder,
  swapLegacySelectors.getTransactionsCancelOrder,
  swapLegacySelectors.getTransactionReceiptsCancelOrder,
  swapSelectors.getTransactionsFillSwap,
  swapSelectors.getTransactionReceiptsFillSwap,
  swapSelectors.getTransactionsFillSwapSimple,
  swapSelectors.getTransactionReceiptsFillSwapSimple,
  swapSelectors.getTransactionsCancelSwap,
  swapSelectors.getTransactionReceiptsCancelSwap,
  erc20Selectors.getTransactionsApproveToken,
  erc20Selectors.getTransactionReceiptsApproveToken,
  erc20Selectors.getTransactionsWrapWeth,
  erc20Selectors.getTransactionReceiptsWrapWeth,
  erc20Selectors.getTransactionsUnwrapWeth,
  erc20Selectors.getTransactionReceiptsUnwrapWeth,
  tokenSelectors.getTokensByAddress,
  tokenSelectors.makeGetReadableOrder,
  tokenSelectors.makeGetReadableSwapOrder,
  transactionSelectors.getTransactions,
  getAbis,
  (
    fillTransactions,
    fillReceipts,
    cancelTransactions,
    cancelReceipts,
    fillSwapTransactions,
    fillSwapReceipts,
    fillSwapSimpleTransactions,
    fillSwapSimpleReceipts,
    cancelSwapTransactions,
    cancelSwapReceipts,
    approveTransactions,
    approveReceipts,
    wrapTransaction,
    wrapTransactionsReceipts,
    unwrapTransaction,
    unwrapTransactionsReceipts,
    tokensByAddress,
    getReadableOrder,
    getReadableSwapOrder,
    transactionHistory,
    abis,
  ) => {
    const receipts = _.compact([
      ..._.values(fillReceipts),
      ..._.values(cancelReceipts),
      ..._.values(fillSwapReceipts),
      ..._.values(fillSwapSimpleReceipts),
      ..._.values(cancelSwapReceipts),
      ..._.values(approveReceipts),
      ..._.values(wrapTransactionsReceipts),
      ..._.values(unwrapTransactionsReceipts),
      ..._.map(transactionHistory, 'transactionReceipt'),
    ])
    const transactions = _.compact([
      ..._.values(fillTransactions),
      ..._.values(cancelTransactions),
      ..._.values(fillSwapTransactions),
      ..._.values(fillSwapSimpleTransactions),
      ..._.values(cancelSwapTransactions),
      ..._.values(approveTransactions),
      ..._.values(wrapTransaction),
      ..._.values(unwrapTransaction),
      ..._.map(transactionHistory, 'transaction'),
    ]).map(tx => {
      const transactionReceipt = _.find(receipts, { transactionHash: tx.hash })
      const { textStatus, eventStatus } = getTransactionTextStatus(transactionReceipt)
      return {
        transactionHash: tx.hash,
        transaction: tx,
        description: getTransactionDescription(tx, tokensByAddress, getReadableOrder, getReadableSwapOrder, abis),
        transactionReceipt,
        textStatus,
        eventStatus,
        timestamp: tx.timestamp,
      }
    })
    return transactions
  },
)

const getOnAndOffChainIntents = createSelector(
  getLocatorIntentsFormatted,
  apiSelectors.getIndexerIntents,
  (intents, apiIntents) => [...intents, ...apiIntents],
)

/*
 filters down all indexer intents to only those that have a makerAddress that is router-connected or on-chain
 */
const getConnectedIndexerIntents = createSelector(
  getOnAndOffChainIntents,
  apiSelectors.getFetchedConnectedUsers,
  getConnectedOnChainMakerAddresses,
  (intents, connectedMakers, onChainMakers) =>
    _.filter(intents, ({ makerAddress }) => _.includes([...onChainMakers, ...connectedMakers], makerAddress)),
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
"AVAILABLE MARKETS" ARE INTENTS THAT MEET BOTH CRITERIA BELOW
 - either the makertoken or takertoken of the intent involves a "BASE ASSET"
 - the maker responsible for the intent is connected to the network
*/

const getAvailableMarketsByBaseTokenAddress = createSelector(
  getConnectedIndexerIntents,
  tokenSelectors.getTokensBySymbol,
  (intents, tokensBySymbol) => {
    const markets = {}

    if (!tokensBySymbol || !Object.keys(tokensBySymbol).length) return
    BASE_ASSET_TOKENS_SYMBOLS.map(symbol => tokensBySymbol[symbol]).forEach(token => {
      if (!token) return
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
"INDEXER" TOKENS MEET THE FOLLOWING REQUIREMENTS
 - there exist an intent on the indexer for this token
*/

const getIndexerTokens = createSelector(getOnAndOffChainIntents, intents => [
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

const getLiquidity = createSelector(
  apiSelectors.getMaxQuotes,
  getConnectedIndexerIntents,
  deltaBalancesSelectors.getBalances,
  (responses, intents, balances) => {
    const [quoteResponses] = _.partition(
      responses,
      q => t.validate(q, Quote).isValid() || t.validate(q, LegacyQuote).isValid(),
    )
    const formattedQuotes = _.map(quoteResponses, quote => _.mapValues(quote, v => v.toLowerCase())) // lowercase all addresses (doesn't effect number strings)
    const intentValues = _.map(intents, ({ makerAddress, makerToken, takerToken }) => {
      const intentQuote = _.find(formattedQuotes, { makerAddress, makerToken, takerToken })
      const makerTokenBalance = _.get(balances, `${makerAddress.toLowerCase()}.${makerToken.toLowerCase()}`) // adding eth address lowercasing only ever helps things

      let val = '0'
      if (intentQuote) {
        val = intentQuote.makerAmount
      } else if (makerTokenBalance) {
        val = makerTokenBalance
      }
      return [makerToken, takerToken, val]
    })
    return _.reduce(
      intentValues,
      (sumObj, [makerToken, takerToken, val]) => {
        const intentKey = [makerToken, takerToken].join('-')
        sumObj[intentKey] = new BigNumber(sumObj[intentKey] || '0').add(val).toString() //eslint-disable-line
        return sumObj
      },
      {},
    )
  },
)

const getMaxOrderLiquidity = createSelector(
  apiSelectors.getMaxQuotes,
  getConnectedIndexerIntents,
  deltaBalancesSelectors.getBalances,
  (responses, intents, balances) => {
    const [quoteResponses] = _.partition(
      responses,
      q => t.validate(q, Quote).isValid() || t.validate(q, LegacyQuote).isValid(),
    )
    const formattedQuotes = _.map(quoteResponses, quote => _.mapValues(quote, v => v.toLowerCase())) // lowercase all addresses (doesn't effect number strings)
    const intentValues = _.map(intents, ({ makerAddress, makerToken, takerToken }) => {
      const intentQuote = _.find(formattedQuotes, { makerAddress, makerToken, takerToken })
      const makerTokenBalance = _.get(balances, `${makerAddress.toLowerCase()}.${makerToken.toLowerCase()}`) // adding eth address lowercasing only ever helps things

      let val = '0'
      if (intentQuote) {
        val = intentQuote.makerAmount
      } else if (makerTokenBalance) {
        val = makerTokenBalance
      }
      return [makerToken, takerToken, val]
    })
    return _.reduce(
      intentValues,
      (maxObj, [makerToken, takerToken, val]) => {
        const intentKey = [makerToken, takerToken].join('-')
        maxObj[intentKey] = (maxObj[intentKey] || 0) < Number(val) ? val : maxObj[intentKey] //eslint-disable-line
        return maxObj
      },
      {},
    )
  },
)

/**
 * @function makeGetFormattedLiquidityByTokenPair
 * @description A selector that returns a function that takes a ({makerToken, takerToken}) and returns The sum() (number) of the maker liquidity across all connected makers
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */
const makeGetFormattedLiquidityByTokenPair = createSelector(
  getLiquidity,
  tokenSelectors.makeDisplayByToken,
  (liquidityObj, displayByToken) => ({ makerToken, takerToken }) => {
    const val = liquidityObj[[makerToken, takerToken].join('-')]
    if (!val) {
      return 0
    }
    return displayByToken({ address: makerToken }, val)
  },
)

/**
 * @function makeGetFormattedMaxOrderLiquidityByTokenPair
 * @description A selector that returns a function that takes a ({makerToken, takerToken}) and returns The max() (number) of the maker liquidity across all connected makers
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */
const makeGetFormattedMaxOrderLiquidityByTokenPair = createSelector(
  getMaxOrderLiquidity,
  tokenSelectors.makeDisplayByToken,
  (liquidityObj, displayByToken) => ({ makerToken, takerToken }) => {
    const val = liquidityObj[[makerToken, takerToken].join('-')]
    if (!val) {
      return 0
    }
    return displayByToken({ address: makerToken }, val)
  },
)

export {
  getTransactionHistory,
  makeGetFormattedLiquidityByTokenPair,
  makeGetFormattedMaxOrderLiquidityByTokenPair,
  getOnAndOffChainIntents,
  getConnectedIndexerIntents,
  getConnectedMakerAddressesWithIndexerIntents,
  getAvailableMarketsByBaseTokenAddress,
  getAvailableTokens,
  getAvailableTokensByAddress,
  getAvailableMarketplaceTokensByAddress,
  getIndexerTokens,
  getAvailableMarketplaceTokens,
}
