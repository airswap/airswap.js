/** @namespace protocolMessaging */
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { makeGetReadableOrder, makeGetReadableSwapOrder } from '../../tokens/redux/reducers'
import { selectors as swapLegacySelectors } from '../../swapLegacy/redux'
import { selectors as gasSelectors } from '../../gas/redux'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { selectors as fiatSelectors } from '../../fiat/redux'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'
import { selectors as deltaBalancesSelectors } from '../../deltaBalances/redux'
import { selectors as erc20Selectors } from '../../erc20/redux'
import { getOrderId } from '../../utils/order'
import { getSwapOrderId } from '../../swap/utils'
import { CheckoutFrame } from '../tcomb'
import { approveAirswapToken, approveAirswapTokenSwap, approveWrapperWethToken } from '../../erc20/redux/actions'
import { submitEthWrapperAuthorize } from '../../swap/redux/actions'
import { getConnectedWrapperDelegateApproval } from '../../swap/redux/selectors'
import { getConnectedWrapperWethApproval } from '../../erc20/redux/selectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { WETH_CONTRACT_ADDRESS, WRAPPER_CONTRACT_ADDRESS } from '../../constants'
import { getERC20ApproveTransactions } from '../../erc20/redux/contractTransactionSelectors'
import { getSwapAuthorizeSenderTransactions } from '../../swap/redux/contractTransactionSelectors'
import { reverseObjectMethods } from '../../delegate/index'

function updateCheckoutFrame(state, frameIndex, frameUpdateObj) {
  return [
    ...state.slice(0, frameIndex),
    CheckoutFrame({
      ...state[frameIndex],
      ...frameUpdateObj,
    }),
    ...state.slice(frameIndex + 1),
  ]
}

const checkoutStack = (state = [], action) => {
  const frameIndex = _.findIndex(state, { stackId: action.stackId })

  switch (action.type) {
    case 'NEW_CHECKOUT_FRAME':
      return [
        ...state,
        CheckoutFrame({
          stackId: action.stackId,
          orderResponses: [],
          alternativeOrderResponses: [],
          lowBalanceOrderResponses: [],
          quoteResponses: [],
          alternativeQuoteResponses: [],
          timeoutReached: false,
          allIntentsResolved: false,
          selectedOrderId: '',
          isDexIndexQuerying: false,
          dexIndexResponses: [],
        }),
      ]
    case 'SET_CHECKOUT_FRAME_QUERY':
      return updateCheckoutFrame(state, frameIndex, {
        query: action.query,
        queryContext: action.queryContext,
      })
    case 'GOT_CHECKOUT_FRAME_INTENTS':
      return updateCheckoutFrame(state, frameIndex, {
        intents: action.intents,
      })
    case 'GOT_CHECKOUT_FRAME_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        orderResponses: [...state[frameIndex].orderResponses, action.orderResponse],
      })
    case 'GOT_CHECKOUT_FRAME_ALTERNATIVE_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        alternativeOrderResponses: [...state[frameIndex].alternativeOrderResponses, action.alternativeOrderResponse],
      })
    case 'GOT_CHECKOUT_FRAME_LOW_BALANCE_ORDER_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        lowBalanceOrderResponses: [...state[frameIndex].lowBalanceOrderResponses, action.lowBalanceOrderResponse],
      })
    case 'GOT_CHECKOUT_FRAME_QUOTE_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        quoteResponses: [...state[frameIndex].quoteResponses, action.quoteResponse],
      })
    case 'GOT_CHECKOUT_FRAME_ALTERNATIVE_QUOTE_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        alternativeQuoteResponses: [...state[frameIndex].alternativeQuoteResponses, action.alternativeQuoteResponse],
      })
    case 'GOT_CHECKOUT_FRAME_DEXINDEX_RESPONSE':
      return updateCheckoutFrame(state, frameIndex, {
        dexIndexResponses: action.dexIndexResponse,
      })
    case 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING':
      return updateCheckoutFrame(state, frameIndex, {
        isDexIndexQuerying: action.isDexIndexQuerying,
      })
    case 'CHECKOUT_FRAME_TIMEOUT_REACHED':
      return updateCheckoutFrame(state, frameIndex, {
        timeoutReached: true,
      })
    case 'CHECKOUT_FRAME_ALL_INTENTS_RESOLVED':
      return updateCheckoutFrame(state, frameIndex, {
        allIntentsResolved: true,
      })
    case 'SELECT_CHECKOUT_FRAME_ORDER':
      return updateCheckoutFrame(state, frameIndex, {
        selectedOrderId: action.orderId, // selectedOrderId is only used when overridding the "best" order with a custom choice
      })
    default:
      return state
  }
}

