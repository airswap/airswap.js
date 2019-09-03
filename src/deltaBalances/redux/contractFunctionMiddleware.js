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
      case 'GET_DELTA_BALANCES_WALLET_ALLOWANCES':
        contractFunctions
          .getDeltaBalancesWalletAllowances(action.user, action.spender, action.tokens)
          .then(action.resolve)
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
