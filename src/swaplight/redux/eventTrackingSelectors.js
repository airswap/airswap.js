// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getSwapLightAuthorizeEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x30468de898bda644e26bab66e5a2241a3aa6aaf527257f5ca54e0f65204ba14a',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightAuthorizeHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightAuthorize
    const fetched = fetchedValues.swapLightAuthorize
    return {
      fetching,
      fetched,
    }
  },
)

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

export const getSwapLightOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightOwnershipTransferredHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightOwnershipTransferred
    const fetched = fetchedValues.swapLightOwnershipTransferred
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapLightRevokeEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xd7426110292f20fe59e73ccf52124e0f5440a756507c91c7b0a6c50e1eb1a23a',
    address: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  }),
)

export const getSwapLightRevokeHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapLightRevoke
    const fetched = fetchedValues.swapLightRevoke
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapLightSwapEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
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