const connectingRouter = (state = false, action) => {
  switch (action.type) {
    case 'CONNECTING_ROUTER':
      return true
    case 'ROUTER_CONNECTED':
      return false
    case 'ERROR_CONNECTING_ROUTER':
      return false
    default:
      return state
  }
}

const routerRequireAuth = (state = false, action) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return action.requireAuth
    default:
      return state
  }
}

const protocolMessaging = combineReducers({
  checkoutStack,
  connectingRouter,
  routerRequireAuth,
})
/**
 * A selector that returns true if the router is completing the initial authentication process.
 * @function getIsConnectingRouter
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {boolean}
 */
const getIsConnectingRouter = state => state.protocolMessaging.connectingRouter
const getRouterRequireAuth = state => state.protocolMessaging.routerRequireAuth

const getCheckoutStack = state => state.protocolMessaging.checkoutStack
const getCurrentFrame = createSelector(getCheckoutStack, stack => _.last(stack) || {})
const getCurrentFrameQuery = createSelector(getCurrentFrame, frame => frame.query)
const getCurrentFrameQueryContext = createSelector(getCurrentFrame, frame => ({
  ...frame.queryContext,
  ...frame.query,
}))

const makeGetReadableSwap = createSelector(
  makeGetReadableOrder,
  makeGetReadableSwapOrder,
  (getReadableOrder, getReadableSwapOrder) => order =>
    order.swapVersion === 2
      ? {
          ...getReadableSwapOrder(order),
          takerAmount: order.takerAmount,
          makerAmount: order.makerAmount,
        }
      : getReadableOrder(order),
)

const getCurrentFrameStackId = createSelector(getCurrentFrame, frame => frame.stackId)
const getCurrentFrameSelectedOrderId = createSelector(getCurrentFrame, frame => frame.selectedOrderId)
const getCurrentFrameIntents = createSelector(getCurrentFrame, frame => frame.intents)
const getCurrentFrameTimeoutReached = createSelector(getCurrentFrame, frame => frame.timeoutReached)
const getCurrentFrameAllIntentsResolved = createSelector(getCurrentFrame, frame => frame.allIntentsResolved)
const getCurrentFrameOrderResponses = createSelector(getCurrentFrame, makeGetReadableSwap, (frame, getReadableOrder) =>
  frame.orderResponses.map(getReadableOrder),
)
const getCurrentFrameDexIndexResponses = createSelector(getCurrentFrame, frame => frame.dexIndexResponses)
const getCurrentFrameIsDexIndexQuerying = createSelector(getCurrentFrame, frame => frame.isDexIndexQuerying)

const getCurrentFrameAlternativeOrderResponses = createSelector(
  getCurrentFrame,
  makeGetReadableSwap,
  (frame, getReadableOrder) => frame.alternativeOrderResponses.map(getReadableOrder),
)

const getCurrentFrameLowBalanceOrderResponses = createSelector(
  getCurrentFrame,
  makeGetReadableSwap,
  (frame, getReadableOrder) => frame.lowBalanceOrderResponses.map(getReadableOrder),
)

const getCurrentFrameQuoteResponses = createSelector(getCurrentFrame, makeGetReadableSwap, (frame, getReadableOrder) =>
  frame.quoteResponses.map(getReadableOrder),
)
const getCurrentFrameAlternativeQuoteResponses = createSelector(
  getCurrentFrame,
  makeGetReadableSwap,
  (frame, getReadableOrder) => frame.alternativeQuoteResponses.map(getReadableOrder),
)

const getIsCurrentFrameQuerying = createSelector(
  getCurrentFrameQuery,
  getCurrentFrameAllIntentsResolved,
  getCurrentFrameTimeoutReached,
  (query, allIntentsResolved, currentFrameTimeoutReached) =>
    !!query && !allIntentsResolved && !currentFrameTimeoutReached,
)

const getIsCurrentFrameFinishedQuerying = createSelector(
  getCurrentFrameQuery,
  getCurrentFrameAllIntentsResolved,
  getCurrentFrameTimeoutReached,
  (query, allIntentsResolved, currentFrameTimeoutReached) =>
    !!query && (allIntentsResolved || currentFrameTimeoutReached),
)

