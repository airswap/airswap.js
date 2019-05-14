import { fetchDexIndexPrices } from '../index'
import { gotDexIndexResponse, startDexIndexQuery, endDexIndexQuery } from './actions'
import { selectors as protocolMessagingSelectors } from '../../protocolMessaging/redux'

const { getCurrentFrameQueryContext, getCurrentFrameBestOrder } = protocolMessagingSelectors

const makeDexIndexQuery = (airswapQuery, airswapOrder) => {
  const { makerAmount, takerAmount, side } = airswapQuery
  if (makerAmount && takerAmount) throw new Error('should not specify both makerAmount and takerAmount')
  const symbol = airswapOrder.tokenSymbol
  const amount = airswapOrder.tokenAmount
  return { symbol, amount, side }
}

export default function dexIndexMiddleware(store) {
  return next => action => {
    const state = store.getState()
    switch (action.type) {
      case 'GET_DEXINDEX_PRICES':
        const { stackId } = action
        const queryContext = getCurrentFrameQueryContext(state)
        const bestAirswapOrder = getCurrentFrameBestOrder(state)
        if (Object.keys(bestAirswapOrder || {}).length === 0) {
          break
        }
        const dexIndexQuery = makeDexIndexQuery(queryContext, bestAirswapOrder)
        store.dispatch(startDexIndexQuery(stackId))
        fetchDexIndexPrices(dexIndexQuery)
          .then(dexIndexResponse => {
            store.dispatch(gotDexIndexResponse({ stackId, dexIndexResponse }))
            store.dispatch(endDexIndexQuery(stackId))
          })
          .catch(e => {
            console.log(e)
            store.dispatch(endDexIndexQuery(stackId))
          })
        break
      default:
    }
    return next(action)
  }
}
