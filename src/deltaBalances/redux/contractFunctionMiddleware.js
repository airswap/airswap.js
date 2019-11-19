// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function deltaBalancesMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_DELTA_BALANCES_ALL_BALANCES_FOR_MANY_ACCOUNTS':
        contractFunctions
          .getDeltaBalancesAllBalancesForManyAccounts(action.users, action.tokens)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'allBalancesForManyAccounts',
              timestamp: Date.now(),
              parameters: { users: action.users, tokens: action.tokens },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELTA_BALANCES_TOKEN_BALANCE':
        contractFunctions
          .getDeltaBalancesTokenBalance(action.user, action.token)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'tokenBalance',
              timestamp: Date.now(),
              parameters: { user: action.user, token: action.token },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_DESTRUCT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDeltaBalancesDestruct(signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'deltaBalances',
            name: 'destruct',
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELTA_BALANCES_WALLET_ALLOWANCES':
        contractFunctions
          .getDeltaBalancesWalletAllowances(action.user, action.spender, action.tokens)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'walletAllowances',
              timestamp: Date.now(),
              parameters: { user: action.user, spender: action.spender, tokens: action.tokens },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_WITHDRAW':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDeltaBalancesWithdraw(signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'deltaBalances',
            name: 'withdraw',
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELTA_BALANCES_WALLET_BALANCES':
        contractFunctions
          .getDeltaBalancesWalletBalances(action.user, action.tokens)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'walletBalances',
              timestamp: Date.now(),
              parameters: { user: action.user, tokens: action.tokens },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELTA_BALANCES_TOKEN_ALLOWANCE':
        contractFunctions
          .getDeltaBalancesTokenAllowance(action.user, action.spender, action.token)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'tokenAllowance',
              timestamp: Date.now(),
              parameters: { user: action.user, spender: action.spender, token: action.token },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_WITHDRAW_TOKEN':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDeltaBalancesWithdrawToken(
            action.token,
            action.amount,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'deltaBalances',
            name: 'withdrawToken',
            parameters: { token: action.token, amount: action.amount },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_DELTA_BALANCES_ALL_WET_HBALANCES':
        contractFunctions
          .getDeltaBalancesAllWETHbalances(action.wethAddress, action.users)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'allWETHbalances',
              timestamp: Date.now(),
              parameters: { wethAddress: action.wethAddress, users: action.users },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELTA_BALANCES_ALL_ALLOWANCES_FOR_MANY_ACCOUNTS':
        contractFunctions
          .getDeltaBalancesAllAllowancesForManyAccounts(action.users, action.spender, action.tokens)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'allAllowancesForManyAccounts',
              timestamp: Date.now(),
              parameters: { users: action.users, spender: action.spender, tokens: action.tokens },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_DELTA_BALANCES_ADMIN':
        contractFunctions
          .getDeltaBalancesAdmin()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'deltaBalances',
              name: 'admin',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_CONSTRUCTOR':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitDeltaBalancesConstructor(action._deployer, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'deltaBalances',
            name: 'constructor',
            parameters: { _deployer: action._deployer },
          })
          action.resolve(id)
        })
        break
      default:
    }
    return next(action)
  }
}
