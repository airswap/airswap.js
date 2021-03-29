// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getSwapLightRenounceOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'renounceOwnership', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightTransferOwnershipTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferOwnership', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightSwapTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swap', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightSwapWithRecipientTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'swapWithRecipient', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightSetFeeWalletTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setFeeWallet', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightSetFeeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setFee', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightAuthorizeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'authorize', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightRevokeTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'revoke', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getSwapLightCancelTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'cancel', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
