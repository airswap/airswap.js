import * as api from '../index'
import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'
import { IS_INSTANT } from '../../constants'

export default function apiMiddleware(store) {
  if (IS_INSTANT) {
    makeMiddlewareHTTPFn(api.fetchRouterConnectedUsers, 'connectedUsers', store, { increment: 60 * 1000 * 3 })
    makeMiddlewareHTTPFn(api.fetchIndexerIntents, 'indexerIntents', store, { increment: 1000 * 60 * 60 })
  }

  return next => action => {
    switch (action.type) {
      default:
    }

    next(action)
  }
}
