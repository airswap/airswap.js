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

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FILL_ORDER':
        makeMiddlewareEthersTransactionsFn(fillOrder, 'fillOrder', store, action, getOrderId(action.order))
        break
      default:
    }
    return next(action)
  }
}
