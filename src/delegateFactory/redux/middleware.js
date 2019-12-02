import { IS_INSTANT, DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackDelegateFactoryCreateDelegate } from './eventTrackingActions'

/*
 import { createDelegateForConnectedWallet } from 'airswap.js/src/delegateFactory/redux/actions'
 import { getDelegateFactoryCreateDelegateTransactions } from 'airswap.js/src/delegateFactory/redux/contractTransactionSelectors'
 import { getConnectedDelegateContract } from 'airswap.js/src/delegateFactory/redux/selectors'

 submit transaction:
    store.dispatch(createDelegateForConnectedWallet())
 track transaction:
    getDelegateFactoryCreateDelegateTransactions(store.getState())
 get delegate contract for connected wallet:
    getConnectedDelegateContract(store.getState())
 */

export default function delegateFactoryMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackDelegateFactoryCreateDelegate({
              fromBlock: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
            }),
          )
        }
        next(action)
        break
      default:
        next(action)
    }
  }
}
