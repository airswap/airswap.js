import { createSelector } from 'reselect'
import _ from 'lodash'

const transactionInitialState = {
  submitting: true,
  errorSubmitting: '',
  mining: false,
  transaction: undefined,
  mined: false,
  transactionReceipt: undefined,
  errorMining: '',
}

function transactions(state = {}, action) {
  switch (action.type) {
    case 'SUBMITTING_TRANSACTION':
      return {
        ...state,
        [action.id]: {
          ...transactionInitialState,
          id: action.id,
          namespace: action.namespace,
          name: action.name,
          parameters: action.parameters,
        },
      }
    case 'ERROR_SUBMITTING_TRANSACTION':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          submitting: false,
          errorSubmitting: action.error,
        },
      }
    case 'SUBMITTED_TRANSACTION':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          submitting: false,
          mining: true,
          transaction: action.transaction,
        },
      }
    case 'MINED_TRANSACTION':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          mining: false,
          mined: true,
          transactionReceipt: action.transactionReceipt,
        },
      }
    case 'ERROR_MINING_TRANSACTION':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          transactionReceipt: action.transactionReceipt,
          errorMining: action.error,
          mining: false,
          mined: true,
        },
      }
    default:
      return state
  }
}

export default transactions

const getTransactionTracker = state => state.transactionTracker
const getTransactions = createSelector(getTransactionTracker, t => _.values(t))

export const selectors = {
  getTransactions,
}