/**
 * @typedef {Object} BestOrder
 * @memberof protocolMessaging
 * @property {string} makerAddress
 * @property {string} makerAmount
 * @property {string} makerToken
 * @property {string} takerAmount
 * @property {string} takerToken
 * @property {string} takerAddress
 * @property {string} nonce
 * @property {number} expiration
 * @property {number} v
 * @property {string} r
 * @property {string} s
 * @property {number} takerAmountFormatted
 * @property {number} makerAmountFormatted
 * @property {string} takerSymbol
 * @property {string} makerSymbol
 * @property {number} ethAmount
 * @property {string} tokenSymbol
 * @property {number} tokenAmount
 * @property {number} price
 * @property {string} priceInFiat
 * @property {string} ethAmountInFiat
 * @property {number} ethTotal
 * @property {string} ethTotalInFiat
 * @property {number} ethGasCost
 * @property {string} ethGasCostInFiat
 */

const makeGetBestOrder = createSelector(
  getIsCurrentFrameFinishedQuerying,
  getCurrentFrameQueryContext,
  gasSelectors.getCurrentGasPriceSettings,
  tokenSelectors.makeGetExchangeFillGasLimitByToken,
  fiatSelectors.makeGetEthInFiat,
  deltaBalancesSelectors.getConnectedSwapApprovals,
  deltaBalancesSelectors.getConnectedApprovals,
  getConnectedWrapperDelegateApproval,
  getConnectedWrapperWethApproval,
  getConnectedWalletAddress,
  erc20Selectors.getMiningApproveToken,
  erc20Selectors.getSubmittingApproveToken,
  getERC20ApproveTransactions,
  getSwapAuthorizeSenderTransactions,
  (
    isCurrentFrameFinishedQuerying,
    currentFrameQueryContext,
    { gwei },
    getExchangeFillGasLimitByToken,
    getEthInFiat,
    connectedSwapApprovals,
    connectedApprovals,
    connectedWrapperDelegateApproval,
    connectedWrapperWethApproval,
    connectedWalletAddress,
    miningApproveToken,
    submittingApproveToken,
    ERC20ApproveTransactions,
    swapAuthorizeSenderTransactions,
  ) => orders => {
    if (!orders.length || !isCurrentFrameFinishedQuerying) return undefined
    const sortedOrders = _.sortBy(orders, 'price')
    const bestOrder = _.first(
      _.first(orders).makerSymbol === _.first(orders).tokenSymbol ? sortedOrders : [...sortedOrders].reverse(),
    )
    const ethGasPrice = Number(gwei) / 10 ** 9
    const ethGasLimit = Number(getExchangeFillGasLimitByToken({ symbol: bestOrder.tokenSymbol }))
    const ethGasCost = ethGasLimit * ethGasPrice

    const ethTotal = bestOrder.ethAmount
    let missingApprovals

    if (bestOrder.swapVersion === 2) {
      const baseToken = _.get(currentFrameQueryContext, 'baseToken')

      const miningTakerTokenSwapApproval =
        _.get(miningApproveToken, bestOrder.takerToken, false) ||
        _.get(submittingApproveToken, bestOrder.takerToken, false)
      const wrapperDelegateApproval = _.find(
        swapAuthorizeSenderTransactions,
        t => t.parameters.authorizedSender === WRAPPER_CONTRACT_ADDRESS,
      )

      const miningWrapperDelegateApproval =
        _.get(wrapperDelegateApproval, 'mining', false) || _.get(wrapperDelegateApproval, 'submitting', false)
      const wrapperWethApproval = _.find(
        ERC20ApproveTransactions,
        t =>
          t.parameters.spender === WRAPPER_CONTRACT_ADDRESS && t.parameters.contractAddress === WETH_CONTRACT_ADDRESS,
      )
      const miningWrapperWethApproval =
        _.get(wrapperWethApproval, 'mining', false) || _.get(wrapperWethApproval, 'submitting', false)

      const takerTokenSwapApproval = _.get(connectedSwapApprovals, bestOrder.takerToken, false)

      const wrapperApprovals =
        baseToken === 'ETH'
          ? [
              {
                id: 'wrapperDelegateApproval',
                payload: submitEthWrapperAuthorize(),
                approved: connectedWrapperDelegateApproval,
                isMining: miningWrapperDelegateApproval,
              },
              {
                id: 'wrapperWethApproval',
                payload: approveWrapperWethToken(),
                approved: connectedWrapperWethApproval,
                isMining: miningWrapperWethApproval,
              },
            ]
          : []

      missingApprovals = [
        {
          id: 'takerTokenSwapApproval',
          payload: approveAirswapTokenSwap(bestOrder.takerToken),
          approved: takerTokenSwapApproval,
          isMining: miningTakerTokenSwapApproval,
        },
        ...wrapperApprovals,
      ]
    } else {
      const takerTokenApproval = _.get(connectedApprovals, bestOrder.takerToken, false)

      const miningTakerTokenSwapApproval =
        _.get(miningApproveToken, bestOrder.takerToken, false) ||
        _.get(submittingApproveToken, bestOrder.takerToken, false)

      missingApprovals = [
        {
          id: 'takerTokenSwapApproval',
          payload: approveAirswapToken(bestOrder.takerToken),
          approved: takerTokenApproval,
          isMining: miningTakerTokenSwapApproval,
        },
      ]
    }

    missingApprovals = _.filter(missingApprovals, a => !a.approved).map(a => _.omit(a, 'approved'))

    return {
      ...bestOrder,
      priceInFiat: getEthInFiat(bestOrder.price), // TODO: this will need to be redone for tokens other than eth as base token
      ethAmountInFiat: getEthInFiat(bestOrder.ethAmount),
      ethTotal,
      ethTotalInFiat: getEthInFiat(ethTotal),
      ethGasCost,
      ethGasCostInFiat: getEthInFiat(ethGasCost),
      missingApprovals,
    }
  },
)

