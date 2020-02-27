import abi from '../../abis/swap.json'
import { makePromiseAction } from '../../utils/redux'
import { WRAPPER_CONTRACT_ADDRESS, SWAP_LEGACY_CONTRACT_ADDRESS } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { nest, mapNested20OrderTo22Order } from '../utils'
import {
  fetchSwapSenderAuthorizations,
  submitSwapAuthorizeSender,
  submitSwap,
  submitSwapCancel,
} from './contractFunctionActions'
import { approveToken } from '../../erc20/redux/actions'

export const fillSwap = (orderParams, options) => dispatch => {
  let order = orderParams
  if (order.makerToken || order.signerToken) {
    // order is flat
    order = nest(order)
  }
  // now order is nested
  if (order.maker) {
    // order is in 2.0 format and we need to map to 2.2 format
    order = mapNested20OrderTo22Order(order)
  }
  // now order is in nested format
  order.signature.v = Number(order.signature.v)
  dispatch(
    submitSwap({
      order,
      options,
    }),
  )
}

export const cancelSwap = (order, options) =>
  submitSwapCancel({
    nonces: [order.nonce],
    options,
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
