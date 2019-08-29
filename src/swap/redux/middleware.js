import { getSigner } from '../../wallet/redux/actions'
import { makeMiddlewareEthersTransactionsFn } from '../../utils/redux/templates/ethersTransactions'
import * as Swap from '../index'
import { getSwapOrderId } from '../../swap/utils'

async function fillSwap(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Swap.swap(order, signer)
}

async function cancelSwap(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Swap.cancel([order.nonce], signer)
}

async function signSwap(store, action) {
  const signer = await store.dispatch(getSigner())
  if (signer.supportsSignTypedData) {
    Swap.signSwapTypedData(action, signer)
      .then(order => {
        action.resolve(order)
      })
      .catch(err => {
        action.reject(err)
      })
  } else {
    Swap.signSwap(action, signer)
      .then(order => {
        action.resolve(order)
      })
      .catch(err => {
        action.reject(err)
      })
  }
}

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FILL_SWAP':
        makeMiddlewareEthersTransactionsFn(fillSwap, 'fillSwap', store, action, getSwapOrderId(action.order))
        break
      case 'CANCEL_SWAP':
        makeMiddlewareEthersTransactionsFn(cancelSwap, 'cancelSwap', store, action, getSwapOrderId(action.order))
        break
      case 'SIGN_SWAP':
        signSwap(store, action)
        break
      default:
    }
    return next(action)
  }
}
