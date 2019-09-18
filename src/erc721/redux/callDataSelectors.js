// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getERC721SupportsInterface = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'supportsInterface', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC721BalanceOf = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'balanceOf', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC721OwnerOf = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'ownerOf', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC721GetApproved = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getApproved', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC721IsApprovedForAll = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'isApprovedForAll', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC721KittyIndexToApproved = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'kittyIndexToApproved', namespace: 'ERC721' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
