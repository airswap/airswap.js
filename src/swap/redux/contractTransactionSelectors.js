import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestSwapTransaction = createSelector(getSwapTransactions, transactions => ({ order }) =>
  _.last(_.filter(transactions, { order })),
)

export const getSwapCancelTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancel', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestSwapCancelTransaction = createSelector(
  getSwapCancelTransactions,
  transactions => ({ nonces }) => _.last(_.filter(transactions, { nonces })),
)

export const getSwapInvalidateTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'invalidate', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestSwapInvalidateTransaction = createSelector(
  getSwapInvalidateTransactions,
  transactions => ({ minimumNonce }) => _.last(_.filter(transactions, { minimumNonce })),
)

export const getSwapAuthorizeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'authorize', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestSwapAuthorizeTransaction = createSelector(
  getSwapAuthorizeTransactions,
  transactions => ({ delegate, expiry }) => _.last(_.filter(transactions, { delegate, expiry })),
)

export const getSwapRevokeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'revoke', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestSwapRevokeTransaction = createSelector(
  getSwapRevokeTransactions,
  transactions => ({ delegate }) => _.last(_.filter(transactions, { delegate })),
)
