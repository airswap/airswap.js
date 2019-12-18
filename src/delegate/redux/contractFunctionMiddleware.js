// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function delegateMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_DELEGATE_INDEXER':
        contractFunctions
          .getDelegateIndexer(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'indexer',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_IS_OWNER':
        contractFunctions
          .getDelegateIsOwner(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'isOwner',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_OWNER':
        contractFunctions
          .getDelegateOwner(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'owner',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_PROTOCOL':
        contractFunctions
          .getDelegateProtocol(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'protocol',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELEGATE_RENOUNCE_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateRenounceOwnership(
            action.contractAddress,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'renounceOwnership',
            parameters: { contractAddress: action.contractAddress },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELEGATE_RULES':
        contractFunctions
          .getDelegateRules(action.contractAddress, action.senderToken, action.signerToken)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'rules',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                senderToken: action.senderToken,
                signerToken: action.signerToken,
              },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_SWAP_CONTRACT':
        contractFunctions
          .getDelegateSwapContract(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'swapContract',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_TRADE_WALLET':
        contractFunctions
          .getDelegateTradeWallet(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'tradeWallet',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELEGATE_TRANSFER_OWNERSHIP':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateTransferOwnership(
            action.contractAddress,
            action.newOwner,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'transferOwnership',
            parameters: { contractAddress: action.contractAddress, newOwner: action.newOwner },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_SET_RULE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateSetRule(
            action.contractAddress,
            action.senderToken,
            action.signerToken,
            action.maxSenderAmount,
            action.priceCoef,
            action.priceExp,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'setRule',
            parameters: {
              contractAddress: action.contractAddress,
              senderToken: action.senderToken,
              signerToken: action.signerToken,
              maxSenderAmount: action.maxSenderAmount,
              priceCoef: action.priceCoef,
              priceExp: action.priceExp,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_UNSET_RULE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateUnsetRule(
            action.contractAddress,
            action.senderToken,
            action.signerToken,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'unsetRule',
            parameters: {
              contractAddress: action.contractAddress,
              senderToken: action.senderToken,
              signerToken: action.signerToken,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_SET_RULE_AND_INTENT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateSetRuleAndIntent(
            action.contractAddress,
            action.senderToken,
            action.signerToken,
            action.rule,
            action.newStakeAmount,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'setRuleAndIntent',
            parameters: {
              contractAddress: action.contractAddress,
              senderToken: action.senderToken,
              signerToken: action.signerToken,
              rule: action.rule,
              newStakeAmount: action.newStakeAmount,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_UNSET_RULE_AND_INTENT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateUnsetRuleAndIntent(
            action.contractAddress,
            action.senderToken,
            action.signerToken,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'unsetRuleAndIntent',
            parameters: {
              contractAddress: action.contractAddress,
              senderToken: action.senderToken,
              signerToken: action.signerToken,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_PROVIDE_ORDER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateProvideOrder(
            action.contractAddress,
            action.order,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'provideOrder',
            parameters: { contractAddress: action.contractAddress, order: action.order },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_DELEGATE_SET_TRADE_WALLET':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateSetTradeWallet(
            action.contractAddress,
            action.newTradeWallet,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegate',
            name: 'setTradeWallet',
            parameters: { contractAddress: action.contractAddress, newTradeWallet: action.newTradeWallet },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELEGATE_GET_SIGNER_SIDE_QUOTE':
        contractFunctions
          .getDelegateGetSignerSideQuote(
            action.contractAddress,
            action.senderAmount,
            action.senderToken,
            action.signerToken,
          )
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'getSignerSideQuote',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                senderAmount: action.senderAmount,
                senderToken: action.senderToken,
                signerToken: action.signerToken,
              },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_GET_SENDER_SIDE_QUOTE':
        contractFunctions
          .getDelegateGetSenderSideQuote(
            action.contractAddress,
            action.signerAmount,
            action.signerToken,
            action.senderToken,
          )
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'getSenderSideQuote',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                signerAmount: action.signerAmount,
                signerToken: action.signerToken,
                senderToken: action.senderToken,
              },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_GET_MAX_QUOTE':
        contractFunctions
          .getDelegateGetMaxQuote(action.contractAddress, action.senderToken, action.signerToken)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegate',
              name: 'getMaxQuote',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                senderToken: action.senderToken,
                signerToken: action.signerToken,
              },
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
