const _ = require('lodash')
const { getSwapOrderId } = require('../swap/utils')

function isValidOrder(order) {
  if (!_.isObject(order)) return false
  const {
    makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    r,
    s,
    v,
  } = order
  return (
    makerAddress &&
    makerAmount &&
    makerToken &&
    takerAddress &&
    takerAmount &&
    takerToken &&
    expiration &&
    nonce &&
    r &&
    s &&
    v
  )
}

function getOrderId(order) {
  if (!_.isObject(order)) return false
  if (order.maker) return getSwapOrderId(order) // is a swap v2 order

  const {
    makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    r,
    s,
    v,
  } = order
  return `${makerAddress}${makerAmount}${makerToken}${takerAddress}${takerAmount}${takerToken}${expiration}${nonce}${r}${s}${v}`
}

function getUnsignedOrderId(order) {
  if (!_.isObject(order)) return false
  const { makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce } = order
  return `${makerAddress}${makerAmount}${makerToken}${takerAddress}${takerAmount}${takerToken}${expiration}${nonce}`.toLowerCase()
}

module.exports = { isValidOrder, getOrderId, getUnsignedOrderId }
