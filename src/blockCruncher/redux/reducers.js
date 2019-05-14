// @flow
import { createSelector } from 'reselect'
import _ from 'lodash'
import type { Action } from 'redux'

type Transaction = {
  transactionHash: string,
  to: string,
  description: string,
  txType: string,
  messagePending: string,
  messageSuccess: string,
  messageFailure: string,
  status: ?number, // Usually null before we receive block
}

type TransactionsState = Array<Transaction>

const defaultState = []

// transactions are scoped by address
const transactions = (state: TransactionsState = defaultState, action: Action): TransactionsState => {
  switch (action.type) {
    case 'SUBMITTED_TRANSACTION':
      const stubTxn: Transaction = {
        from: action.from,
        to: action.to,
        transactionHash: action.transactionHash,
        description: action.description,
        txType: action.txType,
        messagePending: action.messagePending,
        messageSuccess: action.messageSuccess,
        messageFailure: action.messageFailure,
        status: null,
        order: action.order,
      }
      const indexOfTxn = _.findIndex(state, { transactionHash: stubTxn.transactionHash })

      if (indexOfTxn === -1) {
        return [...state, stubTxn]
      }
      return state
    case 'SUBMITTED_TRANSACTION_RECEIPT':
      const txnHash = action.receipt.transactionHash
      let appTxnIdx = _.findIndex(state, { transactionHash: txnHash })
      let appTxn
      if (appTxnIdx === -1) {
        appTxnIdx = 0
        appTxn = {}
      } else {
        appTxn = state[appTxnIdx]
      }
      return [
        {
          ...appTxn,
          ...action.receipt,
        },
        ..._.slice(state, 0, appTxnIdx),
        ..._.slice(state, appTxnIdx + 1),
      ]
    default:
      return state
  }
}

export default transactions
export type RootState = {
  transactions: TransactionsState,
}

export const transactionsSelector = (state: RootState): TransactionsState => state.transactions

export const makeGetTransactionsFromAddress = createSelector(transactionsSelector, txns => address =>
  _.filter(txns, { from: address }),
)

export const makeGetTransactionIdsFromAddress = createSelector(
  makeGetTransactionsFromAddress,
  transactionsFromAddress => address => _.map(transactionsFromAddress(address), 'transactionHash'),
)

export const makeGetPendingTransactionsFromAddress = createSelector(
  makeGetTransactionsFromAddress,
  transactionsFromAddress => address => _.filter(transactionsFromAddress(address), ({ status }) => _.isNull(status)),
)

export const makeGetCompletedTransactionsFromAddress = createSelector(
  makeGetTransactionsFromAddress,
  transactionsFromAddress => address => _.filter(transactionsFromAddress(address), { status: '0x1' }),
)
