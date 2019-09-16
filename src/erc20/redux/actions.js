import {
  SWAP_LEGACY_CONTRACT_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  WRAPPER_CONTRACT_ADDRESS,
  TOKEN_APPROVAL_AMOUNT,
} from '../../constants'
import { fetchERC20Allowance, submitERC20Approve } from './contractFunctionActions'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

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

export const approveWrapperWethToken = () =>
  submitERC20Approve({
    contractAddress: WETH_CONTRACT_ADDRESS,
    spender: WRAPPER_CONTRACT_ADDRESS,
    value: TOKEN_APPROVAL_AMOUNT,
  })

export const getWrapperWethTokenApproval = () => (dispatch, getState) =>
  dispatch(
    fetchERC20Allowance({
      contractAddress: WETH_CONTRACT_ADDRESS,
      owner: getConnectedWalletAddress(getState()),
      spender: WRAPPER_CONTRACT_ADDRESS,
    }),
  )
