import { fetchGasSettings } from '../index'
import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'

export default function gasMiddleware(store) {
  makeMiddlewareHTTPFn(fetchGasSettings, 'gasData', store, { increment: 60 * 1000 })
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
