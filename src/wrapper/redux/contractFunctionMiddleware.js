import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function wrapperMiddleware(store) {
  return next => action => {
    switch (action.type) {
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
