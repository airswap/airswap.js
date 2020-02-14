// import blockTracker from '../index'
// import { gotLatestBlock } from './actions'

// TODO: removing blocktracking for now to get alchemy callrate down
// in the future will need to make alchemy websocket optional again
export default function blockTrackerMiddleware() {
  // blockTracker.onBlock(block => store.dispatch(gotLatestBlock(block)))
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
