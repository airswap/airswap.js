import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { flatten, nest } from '../../swap/utils'
import Router from '../index'
import { getSigner } from '../../wallet/redux/actions'
import { selectors as apiSelectors } from '../../api/redux'
import { selectors as deltaBalancesSelectors } from '../../deltaBalances/redux'
import { selectors as protocolMessagingSelectors } from './reducers'
import { newCheckoutFrame } from './actions'
import { fillOrder } from '../../swapLegacy/redux/actions'
import { getKeySpace } from '../../keySpace/redux/actions'
import { fetchSetDexIndexPrices } from '../../dexIndex/redux/actions'
import { ETH_ADDRESS, IS_INSTANT, WETH_CONTRACT_ADDRESS } from '../../constants'
import { LegacyQuote, LegacyOrder } from '../../swapLegacy/tcomb'

import { Order, Quote } from '../../swap/tcomb'
import { submitSwap } from '../../swap/redux/contractFunctionActions'
import { getEthWrapperApproval } from '../../swap/redux/actions'
import { getWrapperWethTokenApproval } from '../../erc20/redux/actions'
import { submitWrapperSwap } from '../../wrapper/redux/contractFunctionActions'
import { addTrackedAddress } from '../../deltaBalances/redux/actions'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

async function initialzeRouter(store) {
  store.dispatch({ type: 'CONNECTING_ROUTER' })
  const signer = await store.dispatch(getSigner())
  const address = await signer.getAddress()
  let config
  const requireAuthentication = protocolMessagingSelectors.getRouterRequireAuth(store.getState())
  if (requireAuthentication) {
    const keySpace = await store.dispatch(getKeySpace())
    const messageSigner = message => keySpace.sign(message)
    config = { address, keyspace: true, messageSigner, requireAuthentication }
  } else {
    config = { address, requireAuthentication }
  }

  router = new Router(config)
  return router.connect()
}

let router

const gotIntents = (intents, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_INTENTS',
  intents,
  stackId,
})

const gotOrderResponse = (orderResponse, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_ORDER_RESPONSE',
  orderResponse,
  stackId,
})

const gotAlternativeOrderResponse = (alternativeOrderResponse, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_ALTERNATIVE_ORDER_RESPONSE',
  alternativeOrderResponse,
  stackId,
})

const gotLowBalanceOrderResponse = (lowBalanceOrderResponse, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_LOW_BALANCE_ORDER_RESPONSE',
  lowBalanceOrderResponse,
  stackId,
})

const gotAlternativeQuoteResponse = (alternativeQuoteResponse, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_ALTERNATIVE_QUOTE_RESPONSE',
  alternativeQuoteResponse,
  stackId,
})

const gotQuoteResponse = (quoteResponse, stackId) => ({
  type: 'GOT_CHECKOUT_FRAME_QUOTE_RESPONSE',
  quoteResponse,
  stackId,
})

const frameTimeoutReached = stackId => ({
  type: 'CHECKOUT_FRAME_TIMEOUT_REACHED',
  stackId,
})

const allIntentsResolved = stackId => ({
  type: 'CHECKOUT_FRAME_ALL_INTENTS_RESOLVED',
  stackId,
})

const orderFetchingTimeout = 3000 // 3 seconds

function intentSupportsQuotes({ supportedMethods }) {
  return (
    _.intersection(supportedMethods, ['getQuote', 'getMaxQuote']).length === 2 ||
    _.intersection(supportedMethods, ['getMakerSideQuote', 'getTakerSideQuote', 'getMaxQuote']).length === 3
  )
}

function isMakerSide(query) {
  return query.makerAmount && !query.takerAmount
}

function isTakerSide(query) {
  return query.takerAmount && !query.makerAmount
}

function takerTokenBalanceIsZero(store, takerToken) {
  const state = store.getState()
  const connectedBalances = deltaBalancesSelectors.getConnectedBalances(state)
  return Number(connectedBalances[takerToken]) === 0
}

function takerTokenBalanceIsLessThanTakerAmount(store, takerToken, takerAmount) {
  const connectedBalances = deltaBalancesSelectors.getConnectedBalances(store.getState())
  return BigNumber(connectedBalances[takerToken]).lt(takerAmount)
}

