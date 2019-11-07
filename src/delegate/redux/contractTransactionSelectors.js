// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getDelegateRenounceOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'renounceOwnership', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateTransferOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferOwnership', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateSetRuleTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setRule', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateUnsetRuleTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'unsetRule', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateSetRuleAndIntentTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setRuleAndIntent', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateUnsetRuleAndIntentTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'unsetRuleAndIntent', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateProvideOrderTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'provideOrder', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getDelegateSetTradeWalletTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setTradeWallet', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
