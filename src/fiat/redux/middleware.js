// import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'
// import { fetchTokenPrice } from '../index'
// import { IS_INSTANT } from '../../constants'

// function fetchEthPrice() {
//   return fetchTokenPrice('ETH')
// }

export default function gasMiddleware() {
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
