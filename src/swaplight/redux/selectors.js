import { createSelector } from 'reselect'
import { getSwapLightSwapEvents } from '../../swaplight/redux/eventTrackingSelectors'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'

export const getFormattedSwapLightFills = createSelector(
  getSwapLightSwapEvents,
  makeGetReadableSwapOrder,
  (events, getReadableSwapOrder) =>
    events.map(({ transactionHash, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(values),
      timestamp: values.timestamp,
    })),
)
