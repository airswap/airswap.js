import _ from 'lodash'
import { ERC20abi, IS_INSTANT, IS_EXPLORER, SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { makeEventActionTypes, makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { selectors as deltaBalancesSelectors } from '../../deltaBalances/redux'
import { selectors as eventSelectors } from './reducers'
import { getEventId } from '../utils'

import * as gethRead from '../../utils/gethRead'
import { buildGlobalERC20TransfersTopics, fetchLogs } from '../index'
import { gotBlocks } from '../../blockTracker/redux/actions'
import eventTracker from '../websocketEventTracker'
import { trackSwapSwap, trackSwapCancel } from '../../swap/redux/eventTrackingActions'
import { trackSwapLegacyFilled } from '../../swapLegacy/redux/eventTrackingActions'
import DebouncedQueue from '../../utils/debouncedQueue'
import { fetchedHistoricalEvents, fetchingHistoricalEvents } from './actions'

let queue

function processEventLogs(logs, store, callback) {
  const eventIds = _.map(eventSelectors.getFetchedTrackedEvents(store.getState()), getEventId)
  const newEvents = _.filter(logs, event => event && !_.includes(eventIds, getEventId(event)))

  if (logs && logs.length && newEvents.length) {
    queue.push(newEvents)
    if (callback) {
      callback(newEvents)
    }
  }
}

const initPollExchangeFills = _.once(store => {
  const callback = logs => processEventLogs(logs, store)
  // TODO: this if/else is temporary, these need to be dispatched from instant/airswap-trader repos respectively
  if (IS_INSTANT || IS_EXPLORER) {
    eventTracker.trackEvent(
      trackSwapLegacyFilled({
        callback,
        backFillBlockCount: 7000,
      }),
    )

    eventTracker.trackEvent(
      trackSwapSwap({
        callback,
        backFillBlockCount: 7000,
      }),
    )
  } else {
    eventTracker.trackEvent(
      trackSwapSwap({
        callback,
        fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK,
      }),
    )
    eventTracker.trackEvent(
      trackSwapCancel({
        callback,
        fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK,
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
    fetchLogs(null, ERC20abi, fromTopics, block.number, block.number), // might sometimes fetch balances twice, but better than missing an update
    fetchLogs(null, ERC20abi, toTopics, block.number, block.number),
  ]).then(([fromLogs, toLogs]) => {
    const logs = [...fromLogs, ...toLogs]
    if (logs && logs.length) {
      store.dispatch(makeEventFetchingActionsCreators('erc20Transfers').got(logs))
    }
  })
}

function fetchMissingBlocksForFetchedEvents(store, action) {
  const fetchedBlockNumbers = blockTrackerSelectors.getBlockNumbers(store.getState())
  const eventBlockNumbers = _.get(action, 'response', [])
    .filter(event => event.name === 'Filled')
    .map(({ blockNumber }) => blockNumber)
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
  queue = new DebouncedQueue(newEvents => {
    const newEventsAction = makeEventFetchingActionsCreators('trackedEvents').got(newEvents)

    store.dispatch(newEventsAction)
  })
  initPollExchangeFills(store)
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
        if (action.fromBlock || action.backFillBlockCount) {
          store.dispatch(fetchingHistoricalEvents(action))
        }
        eventTracker.trackEvent({
          ...action,
          callback: logs => processEventLogs(logs, store, action.callback),
          onFetchedHistoricalEvents: events => {
            store.dispatch(fetchedHistoricalEvents(action, events))
          },
        })

        break
      default:
    }
    next(action)
  }
}
