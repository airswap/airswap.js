// import blockTracker from '../index'
// import { gotLatestBlock } from './actions'

export default function blockTrackerMiddleware() {
  // blockTracker.onBlock(block => store.dispatch(gotLatestBlock(block)))
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
