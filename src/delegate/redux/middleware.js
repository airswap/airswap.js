import { waitForState } from '../../utils/redux/waitForState'
import { getConnectedDelegateContractAddress } from '../../delegateFactory/redux/selectors'
import { trackSwapAuthorizeSender } from '../../swap/redux/eventTrackingActions'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { fetchSwapSenderAuthorizations } from '../../swap/redux/contractFunctionActions'
import { trackDelegateProvideOrder, trackDelegateSetRule, trackDelegateUnsetRule } from './eventTrackingActions'
import { fetchDelegateRules } from './contractFunctionActions'
import { DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK, IS_INSTANT } from '../../constants'

async function waitForDelegateContract(store) {
  return store.dispatch(
    waitForState({
      selector: state => !!getConnectedDelegateContractAddress(state),
      result: true,
    }),
  )
}

async function setUpDelegateListeners(store) {
  await waitForDelegateContract(store)
  // as soon as a delegate contract is found for the connected address, invoke the following listeners:
  const state = store.getState()
  const walletAddress = getConnectedWalletAddress(state)
  const delegateAddress = getConnectedDelegateContractAddress(state)

  // listen to swap sender authorizations for the delegate and update the state accordingly
  store.dispatch(
    trackSwapAuthorizeSender({
      authorizerAddress: walletAddress,
      authorizedSender: delegateAddress,
      fromBlock: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
      callback: () =>
        store.dispatch(
          fetchSwapSenderAuthorizations({
            authorizerAddress: walletAddress,
            authorizedSender: delegateAddress,
          }),
        ),
    }),
  )
  // listen to rule creation on the delegate and update the contract accordingly
  store.dispatch(
    trackDelegateSetRule({
      owner: walletAddress,
      fromBlock: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
      callback: events => {
        events.map(({ values: { senderToken, signerToken } }) => {
          store.dispatch(
            fetchDelegateRules({
              senderToken,
              signerToken,
              contractAddress: delegateAddress,
            }),
          )
        })
      },
    }),
  )
  store.dispatch(
    trackDelegateProvideOrder({
      owner: walletAddress,
      fromBlock: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
    }),
  )

  // listen to rule delegation on the delegate and update the contract accordingly
  store.dispatch(
    trackDelegateUnsetRule({
      owner: walletAddress,
      fromBlock: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
      callback: events =>
        events.map(({ values: { senderToken, signerToken } }) => {
          store.dispatch(
            fetchDelegateRules({
              senderToken,
              signerToken,
              contractAddress: delegateAddress,
            }),
          )
        }),
    }),
  )
}

export default function delegateMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        next(action)
        if (IS_INSTANT) {
          setUpDelegateListeners(store)
        }
        break
      default:
        next(action)
    }
  }
}
