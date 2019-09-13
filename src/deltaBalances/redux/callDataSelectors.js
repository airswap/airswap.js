// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getDeltaBalancesAllBalancesForManyAccounts = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'allBalancesForManyAccounts', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesTokenBalance = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'tokenBalance', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesWalletAllowances = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'walletAllowances', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesWalletBalances = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'walletBalances', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesTokenAllowance = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'tokenAllowance', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesAllWETHbalances = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'allWETHbalances', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesAllAllowancesForManyAccounts = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'allAllowancesForManyAccounts', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDeltaBalancesAdmin = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'admin', namespace: 'deltaBalances' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
