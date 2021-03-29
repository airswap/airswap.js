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
      case 'FETCH_SWAP_LIGHT_FEE_DIVISOR':
        contractFunctions
          .getSwapLightFEE_DIVISOR(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'FEE_DIVISOR',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_LIGHT_ORDER_TYPEHASH':
        contractFunctions
          .getSwapLightLIGHT_ORDER_TYPEHASH(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'LIGHT_ORDER_TYPEHASH',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_AUTHORIZED':
        contractFunctions
          .getSwapLightAuthorized(action.ethAmount, action.authorizedAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'authorized',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount, authorizedAddress: action.authorizedAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_FEE_WALLET':
        contractFunctions
          .getSwapLightFeeWallet(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'feeWallet',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_SWAP_LIGHT_OWNER':
        contractFunctions
          .getSwapLightOwner(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'owner',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_SWAP_LIGHT_RENOUNCE_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightRenounceOwnership(
            action.ethAmount,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'renounceOwnership',
            parameters: { ethAmount: action.ethAmount },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_SWAP_LIGHT_SIGNER_FEE':
        contractFunctions
          .getSwapLightSignerFee(action.ethAmount)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'swapLight',
              name: 'signerFee',
              timestamp: Date.now(),
              parameters: { ethAmount: action.ethAmount },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_SWAP_LIGHT_TRANSFER_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightTransferOwnership(
            action.ethAmount,
            action.newOwner,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'transferOwnership',
            parameters: { ethAmount: action.ethAmount, newOwner: action.newOwner },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_SWAP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightSwap(
            action.ethAmount,
            action.nonce,
            action.expiry,
            action.signerWallet,
            action.signerToken,
            action.signerAmount,
            action.senderToken,
            action.senderAmount,
            action.v,
            action.r,
            action.s,
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
              signerWallet: action.signerWallet,
              signerToken: action.signerToken,
              signerAmount: action.signerAmount,
              senderToken: action.senderToken,
              senderAmount: action.senderAmount,
              v: action.v,
              r: action.r,
              s: action.s,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_SWAP_WITH_RECIPIENT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightSwapWithRecipient(
            action.ethAmount,
            action.recipient,
            action.nonce,
            action.expiry,
            action.signerWallet,
            action.signerToken,
            action.signerAmount,
            action.senderToken,
            action.senderAmount,
            action.v,
            action.r,
            action.s,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'swapWithRecipient',
            parameters: {
              ethAmount: action.ethAmount,
              recipient: action.recipient,
              nonce: action.nonce,
              expiry: action.expiry,
              signerWallet: action.signerWallet,
              signerToken: action.signerToken,
              signerAmount: action.signerAmount,
              senderToken: action.senderToken,
              senderAmount: action.senderAmount,
              v: action.v,
              r: action.r,
              s: action.s,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_SET_FEE_WALLET':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightSetFeeWallet(
            action.ethAmount,
            action.newFeeWallet,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'setFeeWallet',
            parameters: { ethAmount: action.ethAmount, newFeeWallet: action.newFeeWallet },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_SET_FEE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightSetFee(
            action.ethAmount,
            action.newSignerFee,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'setFee',
            parameters: { ethAmount: action.ethAmount, newSignerFee: action.newSignerFee },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_AUTHORIZE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightAuthorize(
            action.ethAmount,
            action.signerAddress,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'authorize',
            parameters: { ethAmount: action.ethAmount, signerAddress: action.signerAddress },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_SWAP_LIGHT_REVOKE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitSwapLightRevoke(
            action.ethAmount,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'swapLight',
            name: 'revoke',
            parameters: { ethAmount: action.ethAmount },
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
