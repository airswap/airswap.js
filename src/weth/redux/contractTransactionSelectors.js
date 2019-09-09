import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getWethApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestWethApproveTransaction = createSelector(
  getWethApproveTransactions,
  transactions => ({ spender, amount }) => _.last(_.filter(transactions, { spender, amount })),
)

export const getWethTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestWethTransferFromTransaction = createSelector(
  getWethTransferFromTransactions,
  transactions => ({ from, to, amount }) => _.last(_.filter(transactions, { from, to, amount })),
)

export const getWethWithdrawTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdraw', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestWethWithdrawTransaction = createSelector(
  getWethWithdrawTransactions,
  transactions => ({ amount }) => _.last(_.filter(transactions, { amount })),
)

export const getWethTransferTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transfer', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestWethTransferTransaction = createSelector(
  getWethTransferTransactions,
  transactions => ({ to, amount }) => _.last(_.filter(transactions, { to, amount })),
)

export const getWethDepositTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'deposit', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestWethDepositTransaction = createSelector(getWethDepositTransactions, transactions => () =>
  _.last(_.filter(transactions, {})),
)
