import abi from '../../abis/swap.json'
import { makePromiseAction } from '../../utils/redux'
import { WRAPPER_CONTRACT_ADDRESS, SWAP_LEGACY_CONTRACT_ADDRESS } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { fetchSwapSenderAuthorizations, submitSwapAuthorizeSender } from './contractFunctionActions'
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
    fetchSwapSenderAuthorizations({
      authorizerAddress: getConnectedWalletAddress(getState()),
      authorizedSender: WRAPPER_CONTRACT_ADDRESS,
    }),
  )

export const submitEthWrapperAuthorize = () =>
  submitSwapAuthorizeSender({
    authorizedSender: WRAPPER_CONTRACT_ADDRESS,
  })

export const trackSwapAllContracts = ({
  callback,
  nonce,
  signerWallet,
  senderWallet,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  abi,
  name: 'Swap',
  params: { nonce, signerWallet, senderWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancelAllContracts = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Cancel',
  params: { nonce, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})
