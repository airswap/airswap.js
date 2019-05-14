import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'
import { fetchTokenPrice } from '../index'

function fetchEthPrice() {
  return fetchTokenPrice('ETH')
}

export default function gasMiddleware(store) {
  makeMiddlewareHTTPFn(fetchEthPrice, 'ethPrices', store, { increment: 60 * 1000 })
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
