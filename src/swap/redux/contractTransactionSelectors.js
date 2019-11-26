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

export const getSwapCancelUpToTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancelUpTo', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapAuthorizeSenderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'authorizeSender', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapAuthorizeSignerTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'authorizeSigner', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapRevokeSenderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'revokeSender', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapRevokeSignerTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'revokeSigner', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
