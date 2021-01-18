// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getSwapLightSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightCancelTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancel', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightCancelUpToTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancelUpTo', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
