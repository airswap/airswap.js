// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getERC1155ApprovalForAllEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31' }),
)

export const getERC1155ApprovalForAllHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC1155ApprovalForAll
    const fetched = fetchedValues.ERC1155ApprovalForAll
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC1155TransferBatchEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb' }),
)

export const getERC1155TransferBatchHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC1155TransferBatch
    const fetched = fetchedValues.ERC1155TransferBatch
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC1155TransferSingleEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62' }),
)

export const getERC1155TransferSingleHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC1155TransferSingle
    const fetched = fetchedValues.ERC1155TransferSingle
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC1155URIEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b' }),
)

export const getERC1155URIHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC1155URI
    const fetched = fetchedValues.ERC1155URI
    return {
      fetching,
      fetched,
    }
  },
)
