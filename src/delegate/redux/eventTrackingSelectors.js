// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getDelegateOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0' }),
)

export const getDelegateSetRuleEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e' }),
)

export const getDelegateUnsetRuleEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98' }),
)
