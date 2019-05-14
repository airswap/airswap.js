/**
 * @namespace keySpace
 */
import { createSelector } from 'reselect'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

const defaultState = {
  initializingKeyspace: false,
  signedSeed: {},
}

const keySpace = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SIGNED_SEED':
      return {
        ...state,
        signedSeed: {
          ...state.signedSeed,
          [action.address]: action.signedSeed,
        },
      }
    case 'INITIALIZE_KEYSPACE':
      return {
        ...state,
        initializingKeyspace: true,
      }
    case 'KEYSPACE_READY':
      return {
        ...state,
        initializingKeyspace: false,
      }
    case 'KEYSPACE_INIT_ERROR':
      return {
        ...state,
        initializingKeyspace: false,
      }
    default:
      return state
  }
}

const getKeySpace = state => state.keySpace
const getSignedSeed = createSelector(getKeySpace, getConnectedWalletAddress, (Ks, address) => Ks.signedSeed[address])

/**
 * @function getIsInitializingKeyspace
 * @description The currently connected wallet type
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletType}
 */
const getIsInitializingKeyspace = createSelector(getKeySpace, ({ initializingKeyspace }) => initializingKeyspace)

export const selectors = {
  getSignedSeed,
  getIsInitializingKeyspace,
}

export default keySpace
