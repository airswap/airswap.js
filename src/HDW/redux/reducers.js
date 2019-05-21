import { createSelector } from 'reselect'

const defaultState = {
  initializing: false,
  loadingHDWAccounts: false,
  pageOffset: 0,
  selectedAccount: 0,
  accounts: [],
  balances: {},
}

const HDW = (state = defaultState, action) => {
  switch (action.type) {
    case 'INITIALIZE_HDW':
      return {
        ...defaultState,
        initializing: true,
      }
    case 'CANCEL_HDW_INITIALIZATION':
      return {
        ...state,
        initializing: false,
      }
    case 'CONFIRM_HDW_PATH':
      return {
        ...state,
        initializing: false,
      }
    case 'LOADING_HDW_ACCOUNTS':
      return {
        ...state,
        loadingHDWAccounts: true,
      }
    case 'LOADED_HDW_ACCOUNTS':
      return {
        ...state,
        accounts: action.accounts,
        loadingHDWAccounts: false,
      }
    case 'ERROR_CONNECTING_TO_WALLET':
      return {
        ...state,
        loadingHDWAccounts: false,
        initializing: false,
      }
    case 'SET_HDW_SUBPATH':
      return {
        ...state,
        subPath: action.subPath,
        accounts: [],
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        initializing: false,
      }
    case 'SET_HDW_PAGE_OFFSET':
      return {
        ...state,
        pageOffset: action.pageOffset,
      }
    default:
      return state
  }
}

export default HDW

const getHDWState = state => state.hdw

const getHDWSettings = createSelector(
  getHDWState,
  ({ subPath, accounts, initializing, loadingHDWAccounts, pageOffset, balances }) => ({
    subPath,
    accounts,
    initializing,
    loadingHDWAccounts,
    pageOffset,
    balances,
  }),
)

export const selectors = { getHDWSettings }
