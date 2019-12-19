// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getDelegateFactoryIndexerContract = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'indexerContract', namespace: 'delegateFactory' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateFactoryProtocol = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'protocol', namespace: 'delegateFactory' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateFactorySwapContract = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'swapContract', namespace: 'delegateFactory' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateFactoryHas = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'has', namespace: 'delegateFactory' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
