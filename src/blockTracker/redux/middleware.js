import blockTracker from '../index'
import { gotLatestBlock } from './actions'

export default function blockTrackerMiddleware(store) {
  blockTracker.onBlock(block => store.dispatch(gotLatestBlock(block)))
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
