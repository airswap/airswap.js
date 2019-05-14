import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

function ledgerPathType(state = 'live', action) {
  if (action.type === 'SET_LEDGER_PATH_TYPE') {
    return action.pathType
  }
  return state
}

function ledgerIndex(state = 0, action) {
  if (action.type === 'SET_LEDGER_PATH_TYPE') {
    return action.index
  }
  return state
}

const ledger = combineReducers({ pathType: ledgerPathType, index: ledgerIndex })

export default ledger

export const getLedgerState = state => state.ledger

/**
 * @function getLedgerIndex
 * @description Index of currently selected ledger path
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {number}
 */
export const getLedgerIndex = createSelector(getLedgerState, ({ index }) => index)

/**
 * @function getLedgerPathType
 * @description Index of currently selected ledger path
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {string}
 */
export const getLedgerPathType = createSelector(getLedgerState, ({ pathType }) => pathType)

export const selectors = {
  getLedgerIndex,
  getLedgerPathType,
}
