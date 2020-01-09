"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapperMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function wrapperMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_WRAPPER_SWAP_CONTRACT':
          contractFunctions.getWrapperSwapContract().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'wrapper',
              name: 'swapContract',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_WRAPPER_WETH_CONTRACT':
          contractFunctions.getWrapperWethContract().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'wrapper',
              name: 'wethContract',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_WRAPPER_SWAP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWrapperSwap(action.ethAmount, action.order, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'wrapper',
              name: 'swap',
              parameters: {
                ethAmount: action.ethAmount,
                order: action.order
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_WRAPPER_PROVIDE_DELEGATE_ORDER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWrapperProvideDelegateOrder(action.ethAmount, action.order, action.delegate, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'wrapper',
              name: 'provideDelegateOrder',
              parameters: {
                ethAmount: action.ethAmount,
                order: action.order,
                delegate: action.delegate
              }
            });
            action.resolve(id);
          });
          break;

        default:
      }

      return next(action);
    };
  };
}