// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getWethApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWethTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWethWithdrawTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdraw', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWethTransferTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transfer', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getWethDepositTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'deposit', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
