import _ from 'lodash'
import { ERC20abi } from '../../constants'
import { makeEventActionTypes, makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { selectors as deltaBalancesSelectors } from '../../deltaBalances/redux'
import { selectors as eventSelectors } from './reducers'
import { getEventId } from '../utils'

import * as gethRead from '../../utils/gethRead'
import { buildGlobalERC20TransfersTopics, fetchLogs } from '../index'
import { gotBlocks } from '../../blockTracker/redux/actions'
import eventTracker from '../eventTracker'
import { trackSwapSwap, trackSwapCancel } from '../../swap/redux/eventTrackingActions'
import {
  trackSwapLegacyCanceled,
  trackSwapLegacyFailed,
  trackSwapLegacyFilled,
} from '../../swapLegacy/redux/eventTrackingActions'

function processEventLogs(logs, store) {
  const eventIds = _.map(eventSelectors.getFetchedTrackedEvents(store.getState()), getEventId)
  const newEvents = _.filter(logs, event => !_.includes(eventIds, getEventId(event)))
  if (logs && logs.length && newEvents.length) {
    const newEventsAction = makeEventFetchingActionsCreators('trackedEvents').got(newEvents)
    store.dispatch(newEventsAction)
  }
}

const initPollExchangeFills = _.once(store => {
  const callback = logs => processEventLogs(logs, store)
  // TODO: this if/else is temporary, these need to be dispatched from instant/airswap-trader repos respectively
  if (process.env.REACT_APP_INSTANT) {
    eventTracker.trackEvent(
      trackSwapLegacyFilled({
        callback,
        backFillBlockCount: 7000,
      }),
    )

    eventTracker.trackEvent(
      trackSwapLegacyCanceled({
        callback,
      }),
    )

    eventTracker.trackEvent(
      trackSwapLegacyFailed({
        callback,
      }),
    )
  } else {
    eventTracker.trackEvent(
      trackSwapSwap({
        callback,
      }),
    )
    eventTracker.trackEvent(
      trackSwapCancel({
        callback,
      }),
    )
  }
})

const pollERC20Transfers = (store, block) => {
  const state = store.getState()
  const addresses = deltaBalancesSelectors.getTrackedWalletAddresses(state)
  if (!addresses.length) {
    return null
  }
  const { fromTopics, toTopics } = buildGlobalERC20TransfersTopics(addresses)
  Promise.all([
    fetchLogs(null, ERC20abi, fromTopics, block.number - 1, block.number), // might sometimes fetch balances twice, but better than missing an update
    fetchLogs(null, ERC20abi, toTopics, block.number - 1, block.number),
  ]).then(([fromLogs, toLogs]) => {
    const logs = [...fromLogs, ...toLogs]
    if (logs && logs.length) {
      store.dispatch(makeEventFetchingActionsCreators('erc20Transfers').got(logs))
    }
  })
}

function fetchMissingBlocksForFetchedEvents(store, action) {
  const fetchedBlockNumbers = blockTrackerSelectors.getBlockNumbers(store.getState())
  const eventBlockNumbers = _.get(action, 'response', []).map(({ blockNumber }) => blockNumber)
  const blockPromises = _.without(eventBlockNumbers, ...fetchedBlockNumbers).map(async blockNumber =>
    gethRead.fetchBlock(blockNumber),
  )

  Promise.all(blockPromises).then(blocks => {
    if (blocks.length) {
      store.dispatch(gotBlocks(blocks))
    }
  })
}

export default function eventsMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case makeEventActionTypes('trackedEvents').got:
        fetchMissingBlocksForFetchedEvents(store, action)
        break
      case 'GOT_LATEST_BLOCK':
        // check for erc20 transfers on each new block
        pollERC20Transfers(store, action.block)
        break

      case 'TRACK_EVENT':
        eventTracker.trackEvent({
          ...action,
          callback: logs => processEventLogs(logs, store),
        })
        break
      default:
    }
    next(action)
    if (action.type === 'GOT_LATEST_BLOCK') {
      // needs to initialize after next(action) is called to have access to the latest state
      initPollExchangeFills(store) // only executes once since it is wrapped in _.once
    }
  }
}
