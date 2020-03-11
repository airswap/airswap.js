// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getERC1155SafeTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'safeTransferFrom', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC1155SafeBatchTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'safeBatchTransferFrom', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const getERC1155SetApprovalForAllTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setApprovalForAll', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
