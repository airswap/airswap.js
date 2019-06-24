import BlockTracker from '../index'
import { gotLatestBlock } from './actions'

export default function blockTrackerMiddleware(store) {
  const blockTracker = new BlockTracker(block => store.dispatch(gotLatestBlock(block))) //eslint-disable-line
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
