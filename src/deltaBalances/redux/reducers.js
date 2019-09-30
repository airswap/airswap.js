/** @namespace deltaBalances */
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { selectors as fiatSelectors } from '../../fiat/redux'

const defaultState = {}

// REDUCER DEFINITION

function balancesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GOT_TOKEN_BALANCES':
      return _.merge({}, state, action.balances)
    default:
      return state
  }
}

function approvalsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GOT_TOKEN_ALLOWANCES':
      return _.merge({}, state, action.approvals)
    default:
      return state
  }
}

function swapApprovalsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GOT_SWAP_TOKEN_ALLOWANCES':
      return _.merge({}, state, action.approvals)
    default:
      return state
  }
}

function trackedAddressesReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TRACKED_ADDRESS':
      return _.uniqBy(
        [
          ...state,
          {
            address: action.address,
            tokenAddress: action.tokenAddress,
          },
        ],
        ({ address, tokenAddress }) => `${address}${tokenAddress}`,
      )
    case 'ADD_TRACKED_ADDRESSES':
      return _.uniqBy(
        [...state, ...action.trackedAddresses],
        ({ address, tokenAddress }) => `${address}${tokenAddress}`,
      )
    default:
      return state
  }
}

export default combineReducers({
  balances: balancesReducer,
  approvals: approvalsReducer,
  swapApprovals: swapApprovalsReducer,
  trackedAddresses: trackedAddressesReducer,
})

export const getBalances = state => state.deltaBalances.balances

export const getBalancesFormatted = createSelector(
  getBalances,
  tokenSelectors.makeDisplayByToken,
  (balances, displayByToken) =>
    _.mapValues(balances, addressBalances =>
      _.mapValues(addressBalances, (balance, address) => displayByToken({ address }, balance)),
    ),
)

export const getConnectedBalances = createSelector(
  getBalances,
  getConnectedWalletAddress,
  (balances, address) => balances[address] || {},
)
export const getConnectedBalancesFormatted = createSelector(
  getConnectedBalances,
  tokenSelectors.makeDisplayByToken,
  (balances, displayByToken) => _.mapValues(balances, (balance, address) => displayByToken({ address }, balance)),
)

/**
 * Returns the fiat string representation of all connected balances, ex: {[tokenAddress]: '$12.45'}
 * @function getConnectedBalancesInFiat
 * @memberof deltaBalances
 * @param {Object} state Redux store state
 * @returns {Object}
 */
export const getConnectedBalancesInFiat = createSelector(
  getConnectedBalancesFormatted,
  fiatSelectors.makeGetTokenInFiatFromDisplayValue,
  (balances, getTokenInFiatFromDisplayValue) =>
    _.mapValues(balances, (balance, address) => getTokenInFiatFromDisplayValue({ address }, balance)),
)
/**
 * Returns the unsigned fiat string representation of all connected balances, ex: {[tokenAddress]: '12.45'}
 * @function getConnectedBalancesInFiatUnisgned
 * @memberof deltaBalances
 * @param {Object} state Redux store state
 * @returns {Object}
 */
export const getConnectedBalancesInFiatUnisgned = createSelector(
  getConnectedBalancesInFiat,
  fiatSelectors.getSelectedCurrencySymbolAscii,
  (balances, symbol) => _.mapValues(balances, balance => Number(_.trimStart(balance, symbol))),
)

export const getApprovals = state => state.deltaBalances.approvals
export const getSwapApprovals = state => state.deltaBalances.swapApprovals
export const getConnectedApprovals = createSelector(
  getApprovals,
  getConnectedWalletAddress,
  (approvals, address) => approvals[address],
)
export const getIsLoadingConnectedApprovals = createSelector(getConnectedApprovals, approvals =>
  _.isUndefined(approvals),
)

export const getConnectedSwapApprovals = createSelector(
  getSwapApprovals,
  getConnectedWalletAddress,
  (approvals, address) => approvals[address],
)

export const getIsLoadingConnectedSwapApprovals = createSelector(getConnectedSwapApprovals, approvals =>
  _.isUndefined(approvals),
)

const getTrackedAddresses = state => state.deltaBalances.trackedAddresses

const getTrackedTokensByAddress = createSelector(getTrackedAddresses, trackedAddresses =>
  _.reduce(
    trackedAddresses,
    (obj, { address, tokenAddress }) => {
      if (_.isArray(obj[address])) {
        obj[address] = _.uniq([...obj[address], tokenAddress]) // eslint-disable-line
      } else {
        obj[address] = [tokenAddress] // eslint-disable-line
      }
      return obj
    },
    {},
  ),
)

const getTrackedWalletAddresses = createSelector(getTrackedTokensByAddress, trackedAddresses =>
  _.keys(trackedAddresses),
)

export const selectors = {
  getBalances,
  getBalancesFormatted,
  getConnectedBalances,
  getConnectedBalancesFormatted,
  getApprovals,
  getConnectedApprovals,
  getSwapApprovals,
  getConnectedSwapApprovals,
  getConnectedBalancesInFiat,
  getConnectedBalancesInFiatUnisgned,
  getTrackedAddresses,
  getTrackedTokensByAddress,
  getTrackedWalletAddresses,
  getIsLoadingConnectedApprovals,
  getIsLoadingConnectedSwapApprovals,
}
