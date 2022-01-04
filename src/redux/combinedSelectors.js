import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as erc20Selectors } from '../erc20/redux'
import { selectors as swapSelectors } from '../swap/redux'
import { selectors as tokenSelectors } from '../tokens/redux/reducers'
import { selectors as transactionSelectors } from '../transactionTracker/redux/reducers'

import { getTransactionDescription, getTransactionTextStatus } from '../utils/transformations'
import { getAbis } from '../abis/redux/reducers'

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

export { getTransactionHistory }
