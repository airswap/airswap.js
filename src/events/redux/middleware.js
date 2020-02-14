import _ from 'lodash'
import { IS_INSTANT, IS_EXPLORER, SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'
import { selectors as eventSelectors } from './reducers'
import { getEventId } from '../utils'

import websocketEventTracker from '../websocketEventTracker'
// import httpsEventTracker from '../eventTracker'
import { trackSwapSwap, trackSwapCancel } from '../../swap/redux/eventTrackingActions'
import DebouncedQueue from '../../utils/debouncedQueue'
import { fetchedHistoricalEvents, fetchingHistoricalEvents } from './actions'

const eventTracker = websocketEventTracker

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
      trackSwapSwap({
        callback,
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

export default function eventsMiddleware(store) {
  queue = new DebouncedQueue(newEvents => {
    const newEventsAction = makeEventFetchingActionsCreators('trackedEvents').got(newEvents)

    store.dispatch(newEventsAction)
  })
  initPollExchangeFills(store)
  return next => action => {
    switch (action.type) {
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
