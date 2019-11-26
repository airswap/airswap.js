// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getIndexerRenounceOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'renounceOwnership', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerTransferOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferOwnership', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerSetLocatorWhitelistTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setLocatorWhitelist', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerCreateIndexTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'createIndex', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerAddTokenToBlacklistTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'addTokenToBlacklist', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerRemoveTokenFromBlacklistTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'removeTokenFromBlacklist', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerSetIntentTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setIntent', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getIndexerUnsetIntentTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'unsetIntent', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