/**
 * A selector that returns the best order for the current frame (if it exists)
 * @function getCurrentFrameBestOrder
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */
const getCurrentFrameBestOrder = createSelector(
  getCurrentFrameOrderResponses,
  makeGetBestOrder,
  (orders, getBestOrder) => getBestOrder(orders),
)

/**
 * A selector that returns the best alternative quote for the current frame (if it exists)
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */
const getCurrentFrameBestAlternativeOrder = createSelector(
  getCurrentFrameAlternativeOrderResponses,
  makeGetBestOrder,
  (quotes, getBestOrder) => getBestOrder(quotes),
)

/**
 * A selector that returns the best low balance order for the current frame (if it exists)
 * @function getCurrentFrameBestLowBalanceOrder
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {protocolMessaging.BestOrder}
 */
const getCurrentFrameBestLowBalanceOrder = createSelector(
  getCurrentFrameLowBalanceOrderResponses,
  makeGetBestOrder,
  (orders, getBestOrder) => getBestOrder(orders),
)

/**
 * A selector that returns the best quote for the current frame (if it exists)
 * @function getCurrentFrameBestQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */
const getCurrentFrameBestQuote = createSelector(
  getCurrentFrameQuoteResponses,
  makeGetBestOrder,
  (quotes, getBestOrder) => getBestOrder(quotes),
)

/**
 * A selector that returns the best alternative quote for the current frame (if it exists)
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */
const getCurrentFrameBestAlternativeQuote = createSelector(
  getCurrentFrameAlternativeQuoteResponses,
  makeGetBestOrder,
  (quotes, getBestOrder) => getBestOrder(quotes),
)

/**
 * A selector that returns all order responses generated by a checkout frame query
 * @function getCurrentFrameAllOrderResponses
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Array}
 */
const getCurrentFrameAllOrderResponses = createSelector(
  getCurrentFrameOrderResponses,
  getCurrentFrameAlternativeOrderResponses,
  getCurrentFrameLowBalanceOrderResponses,
  (orders, alternativeOrders, lowBalanceOrders) => [...orders, ...alternativeOrders, ...lowBalanceOrders],
)

/**
 * A selector that returns the currently selected order override
 * @function getCurrentFrameBestAlternativeQuote
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {Object}
 */
const getCurrentFrameSelectedOrder = createSelector(
  getCurrentFrameAllOrderResponses,
  getCurrentFrameSelectedOrderId,
  makeGetBestOrder,
  (orders, orderId, getBestOrder) => {
    const selectedOrder = _.find(orders, order => getOrderId(order) === orderId)
    if (!selectedOrder) return selectedOrder
    return getBestOrder([selectedOrder])
  },
)

