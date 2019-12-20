import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getIndexSetLocatorEvents,
  getIndexSetLocatorHistoricalFetchStatus,
} from '../../index/redux/eventTrackingSelectors'
import { mapOnChainIntentToOffChain, parseLocatorAndLocatorType } from '../utils'
import { getIndexerCreateIndexEvents, getIndexerCreateIndexHistoricalFetchStatus } from './eventTrackingSelectors'
import { getDelegates } from '../../delegateFactory/redux/selectors'
import { getDelegateFactoryCreateDelegateHistoricalFetchStatus } from '../../delegateFactory/redux/eventTrackingSelectors'
import { INDEX_TYPES_LOOKUP } from '../constants'

const getIndexes = createSelector(getIndexerCreateIndexEvents, events =>
  _.uniqBy(
    events.map(
      ({ values: { senderToken, signerToken, indexAddress, protocol } }) => ({
        senderToken,
        signerToken,
        protocol,
        indexAddress,
      }),
      v => JSON.stringify(v, ['senderToken', 'signerToken', 'indexAddress', 'protocol']),
    ),
  ),
)

const makeGetIndexerIndexExists = createSelector(getIndexes, indexerIndexes => (signerToken, senderToken, protocol) =>
  !!indexerIndexes.find(
    index => index.signerToken === signerToken && index.senderToken === senderToken && index.protocol === protocol,
  ),
)

const makeGetDelegateIndexExists = createSelector(
  makeGetIndexerIndexExists,
  getIndexerExists => (signerToken, senderToken) =>
    getIndexerExists(signerToken, senderToken, INDEX_TYPES_LOOKUP.contract),
)

const getIndexAddresses = createSelector(getIndexes, indexes => indexes.map(({ indexAddress }) => indexAddress))

const getLocatorIntents = createSelector(
  getIndexSetLocatorEvents,
  getIndexes,
  getDelegates,
  (setLocatorEvents, indexes, delegates) => {
    const parsedEvents = setLocatorEvents.map(event => {
      const {
        values: { identifier, locator: unformattedLocator, score },
        address: indexAddress,
        blockNumber,
      } = event

      const { senderToken, signerToken, protocol } = _.find(indexes, { indexAddress }) || {}

      if (!(senderToken && signerToken)) {
        // index doesn't exist for this locator
        return null
      }

      const { locator, locatorType } = parseLocatorAndLocatorType(unformattedLocator, identifier, protocol)

      if (!(locator && locatorType)) {
        // protocol isn't recognized in ./constants.js
        return null
      }

      let delegateTradeWallet

      if (locatorType === 'contract') {
        const delegate = _.find(delegates, { delegateContract: locator })
        if (!delegate) {
          return null
        }
        delegateTradeWallet = delegate.delegateTradeWallet
      }

      return {
        senderToken,
        signerToken,
        indexAddress,
        identifier,
        tradeWallet: delegateTradeWallet,
        locator,
        locatorType,
        score,
        blockNumber,
      }
    })
    const uniqueLocators = _.reduce(
      _.compact(parsedEvents),
      (agg, val) => {
        const existingLocator = _.find(agg, { indexAddress: val.indexAddress, identifier: val.identifier })
        if (!existingLocator) {
          return [...agg, val]
        } else if (existingLocator.blockNumber < val.blockNumber) {
          const existingLocatorIndex = _.findIndex(agg, { indexAddress: val.indexAddress, identifier: val.identifier })
          return [...agg.slice(0, existingLocatorIndex), val, ...agg.slice(existingLocatorIndex + 1)]
        }
        return agg
      },
      [],
    )

    return _.sortBy(uniqueLocators, 'score').reverse()
  },
)

const getLocatorIntentsFormatted = createSelector(getLocatorIntents, intents => intents.map(mapOnChainIntentToOffChain))

// This selector falsely claims to return "makerAddresses" that are "connected":
// - they are not connected because there is currently no efficient way to determine if a off-chain maker is online
// - the makerAddress values aren't maker addresses, they are "identifiers"
// there's no way to get the data I need, but I need to provide these values or things like the token dropdown in instant will break
const getConnectedOnChainMakerAddresses = createSelector(getLocatorIntentsFormatted, intents =>
  intents.map(({ makerAddress }) => makerAddress),
)

const getContractLocatorIntentsFormatted = createSelector(getLocatorIntentsFormatted, intents =>
  _.filter(intents, { locatorType: 'contract' }),
)

const getIndexerIntentsLoaded = createSelector(
  getIndexerCreateIndexHistoricalFetchStatus,
  getIndexSetLocatorHistoricalFetchStatus,
  getDelegateFactoryCreateDelegateHistoricalFetchStatus,
  (createIndex, setLocator, createDelegate) => createIndex.fetched && setLocator.fetched && createDelegate.fetched,
)

export {
  getLocatorIntents,
  getLocatorIntentsFormatted,
  getContractLocatorIntentsFormatted,
  getConnectedOnChainMakerAddresses,
  getIndexes,
  makeGetIndexerIndexExists,
  makeGetDelegateIndexExists,
  getIndexAddresses,
  getIndexerIntentsLoaded,
}
