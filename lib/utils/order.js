"use strict";

var _ = require('lodash');

var _require = require('../swap/utils'),
    getSwapOrderId = _require.getSwapOrderId;

function isValidOrder(order) {
  if (!_.isObject(order)) return false;
  var makerAddress = order.makerAddress,
      makerAmount = order.makerAmount,
      makerToken = order.makerToken,
      takerAddress = order.takerAddress,
      takerAmount = order.takerAmount,
      takerToken = order.takerToken,
      expiration = order.expiration,
      nonce = order.nonce,
      r = order.r,
      s = order.s,
      v = order.v;
  return makerAddress && makerAmount && makerToken && takerAddress && takerAmount && takerToken && expiration && nonce && r && s && v;
}

function getOrderId(order) {
  if (!_.isObject(order)) return false;
  if (order.maker) return getSwapOrderId(order); // is a swap v2 order

  var makerAddress = order.makerAddress,
      makerAmount = order.makerAmount,
      makerToken = order.makerToken,
      takerAddress = order.takerAddress,
      takerAmount = order.takerAmount,
      takerToken = order.takerToken,
      expiration = order.expiration,
      nonce = order.nonce,
      r = order.r,
      s = order.s,
      v = order.v;
  return "".concat(makerAddress).concat(makerAmount).concat(makerToken).concat(takerAddress).concat(takerAmount).concat(takerToken).concat(expiration).concat(nonce).concat(r).concat(s).concat(v);
}

function getUnsignedOrderId(order) {
  if (!_.isObject(order)) return false;
  var makerAddress = order.makerAddress,
      makerAmount = order.makerAmount,
      makerToken = order.makerToken,
      takerAddress = order.takerAddress,
      takerAmount = order.takerAmount,
      takerToken = order.takerToken,
      expiration = order.expiration,
      nonce = order.nonce;
  return "".concat(makerAddress).concat(makerAmount).concat(makerToken).concat(takerAddress).concat(takerAmount).concat(takerToken).concat(expiration).concat(nonce).toLowerCase();
}

module.exports = {
  isValidOrder: isValidOrder,
  getOrderId: getOrderId,
  getUnsignedOrderId: getUnsignedOrderId
};