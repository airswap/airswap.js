import _ from 'lodash'
import BigNumber from 'bignumber.js'
import Router from '../index'
import { getSigner } from '../../wallet/redux/actions'
import { selectors as apiSelectors } from '../../api/redux'
import { selectors as deltaBalancesSelectors } from '../../deltaBalances/redux'
import { selectors as protocolMessagingSelectors } from './reducers'
import { newCheckoutFrame } from './actions'
import { fillOrder } from '../../swapLegacy/redux/actions'
// import { getKeySpace } from '../../keySpace/redux/actions'
import { fetchSetDexIndexPrices } from '../../dexIndex/redux/actions'
import { ETH_ADDRESS } from '../../constants'
import { Quote, Order } from '../../tcombTypes'

async function initialzeRouter(store) {
  store.dispatch({ type: 'CONNECTING_ROUTER' })
  const signer = await store.dispatch(getSigner())
  // const keySpace = await store.dispatch(getKeySpace())
  const address = await signer.getAddress()
  // const messageSigner = message => keySpace.sign(message)
  const config = { address }
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
  return _.intersection(supportedMethods, ['getQuote', 'getMaxQuote']).length === 2
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
  const connectedApprovals = deltaBalancesSelectors.getConnectedApprovals(state)
  const tokenApproved = takerToken === ETH_ADDRESS || connectedApprovals[takerToken]
  return !tokenApproved || Number(connectedBalances[takerToken]) === 0
}

function takerTokenBalanceIsLessThanTakerAmount(store, takerToken, takerAmount) {
  const connectedBalances = deltaBalancesSelectors.getConnectedBalances(store.getState())
  return BigNumber(connectedBalances[takerToken]).lt(takerAmount)
}

