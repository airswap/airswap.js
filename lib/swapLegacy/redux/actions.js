"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOrder = exports.cancelOrder = exports.fillOrder = void 0;

var _redux = require("../../utils/redux");

var fillOrder = function fillOrder(order) {
  return {
    type: 'FILL_ORDER',
    order: order
  };
};

exports.fillOrder = fillOrder;

var cancelOrder = function cancelOrder(order) {
  return {
    type: 'CANCEL_ORDER',
    order: order
  };
}; // EXAMPLE USAGE OF signOrder ACTION CREATOR
// store
//   .dispatch(
//     signOrder({
//       makerAddress: '0x1550d41be3651686e1aeeea073d8d403d0bd2e30',
//       takerAddress: '0x51686d41be3651686e1aee686e1a8d403d0b36516',
//       makerAmount: '2827234430',
//       makerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
//       takerAmount: '50485200000000000000',
//       takerToken: '0x0000000000000000000000000000000000000000',
//       nonce: '123',
//       expiration: '1234567',
//     }),
//   )
//   .then(signedOrder => console.log(signedOrder))
//   .catch(err => console.log(err)) // handle user rejecting sig


exports.cancelOrder = cancelOrder;
var signOrder = (0, _redux.makePromiseAction)({
  type: 'SIGN_ORDER'
});
exports.signOrder = signOrder;