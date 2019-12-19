// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function indexMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_INDEX_ENTRIES':
        contractFunctions
          .getIndexEntries(action.contractAddress, action.identifier)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'entries',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, identifier: action.identifier },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEX_IS_OWNER':
        contractFunctions
          .getIndexIsOwner(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'isOwner',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEX_LENGTH':
        contractFunctions
          .getIndexLength(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'length',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEX_OWNER':
        contractFunctions
          .getIndexOwner(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'owner',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_INDEX_RENOUNCE_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexRenounceOwnership(action.contractAddress, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'index',
            name: 'renounceOwnership',
            parameters: { contractAddress: action.contractAddress },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEX_TRANSFER_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexTransferOwnership(
            action.contractAddress,
            action.newOwner,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'index',
            name: 'transferOwnership',
            parameters: { contractAddress: action.contractAddress, newOwner: action.newOwner },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEX_SET_LOCATOR':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexSetLocator(
            action.contractAddress,
            action.identifier,
            action.score,
            action.locator,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'index',
            name: 'setLocator',
            parameters: {
              contractAddress: action.contractAddress,
              identifier: action.identifier,
              score: action.score,
              locator: action.locator,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEX_UNSET_LOCATOR':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexUnsetLocator(
            action.contractAddress,
            action.identifier,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'index',
            name: 'unsetLocator',
            parameters: { contractAddress: action.contractAddress, identifier: action.identifier },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEX_UPDATE_LOCATOR':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexUpdateLocator(
            action.contractAddress,
            action.identifier,
            action.score,
            action.locator,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'index',
            name: 'updateLocator',
            parameters: {
              contractAddress: action.contractAddress,
              identifier: action.identifier,
              score: action.score,
              locator: action.locator,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_INDEX_GET_SCORE':
        contractFunctions
          .getIndexGetScore(action.contractAddress, action.identifier)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'getScore',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, identifier: action.identifier },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEX_GET_LOCATOR':
        contractFunctions
          .getIndexGetLocator(action.contractAddress, action.identifier)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'getLocator',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, identifier: action.identifier },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEX_GET_LOCATORS':
        contractFunctions
          .getIndexGetLocators(action.contractAddress, action.cursor, action.limit)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'index',
              name: 'getLocators',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, cursor: action.cursor, limit: action.limit },
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
