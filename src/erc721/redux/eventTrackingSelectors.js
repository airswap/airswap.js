// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getERC721TransferEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' }),
)

export const getERC721TransferHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC721Transfer
    const fetched = fetchedValues.ERC721Transfer
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC721ApprovalEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' }),
)

export const getERC721ApprovalHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC721Approval
    const fetched = fetchedValues.ERC721Approval
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC721ApprovalForAllEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31' }),
)

export const getERC721ApprovalForAllHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC721ApprovalForAll
    const fetched = fetchedValues.ERC721ApprovalForAll
    return {
      fetching,
      fetched,
    }
  },
)
