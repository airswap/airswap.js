import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function wrapperMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'GET_WRAPPER_WETH_CONTRACT':
        contractFunctions
          .getWrapperWethContract()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_WRAPPER_SWAP_CONTRACT':
        contractFunctions
          .getWrapperSwapContract()
          .then(action.resolve)
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
