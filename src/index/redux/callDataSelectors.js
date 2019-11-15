// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getIndexEntries = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'entries', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexIsOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'isOwner', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexLength = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'length', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'owner', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexGetScore = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getScore', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexGetLocator = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getLocator', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getIndexGetLocators = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getLocators', namespace: 'index' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
