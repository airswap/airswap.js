import * as api from '../index'
import { makeMiddlewareHTTPFn } from '../../utils/redux/templates/http'

export default function apiMiddleware(store) {
  makeMiddlewareHTTPFn(api.fetchMaxQuotes, 'maxQuotes', store, { increment: 60 * 1000 * 2 })
  makeMiddlewareHTTPFn(api.fetchQuotes, 'quotes', store, { increment: 1000 * 60 * 2 })
  makeMiddlewareHTTPFn(api.fetchRouterConnectedUsers, 'connectedUsers', store, { increment: 60 * 1000 * 3 })
  makeMiddlewareHTTPFn(api.fetchIndexerIntents, 'indexerIntents', store, { increment: 1000 * 60 * 60 })
  return next => action => {
    switch (action.type) {
      default:
    }

    // INCLUDED FOR EASY TESTING UNTIL THE FEATURE STABILIZES, WILL DELETE SOON
    // const state = store.getState()
    // console.log(
    //   selectors.makeGetFormattedLiquidityByTokenPair(state)({
    //     takerToken: ETH_ADDRESS,
    //     makerToken: AST_CONTRACT_ADDRESS,
    //   }),
    //   selectors.makeGetHighestPriceByTokenPair(state)({
    //     takerToken: ETH_ADDRESS,
    //     makerToken: AST_CONTRACT_ADDRESS,
    //   }),
    //   selectors.makeGetLowestPriceByTokenPair(state)({
    //     takerToken: ETH_ADDRESS,
    //     makerToken: AST_CONTRACT_ADDRESS,
    //   }),
    //   selectors.makeGet24HourVolumeByTokenPair(state)({
    //     takerToken: ETH_ADDRESS,
    //     makerToken: AST_CONTRACT_ADDRESS,
    //   }),
    //   selectors.makeGet24HourTradesByTokenPair(state)({
    //     takerToken: ETH_ADDRESS,
    //     makerToken: AST_CONTRACT_ADDRESS,
    //   }),
    // )
    return next(action)
  }
}
