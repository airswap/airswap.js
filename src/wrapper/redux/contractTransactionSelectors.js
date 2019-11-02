// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getWrapperKillContractTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'killContract', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWrapperRenounceOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'renounceOwnership', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWrapperSetPausedStatusTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setPausedStatus', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWrapperSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWrapperTransferOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferOwnership', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
