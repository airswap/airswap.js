// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData

export const getSwapLightDOMAIN_CHAIN_ID = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'DOMAIN_CHAIN_ID', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightDOMAIN_NAME = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'DOMAIN_NAME', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightDOMAIN_SEPARATOR = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'DOMAIN_SEPARATOR', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightDOMAIN_TYPEHASH = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'DOMAIN_TYPEHASH', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightDOMAIN_VERSION = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'DOMAIN_VERSION', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightFEE_DIVISOR = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'FEE_DIVISOR', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightLIGHT_ORDER_TYPEHASH = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'LIGHT_ORDER_TYPEHASH', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightAuthorized = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'authorized', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightFeeWallet = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'feeWallet', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightOwner = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'owner', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightSignerFee = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'signerFee', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightNonceUsed = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'nonceUsed', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})

export const getSwapLightGetChainId = createSelector(getCallData, values => {
  const filteredValues = _.filter(values, { name: 'getChainId', namespace: 'swapLight' })
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
