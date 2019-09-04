import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function ERC20Middleware(store) {
  return next => action => {
    switch (action.type) {
      case 'GET_ERC_20_NAME':
        contractFunctions
          .getERC20Name()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_APPROVE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20Approve(action.spender, action.value, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'approve',
            parameters: { spender: action.spender, value: action.value },
          })
          action.resolve(id)
        })
        break
      case 'GET_ERC_20_TOTAL_SUPPLY':
        contractFunctions
          .getERC20TotalSupply()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20TransferFrom(
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
            parameters: { from: action.from, to: action.to, value: action.value },
          })
          action.resolve(id)
        })
        break
      case 'GET_ERC_20_DECIMALS':
        contractFunctions
          .getERC20Decimals()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_ERC_20_VERSION':
        contractFunctions
          .getERC20Version()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_ERC_20_BALANCE_OF':
        contractFunctions
          .getERC20BalanceOf(action.owner)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_ERC_20_SYMBOL':
        contractFunctions
          .getERC20Symbol()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_TRANSFER':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20Transfer(action.to, action.value, signer)
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC20',
            name: 'transfer',
            parameters: { to: action.to, value: action.value },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_ERC_20_APPROVE_AND_CALL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC20ApproveAndCall(
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
            parameters: { spender: action.spender, value: action.value, extraData: action.extraData },
          })
          action.resolve(id)
        })
        break
      case 'GET_ERC_20_ALLOWANCE':
        contractFunctions
          .getERC20Allowance(action.owner, action.spender)
          .then(action.resolve)
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
