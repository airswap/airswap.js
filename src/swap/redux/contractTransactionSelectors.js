// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapCancelTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancel', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapInvalidateTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'invalidate', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapAuthorizeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'authorize', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapRevokeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'revoke', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
