// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getIndexOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0' }),
)

export const getIndexSetLocatorEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x62d8270f77cd1e7351e3e92e7001b363e90eed2ef3394dbd51201ceee3672630' }),
)

export const getIndexUnsetLocatorEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xded788c834b3ea8a384c1495466a3a4a827c378cd9eafe5c159d90291ce01844' }),
)
