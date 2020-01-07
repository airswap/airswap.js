// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getSwapRegistry = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'registry', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapSenderAuthorizations = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'senderAuthorizations', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapSignerAuthorizations = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'signerAuthorizations', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapSignerMinimumNonce = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'signerMinimumNonce', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapSignerNonceStatus = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'signerNonceStatus', namespace: 'swap' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
