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
  Swap.signSwapSimple(mapOldOrderParamsToNewOrderFormat(action), signer)
    .then(order => {
      action.resolve(mapNewOrderParamsToOldOrderFormat(order))
    })
    .catch(err => {
      action.reject(err)
    })
}

// this should probably be removed eventually, but it's useful for getting end-to-end test of products under the swap migration working
function mapOldOrderParamsToNewOrderFormat({
  nonce,
  makerAddress,
  makerAmount,
  makerToken,
  takerAddress,
  takerAmount,
  takerToken,
  expiration,
  ...rest
}) {
  return {
    nonce,
    makerWallet: makerAddress,
    makerParam: makerAmount,
    makerToken,
    takerWallet: takerAddress,
    takerParam: takerAmount,
    takerToken,
    expiry: expiration,
    ...rest,
  }
}

// this should probably be removed eventually, but it's useful for getting end-to-end test of products under the swap migration working
function mapNewOrderParamsToOldOrderFormat({
  nonce,
  makerWallet,
  makerParam,
  makerToken,
  takerWallet,
  takerParam,
  takerToken,
  expiry,
  ...rest
}) {
  return {
    nonce,
    makerAddress: makerWallet,
    makerAmount: makerParam,
    makerToken,
    takerAddress: takerWallet,
    takerAmount: takerParam,
    takerToken,
    expiration: expiry,
    ...rest,
  }
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
