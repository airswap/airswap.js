import _ from 'lodash'
import { createSelector } from 'reselect'
import { getDelegateFactoryCreateDelegateEvents } from './eventTrackingSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { SWAP_CONTRACT_ADDRESS, INDEXER_CONTRACT_ADDRESS } from '../../constants'

export const getDelegates = createSelector(getDelegateFactoryCreateDelegateEvents, events => {
  const delegates = events
    .map(event => {
      const { values, blockNumber } = event
      const {
        delegateContract,
        swapContract,
        indexerContract,
        delegateContractOwner,
        delegateTradeWallet,
      } = _.mapValues(values, address => address.toLowerCase())
      return {
        delegateContract,
        swapContract,
        indexerContract,
        delegateContractOwner,
        delegateTradeWallet,
        blockNumber,
      }
    })
    .filter(
      ({ swapContract, indexerContract }) =>
        swapContract === SWAP_CONTRACT_ADDRESS && indexerContract === INDEXER_CONTRACT_ADDRESS,
    )

  return _.sortBy(delegates, 'blockNumber') // sorts from lowest blockNumber to highest
    .reverse() // sorts from highest blockNumber to lowest
})

export const getDelegateContractAddresses = createSelector(getDelegates, delegates =>
  delegates.map(({ delegateContract }) => delegateContract),
)

export const getConnectedDelegateContract = createSelector(
  getDelegates,
  getConnectedWalletAddress,
  (delegates, walletAddress) =>
    delegates.find(
      // find returns the first matching value, which means it will return the most recently deployed delegate contract
      // since the most recently deployed contract has the highest block number
      ({ delegateContractOwner, delegateTradeWallet }) =>
        delegateContractOwner === walletAddress && delegateTradeWallet === walletAddress,
    ),
)

export const getConnectedDelegateContractAddress = createSelector(getConnectedDelegateContract, delegate =>
  _.get(delegate, 'delegateContract'),
)
