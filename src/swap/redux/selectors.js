import _ from 'lodash'
import { createSelector } from 'reselect'
import { getSwapCancelEvents, getSwapSwapEvents } from './eventTrackingSelectors'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { makeGetReadableSwapOrder } from '../../tokens/redux/reducers'
import * as callDataSelectors from './callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { WRAPPER_CONTRACT_ADDRESS } from '../../constants'
import { mapNested22OrderTo20Order, nest, flatten } from '../../swap/utils'

export const getFormattedSwapFills = createSelector(
  getSwapSwapEvents,
  makeGetReadableSwapOrder,
  blockTrackerSelectors.getBlocks,
  (events, getReadableSwapOrder, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...getReadableSwapOrder(flatten(mapNested22OrderTo20Order(nest(values)))),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

export const getFormattedSwapCancels = createSelector(
  getSwapCancelEvents,
  blockTrackerSelectors.getBlocks,
  (events, blockObj) =>
    events.map(({ transactionHash, blockNumber, values }) => ({
      transactionHash,
      ...flatten(mapNested22OrderTo20Order(nest(values))),
      timestamp: _.get(blockObj, `${blockNumber}.timestamp`),
    })),
)

export const getSwapDelegateApprovals = createSelector(callDataSelectors.getSwapSenderAuthorizations, approvals =>
  _.reduce(
    approvals,
    (agg, val) => {
      const approved = val.response === 'true'
      const { sender, authorizedSender } = val.parameters
      return _.merge({}, agg, { [sender]: { [authorizedSender]: approved } })
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

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getSwapSwapEventsAllContracts = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e',
  }).map(event => ({
    ...event,
    values: flatten(mapNested22OrderTo20Order(nest(event.values))),
  })),
)

export const getSwapCancelEventsAllContracts = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
  }).map(event => ({
    ...event,
    values: flatten(mapNested22OrderTo20Order(nest(event.values))),
  })),
)
