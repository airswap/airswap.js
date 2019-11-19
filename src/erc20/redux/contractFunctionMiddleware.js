// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function ERC20Middleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_ERC_20_NAME':
        contractFunctions
          .getERC20Name(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'name',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_APPROVE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20Approve(
            action.contractAddress,
            action.spender,
            action.value,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'approve',
            parameters: { contractAddress: action.contractAddress, spender: action.spender, value: action.value },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_20_TOTAL_SUPPLY':
        contractFunctions
          .getERC20TotalSupply(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'totalSupply',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20TransferFrom(
            action.contractAddress,
            action.from,
            action.to,
            action.value,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'transferFrom',
            parameters: {
              contractAddress: action.contractAddress,
              from: action.from,
              to: action.to,
              value: action.value,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_20_DECIMALS':
        contractFunctions
          .getERC20Decimals(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'decimals',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_20_VERSION':
        contractFunctions
          .getERC20Version(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'version',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_20_BALANCE_OF':
        contractFunctions
          .getERC20BalanceOf(action.contractAddress, action.owner)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_20_SYMBOL':
        contractFunctions
          .getERC20Symbol(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'symbol',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_TRANSFER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20Transfer(
            action.contractAddress,
            action.to,
            action.value,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'transfer',
            parameters: { contractAddress: action.contractAddress, to: action.to, value: action.value },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_ERC_20_APPROVE_AND_CALL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20ApproveAndCall(
            action.contractAddress,
            action.spender,
            action.value,
            action.extraData,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'approveAndCall',
            parameters: {
              contractAddress: action.contractAddress,
              spender: action.spender,
              value: action.value,
              extraData: action.extraData,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_20_ALLOWANCE':
        contractFunctions
          .getERC20Allowance(action.contractAddress, action.owner, action.spender)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC20',
              name: 'allowance',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner, spender: action.spender },
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
