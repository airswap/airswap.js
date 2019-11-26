// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getERC20TransferEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' }),
)

export const getERC20TransferHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC20Transfer
    const fetched = fetchedValues.ERC20Transfer
    return {
      fetching,
      fetched,
    }
  },
)

export const getERC20ApprovalEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, { topic: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925' }),
)

export const getERC20ApprovalHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.ERC20Approval
    const fetched = fetchedValues.ERC20Approval
    return {
      fetching,
      fetched,
    }
  },
)