/**
 * A selector that returns a boolean indicating whether or not the best order
 * on the current frame is also the best order according to DexIndex
 * @function getIsAirswapBestPrice
 * @memberof protocolMessaging
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

const getIsAirswapBestPrice = createSelector(
  getCurrentFrameDexIndexResponses,
  getCurrentFrameQueryContext,
  getCurrentFrameBestOrder,
  (dexIndexQueryResponse, queryContext, bestAirswapOrder) => {
    const { side } = queryContext
    if (!dexIndexQueryResponse.length) return false
    const [firstResponse] = dexIndexQueryResponse
    const isFirstResponseAirswap = Object.keys(firstResponse)[0].toLowerCase() === 'airswap'
    const firstResponseData = Object.values(firstResponse)[0]
    if (isFirstResponseAirswap) {
      return true
    } else if (!firstResponseData.avgPrice) {
      // no price means the next best dex couldn't serve the order, so airswap is the best
      return true
    } else if (side === 'buy') {
      if (_.get(bestAirswapOrder, 'price') < _.get(firstResponseData, 'avgPrice')) return true
    } else if (side === 'sell') {
      if (_.get(bestAirswapOrder, 'price') > _.get(firstResponseData, 'avgPrice')) return true
    }
    return false
  },
)

const getCurrentFrameNoPeersFound = createSelector(
  getIsCurrentFrameFinishedQuerying,
  getCurrentFrameOrderResponses,
  getCurrentFrameAlternativeOrderResponses,
  getCurrentFrameLowBalanceOrderResponses,
  getCurrentFrameQuoteResponses,
  getCurrentFrameAlternativeQuoteResponses,
  (isCurrentFrameFinishedQuerying, orders, alternativeOrders, lowBalanceOrders, quotes, alternativeQuotes) => {
    if (!isCurrentFrameFinishedQuerying) return false
    if (
      isCurrentFrameFinishedQuerying &&
      !orders.length &&
      !alternativeOrders.length &&
      !lowBalanceOrders.length &&
      !quotes.length &&
      !alternativeQuotes.length
    )
      return true
    return false
  },
)

const {
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
} = swapLegacySelectors

const getCurrentFrameBestOrderExecution = createSelector(
  getCurrentFrameSelectedOrder,
  getCurrentFrameBestOrder,
  getCurrentFrameBestAlternativeOrder,
  getCurrentFrameBestLowBalanceOrder,
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
  transactionSelectors.getTransactions,
  (
    currentFrameSelectedOrder,
    currentFrameBestOrder,
    currentFrameBestAlternativeOrder,
    currentFrameBestLowBalanceOrder,
    submittingFillOrder,
    errorSubmittingFillOrder,
    miningFillOrder,
    transactionsFillOrder,
    minedFillOrder,
    transactionReceiptsFillOrder,
    errorMiningFillOrder,
    transactions,
  ) => {
    const order =
      currentFrameSelectedOrder ||
      currentFrameBestOrder ||
      currentFrameBestAlternativeOrder ||
      currentFrameBestLowBalanceOrder // TODO: This will need to be re-done by an order filling mechanic driven by order IDs
    if (!order) return {}
    let vals
    if (order.swapVersion === 2) {
      const lookupOrder = order.locatorType === 'contract' ? reverseObjectMethods(order) : order
      const orderId = getSwapOrderId(lookupOrder)

      const tx = _.find(transactions, t => getSwapOrderId(t.parameters.order) === orderId)
      vals = _.mapKeys(
        tx,
        (val, key) => (['transaction', 'transactionReceipt'].includes(key) ? `${key}sFillOrder` : `${key}FillOrder`),
      )
    } else {
      const orderId = getOrderId(order)
      vals = _.mapValues(
        {
          submittingFillOrder,
          errorSubmittingFillOrder,
          miningFillOrder,
          transactionsFillOrder,
          minedFillOrder,
          transactionReceiptsFillOrder,
          errorMiningFillOrder,
        },
        v => v[orderId],
      )
    }

    return vals
  },
)

const getCurrentFrameState = createSelector(
  getCurrentFrameQuery,
  getIsCurrentFrameQuerying,
  getCurrentFrameBestOrder,
  getCurrentFrameBestAlternativeOrder,
  getCurrentFrameBestLowBalanceOrder,
  getCurrentFrameBestQuote,
  getCurrentFrameBestAlternativeQuote,
  getCurrentFrameNoPeersFound,
  getCurrentFrameBestOrderExecution,
  getCurrentFrameSelectedOrder,
  (
    currentFrameQuery,
    currentFrameQuerying,
    currentFrameBestOrder,
    currentFrameBestAlternativeOrder,
    currentFrameBestLowBalanceOrder,
    currentFrameBestQuote,
    currentFrameBestAlternativeQuote,
    currentFrameNoPeersFound,
    currentFrameBestOrderExecution,
    currentFrameSelectedOrder,
  ) => {
    if (currentFrameBestOrderExecution.minedFillOrder) return 'minedBestOrder'
    if (currentFrameBestOrderExecution.miningFillOrder) return 'miningBestOrder'
    if (currentFrameNoPeersFound) return 'noPeersFound'
    if (currentFrameSelectedOrder) return 'selectedOrder'
    if (currentFrameBestOrder) return 'bestOrder'
    if (currentFrameBestLowBalanceOrder) return 'bestLowBalanceOrder'
    if (currentFrameBestAlternativeOrder) return 'bestAlternativeOrder'
    if (currentFrameBestQuote) return 'bestQuote'
    if (currentFrameBestAlternativeQuote) return 'bestAlternativeQuote'
    if (currentFrameQuerying) return 'querying'
    if (!currentFrameQuery) return 'new'
    throw new Error('checkout log has bug, state feel outside of route conditionals')
  },
)

const getCurrentFrameStateSummaryProperties = createSelector(
  getCurrentFrameState,
  getCurrentFrameQuery,
  getIsCurrentFrameQuerying,
  getCurrentFrameBestOrder,
  getCurrentFrameBestAlternativeOrder,
  getCurrentFrameBestLowBalanceOrder,
  getCurrentFrameBestQuote,
  getCurrentFrameBestAlternativeQuote,
  getCurrentFrameSelectedOrder,
  (
    currentFrameState,
    currentFrameQuery,
    currentFrameQuerying,
    currentFrameBestOrder,
    currentFrameBestAlternativeOrder,
    currentFrameBestLowBalanceOrder,
    currentFrameBestQuote,
    currentFrameBestAlternativeQuote,
    currentFrameSelectedOrder,
  ) => {
    switch (currentFrameState) {
      case 'selectedOrder':
        return currentFrameSelectedOrder
      case 'bestOrder':
        return currentFrameBestOrder
      case 'bestAlternativeOrder':
        return currentFrameBestAlternativeOrder
      case 'bestLowBalanceOrder':
        return { ...currentFrameBestLowBalanceOrder, quote: currentFrameBestQuote }
      case 'bestQuote':
        return currentFrameBestQuote
      case 'bestAlternativeQuote':
        return currentFrameBestAlternativeQuote
      default:
        return (
          currentFrameSelectedOrder ||
          currentFrameBestOrder ||
          currentFrameBestAlternativeOrder ||
          currentFrameBestLowBalanceOrder ||
          currentFrameBestQuote ||
          currentFrameBestAlternativeQuote ||
          undefined
        )
    }
  },
)

const makeLookUpCheckoutFrameByOrderId = createSelector(getCheckoutStack, stack => orderId =>
  _.find(stack, ({ orderResponses, alternativeOrderResponses, lowBalanceOrderResponses }) => {
    const orders = [...orderResponses, ...alternativeOrderResponses, ...lowBalanceOrderResponses]
    return !!_.find(orders, o => getOrderId(o) === orderId || getSwapOrderId(o) === orderId)
  }),
)

export const selectors = {
  getCheckoutStack,
  getIsAirswapBestPrice,
  getIsConnectingRouter,
  getRouterRequireAuth,
  getCurrentFrame,
  getCurrentFrameIsDexIndexQuerying,
  getCurrentFrameStackId,
  getCurrentFrameIntents,
  getCurrentFrameAllIntentsResolved,
  getCurrentFrameBestOrder,
  getCurrentFrameBestAlternativeOrder,
  getCurrentFrameBestLowBalanceOrder,
  getCurrentFrameBestQuote,
  getCurrentFrameBestAlternativeQuote,
  getCurrentFrameNoPeersFound,
  getCurrentFrameState,
  getCurrentFrameBestOrderExecution,
  getCurrentFrameQueryContext,
  getCurrentFrameStateSummaryProperties,
  getCurrentFrameAllOrderResponses,
  getCurrentFrameSelectedOrder,
  makeLookUpCheckoutFrameByOrderId,
}

export default protocolMessaging
