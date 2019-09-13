// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function swapMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_SWAP_MAKER_MINIMUM_NONCE':
        contractFunctions
          .getSwapMakerMinimumNonce(action.makerWallet)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'swap',
              name: 'makerMinimumNonce',
              timestamp: Date.now(),
              parameters: { makerWallet: action.makerWallet },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_MAKER_ORDER_STATUS':
        contractFunctions
          .getSwapMakerOrderStatus(action.makerWallet, action.nonce)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'swap',
              name: 'makerOrderStatus',
              timestamp: Date.now(),
              parameters: { makerWallet: action.makerWallet, nonce: action.nonce },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_DELEGATE_APPROVALS':
        contractFunctions
          .getSwapDelegateApprovals(action.approver, action.delegate)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'swap',
              name: 'delegateApprovals',
              timestamp: Date.now(),
              parameters: { approver: action.approver, delegate: action.delegate },
            })
            action.resolve(response)
          })
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
