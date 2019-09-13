// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getERC20Name = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'name', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20TotalSupply = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'totalSupply', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20Decimals = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'decimals', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20Version = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'version', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20BalanceOf = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'balanceOf', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20Symbol = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'symbol', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC20Allowance = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'allowance', namespace: 'ERC20' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