async function getOrderTakerTokenWithQuotes(intent, store, action) {
  const { takerAmount } = action.query
  const { makerToken, takerToken } = intent
  const makerAddress = intent.connectionAddress || intent.makerAddress
  const swapVersion = intent.swapVersion || 1
  const quotePromise = router.getQuote(makerAddress, { takerAmount, makerToken, takerToken, swapVersion })
  const maxQuotePromise = router.getMaxQuote(makerAddress, { makerToken, takerToken, swapVersion })
  let maxQuote
  let quote

  try {
    const maxQuoteResponse = await maxQuotePromise
    maxQuote = swapVersion === 2 ? flatten(Quote(maxQuoteResponse)) : LegacyQuote(maxQuoteResponse)
  } catch (e) {
    console.log(e)
  }
  try {
    const quoteResponse = await quotePromise
    quote = swapVersion === 2 ? flatten(Quote(quoteResponse)) : LegacyQuote(quoteResponse)
  } catch (e) {
    console.log(e)
  }

  if (takerTokenBalanceIsZero(store, action.query.takerToken)) {
    if (maxQuote && BigNumber(takerAmount).gt(maxQuote.takerAmount)) {
      return store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId))
    } else if (quote) {
      return store.dispatch(gotQuoteResponse(quote, action.stackId))
    }
  } else if (quote && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, quote.takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const lowBalanceResponse = await router.getOrder(makerAddress, {
        takerAmount: adjustedTokenBalance,
        makerToken,
        takerToken,
        swapVersion,
      })
      const lowBalanceOrder = swapVersion === 2 ? flatten(Order(lowBalanceResponse)) : LegacyOrder(lowBalanceResponse)
      store.dispatch(gotQuoteResponse(quote, action.stackId))
      return store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  if (maxQuote && BigNumber(takerAmount).gt(maxQuote.takerAmount)) {
    try {
      const alternativeOrderResponse = await router.getOrder(makerAddress, {
        takerAmount: maxQuote.takerAmount,
        makerToken,
        takerToken,
        swapVersion,
      })
      const alternativeOrder =
        swapVersion === 2 ? flatten(Order(alternativeOrderResponse)) : LegacyOrder(alternativeOrderResponse)

      return store.dispatch(gotAlternativeOrderResponse(alternativeOrder, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const orderResponse = await router.getOrder(makerAddress, { takerAmount, makerToken, takerToken, swapVersion })
    const order = swapVersion === 2 ? flatten(Order(orderResponse)) : LegacyOrder(orderResponse)

    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderMakerTokenWithQuotes(intent, store, action) {
  const { makerAmount } = action.query
  const { makerToken, takerToken } = intent
  const makerAddress = intent.connectionAddress || intent.makerAddress
  const swapVersion = intent.swapVersion || 1
  const quotePromise = router.getQuote(makerAddress, { makerAmount, makerToken, takerToken, swapVersion })
  const maxQuotePromise = router.getMaxQuote(makerAddress, { makerToken, takerToken, swapVersion })
  let maxQuote
  let quote
  try {
    const maxQuoteResponse = await maxQuotePromise
    maxQuote = swapVersion === 2 ? flatten(Quote(maxQuoteResponse)) : LegacyQuote(maxQuoteResponse)
  } catch (e) {
    console.log(e)
  }
  try {
    const quoteResponse = await quotePromise
    quote = swapVersion === 2 ? flatten(Quote(quoteResponse)) : LegacyQuote(quoteResponse)
  } catch (e) {
    console.log(e)
  }

  if (takerTokenBalanceIsZero(store, action.query.takerToken)) {
    if (maxQuote && BigNumber(makerAmount).gt(maxQuote.makerAmount)) {
      return store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId))
    } else if (quote) {
      return store.dispatch(gotQuoteResponse(quote, action.stackId))
    }
  } else if (quote && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, quote.takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const lowBalanceResponse = await router.getOrder(makerAddress, {
        takerAmount: adjustedTokenBalance,
        makerToken,
        takerToken,
        swapVersion,
      })
      const lowBalanceOrder = swapVersion === 2 ? flatten(Order(lowBalanceResponse)) : LegacyOrder(lowBalanceResponse)

      store.dispatch(gotQuoteResponse(quote, action.stackId))
      return store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  if (maxQuote && BigNumber(makerAmount).gt(maxQuote.makerAmount)) {
    try {
      const alternativeOrderResponse = await router.getOrder(makerAddress, {
        makerAmount: maxQuote.makerAmount,
        makerToken,
        takerToken,
        swapVersion,
      })
      const alternativeOrder =
        swapVersion === 2 ? flatten(Order(alternativeOrderResponse)) : LegacyOrder(alternativeOrderResponse)

      return store.dispatch(gotAlternativeOrderResponse(alternativeOrder, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const orderResponse = await router.getOrder(makerAddress, { makerAmount, makerToken, takerToken, swapVersion })
    const order = swapVersion === 2 ? flatten(Order(orderResponse)) : LegacyOrder(orderResponse)

    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderTakerTokenWithoutQuotes(intent, store, action) {
  const { takerAmount } = action.query
  const { makerToken, takerToken } = intent
  const makerAddress = intent.connectionAddress || intent.makerAddress
  const swapVersion = intent.swapVersion || 1
  if (takerTokenBalanceIsZero(store, action.query.takerToken)) {
    return null
  }

  if (takerAmount && takerTokenBalanceIsLessThanTakerAmount(store, action.query.takerToken, takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const lowBalanceResponse = await router.getOrder(makerAddress, {
        takerAmount: adjustedTokenBalance,
        makerToken,
        takerToken,
        swapVersion,
      })
      const lowBalanceOrder = swapVersion === 2 ? flatten(Order(lowBalanceResponse)) : LegacyOrder(lowBalanceResponse)

      return store.dispatch(gotLowBalanceOrderResponse(lowBalanceOrder, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const orderResponse = await router.getOrder(makerAddress, { takerAmount, makerToken, takerToken, swapVersion })
    const order = swapVersion === 2 ? flatten(Order(orderResponse)) : LegacyOrder(orderResponse)

    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderMakerTokenWithoutQuotes(intent, store, action) {
  const { makerAmount } = action.query
  const { makerToken, takerToken } = intent
  const makerAddress = intent.connectionAddress || intent.makerAddress
  const swapVersion = intent.swapVersion || 1

  if (takerTokenBalanceIsZero(store, action.query.takerToken)) {
    return null
  }
  try {
    const orderResponse = await router.getOrder(makerAddress, { makerAmount, makerToken, takerToken, swapVersion })
    const order = swapVersion === 2 ? flatten(Order(orderResponse)) : LegacyOrder(orderResponse)

    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

function mapIntentFetchProtocolOrder(intent, store, action) {
  if (intentSupportsQuotes(intent) && isTakerSide(action.query)) {
    return getOrderTakerTokenWithQuotes(intent, store, action)
  } else if (intentSupportsQuotes(intent) && isMakerSide(action.query)) {
    return getOrderMakerTokenWithQuotes(intent, store, action)
  } else if (!intentSupportsQuotes(intent) && isTakerSide(action.query)) {
    return getOrderTakerTokenWithoutQuotes(intent, store, action)
  } else if (!intentSupportsQuotes(intent) && isMakerSide(action.query)) {
    return getOrderMakerTokenWithoutQuotes(intent, store, action)
  }
}

const baseAsset = 'ETH'

async function fillFrameBestOrder(store) {
  const state = store.getState()
  const bestOrder =
    protocolMessagingSelectors.getCurrentFrameSelectedOrder(state) ||
    protocolMessagingSelectors.getCurrentFrameBestOrder(state) ||
    protocolMessagingSelectors.getCurrentFrameBestAlternativeOrder(state) ||
    protocolMessagingSelectors.getCurrentFrameBestLowBalanceOrder(state)

  if (bestOrder.swapVersion === 2) {
    const bestSwap = nest(bestOrder)
    if (baseAsset === 'ETH') {
      const ethAmount = bestSwap.taker.token === WETH_CONTRACT_ADDRESS ? bestSwap.taker.param : '0'
      store.dispatch(submitWrapperSwap({ order: bestSwap, ethAmount }))
    } else {
      store.dispatch(submitSwap({ order: bestSwap }))
    }
  } else {
    store.dispatch(fillOrder(bestOrder))
  }
}

// assumes that instant passes WETH as the baseAsset
// and that we force ETH
function filterIntents(intents, query, queryContext) {
  const { makerToken, takerToken } = query
  const { side, specifiedMakerAddress } = queryContext

  return _.filter(intents, intent => {
    // user is filtering to only query one specific maker
    if (specifiedMakerAddress && specifiedMakerAddress !== intent.address) {
      return false
    }

    // for 2.0 special cases (wrapper)
    if (intent.swapVersion === 2) {
      if (query.takerToken === ETH_ADDRESS) {
        return intent.makerToken === makerToken && intent.takerToken === WETH_CONTRACT_ADDRESS
      } else if (query.makerToken === ETH_ADDRESS) {
        return intent.makerToken === WETH_CONTRACT_ADDRESS && intent.takerToken === takerToken
      }
    }
    // for 1.0 special cases (no ETH on sells)
    if (side === 'sell') {
      if (query.makerToken === ETH_ADDRESS) {
        return intent.makerToken === WETH_CONTRACT_ADDRESS && intent.takerToken === takerToken
      }
    }
    // normal matches
    return intent.makerToken === makerToken && intent.takerToken === takerToken
  })
}

// this is useful in the widget, or anywhere else where a token is being queried that isn't being tracked
// it's helpful in preventing edge cases while not causing bloat in the number of tracked tokens
function trackMissingTokensForConnectedAddress(query, store) {
  const state = store.getState()
  const { makerToken, takerToken } = query
  const address = getConnectedWalletAddress(state)
  const connectedBalances = deltaBalancesSelectors.getConnectedBalances(state)
  if (_.isUndefined(connectedBalances[makerToken])) {
    store.dispatch(addTrackedAddress({ address, tokenAddress: makerToken }))
  }
  if (_.isUndefined(connectedBalances[takerToken])) {
    store.dispatch(addTrackedAddress({ address, tokenAddress: takerToken }))
  }
}

export default function routerMiddleware(store) {
  store.dispatch(newCheckoutFrame())
  return next => action => {
    const state = store.getState()

    switch (action.type) {
      case 'CONNECTED_WALLET':
        if (!protocolMessagingSelectors.getRouterRequireAuth(state) && IS_INSTANT) {
          const routerPromise = initialzeRouter(store).then(() => store.dispatch({ type: 'ROUTER_CONNECTED' }))
          routerPromise.catch(error => store.dispatch({ type: 'ERROR_CONNECTING_ROUTER', error }))
        }
        break
      case 'KEYSPACE_READY':
        if (protocolMessagingSelectors.getRouterRequireAuth(state)) {
          const routerPromise = initialzeRouter(store).then(() => store.dispatch({ type: 'ROUTER_CONNECTED' }))
          routerPromise.catch(error => store.dispatch({ type: 'ERROR_CONNECTING_ROUTER', error }))
        }
        break
      case 'SET_CHECKOUT_FRAME_QUERY':
        trackMissingTokensForConnectedAddress(action.query, store)
        action.stackId = protocolMessagingSelectors.getCurrentFrameStackId(state) //eslint-disable-line
        const intents = apiSelectors.getConnectedIndexerIntents(state)
        const filteredIntents = filterIntents(intents, action.query, action.queryContext)
        store.dispatch(gotIntents(filteredIntents, action.stackId))
        store.dispatch(getEthWrapperApproval())
        store.dispatch(getWrapperWethTokenApproval())

        Promise.all(filteredIntents.map(intent => mapIntentFetchProtocolOrder(intent, store, action))).then(() =>
          store.dispatch(allIntentsResolved(action.stackId)),
        )
        window.setTimeout(() => {
          store.dispatch(frameTimeoutReached(action.stackId))
        }, orderFetchingTimeout)
        break
      case 'FILL_FRAME_BEST_ORDER':
        action.stackId = protocolMessagingSelectors.getCurrentFrameStackId(state) //eslint-disable-line
        fillFrameBestOrder(store)
        break
      case 'SELECT_CHECKOUT_FRAME_ORDER':
        action.stackId = protocolMessagingSelectors.getCurrentFrameStackId(state) //eslint-disable-line
        break
      case 'CHECKOUT_FRAME_TIMEOUT_REACHED':
        // once we've hit the cutoff threshold waiting for orders, check the best order on DexIndex
        store.dispatch(fetchSetDexIndexPrices(action.stackId))
        break
      default:
    }
    return next(action)
  }
}
