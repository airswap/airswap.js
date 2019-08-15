const defaultState = {
  isDoingLookup: false,
  isReady: false,
  error: null,
  nameToAddressMap: {},
  addressToNameMap: {},
}

const ens = (state = defaultState, action) => {
  switch (action.type) {
    case 'ENS_READY':
      return {
        ...state,
        isReady: true,
      }
    case 'FIND_ADDRESS_BY_ENS_NAME':
      return {
        ...state,
        isDoingLookup: true,
      }
    case 'FIND_ENS_NAME_BY_ADDRESS':
      return {
        ...state,
        isDoingLookup: true,
      }
    case 'ENS_LOOKUP_ERROR':
      return {
        ...state,
        error: action.error,
        isDoingLookup: false,
      }
    case 'ENS_LOOKUP_SUCCESS':
      return {
        ...state,
        nameToAddressMap: { ...state.nameToAddressMap, [action.ensName]: action.address },
        addressToNameMap: { ...state.addressToNameMap, [action.address]: action.ensName },
        error: null,
        isDoingLookup: false,
      }
    default:
      return state
  }
}

const getIsENSReady = state => state.ens.isReady
const getIsDoingENSLookup = state => state.ens.isDoingLookup
const getENSError = state => state.ens.error
const getENSNamesByAddress = state => state.ens.addressToNameMap
const getENSAddressesByName = state => state.ens.nameToAddressMap

export const selectors = {
  getIsENSReady,
  getIsDoingENSLookup,
  getENSError,
  getENSNamesByAddress,
  getENSAddressesByName,
}
export default ens
