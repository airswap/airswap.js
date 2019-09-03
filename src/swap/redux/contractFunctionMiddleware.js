import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function swapMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'GET_SWAP_MAKER_MINIMUM_NONCE':
        contractFunctions
          .getSwapMakerMinimumNonce(action.makerWallet)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_SWAP_MAKER_ORDER_STATUS':
        contractFunctions
          .getSwapMakerOrderStatus(action.makerWallet, action.nonce)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_SWAP_DELEGATE_APPROVALS':
        contractFunctions
          .getSwapDelegateApprovals(action.approverAddress, action.delegateAddress)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_SWAP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwap(action.order, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'swap',
            parameters: { order: action.order },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_CANCEL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapCancel(action.nonces, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'cancel',
            parameters: { nonces: action.nonces },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_INVALIDATE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapInvalidate(action.minimumNonce, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'invalidate',
            parameters: { minimumNonce: action.minimumNonce },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_AUTHORIZE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapAuthorize(action.delegate, action.expiry, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'authorize',
            parameters: { delegate: action.delegate, expiry: action.expiry },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_REVOKE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapRevoke(action.delegate, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'revoke',
            parameters: { delegate: action.delegate },
          })
          action.resolve(id)
        })
        break
      default:
    }
    return next(action)
  }
}
