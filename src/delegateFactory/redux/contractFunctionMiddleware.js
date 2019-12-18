// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function delegateFactoryMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_DELEGATE_FACTORY_INDEXER_CONTRACT':
        contractFunctions
          .getDelegateFactoryIndexerContract()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegateFactory',
              name: 'indexerContract',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_FACTORY_PROTOCOL':
        contractFunctions
          .getDelegateFactoryProtocol()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegateFactory',
              name: 'protocol',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELEGATE_FACTORY_SWAP_CONTRACT':
        contractFunctions
          .getDelegateFactorySwapContract()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegateFactory',
              name: 'swapContract',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELEGATE_FACTORY_CREATE_DELEGATE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDelegateFactoryCreateDelegate(
            action.delegateTradeWallet,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'delegateFactory',
            name: 'createDelegate',
            parameters: { delegateTradeWallet: action.delegateTradeWallet },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELEGATE_FACTORY_HAS':
        contractFunctions
          .getDelegateFactoryHas(action.locator)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'delegateFactory',
              name: 'has',
              timestamp: Date.now(),
              parameters: { locator: action.locator },
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
