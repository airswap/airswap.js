import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getIndexSetLocatorEvents,
  getIndexUnsetLocatorEvents,
  getIndexSetLocatorHistoricalFetchStatus,
  getIndexUnsetLocatorHistoricalFetchStatus,
} from '../../index/redux/eventTrackingSelectors'
import { mapOnChainIntentToOffChain, parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents } from '../utils'
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

const getUniqueLocators = createSelector(
  getIndexSetLocatorEvents,
  getIndexUnsetLocatorEvents,
  (setLocatorEvents, unsetLocatorEvents) => getUniqueLocatorsFromBlockEvents(setLocatorEvents, unsetLocatorEvents),
)

const getLocatorIntents = createSelector(
  getUniqueLocators,
  getIndexes,
  getDelegates,
  (uniqueLocators, indexes, delegates) =>
    _.compact(
      uniqueLocators.map(locatorObject => {
        const { indexAddress, identifier, score, blockNumber } = locatorObject

        const { senderToken, signerToken, protocol } = _.find(indexes, { indexAddress }) || {}

        if (!(senderToken && signerToken)) {
          // index doesn't exist for this locator
          return null
        }

        const { locator, locatorType } = parseLocatorAndLocatorType(locatorObject.locator, identifier, protocol)

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
          protocol,
          indexAddress,
          identifier,
          tradeWallet: delegateTradeWallet,
          locator,
          locatorType,
          score,
          blockNumber,
        }
      }),
    ),
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
  getIndexUnsetLocatorHistoricalFetchStatus,
  (createIndex, setLocator, createDelegate, unsetLocator) =>
    createIndex.fetched && setLocator.fetched && createDelegate.fetched && unsetLocator.fetched,
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
