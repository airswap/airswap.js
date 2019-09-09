import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getDeltaBalancesDestructTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'destruct', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestDeltaBalancesDestructTransaction = createSelector(
  getDeltaBalancesDestructTransactions,
  transactions => () => _.last(_.filter(transactions, {})),
)

export const getDeltaBalancesWithdrawTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdraw', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestDeltaBalancesWithdrawTransaction = createSelector(
  getDeltaBalancesWithdrawTransactions,
  transactions => () => _.last(_.filter(transactions, {})),
)

export const getDeltaBalancesWithdrawTokenTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'withdrawToken', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestDeltaBalancesWithdrawTokenTransaction = createSelector(
  getDeltaBalancesWithdrawTokenTransactions,
  transactions => ({ token, amount }) => _.last(_.filter(transactions, { token, amount })),
)

export const getDeltaBalancesConstructorTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'constructor', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})

export const makeGetLatestDeltaBalancesConstructorTransaction = createSelector(
  getDeltaBalancesConstructorTransactions,
  transactions => ({ _deployer }) => _.last(_.filter(transactions, { _deployer })),
)
