import _ from 'lodash'
import { combineReducers } from 'redux'
/**
 * @namespace wallet
 */
import { createSelector } from 'reselect'
import {
  WETH_CONTRACT_ADDRESS,
  SWAP_LEGACY_CONTRACT_ADDRESS,
  keyspaceDefaultSeedFn,
  keyspaceSignatureTextFn,
} from '../../constants'
import { web3WalletTypes } from '../static/constants'

const defaultState = {
  connectingWallet: false,
  walletType: '',
  address: '',
  error: '',
  walletAction: {},
}

// REDUCER DEFINITION

function walletConnection(state = defaultState, action) {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return {
        ...state,
        error: '',
        connectingWallet: true,
      }
    case 'CONNECTED_WALLET':
      return {
        ...state,
        connectingWallet: false,
        walletType: action.walletType,
        address: action.address,
      }
    case 'CLEAR_WALLET':
      return defaultState
    case 'ERROR_CONNECTING_WALLET':
      return {
        ...defaultState,
        connectingWallet: false,
        error: action.error,
      }
    case 'START_WALLET_ACTION':
      const { actionType, params } = action
      return {
        ...state,
        walletAction: { actionType, params },
      }
    case 'FINISH_WALLET_ACTION':
      return {
        ...state,
        walletAction: {},
      }
    default:
      return state
  }
}

function createWalletAvailable(walletType) {
  return (state = false, action) => {
    if (action.type === 'SET_WALLET_AVAILABILITY') {
      if (action.wallets[walletType] === undefined) return state
      return action.wallets[walletType]
    }
    return state
  }
}

function walletExpressLogin(state = {}, action) {
  switch (action.type) {
    case 'CONNECTED_WALLET':
      return {
        walletType: action.walletType,
        address: action.address,
      }
    case 'CLEAR_WALLET':
      return {}
    default:
      return state
  }
}

const walletAvailable = combineReducers(_.zipObject(web3WalletTypes, web3WalletTypes.map(createWalletAvailable)))

const walletState = combineReducers({
  connection: walletConnection,
  available: walletAvailable,
  expressLogin: walletExpressLogin,
})

const getWalletState = state => state.wallet

export const getConnectedWalletState = createSelector(getWalletState, wallet => wallet.connection)

export const getAvailableWalletState = createSelector(getWalletState, wallet => wallet.available)

export const getExpressLoginCredentials = createSelector(getWalletState, wallet => wallet.expressLogin)

/**
 * @function getWalletType
 * @description The currently connected wallet type
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletType}
 */
export const getWalletType = createSelector(getConnectedWalletState, wallet => wallet.walletType)

/**
 * @function getConnectedWalletAddress
 * @description The currently connected wallet address
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
export const getConnectedWalletAddress = createSelector(getConnectedWalletState, wallet => wallet.address.toLowerCase())
/**
 * @function getWalletConnectionError
 * @description The last error to occur when connecting a wallet. It is cleared when a new 'CONNECT_WALLET' actions is dispatched.
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {string}
 */
export const getWalletConnectionError = createSelector(getConnectedWalletState, wallet => wallet.error)

/**
 * @function getIsWalletConnecting
 * @description Returns true if wallet connection has been initiated but not yet completed (like when metamask is in the midst of being enabled, or picking your derivation path on ledger)
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletConnecting = createSelector(getConnectedWalletState, wallet => wallet.connectingWallet)

/**
 * @typedef {Object} SignatureParams
 * @memberof wallet
 * @property {string} signatureText
 */

/**
 * @typedef {Object} SendTransactionParams
 * @memberof wallet
 * @property {string} name The name of the function being invoked on the contract
 * @property {string} to The Contract the transaction is being sent to
 * @property {string[]} parameters The input parameters of the contract function (currently unnamed, can name if needed)
 */

/**
 * @typedef {Object} WalletAction
 * @description When actionType === 'signMessage', params are SignatureParams, when actionType === 'sendTransaction', params are SendTransactionParams
 * @memberof wallet
 * @property {('signMessage'|'sendTransaction')} actionType
 * @property {(wallet.SignatureParams | wallet.SendTransactionParams)} params
 */

/**
 * A selector to get the currently executing wallet action. Returns an empty object when nothing is executing.
 * @function getWalletAction
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletAction}
 */
export const getWalletAction = createSelector(getConnectedWalletState, wallet => wallet.walletAction)

/**
 * @function getIsWalletGeneratingKeySpaceKeys
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletGeneratingKeySpaceKeys = createSelector(
  getWalletAction,
  ({ actionType, params }) =>
    actionType === 'signMessage' && _.startsWith(params.signatureText, keyspaceDefaultSeedFn()),
)
/**
 * @function getIsWalletAuthenticatingKeySpaceKeys
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletAuthenticatingKeySpaceKeys = createSelector(
  getWalletAction,
  ({ actionType, params }) =>
    actionType === 'signMessage' && _.startsWith(params.signatureText, keyspaceSignatureTextFn()),
)
/**
 * @function getIsWalletWrappingWeth
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletWrappingWeth = createSelector(
  getWalletAction,
  ({ actionType, params }) =>
    actionType === 'sendTransaction' && params.to === WETH_CONTRACT_ADDRESS && params.name === 'deposit',
)
/**
 * @function getIsWalletUnwrappingWeth
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletUnwrappingWeth = createSelector(
  getWalletAction,
  ({ actionType, params }) =>
    actionType === 'sendTransaction' && params.to === WETH_CONTRACT_ADDRESS && params.name === 'withdraw',
)
/**
 * @function getIsWalletApprovingToken
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletApprovingToken = createSelector(
  getWalletAction,
  ({ actionType, params }) => actionType === 'sendTransaction' && params.name === 'approve',
)
/**
 * @function getIsWalletFillingOrder
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsWalletFillingOrder = createSelector(
  getWalletAction,
  ({ actionType, params }) =>
    actionType === 'sendTransaction' && params.to === SWAP_LEGACY_CONTRACT_ADDRESS && params.name === 'fill',
)

export const selectors = {
  getConnectedWalletAddress,
  getWalletConnectionError,
  getWalletType,
  getWalletAction,
  getIsWalletGeneratingKeySpaceKeys,
  getIsWalletAuthenticatingKeySpaceKeys,
  getIsWalletWrappingWeth,
  getIsWalletUnwrappingWeth,
  getIsWalletApprovingToken,
  getIsWalletFillingOrder,
  getIsWalletConnecting,
  getAvailableWalletState,
  getExpressLoginCredentials,
}

export default walletState
