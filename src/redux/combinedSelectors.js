import t from 'tcomb-validation'
import _ from 'lodash'
import BigNumber from 'bignumber.js/bignumber'
import { createSelector } from 'reselect'
import { selectors as erc20Selectors } from '../erc20/redux'
import { selectors as swapLegacySelectors } from '../swapLegacy/redux'
import { selectors as tokenSelectors } from '../tokens/redux'
import { selectors as deltaBalancesSelectors } from '../deltaBalances/redux'
import { selectors as apiSelectors } from '../api/redux'

import { getTransactionDescription, getTransactionTextStatus } from '../utils/transformations'
import * as types from '../tcombTypes'

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
  erc20Selectors.getTransactionsApproveToken,
  erc20Selectors.getTransactionReceiptsApproveToken,
  erc20Selectors.getTransactionsWrapWeth,
  erc20Selectors.getTransactionReceiptsWrapWeth,
  erc20Selectors.getTransactionsUnwrapWeth,
  erc20Selectors.getTransactionReceiptsUnwrapWeth,
  tokenSelectors.getTokensByAddress,
  tokenSelectors.makeGetReadableOrder,
  (
    fillTransactions,
    fillReceipts,
    approveTransactions,
    approveReceipts,
    wrapTransaction,
    wrapTransactionsReceipts,
    unwrapTransaction,
    unwrapTransactionsReceipts,
    tokensByAddress,
    getReadableOrder,
  ) => {
    const receipts = _.compact([
      ..._.values(fillReceipts),
      ..._.values(approveReceipts),
      ..._.values(wrapTransactionsReceipts),
      ..._.values(unwrapTransactionsReceipts),
    ])
    const transactions = _.compact([
      ..._.values(fillTransactions),
      ..._.values(approveTransactions),
      ..._.values(wrapTransaction),
      ..._.values(unwrapTransaction),
    ]).map(tx => {
      const transactionReceipt = _.find(receipts, { transactionHash: tx.hash })
      const { textStatus, eventStatus } = getTransactionTextStatus(transactionReceipt)
      return {
        transactionHash: tx.hash,
        transaction: tx,
        description: getTransactionDescription(tx, tokensByAddress, getReadableOrder),
        transactionReceipt,
        textStatus,
        eventStatus,
        timestamp: tx.timestamp,
      }
    })
    return transactions
  },
)

const getLiquidity = createSelector(
  apiSelectors.getMaxQuotes,
  apiSelectors.getConnectedIndexerIntents,
  deltaBalancesSelectors.getBalances,
  (responses, intents, balances) => {
    const [quoteResponses] = _.partition(responses, q => t.validate(q, types.Quote).isValid())
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
  apiSelectors.getConnectedIndexerIntents,
  deltaBalancesSelectors.getBalances,
  (responses, intents, balances) => {
    const [quoteResponses] = _.partition(responses, q => t.validate(q, types.Quote).isValid())
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

export { getTransactionHistory, makeGetFormattedLiquidityByTokenPair, makeGetFormattedMaxOrderLiquidityByTokenPair }
