import * as api from '../index'
import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'
import { IS_INSTANT, IS_EXPLORER } from '../../constants'
import { addTrackedAddresses } from '../../deltaBalances/redux/actions'
import { selectors } from './reducers'

const { getIndexerIntents } = selectors

let connectedIntentsLength = 0

export default function apiMiddleware(store) {
  const trackMakerTokens = connectedIntents => {
    if (connectedIntents.length !== connectedIntentsLength) {
      // only add new tracked addresses if the number of tracked intents changes
      connectedIntentsLength = connectedIntents.length
      const trackedAddresses = connectedIntents.map(({ makerAddress, makerToken }) => ({
        address: makerAddress,
        tokenAddress: makerToken,
      }))
      store.dispatch(addTrackedAddresses(trackedAddresses))
    }
  }

  if (IS_INSTANT) {
    makeMiddlewareHTTPFn(api.fetchRouterConnectedUsers, 'connectedUsers', store, { increment: 60 * 1000 * 3 })
    makeMiddlewareHTTPFn(api.fetchIndexerIntents, 'indexerIntents', store, { increment: 1000 * 60 * 60 })
  }

  return next => action => {
    switch (action.type) {
      default:
    }

    next(action)
    if (IS_INSTANT || IS_EXPLORER) {
      trackMakerTokens(getIndexerIntents(store.getState()))
    }
  }
}
