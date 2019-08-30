import * as contractFunctions from '../contractFunctions'
import { getSigner } from '../../wallet/redux/actions'

export default function deltaBalancesMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'GET_DELTA_BALANCES_ALL_BALANCES_FOR_MANY_ACCOUNTS':
        contractFunctions
          .getDeltaBalancesAllBalancesForManyAccounts(action.users, action.tokens)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_DELTA_BALANCES_TOKEN_BALANCE':
        contractFunctions
          .getDeltaBalancesTokenBalance(action.user, action.token)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_DESTRUCT':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitDeltaBalancesDestruct(signer)
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
      case 'GET_DELTA_BALANCES_WALLET_ALLOWANCES':
        contractFunctions
          .getDeltaBalancesWalletAllowances(action.user, action.spender, action.tokens)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_WITHDRAW':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitDeltaBalancesWithdraw(signer)
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
      case 'GET_DELTA_BALANCES_WALLET_BALANCES':
        contractFunctions
          .getDeltaBalancesWalletBalances(action.user, action.tokens)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_DELTA_BALANCES_TOKEN_ALLOWANCE':
        contractFunctions
          .getDeltaBalancesTokenAllowance(action.user, action.spender, action.token)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_WITHDRAW_TOKEN':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitDeltaBalancesWithdrawToken(action.token, action.amount, signer)
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
      case 'GET_DELTA_BALANCES_ALL_WET_HBALANCES':
        contractFunctions
          .getDeltaBalancesAllWETHbalances(action.wethAddress, action.users)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_DELTA_BALANCES_ALL_ALLOWANCES_FOR_MANY_ACCOUNTS':
        contractFunctions
          .getDeltaBalancesAllAllowancesForManyAccounts(action.users, action.spender, action.tokens)
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'GET_DELTA_BALANCES_ADMIN':
        contractFunctions
          .getDeltaBalancesAdmin()
          .then(action.resolve)
          .catch(action.reject)
        break
      case 'SUBMIT_DELTA_BALANCES_CONSTRUCTOR':
        store.dispatch(getSigner()).then(({ signer }) => {
          contractFunctions
            .submitDeltaBalancesConstructor(action._deployer, signer)
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
      default:
    }
    return next(action)
  }
}
