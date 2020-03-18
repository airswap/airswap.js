// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getERC1155BalanceOf = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'balanceOf', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC1155BalanceOfBatch = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'balanceOfBatch', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC1155IsApprovedForAll = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'isApprovedForAll', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getERC1155GetComplianceService = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getComplianceService', namespace: 'ERC1155' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
