// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getWrapperSwapContract = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'swapContract', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getWrapperWethContract = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'wethContract', namespace: 'wrapper' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
