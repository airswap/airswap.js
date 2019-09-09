import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getSwapMakerMinimumNonce = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'makerMinimumNonce', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapMakerOrderStatus = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'makerOrderStatus', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapDelegateApprovals = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'delegateApprovals', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
