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
  const filteredValues = _.filter(transactions, { name: 'Cancel(uint256,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapCancelUpToTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'CancelUpTo(uint256,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapAuthorizeSenderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'AuthorizeSender(address,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapAuthorizeSignerTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'AuthorizeSigner(address,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapRevokeSenderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'RevokeSender(address,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapRevokeSignerTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'RevokeSigner(address,address)', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
