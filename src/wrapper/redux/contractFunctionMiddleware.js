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
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWrapperSwap(action.ethAmount, action.order, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      default:
    }
    return next(action)
  }
}
