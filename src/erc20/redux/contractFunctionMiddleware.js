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
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitERC20Approve(action.spender, action.value, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'GET_ERC_20_TOTAL_SUPPLY':
        contractFunctions
          .getERC20TotalSupply()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_20_TRANSFER_FROM':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitERC20TransferFrom(action.from, action.to, action.value, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
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
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitERC20Transfer(action.to, action.value, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
        })
        break
      case 'SUBMIT_ERC_20_APPROVE_AND_CALL':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitERC20ApproveAndCall(action.spender, action.value, action.extraData, signer)
            .then(tx => {
              action.resolve(tx)
              store.dispatch({
                type: 'ADD_TRACKED_TRANSACTION',
                tx,
              })
            })
            .catch(error => {
              action.reject(error)
              store.dispatch({
                type: 'ERROR_SUBMITTING_TRANSACTION',
                error,
              })
            })
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
