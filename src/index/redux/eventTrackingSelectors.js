// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getIndexOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0' }),
)

export const getIndexOwnershipTransferredHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.indexOwnershipTransferred
    const fetched = fetchedValues.indexOwnershipTransferred
    return {
      fetching,
      fetched,
    }
  },
)

export const getIndexSetLocatorEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x62d8270f77cd1e7351e3e92e7001b363e90eed2ef3394dbd51201ceee3672630' }),
)

export const getIndexSetLocatorHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.indexSetLocator
    const fetched = fetchedValues.indexSetLocator
    return {
      fetching,
      fetched,
    }
  },
)

export const getIndexUnsetLocatorEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xded788c834b3ea8a384c1495466a3a4a827c378cd9eafe5c159d90291ce01844' }),
)

export const getIndexUnsetLocatorHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.indexUnsetLocator
    const fetched = fetchedValues.indexUnsetLocator
    return {
      fetching,
      fetched,
    }
  },
)
