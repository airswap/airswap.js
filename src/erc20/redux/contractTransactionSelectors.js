// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getERC20ApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC20TransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC20TransferTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transfer', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC20ApproveAndCallTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approveAndCall', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
