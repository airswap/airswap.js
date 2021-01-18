import { createSelector } from 'reselect'
import { getSwapLightSwapEvents } from '../../swaplight/redux/eventTrackingSelectors'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'
import { mapFlat22OrderTo20Order } from '../../swap/utils'

export const getFormattedSwapLightFills = createSelector(
  getSwapLightSwapEvents,
  makeGetReadableSwapOrder,
  (events, getReadableSwapOrder) =>
    events.map(({ transactionHash, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(mapFlat22OrderTo20Order(values)),
      timestamp: values.timestamp,
    })),
)
