import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getERC20ApproveTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approve', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC20ApproveTransaction = createSelector(
  getERC20ApproveTransactions,
  transactions => ({ contractAddress, spender, value }) =>
    _.last(_.filter(transactions, { contractAddress, spender, value })),
)

export const getERC20TransferFromTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transferFrom', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC20TransferFromTransaction = createSelector(
  getERC20TransferFromTransactions,
  transactions => ({ contractAddress, from, to, value }) =>
    _.last(_.filter(transactions, { contractAddress, from, to, value })),
)

export const getERC20TransferTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'transfer', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC20TransferTransaction = createSelector(
  getERC20TransferTransactions,
  transactions => ({ contractAddress, to, value }) => _.last(_.filter(transactions, { contractAddress, to, value })),
)

export const getERC20ApproveAndCallTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'approveAndCall', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestERC20ApproveAndCallTransaction = createSelector(
  getERC20ApproveAndCallTransactions,
  transactions => ({ contractAddress, spender, value, extraData }) =>
    _.last(_.filter(transactions, { contractAddress, spender, value, extraData })),
)
