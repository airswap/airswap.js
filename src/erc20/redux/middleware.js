import _ from 'lodash'
import uuid from 'uuid4'
import { getSigner } from '../../wallet/redux/actions'
import {
  makeMiddlewareEthersTransactionsFn,
  makeEthersTxnsActionTypes,
} from '../../utils/redux/templates/ethersTransactions'

import * as ERC20 from '../index'
import { getAllAllowancesForConnectedAddress } from '../../deltaBalances/redux/actions'
import { trackERC20Approval } from './eventTrackingActions'
import { trackERC20Transfer } from '../eventListeners'

import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'

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

const trackedAddresses = new Set()

async function initializeTrackedAddresses(store, trackedTokens) {
  const addresses = _.uniq(trackedTokens.map(({ address }) => address))
  addresses.forEach(address => {
    if (!trackedAddresses.has(address)) {
      trackERC20Transfer({
        from: address,
        callback: logs => store.dispatch(makeEventFetchingActionsCreators('erc20Transfers').got(logs)),
      })
      trackERC20Transfer({
        to: address,
        callback: logs => store.dispatch(makeEventFetchingActionsCreators('erc20Transfers').got(logs)),
      })
      trackedAddresses.add(address)
    }
  })
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
      case 'ADD_TRACKED_ADDRESSES':
        initializeTrackedAddresses(store, action.trackedAddresses)
        break
      case 'ADD_TRACKED_ADDRESS':
        initializeTrackedAddresses(store, [{ address: action.address, tokenAddress: action.tokenAddress }])
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
