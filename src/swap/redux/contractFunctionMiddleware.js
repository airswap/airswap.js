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
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitSwap(action.order, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'SUBMIT_SWAP_CANCEL':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitSwapCancel(action.nonces, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'SUBMIT_SWAP_INVALIDATE':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitSwapInvalidate(action.minimumNonce, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'SUBMIT_SWAP_AUTHORIZE':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitSwapAuthorize(action.delegate, action.expiry, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'SUBMIT_SWAP_REVOKE':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitSwapRevoke(action.delegate, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      default:
    }
    return next(action)
  }
}
