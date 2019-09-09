import _ from 'lodash'
import { createSelector } from 'reselect'
import { getSwapCancelEvents, getSwapSwapEvents } from './eventTrackingSelectors'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'
import * as callDataSelectors from './callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { WRAPPER_CONTRACT_ADDRESS } from '../../constants'

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

export const getSwapDelegateApprovals = createSelector(callDataSelectors.getSwapDelegateApprovals, approvals =>
  _.reduce(
    approvals,
    (agg, val) => {
      const approved = Number(val.response) > Math.floor(Date.now() / 1000)
      const { approver, delegate } = val.parameters
      return _.merge({}, agg, { [approver]: { [delegate]: approved } })
    },
    {},
  ),
)

export const getConnectedDelegateApprovals = createSelector(
  getSwapDelegateApprovals,
  getConnectedWalletAddress,
  (approvals, walletAddress) => _.get(approvals, walletAddress),
)

export const getConnectedWrapperDelegateApproval = createSelector(getConnectedDelegateApprovals, connectedApprovals =>
  _.get(connectedApprovals, WRAPPER_CONTRACT_ADDRESS),
)
