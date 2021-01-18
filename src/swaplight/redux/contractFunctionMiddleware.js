// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function swapLightMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_SWAP_LIGHT_DOMAIN_CHAIN_ID':
        contractFunctions
          .getSwapLightDOMAIN_CHAIN_ID(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'DOMAIN_CHAIN_ID',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_DOMAIN_NAME':
        contractFunctions
          .getSwapLightDOMAIN_NAME(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'DOMAIN_NAME',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_DOMAIN_SEPARATOR':
        contractFunctions
          .getSwapLightDOMAIN_SEPARATOR(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'DOMAIN_SEPARATOR',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_DOMAIN_TYPEHASH':
        contractFunctions
          .getSwapLightDOMAIN_TYPEHASH(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'DOMAIN_TYPEHASH',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_DOMAIN_VERSION':
        contractFunctions
          .getSwapLightDOMAIN_VERSION(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'DOMAIN_VERSION',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_ORDER_TYPEHASH':
        contractFunctions
          .getSwapLightORDER_TYPEHASH(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'ORDER_TYPEHASH',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_SIGNER_MINIMUM_NONCE':
        contractFunctions
          .getSwapLightSignerMinimumNonce(action.ethAmount, action.nonce)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'signerMinimumNonce',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount, nonce: action.nonce },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_SWAP_LIGHT_SWAP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightSwap(
            action.ethAmount,
            action.nonce,
            action.expiry,
            action.signerToken,
            action.signerAmount,
            action.senderToken,
            action.senderAmount,
            action.signature,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'swap',
            parameters: {
              ethAmount: action.ethAmount,
              nonce: action.nonce,
              expiry: action.expiry,
              signerToken: action.signerToken,
              signerAmount: action.signerAmount,
              senderToken: action.senderToken,
              senderAmount: action.senderAmount,
              signature: action.signature,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_CANCEL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightCancel(
            action.ethAmount,
            action.nonces,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'cancel',
            parameters: { ethAmount: action.ethAmount, nonces: action.nonces },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_CANCEL_UP_TO':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightCancelUpTo(
            action.ethAmount,
            action.minimumNonce,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'cancelUpTo',
            parameters: { ethAmount: action.ethAmount, minimumNonce: action.minimumNonce },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_SWAP_LIGHT_NONCE_USED':
        contractFunctions
          .getSwapLightNonceUsed(action.ethAmount, action.signer, action.nonce)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'nonceUsed',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount, signer: action.signer, nonce: action.nonce },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_GET_CHAIN_ID':
        contractFunctions
          .getSwapLightGetChainId(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'getChainId',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
