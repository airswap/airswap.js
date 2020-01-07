import uuid from 'uuid4'
import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'

import * as ERC20 from '../index'
import { getAllAllowancesForConnectedAddress } from '../../deltaBalances/redux/actions'
import { trackERC20Approval } from './eventTrackingActions'
import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'

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
    next(action)
    switch (action.type) {
      case 'CONNECTED_WALLET':
        store.dispatch(
          trackERC20Approval({
            owner: action.address.toLowerCase(),
            fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK,
          }),
        )
        break
      case 'APPROVE_TOKEN':
        makeMiddlewareEthersTransactionsFn(approveToken, 'approveToken', store, action, action.tokenAddress)
        break
      case makeEthersTxnsActionTypes('approveToken').mined:
        store.dispatch(getAllAllowancesForConnectedAddress())
        break
      case 'WRAP_WETH':
        makeMiddlewareEthersTransactionsFn(wrapWeth, 'wrapWeth', store, action, uuid())
        break
      case 'UNWRAP_WETH':
        makeMiddlewareEthersTransactionsFn(unwrapWeth, 'unwrapWeth', store, action, uuid())
        break
      default:
    }
  }
}
