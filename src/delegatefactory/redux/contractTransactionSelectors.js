// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

export const getDelegateFactoryCreateDelegateTransactions = createSelector(getTransactions, transactions => {
  const filteredValues = _.filter(transactions, { name: 'createDelegate', namespace: 'delegateFactory' })
  const sortedValues = _.sortBy(filteredValues, 'id')
  return sortedValues
})
