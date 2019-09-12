import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getERC721TransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC721TransferFromTransaction = createSelector(
  getERC721TransferFromTransactions,
  transactions => ({ contractAddress, from, to, tokenId }) =>
    _.last(_.filter(transactions, { contractAddress, from, to, tokenId })),
)

export const getERC721ApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC721ApproveTransaction = createSelector(
  getERC721ApproveTransactions,
  transactions => ({ contractAddress, to, tokenId }) =>
    _.last(_.filter(transactions, { contractAddress, to, tokenId })),
)

export const getERC721SetApprovalForAllTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'setApprovalForAll', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC721SetApprovalForAllTransaction = createSelector(
  getERC721SetApprovalForAllTransactions,
  transactions => ({ contractAddress, operator, _approved }) =>
    _.last(_.filter(transactions, { contractAddress, operator, _approved })),
)

export const getERC721SafeTransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'safeTransferFrom', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC721SafeTransferFromTransaction = createSelector(
  getERC721SafeTransferFromTransactions,
  transactions => ({ contractAddress, from, to, tokenId }) =>
    _.last(_.filter(transactions, { contractAddress, from, to, tokenId })),
)
