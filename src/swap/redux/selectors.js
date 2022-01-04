import _ from 'lodash'
import { createSelector } from 'reselect'
import { getSwapCancelEvents, getSwapSwapEvents } from './eventTrackingSelectors'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'
import { mapFlat22OrderTo20Order } from '../../swap/utils'

export const getFormattedSwapFills = createSelector(
  getSwapSwapEvents,
  makeGetReadableSwapOrder,
  (events, getReadableSwapOrder) =>
    events.map(({ transactionHash, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(mapFlat22OrderTo20Order(values)),
      timestamp: values.timestamp,
    })),
)

export const getFormattedSwapFills24Hour = createSelector(getFormattedSwapFills, swapFills => {
  const ts = Math.round(new Date().getTime() / 1000)
  const timeStamp24Hour = ts - 24 * 3600
  const [events24Hour] = _.partition(swapFills, t => t.timestamp > timeStamp24Hour)
  return _.filter(events24Hour, ({ tokenSymbol }) => !!tokenSymbol) // this filter removes non-weth/eth trades
})

export const getFormattedSwapCancels = createSelector(
  getSwapCancelEvents,
  blockTrackerSelectors.getBlocks,
  (events, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...mapFlat22OrderTo20Order(values),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getSwapSwapEventsAllContracts = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
  }).map(event => ({
    ...event,
    values: mapFlat22OrderTo20Order(event.values),
  })),
)

export const getSwapCancelEventsAllContracts = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
  }).map(event => ({
    ...event,
    values: mapFlat22OrderTo20Order(event.values),
  })),
)
