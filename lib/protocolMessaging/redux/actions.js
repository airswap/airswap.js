"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCheckoutFrameOrder = exports.fillFrameBestOrder = exports.setCheckoutFrameQuery = exports.newCheckoutFrame = void 0;

var _uuid = _interopRequireDefault(require("uuid4"));

var _order = require("../../utils/order");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newCheckoutFrame = function newCheckoutFrame() {
  return {
    type: 'NEW_CHECKOUT_FRAME',
    stackId: (0, _uuid.default)()
  };
};

exports.newCheckoutFrame = newCheckoutFrame;

var setCheckoutFrameQuery = function setCheckoutFrameQuery(_ref, _ref2) {
  var makerToken = _ref.makerToken,
      takerToken = _ref.takerToken,
      makerAmount = _ref.makerAmount,
      takerAmount = _ref.takerAmount;
  var side = _ref2.side,
      specifiedAmount = _ref2.specifiedAmount,
      specifiedMakerAddress = _ref2.specifiedMakerAddress,
      baseToken = _ref2.baseToken;
  return {
    type: 'SET_CHECKOUT_FRAME_QUERY',
    query: {
      makerToken: makerToken,
      takerToken: takerToken,
      makerAmount: makerAmount,
      takerAmount: takerAmount
    },
    // specifiedMakerAddress is sent from user land; always cast to lower case for protocol messaging
    queryContext: {
      side: side,
      baseToken: baseToken,
      specifiedAmount: specifiedAmount,
      specifiedMakerAddress: specifiedMakerAddress ? specifiedMakerAddress.toLowerCase() : null
    }
  };
};

exports.setCheckoutFrameQuery = setCheckoutFrameQuery;

var fillFrameBestOrder = function fillFrameBestOrder() {
  return {
    type: 'FILL_FRAME_BEST_ORDER'
  };
};

exports.fillFrameBestOrder = fillFrameBestOrder;

var selectCheckoutFrameOrder = function selectCheckoutFrameOrder(order) {
  return {
    type: 'SELECT_CHECKOUT_FRAME_ORDER',
    orderId: (0, _order.getOrderId)(order)
  };
};

exports.selectCheckoutFrameOrder = selectCheckoutFrameOrder;