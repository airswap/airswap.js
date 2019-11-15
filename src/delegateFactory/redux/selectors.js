import { createSelector } from 'reselect'
import { getDelegateFactoryCreateDelegateEvents } from './eventTrackingSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

export const getConnectedDelegateContract = createSelector(
  getDelegateFactoryCreateDelegateEvents,
  getConnectedWalletAddress,
  (events, address) => {
    if (events.length) {
      let contract
      events.forEach(event => {
        console.log(event.values)
        const {
          values: { delegateContract, delegateContractOwner, delegateTradeWallet },
        } = event
        if (delegateContractOwner.toLowerCase() === address && delegateTradeWallet.toLowerCase() === address) {
          contract = delegateContract.toLowerCase()
        }
      })
      return contract
    }
  },
)
