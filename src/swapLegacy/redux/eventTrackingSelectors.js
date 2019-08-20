import _ from 'lodash'
import { createSelector } from 'reselect'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getFetchedSwapLegacyFilled = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xe59c5e56d85b2124f5e7f82cb5fcc6d28a4a241a9bdd732704ac9d3b6bfc98ab' }),
)

export const getFetchedSwapLegacyCanceled = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8ce0bae8f3488649f2f29762dfc77af336a695060bc787b9c813c6fdd79fdf25' }),
)

export const getFetchedSwapLegacyFailed = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8e49dd3f283d9a844668a6f422edaa50c4c22987511ec284cebec288ca54f37a' }),
)
