// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getSwapLightCancelEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightCancelHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightCancel
    const fetched = fetchedValues.swapLightCancel
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapLightCancelUpToEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x863123978d9b13946753a916c935c0688a01802440d3ffc668d04d2720c4e110',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightCancelUpToHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightCancelUpTo
    const fetched = fetchedValues.swapLightCancelUpTo
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapLightSwapEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x9f1d00aae6343e4c7249c1b2a238d90e17da251781cc060e008a0dcf7ee0e725',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightSwapHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightSwap
    const fetched = fetchedValues.swapLightSwap
    return {
      fetching,
      fetched,
    }
  },
)
