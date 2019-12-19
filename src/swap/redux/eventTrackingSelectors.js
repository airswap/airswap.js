// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getSwapAuthorizeSenderEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xbe9299809b40c2eeb1ae326da30a511c24d70cbe3cd4ff384e4839b91de3b325',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapAuthorizeSenderHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapAuthorizeSender
    const fetched = fetchedValues.swapAuthorizeSender
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapAuthorizeSignerEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xb9bdd0621c52f9a047fe2a048fa04cdf987438d068ac524be8ea382aa3e94d2c',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapAuthorizeSignerHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapAuthorizeSigner
    const fetched = fetchedValues.swapAuthorizeSigner
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapCancelEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapCancelHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapCancel
    const fetched = fetchedValues.swapCancel
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapCancelUpToEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x863123978d9b13946753a916c935c0688a01802440d3ffc668d04d2720c4e110',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapCancelUpToHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapCancelUpTo
    const fetched = fetchedValues.swapCancelUpTo
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapRevokeSenderEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x92b544a2f54114da47550f9ee5b45cc343e5db8bfd148a7aba43219e33fceccd',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapRevokeSenderHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapRevokeSender
    const fetched = fetchedValues.swapRevokeSender
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapRevokeSignerEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xfe558292b85125b7cf178f3456b09ce2fa79ca4b4fe2d7bb5da670ffecdb765e',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapRevokeSignerHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapRevokeSigner
    const fetched = fetchedValues.swapRevokeSigner
    return {
      fetching,
      fetched,
    }
  },
)

export const getSwapSwapEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapSwapHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.swapSwap
    const fetched = fetchedValues.swapSwap
    return {
      fetching,
      fetched,
    }
  },
)
