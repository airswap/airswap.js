import {
  SWAP_LEGACY_CONTRACT_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  WRAPPER_CONTRACT_ADDRESS,
} from '../../constants'

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

export const approveAirswapToken = tokenAddress => approveToken(tokenAddress, SWAP_LEGACY_CONTRACT_ADDRESS)
export const approveAirswapTokenSwap = tokenAddress => approveToken(tokenAddress, SWAP_CONTRACT_ADDRESS)
export const approveWrapperWethToken = () => approveToken(WETH_CONTRACT_ADDRESS, WRAPPER_CONTRACT_ADDRESS)
