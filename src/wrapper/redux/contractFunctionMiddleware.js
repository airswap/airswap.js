// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function wrapperMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_WRAPPER_CONTRACT_PAUSED':
        contractFunctions
          .getWrapperContractPaused()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'wrapper',
              name: 'contractPaused',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_WRAPPER_IS_OWNER':
        contractFunctions
          .getWrapperIsOwner()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'wrapper',
              name: 'isOwner',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_WRAPPER_OWNER':
        contractFunctions
          .getWrapperOwner()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'wrapper',
              name: 'owner',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WRAPPER_RENOUNCE_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWrapperRenounceOwnership(signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'wrapper',
            name: 'renounceOwnership',
          })
          action.resolve(id)
        })
        break
      case 'FETCH_WRAPPER_SWAP_CONTRACT':
        contractFunctions
          .getWrapperSwapContract()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'wrapper',
              name: 'swapContract',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WRAPPER_TRANSFER_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWrapperTransferOwnership(action.newOwner, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'wrapper',
            name: 'transferOwnership',
            parameters: { newOwner: action.newOwner },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_WRAPPER_WETH_CONTRACT':
        contractFunctions
          .getWrapperWethContract()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: response && response.toString ? response.toString() : response,
              namespace: 'wrapper',
              name: 'wethContract',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WRAPPER_SET_PAUSED_STATUS':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWrapperSetPausedStatus(action.newStatus, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'wrapper',
            name: 'setPausedStatus',
            parameters: { newStatus: action.newStatus },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_WRAPPER_KILL_CONTRACT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWrapperKillContract(action.recipient, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'wrapper',
            name: 'killContract',
            parameters: { recipient: action.recipient },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_WRAPPER_SWAP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWrapperSwap(action.ethAmount, action.order, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'wrapper',
            name: 'swap',
            parameters: { ethAmount: action.ethAmount, order: action.order },
          })
          action.resolve(id)
        })
        break
      default:
    }
    return next(action)
  }
}