async function getOrderTakerTokenWithQuotes(intent, store, action) {
  const { makerToken, takerToken, takerAmount } = action.query
  const quotePromise = router.getQuote(intent.makerAddress, { takerAmount, makerToken, takerToken })
  const maxQuotePromise = router.getMaxQuote(intent.makerAddress, { makerToken, takerToken })
  let maxQuote
  let quote
  try {
    maxQuote = await maxQuotePromise
  } catch (e) {
    console.log(e)
  }
  try {
    quote = await quotePromise
  } catch (e) {
    console.log(e)
  }

  if (takerTokenBalanceIsZero(store, takerToken)) {
    if (maxQuote && BigNumber(takerAmount).gt(maxQuote.takerAmount)) {
      return store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId))
    } else if (quote) {
      return store.dispatch(gotQuoteResponse(quote, action.stackId))
    }
  } else if (quote && takerTokenBalanceIsLessThanTakerAmount(store, takerToken, quote.takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const order = Order(
        await router.getOrder(intent.makerAddress, { takerAmount: adjustedTokenBalance, makerToken, takerToken }),
      )
      store.dispatch(gotQuoteResponse(quote, action.stackId))
      return store.dispatch(gotLowBalanceOrderResponse(order, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  if (maxQuote && BigNumber(takerAmount).gt(maxQuote.takerAmount)) {
    try {
      const order = Order(
        await router.getOrder(intent.makerAddress, { takerAmount: maxQuote.takerAmount, makerToken, takerToken }),
      )
      return store.dispatch(gotAlternativeOrderResponse(order, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const order = Order(await router.getOrder(intent.makerAddress, { takerAmount, makerToken, takerToken }))
    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderMakerTokenWithQuotes(intent, store, action) {
  const { makerToken, takerToken, makerAmount } = action.query

  const quotePromise = router.getQuote(intent.makerAddress, { makerAmount, makerToken, takerToken })
  const maxQuotePromise = router.getMaxQuote(intent.makerAddress, { makerToken, takerToken })
  let maxQuote
  let quote
  try {
    maxQuote = Quote(await maxQuotePromise)
  } catch (e) {
    console.log(e)
  }
  try {
    quote = Quote(await quotePromise)
  } catch (e) {
    console.log(e)
  }

  if (takerTokenBalanceIsZero(store, takerToken)) {
    if (maxQuote && BigNumber(makerAmount).gt(maxQuote.makerAmount)) {
      return store.dispatch(gotAlternativeQuoteResponse(maxQuote, action.stackId))
    } else if (quote) {
      return store.dispatch(gotQuoteResponse(quote, action.stackId))
    }
  } else if (quote && takerTokenBalanceIsLessThanTakerAmount(store, takerToken, quote.takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const order = Order(
        await router.getOrder(intent.makerAddress, { takerAmount: adjustedTokenBalance, makerToken, takerToken }),
      )
      store.dispatch(gotQuoteResponse(quote, action.stackId))
      return store.dispatch(gotLowBalanceOrderResponse(order, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  if (maxQuote && BigNumber(makerAmount).gt(maxQuote.makerAmount)) {
    try {
      const order = Order(
        await router.getOrder(intent.makerAddress, { makerAmount: maxQuote.makerAmount, makerToken, takerToken }),
      )
      return store.dispatch(gotAlternativeOrderResponse(order, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const order = Order(await router.getOrder(intent.makerAddress, { makerAmount, makerToken, takerToken }))
    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderTakerTokenWithoutQuotes(intent, store, action) {
  const { makerToken, takerToken, takerAmount } = action.query

  if (takerAmount && takerTokenBalanceIsLessThanTakerAmount(store, takerToken, takerAmount)) {
    const takerTokenBalance = _.get(deltaBalancesSelectors.getConnectedBalances(store.getState()), takerToken)
    const adjustedTokenBalance = takerToken === ETH_ADDRESS ? `${Number(takerTokenBalance) * 0.9}` : takerTokenBalance // If takerToken is ETH, we leave 10% of their ETH balance to pay for gas
    try {
      const order = Order(
        await router.getOrder(intent.makerAddress, { takerAmount: adjustedTokenBalance, makerToken, takerToken }),
      )
      return store.dispatch(gotLowBalanceOrderResponse(order, action.stackId))
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const order = Order(await router.getOrder(intent.makerAddress, { takerAmount, makerToken, takerToken }))
    return store.dispatch(gotOrderResponse(order, action.stackId))
  } catch (e) {
    console.log(e)
  }

  return null // If we can't get an order or quote, we simply resolve the async function with nothing
}

async function getOrderMakerTokenWithoutQuotes(intent, store, action) {
  const { makerToken, takerToken, makerAmount } = action.query
  try {
    const order = Order(await router.getOrder(intent.makerAddress, { makerAmount, makerToken, takerToken }))
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

export default function routerMiddleware(store) {
  store.dispatch(newCheckoutFrame())
  return next => action => {
    const state = store.getState()
    switch (action.type) {
      case 'CONNECTED_WALLET':
        const routerPromise = initialzeRouter(store).then(() => store.dispatch({ type: 'ROUTER_CONNECTED' }))
        routerPromise.catch(error => store.dispatch({ type: 'ERROR_CONNECTING_ROUTER', error }))
        break
      case 'SET_CHECKOUT_FRAME_QUERY':
        action.stackId = protocolMessagingSelectors.getCurrentFrameStackId(state) //eslint-disable-line
        const intents = apiSelectors.getConnectedIndexerIntents(state)
        const { makerToken, takerToken } = action.query
        const filteredIntents = _.filter(intents, { makerToken, takerToken })
        store.dispatch(gotIntents(filteredIntents, action.stackId))
        Promise.all(filteredIntents.map(intent => mapIntentFetchProtocolOrder(intent, store, action))).then(() =>
          store.dispatch(allIntentsResolved(action.stackId)),
        )
        window.setTimeout(() => {
          store.dispatch(frameTimeoutReached(action.stackId))
        }, orderFetchingTimeout)
        break
      case 'FILL_FRAME_BEST_ORDER':
        action.stackId = protocolMessagingSelectors.getCurrentFrameStackId(state) //eslint-disable-line
        const bestOrder =
          protocolMessagingSelectors.getCurrentFrameSelectedOrder(state) ||
          protocolMessagingSelectors.getCurrentFrameBestOrder(state) ||
          protocolMessagingSelectors.getCurrentFrameBestAlternativeOrder(state) ||
          protocolMessagingSelectors.getCurrentFrameBestLowBalanceOrder(state)
        store.dispatch(fillOrder(bestOrder))
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
    // FOR TESTING SELECTED ORDER FUNCTIONALITY, WILL DELETE SOON
    // const orderIds = protocolMessagingSelectors.getCurrentFrameAllOrderResponses(state).map(order => ({
    //   ...selectCheckoutFrameOrder(order),
    // }))
    // const currentFrameSelectedOrder = protocolMessagingSelectors.getCurrentFrameSelectedOrder(state)
    // if (currentFrameSelectedOrder) {
    //   console.log('selected order', currentFrameSelectedOrder)
    //   console.log('getCurrentFrameAllOrderResponses', protocolMessagingSelectors.getCurrentFrameAllOrderResponses(state))
    //   console.log('state props ', protocolMessagingSelectors.getCurrentFrameStateSummaryProperties(state))
    // } else if (orderIds.length) {
    //   console.log(JSON.stringify(orderIds, null, 2))
    // }
    return next(action)
  }
}
