// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getWrapperSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWrapperProvideDelegateOrderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'provideDelegateOrder', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
