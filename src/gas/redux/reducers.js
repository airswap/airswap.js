/** @namespace gas */
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import * as types from '../../tcombTypes'
import { GAS_LEVELS } from '../../constants'
import { makeHTTPReducer, makeHTTPSelectors } from '../../utils/redux/templates/http'

const gasData = makeHTTPReducer('gasData')

function gasLevel(state = _.first(GAS_LEVELS), action) {
  switch (action.type) {
    case 'SET_GAS_LEVEL':
      return types.gasLevel(action.level)
    default:
      return state
  }
}

export default combineReducers({
  gasData,
  gasLevel,
})

const { getAttemptedGettingGasData, getGettingGasData, getErrorGettingGasData, getFetchedGasData } = makeHTTPSelectors(
  'gasData',
  'gas',
)
const getGas = state => state.gas
/**
 * A selector to get the current gas level, which must be one of the four levels returned by Eth Gas Station, defaults to 'fast'
 * @function getGasLevel
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {('fast'|'fastest'|'safeLow'|'average')}
 */
const getGasLevel = createSelector(getGas, gas => gas.gasLevel)

/**
 * @typedef {Object} GasPrices
 * @memberof gas
 * @property {number} fast
 * @property {number} fastest
 * @property {number} safeLow
 * @property {number} average
 */

/**
 * A selector to get the current gas prices (in gwei) for all levels
 * @function getAllGasGweiPrices
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {gas.GasPrices}
 */
const getAllGasGweiPrices = createSelector(getGasLevel, getFetchedGasData, (level, data) => {
  if (_.isEmpty(data)) {
    return {}
  }

  return _.mapValues(_.pick(data, GAS_LEVELS), v => Number(v) / 10) // for some reason the API returns gwei * 10, so we have to adjust it back down
})

/**
 * @typedef {Object} GasWaitTimes
 * @memberof gas
 * @property {number} fastWait
 * @property {number} fastestWait
 * @property {number} safeLowWait
 * @property {number} averageWait
 */

/**
 * A selector to get the current gas wait times (in seconds) for all levels
 * @function getAllGasGweiPrices
 * @memberof gas
 * @param {Object} state Redux store state
 * @returns {gas.GasWaitTimes}
 */
const getAllGasWaitTimesInSeconds = createSelector(getGasLevel, getFetchedGasData, (level, data) => {
  if (_.isEmpty(data)) {
    return {}
  }

  return _.mapValues(_.pick(data, _.map(GAS_LEVELS, l => `${l}Wait`)), v => Number(v) * 60)
})

const getCurrentGasPriceSettings = createSelector(getGasLevel, getFetchedGasData, (level, data) => {
  if (_.isEmpty(data)) {
    return {}
  }

  const gwei = data[level] / 10 // for some reason the API returns gwei * 10, so we have to adjust it back down
  const waitInSeconds = data[`${level}Wait`] * 60
  return { gwei, waitInSeconds }
})

export const selectors = {
  getAttemptedGettingGasData,
  getGettingGasData,
  getErrorGettingGasData,
  getFetchedGasData,
  getGasLevel,
  getCurrentGasPriceSettings,
  getAllGasGweiPrices,
  getAllGasWaitTimesInSeconds,
}
