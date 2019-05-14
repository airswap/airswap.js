import _ from 'lodash'
import { findReserves, deployReserve, getLimitOrders, submitReserveLimitOrder, cancelReserveLimitOrder } from '../index'
import { getSigner } from '../../wallet/redux/actions'
import {
  makeEthersTxnActionTypes,
  makeMiddlewareEthersTransactionFn,
} from '../../utils/redux/templates/ethersTransaction'

import { makeHTTPActionTypes, makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'

async function findReservesForSigner(store) {
  const signer = await store.dispatch(getSigner())
  return findReserves(signer)
}

async function deployReserveForSigner(store) {
  const signer = await store.dispatch(getSigner())
  return deployReserve(signer)
}

async function getLimitOrdersForSigner(store, action) {
  const signer = await store.dispatch(getSigner())
  const { reserveAddress } = action
  return getLimitOrders(reserveAddress, signer)
}

async function submitReserveLimitOrderForSigner(store, action) {
  const signer = await store.dispatch(getSigner())
  const { order, reserveAddress } = action
  return submitReserveLimitOrder(order, reserveAddress, signer)
}

async function cancelReserveLimitOrderForSigner(store, action) {
  const signer = await store.dispatch(getSigner())
  const {
    reserveAddress,
    order: { orderId },
  } = action
  return cancelReserveLimitOrder(orderId, reserveAddress, signer)
}

function getReserveAddressFromActionReceipt(action) {
  const reserveAddress = _.get(action, 'transactionReceipt.to', '').toLowerCase()
  if (reserveAddress) {
    return reserveAddress
  }
  throw new Error(
    'transaction receipt is empty, you need to add more sophisticated receipt fetching with blockcruncher',
  )
}

export default function reserveMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FIND_RESERVES':
        makeMiddlewareHTTPFn(findReservesForSigner, 'reserveAddresses', store)
        break
      case makeEthersTxnActionTypes('deployReserve').mined:
        makeMiddlewareHTTPFn(findReservesForSigner, 'reserveAddresses', store)
        break
      case makeHTTPActionTypes('reserveAddresses').got:
        const reserveAddresses = _.get(action, 'response')
        if (reserveAddresses.length) {
          makeMiddlewareHTTPFn(getLimitOrdersForSigner, 'limitOrders', store, {
            reserveAddress: _.first(reserveAddresses),
          })
        }
        break
      case 'CREATE_RESERVE':
        makeMiddlewareEthersTransactionFn(deployReserveForSigner, 'deployReserve', store)
        break
      case 'CREATE_RESERVE_LIMIT_ORDER':
        makeMiddlewareEthersTransactionFn(submitReserveLimitOrderForSigner, 'createReserveLimitOrder', store, action)
        break
      case makeEthersTxnActionTypes('createReserveLimitOrder').mined:
        makeMiddlewareHTTPFn(getLimitOrdersForSigner, 'limitOrders', store, {
          reserveAddress: getReserveAddressFromActionReceipt(action),
        })
        break
      case 'CANCEL_RESERVE_LIMIT_ORDER':
        makeMiddlewareEthersTransactionFn(cancelReserveLimitOrderForSigner, 'cancelReserveLimitOrder', store, action)
        break
      case makeEthersTxnActionTypes('cancelReserveLimitOrder').mined:
        makeMiddlewareHTTPFn(getLimitOrdersForSigner, 'limitOrders', store, {
          reserveAddress: getReserveAddressFromActionReceipt(action),
        })
        break
      default:
    }
    return next(action)
  }
}
