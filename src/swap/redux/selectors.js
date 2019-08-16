import _ from 'lodash'
import { createSelector } from 'reselect'
import { getSwapCancelEvents, getSwapSwapEvents } from './eventTrackingSelectors'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'

export const getFormattedSwapFills = createSelector(
  getSwapSwapEvents,
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
  getSwapCancelEvents,
  blockTrackerSelectors.getBlocks,
  (events, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...values,
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)
