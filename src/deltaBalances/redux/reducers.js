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
      return {
        ...state,
        ...action.balances,
      }
    default:
      return state
  }
}

function approvalsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GOT_TOKEN_ALLOWANCES':
      return {
        ...state,
        ...action.approvals,
      }
    default:
      return state
  }
}

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
export const getConnectedApprovals = createSelector(
  getApprovals,
  getConnectedWalletAddress,
  (approvals, address) => approvals[address],
)

export const selectors = {
  getBalances,
  getBalancesFormatted,
  getConnectedBalances,
  getConnectedBalancesFormatted,
  getApprovals,
  getConnectedApprovals,
  getConnectedBalancesInFiat,
  getConnectedBalancesInFiatUnisgned,
}

export default combineReducers({
  balances: balancesReducer,
  approvals: approvalsReducer,
})
