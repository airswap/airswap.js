// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getERC721TransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC721ApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC721SetApprovalForAllTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setApprovalForAll', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC721SafeTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'safeTransferFrom', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
