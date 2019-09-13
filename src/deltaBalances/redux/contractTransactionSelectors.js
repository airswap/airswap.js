// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getDeltaBalancesDestructTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'destruct', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDeltaBalancesWithdrawTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdraw', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDeltaBalancesWithdrawTokenTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdrawToken', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDeltaBalancesConstructorTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'constructor', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
