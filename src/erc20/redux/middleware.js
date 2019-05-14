import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'
import {
  makeMiddlewareEthersTransactionFn,
  makeEthersTxnActionTypes,
} from '../../utils/redux/templates/ethersTransaction'
import * as ERC20 from '../index'
import {
  getAllAllowancesForConnectedAddress,
  getAllBalancesForConnectedAddress,
} from '../../deltaBalances/redux/actions'

async function approveToken(store, action) {
  const signer = await store.dispatch(getSigner())
  const { tokenAddress, spender } = action
  return ERC20.approveToken(tokenAddress, spender, signer)
}

async function wrapWeth(store, action) {
  const signer = await store.dispatch(getSigner())
  return ERC20.wrapWeth(action.amount, signer)
}

async function unwrapWeth(store, action) {
  const signer = await store.dispatch(getSigner())
  return ERC20.unwrapWeth(action.amount, signer)
}

export default function walletMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'APPROVE_TOKEN':
        makeMiddlewareEthersTransactionsFn(approveToken, 'approveToken', store, action, action.tokenAddress)
        break
      case makeEthersTxnsActionTypes('approveToken').mined:
        store.dispatch(getAllAllowancesForConnectedAddress())
        break
      case 'WRAP_WETH':
        makeMiddlewareEthersTransactionFn(wrapWeth, 'wrapWeth', store, action)
        break
      case makeEthersTxnActionTypes('wrapWeth').mined:
        store.dispatch(getAllBalancesForConnectedAddress())
        break
      case 'UNWRAP_WETH':
        makeMiddlewareEthersTransactionFn(unwrapWeth, 'unwrapWeth', store, action)
        break
      case makeEthersTxnActionTypes('unwrapWeth').mined:
        store.dispatch(getAllBalancesForConnectedAddress())
        break
      default:
    }
    return next(action)
  }
}
