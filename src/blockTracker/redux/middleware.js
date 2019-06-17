import BlockTracker from '../index'
import { gotBlock } from './actions'

export default function blockTrackerMiddleware(store) {
  const blockTracker = new BlockTracker(block => store.dispatch(gotBlock(block))) //eslint-disable-line
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
