// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getIndexRenounceOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'renounceOwnership', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexTransferOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferOwnership', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexSetLocatorTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setLocator', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexUnsetLocatorTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'unsetLocator', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexUpdateLocatorTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'updateLocator', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
