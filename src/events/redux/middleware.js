import _ from 'lodash'
import { IS_INSTANT, IS_EXPLORER } from '../../constants'
import { makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'
import { selectors as eventSelectors } from './reducers'
import { getEventId } from '../utils'

import websocketEventTracker from '../websocketEventTracker'
// TODO: make httpEventTracker selectable via a config in the future, but don't auto-start blockTracker on import
// import httpsEventTracker from '../eventTracker'
import { trackSwapSwap } from '../../swap/redux/eventTrackingActions'
import DebouncedQueue from '../../utils/debouncedQueue'
import { fetchedHistoricalEvents, fetchingHistoricalEvents } from './actions'
import { trackSwapLightSwap } from '../../swaplight/redux/eventTrackingActions'

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
        ...(IS_EXPLORER ? { backFillBlockCount: 7000 * 30 } : {}),
      }),
    )
    eventTracker.trackEvent(
      trackSwapLightSwap({
        callback,
        ...(IS_EXPLORER ? { backFillBlockCount: 7000 * 7 } : {}),
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
