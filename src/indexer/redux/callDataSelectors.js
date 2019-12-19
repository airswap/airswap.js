// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getIndexerIndexes = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'indexes', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerIsOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'isOwner', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerLocatorWhitelists = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'locatorWhitelists', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'owner', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerStakingToken = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'stakingToken', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerTokenBlacklist = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'tokenBlacklist', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerGetLocators = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getLocators', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexerGetStakedAmount = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getStakedAmount', namespace: 'indexer' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
