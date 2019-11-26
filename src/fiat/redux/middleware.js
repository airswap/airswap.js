import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'
import { fetchTokenPrice } from '../index'
import { IS_INSTANT } from '../../constants'

function fetchEthPrice() {
  return fetchTokenPrice('ETH')
}

export default function gasMiddleware(store) {
  if (IS_INSTANT) {
    makeMiddlewareHTTPFn(fetchEthPrice, 'ethPrices', store, { increment: 60 * 1000 })
  }
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
