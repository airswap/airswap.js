export const getAllBalancesForAddress = address => ({
  type: 'GET_ALL_BALANCES_FOR_ADDRESS',
  address,
})

export const getAllAllowancesForAddress = address => ({
  type: 'GET_ALL_ALLOWANCES_FOR_ADDRESS',
  address,
})

export const getTokenBalancesForAddresses = (addresses, tokens) => ({
  type: 'GET_TOKEN_BALANCES_FOR_ADDRESSES',
  addresses,
  tokens,
})

export const getTokenAllowancesForAddresses = (addresses, tokens) => ({
  type: 'GET_TOKEN_ALLOWANCES_FOR_ADDRESSES',
  addresses,
  tokens,
})

export const getAllBalancesForConnectedAddress = address => ({
  type: 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS',
  address,
})

export const getAllAllowancesForConnectedAddress = address => ({
  type: 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS',
  address,
})
