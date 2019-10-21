import abi from '../../abis/Swap.json'
import { makePromiseAction } from '../../utils/redux'
import { WRAPPER_CONTRACT_ADDRESS, INFINITE_EXPIRY, SWAP_LEGACY_CONTRACT_ADDRESS } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { fetchSwapDelegateApprovals, submitSwapAuthorize } from './contractFunctionActions'
import { approveToken } from '../../erc20/redux/actions'

export const fillSwap = order => ({
  type: 'FILL_SWAP',
  order,
})

export const cancelSwap = order => ({
  type: 'CANCEL_SWAP',
  order,
})

export const signSwap = makePromiseAction({
  type: 'SIGN_SWAP',
})

export const approveTokenForSwap = tokenAddress => approveToken(tokenAddress, SWAP_LEGACY_CONTRACT_ADDRESS)

export const getEthWrapperApproval = () => (dispatch, getState) =>
  dispatch(
    fetchSwapDelegateApprovals({
      approver: getConnectedWalletAddress(getState()),
      delegate: WRAPPER_CONTRACT_ADDRESS,
    }),
  )

export const submitEthWrapperAuthorize = () =>
  submitSwapAuthorize({
    expiry: INFINITE_EXPIRY,
    delegate: WRAPPER_CONTRACT_ADDRESS,
  })

export const trackSwapAllContracts = ({
  callback,
  nonce,
  makerWallet,
  takerWallet,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'Swap',
  params: { nonce, makerWallet, takerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancelAllContracts = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Cancel',
  params: { nonce, makerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})
