import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'
import { getAllBalancesForConnectedAddress } from '../../deltaBalances/redux/actions'
import * as Airswap from '../index'
import { getOrderId } from '../../utils/order'

async function fillOrder(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Airswap.fillOrder(order, signer)
}

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FILL_ORDER':
        makeMiddlewareEthersTransactionsFn(fillOrder, 'fillOrder', store, action, getOrderId(action.order))
        break
      case makeEthersTxnsActionTypes('fillOrder').mined:
        store.dispatch(getAllBalancesForConnectedAddress())
        break
      default:
    }
    return next(action)
  }
}
