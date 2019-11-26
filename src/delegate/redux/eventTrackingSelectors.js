// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getDelegateOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0' }),
)

export const getDelegateOwnershipTransferredHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.delegateOwnershipTransferred
    const fetched = fetchedValues.delegateOwnershipTransferred
    return {
      fetching,
      fetched,
    }
  },
)

export const getDelegateProvideOrderEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x0189daca1660a5f26ed6b6d45a91d45b31911dc06e9f69c24838beac4b3f502d' }),
)

export const getDelegateProvideOrderHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.delegateProvideOrder
    const fetched = fetchedValues.delegateProvideOrder
    return {
      fetching,
      fetched,
    }
  },
)

export const getDelegateSetRuleEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e' }),
)

export const getDelegateSetRuleHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.delegateSetRule
    const fetched = fetchedValues.delegateSetRule
    return {
      fetching,
      fetched,
    }
  },
)

export const getDelegateUnsetRuleEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98' }),
)

export const getDelegateUnsetRuleHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.delegateUnsetRule
    const fetched = fetchedValues.delegateUnsetRule
    return {
      fetching,
      fetched,
    }
  },
)
