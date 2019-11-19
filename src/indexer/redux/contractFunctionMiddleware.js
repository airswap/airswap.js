// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function indexerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_INDEXER_CONTRACT_PAUSED':
        contractFunctions
          .getIndexerContractPaused()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'contractPaused',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_INDEXES':
        contractFunctions
          .getIndexerIndexes(action.signerToken, action.senderToken)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'indexes',
              timestamp: Date.now(),
              parameters: { signerToken: action.signerToken, senderToken: action.senderToken },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_IS_OWNER':
        contractFunctions
          .getIndexerIsOwner()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'isOwner',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_LOCATOR_WHITELIST':
        contractFunctions
          .getIndexerLocatorWhitelist()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'locatorWhitelist',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_OWNER':
        contractFunctions
          .getIndexerOwner()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'owner',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_INDEXER_RENOUNCE_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerRenounceOwnership(signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'renounceOwnership',
          })
          action.resolve(id)
        })
        break
      case 'FETCH_INDEXER_STAKING_TOKEN':
        contractFunctions
          .getIndexerStakingToken()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'stakingToken',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_TOKEN_BLACKLIST':
        contractFunctions
          .getIndexerTokenBlacklist(action.token)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'tokenBlacklist',
              timestamp: Date.now(),
              parameters: { token: action.token },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_INDEXER_TRANSFER_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerTransferOwnership(action.newOwner, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'transferOwnership',
            parameters: { newOwner: action.newOwner },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_SET_LOCATOR_WHITELIST':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerSetLocatorWhitelist(
            action.newLocatorWhitelist,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'setLocatorWhitelist',
            parameters: { newLocatorWhitelist: action.newLocatorWhitelist },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_CREATE_INDEX':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerCreateIndex(
            action.signerToken,
            action.senderToken,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'createIndex',
            parameters: { signerToken: action.signerToken, senderToken: action.senderToken },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_ADD_TOKEN_TO_BLACKLIST':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerAddTokenToBlacklist(action.token, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'addTokenToBlacklist',
            parameters: { token: action.token },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_REMOVE_TOKEN_FROM_BLACKLIST':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerRemoveTokenFromBlacklist(action.token, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'removeTokenFromBlacklist',
            parameters: { token: action.token },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_SET_INTENT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerSetIntent(
            action.signerToken,
            action.senderToken,
            action.stakingAmount,
            action.locator,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'setIntent',
            parameters: {
              signerToken: action.signerToken,
              senderToken: action.senderToken,
              stakingAmount: action.stakingAmount,
              locator: action.locator,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_UNSET_INTENT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerUnsetIntent(
            action.signerToken,
            action.senderToken,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'unsetIntent',
            parameters: { signerToken: action.signerToken, senderToken: action.senderToken },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_UNSET_INTENT_FOR_USER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerUnsetIntentForUser(
            action.user,
            action.signerToken,
            action.senderToken,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'unsetIntentForUser',
            parameters: { user: action.user, signerToken: action.signerToken, senderToken: action.senderToken },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_SET_PAUSED_STATUS':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerSetPausedStatus(action.newStatus, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'setPausedStatus',
            parameters: { newStatus: action.newStatus },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_INDEXER_KILL_CONTRACT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitIndexerKillContract(action.recipient, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'indexer',
            name: 'killContract',
            parameters: { recipient: action.recipient },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_INDEXER_GET_LOCATORS':
        contractFunctions
          .getIndexerGetLocators(action.signerToken, action.senderToken, action.cursor, action.limit)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'getLocators',
              timestamp: Date.now(),
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                cursor: action.cursor,
                limit: action.limit,
              },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_INDEXER_GET_STAKED_AMOUNT':
        contractFunctions
          .getIndexerGetStakedAmount(action.user, action.signerToken, action.senderToken)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'indexer',
              name: 'getStakedAmount',
              timestamp: Date.now(),
              parameters: { user: action.user, signerToken: action.signerToken, senderToken: action.senderToken },
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
