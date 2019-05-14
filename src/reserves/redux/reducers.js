import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { makeContainers } from '../../utils/redux'
import { makeHTTPReducer, makeHTTPSelectors } from '../../utils/redux/templates/http'
import { makeEthersTxnReducer, makeEthersTxnSelectors } from '../../utils/redux/templates/ethersTransaction'

// REDUCER DEFINITION

const reserveAddresses = makeHTTPReducer('reserveAddresses')
const limitOrders = makeHTTPReducer('limitOrders')

const deployReserve = makeEthersTxnReducer('deployReserve')
const createReserveLimitOrder = makeEthersTxnReducer('createReserveLimitOrder')
const cancelReserveLimitOrder = makeEthersTxnReducer('cancelReserveLimitOrder')

export default combineReducers({
  reserveAddresses,
  limitOrders,
  deployReserve,
  createReserveLimitOrder,
  cancelReserveLimitOrder,
})

const reserveAddressesSelectors = makeHTTPSelectors('reserveAddresses', 'reserves')
const limitOrdersSelectors = makeHTTPSelectors('limitOrders', 'reserves')
const deployReserveSelectors = makeEthersTxnSelectors('deployReserve', 'reserves')
const createReserveLimitOrderSelectors = makeEthersTxnSelectors('createReserveLimitOrder', 'reserves')
const cancelReserveLimitOrderSelectors = makeEthersTxnSelectors('cancelReserveLimitOrder', 'reserves')

const getSelectedReserve = createSelector(
  reserveAddressesSelectors.getFetchedReserveAddresses,
  addresses => _.first(addresses) || '',
)

const reserveAddressesContainers = makeContainers(reserveAddressesSelectors)
const limitOrdersContainers = makeContainers(limitOrdersSelectors)
const deployReserveContainers = makeContainers(deployReserveSelectors)
const createReserveLimitOrderContainers = makeContainers(createReserveLimitOrderSelectors)
const cancelReserveLimitOrderContainers = makeContainers(cancelReserveLimitOrderSelectors)

export const containers = {
  ...reserveAddressesContainers,
  ...limitOrdersContainers,
  ...deployReserveContainers,
  ...createReserveLimitOrderContainers,
  ...cancelReserveLimitOrderContainers,
}

export const selectors = {
  ...reserveAddressesSelectors,
  ...limitOrdersSelectors,
  ...deployReserveSelectors,
  ...createReserveLimitOrderSelectors,
  ...cancelReserveLimitOrderSelectors,
  getSelectedReserve,
}
