import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'
import { getAllBalancesForConnectedAddress } from '../../deltaBalances/redux/actions'
import * as Swap from '../index'
import { getSwapSimpleOrderId } from '../../utils/order'

async function fillSwapSimple(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Swap.swapSimple(order, signer)
}

async function cancelSwap(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order } = action
  return Swap.cancelSwap([order.nonce], signer)
}

async function signSwapSimple(store, action) {
  const signer = await store.dispatch(getSigner())
  Swap.signSwapSimple(action, signer)
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
      case 'FILL_SWAP_SIMPLE':
        makeMiddlewareEthersTransactionsFn(
          fillSwapSimple,
          'fillSwapSimple',
          store,
          action,
          getSwapSimpleOrderId(action.order),
        )
        break
      case makeEthersTxnsActionTypes('fillSwapSimple').mined:
        store.dispatch(getAllBalancesForConnectedAddress())
        break
      case 'CANCEL_SWAP':
        makeMiddlewareEthersTransactionsFn(cancelSwap, 'cancelSwap', store, action, getSwapSimpleOrderId(action.order))
        break
      case 'SIGN_SWAP_SIMPLE':
        signSwapSimple(store, action)
        break
      default:
    }
    return next(action)
  }
}
