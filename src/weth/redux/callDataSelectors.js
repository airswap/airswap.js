// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getWethName = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'name', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWethTotalSupply = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'totalSupply', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWethDecimals = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'decimals', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWethBalanceOf = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'balanceOf', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWethSymbol = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'symbol', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWethAllowance = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'allowance', namespace: 'weth' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
