// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function wethMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_WETH_NAME':
        contractFunctions
          .getWethName()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'name',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_APPROVE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWethApprove(action.spender, action.amount, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'weth',
            name: 'approve',
            parameters: { spender: action.spender, amount: action.amount },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_WETH_TOTAL_SUPPLY':
        contractFunctions
          .getWethTotalSupply()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'totalSupply',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWethTransferFrom(
            action.from,
            action.to,
            action.amount,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'weth',
            name: 'transferFrom',
            parameters: { from: action.from, to: action.to, amount: action.amount },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_WETH_WITHDRAW':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWethWithdraw(action.amount, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'weth',
            name: 'withdraw',
            parameters: { amount: action.amount },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_WETH_DECIMALS':
        contractFunctions
          .getWethDecimals()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'decimals',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_WETH_BALANCE_OF':
        contractFunctions
          .getWethBalanceOf(action.owner)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: { owner: action.owner },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_WETH_SYMBOL':
        contractFunctions
          .getWethSymbol()
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'symbol',
              timestamp: Date.now(),
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_TRANSFER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWethTransfer(action.to, action.amount, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'weth',
            name: 'transfer',
            parameters: { to: action.to, amount: action.amount },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_WETH_DEPOSIT':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitWethDeposit(action.ethAmount, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'weth',
            name: 'deposit',
            parameters: { ethAmount: action.ethAmount },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_WETH_ALLOWANCE':
        contractFunctions
          .getWethAllowance(action.owner, action.spender)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'weth',
              name: 'allowance',
              timestamp: Date.now(),
              parameters: { owner: action.owner, spender: action.spender },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
