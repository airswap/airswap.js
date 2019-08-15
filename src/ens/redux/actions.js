export const setENSReady = () => ({
  type: 'ENS_READY',
})

export const gotENSLookupError = errorMsg => ({
  type: 'ENS_LOOKUP_ERROR',
  error: errorMsg,
})

export const gotENSLookupSuccess = (address, ensName) => ({
  type: 'ENS_LOOKUP_SUCCESS',
  address: address.toLowerCase(),
  ensName,
})

export const findAddressByENSName = ensName => ({
  type: 'FIND_ADDRESS_BY_ENS_NAME',
  name: ensName,
})

export const findENSNameByAddress = address => ({
  type: 'FIND_ENS_NAME_BY_ADDRESS',
  address: address.toLowerCase(),
})
