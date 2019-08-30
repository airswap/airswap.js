import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function wethMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'GET_WETH_NAME':
        contractFunctions
          .getWethName()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_APPROVE':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWethApprove(action.spender, action.amount, signer)
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
      case 'GET_WETH_TOTAL_SUPPLY':
        contractFunctions
          .getWethTotalSupply()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_TRANSFER_FROM':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWethTransferFrom(action.from, action.to, action.amount, signer)
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
      case 'SUBMIT_WETH_WITHDRAW':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWethWithdraw(action.amount, signer)
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
      case 'GET_WETH_DECIMALS':
        contractFunctions
          .getWethDecimals()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_WETH_BALANCE_OF':
        contractFunctions
          .getWethBalanceOf(action.owner)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_WETH_SYMBOL':
        contractFunctions
          .getWethSymbol()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_WETH_TRANSFER':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWethTransfer(action.to, action.amount, signer)
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
      case 'SUBMIT_WETH_DEPOSIT':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitWethDeposit(action.ethAmount, signer)
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
      case 'GET_WETH_ALLOWANCE':
        contractFunctions
          .getWethAllowance(action.owner, action.spender)
          .then(action.resolve)
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
