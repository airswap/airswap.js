import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'
import { getAllBalancesForConnectedAddress } from '../../deltaBalances/redux/actions'
import * as Swap from '../index'
import { getOrderId } from '../../utils/order'

async function swap(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Swap.swap(order, signer)
}

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'SWAP':
        makeMiddlewareEthersTransactionsFn(swap, 'swap', store, action, getOrderId(action.order))
        break
      case makeEthersTxnsActionTypes('swap').mined:
        store.dispatch(getAllBalancesForConnectedAddress())
        break
      default:
    }
    return next(action)
  }
}
