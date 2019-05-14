import { EXCHANGE_CONTRACT_ADDRESS } from '../../constants'

export const approveToken = (tokenAddress, spender) => ({
  type: 'APPROVE_TOKEN',
  tokenAddress,
  spender,
})

export const wrapWeth = amount => ({
  type: 'WRAP_WETH',
  amount,
})

export const unwrapWeth = amount => ({
  type: 'UNWRAP_WETH',
  amount,
})

export const approveAirswapToken = tokenAddress => approveToken(tokenAddress, EXCHANGE_CONTRACT_ADDRESS)
