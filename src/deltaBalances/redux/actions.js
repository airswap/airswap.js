export const getAllBalancesForConnectedAddress = address => ({
  type: 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS',
  address,
})

export const getAllAllowancesForConnectedAddress = address => ({
  type: 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS',
  address,
})

export const addTrackedAddress = ({ address, tokenAddress }) => ({
  type: 'ADD_TRACKED_ADDRESS',
  address,
  tokenAddress,
})

export const addTrackedAddresses = trackedAddresses => ({
  type: 'ADD_TRACKED_ADDRESSES',
  trackedAddresses,
})
