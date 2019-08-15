import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getFetchedSwapSwap = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e' }),
)

export const getFetchedSwapCancel = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d' }),
)

export const getFetchedSwapInvalidate = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x13271a4112377cb8d98566817cc69dc66ed3ee25fdcea309a9f6696475640b78' }),
)

export const getFetchedSwapAuthorize = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x601f80ed402ea845dc33078b21175993b7e0040de344205a8fd656d7033eb724' }),
)

export const getFetchedSwapRevoke = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xd7426110292f20fe59e73ccf52124e0f5440a756507c91c7b0a6c50e1eb1a23a' }),
)

export const getFormattedSwapFills = createSelector(
  getFetchedSwapSwap,
  makeGetReadableSwapOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableSwapOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

export const getFormattedSwapCancels = createSelector(
  getFetchedSwapCancel,
  blockTrackerSelectors.getBlocks,
  (events, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...values,
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)
