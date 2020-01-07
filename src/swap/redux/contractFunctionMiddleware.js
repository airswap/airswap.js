// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function swapMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_SWAP_REGISTRY':
        contractFunctions
          .getSwapRegistry()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swap',
              name: 'registry',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_SENDER_AUTHORIZATIONS':
        contractFunctions
          .getSwapSenderAuthorizations(action.authorizerAddress, action.authorizedSender)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swap',
              name: 'senderAuthorizations',
              timestamp: Date.now(),
              parameters: { authorizerAddress: action.authorizerAddress, authorizedSender: action.authorizedSender },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_SIGNER_AUTHORIZATIONS':
        contractFunctions
          .getSwapSignerAuthorizations(action.authorizerAddress, action.authorizedSigner)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swap',
              name: 'signerAuthorizations',
              timestamp: Date.now(),
              parameters: { authorizerAddress: action.authorizerAddress, authorizedSigner: action.authorizedSigner },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_SIGNER_MINIMUM_NONCE':
        contractFunctions
          .getSwapSignerMinimumNonce(action.signer)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swap',
              name: 'signerMinimumNonce',
              timestamp: Date.now(),
              parameters: { signer: action.signer },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_SIGNER_NONCE_STATUS':
        contractFunctions
          .getSwapSignerNonceStatus(action.signer, action.nonce)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swap',
              name: 'signerNonceStatus',
              timestamp: Date.now(),
              parameters: { signer: action.signer, nonce: action.nonce },
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
      case 'SUBMIT_SWAP_CANCEL_UP_TO':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapCancelUpTo(action.minimumNonce, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'cancelUpTo',
            parameters: { minimumNonce: action.minimumNonce },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_AUTHORIZE_SENDER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapAuthorizeSender(action.authorizedSender, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'authorizeSender',
            parameters: { authorizedSender: action.authorizedSender },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_AUTHORIZE_SIGNER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapAuthorizeSigner(action.authorizedSigner, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'authorizeSigner',
            parameters: { authorizedSigner: action.authorizedSigner },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_REVOKE_SENDER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapRevokeSender(action.authorizedSender, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'revokeSender',
            parameters: { authorizedSender: action.authorizedSender },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_REVOKE_SIGNER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapRevokeSigner(action.authorizedSigner, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swap',
            name: 'revokeSigner',
            parameters: { authorizedSigner: action.authorizedSigner },
          })
          action.resolve(id)
        })
        break
      default:
    }
    return next(action)
  }
}
