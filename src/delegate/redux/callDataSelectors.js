// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getDelegateIndexer = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'indexer', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateIsOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'isOwner', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'owner', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateProtocol = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'protocol', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateRules = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'rules', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateSwapContract = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'swapContract', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateTradeWallet = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'tradeWallet', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateGetSignerSideQuote = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getSignerSideQuote', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateGetSenderSideQuote = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getSenderSideQuote', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getDelegateGetMaxQuote = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getMaxQuote', namespace: 'delegate' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
