import { getSigner } from '../../wallet/redux/actions'
import { makeMiddlewareEthersTransactionsFn } from '../../utils/redux/templates/ethersTransactions'
import * as Airswap from '../index'
import { getOrderId } from '../../utils/order'

async function fillOrder(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  const fill = Airswap.fillOrder(order, signer)

  return fill
}

async function cancelOrder(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Airswap.cancelOrder(order, signer)
}

async function signOrder(store, action) {
  const signer = await store.dispatch(getSigner())

  Airswap.signOrder(action, signer)
    .then(order => {
      action.resolve(order)
    })
    .catch(err => {
      action.reject(err)
    })
}

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FILL_ORDER':
        makeMiddlewareEthersTransactionsFn(fillOrder, 'fillOrder', store, action, getOrderId(action.order))
        break
      case 'CANCEL_ORDER':
        makeMiddlewareEthersTransactionsFn(cancelOrder, 'cancelOrder', store, action, getOrderId(action.order))
        break
      case 'SIGN_ORDER':
        signOrder(store, action)
        break
      default:
    }
    return next(action)
  }
}
