import { makePromiseAction } from '../../utils/redux'
import { WRAPPER_CONTRACT_ADDRESS, INFINITE_EXPIRY } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { getSwapDelegateApprovals, submitSwapAuthorize } from './contractFunctionActions'

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

export const getEthWrapperApproval = () => (dispatch, getState) =>
  dispatch(
    getSwapDelegateApprovals({
      approverAddress: getConnectedWalletAddress(getState()),
      delegateAddress: WRAPPER_CONTRACT_ADDRESS,
    }),
  ).then(resp => resp.toNumber() > Date.now() / 1000)

export const submitEthWrapperAuthorize = () =>
  submitSwapAuthorize({
    expiry: INFINITE_EXPIRY,
    delegate: WRAPPER_CONTRACT_ADDRESS,
  })
