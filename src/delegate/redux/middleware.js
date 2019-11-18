import { waitForState } from '../../utils/redux/waitForState'
import { getConnectedDelegateContract } from '../../delegateFactory/redux/selectors'
import { trackSwapAuthorizeSender } from '../../swap/redux/eventTrackingActions'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { fetchSwapSenderAuthorizations } from '../../swap/redux/contractFunctionActions'

async function waitForDelegateContract(store) {
  return store.dispatch(
    waitForState({
      selector: state => !!getConnectedDelegateContract(state),
      result: true,
    }),
  )
}

export default function delegateMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        next(action)
        waitForDelegateContract(store).then(() => {
          const state = store.getState()
          const walletAddress = getConnectedWalletAddress(state)
          const contractAddress = getConnectedDelegateContract(state)
          store.dispatch(
            trackSwapAuthorizeSender({
              authorizerAddress: walletAddress,
              authorizedSender: contractAddress,
              callback: () =>
                store.dispatch(
                  fetchSwapSenderAuthorizations({
                    authorizerAddress: walletAddress,
                    authorizedSender: contractAddress,
                  }),
                ),
            }),
          )
        })
        break
      default:
        next(action)
    }
  }
}
