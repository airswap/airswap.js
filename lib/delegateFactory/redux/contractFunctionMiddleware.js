"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegateFactoryMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function delegateFactoryMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_DELEGATE_FACTORY_INDEXER_CONTRACT':
          contractFunctions.getDelegateFactoryIndexerContract().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'delegateFactory',
              name: 'indexerContract',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELEGATE_FACTORY_PROTOCOL':
          contractFunctions.getDelegateFactoryProtocol().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'delegateFactory',
              name: 'protocol',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELEGATE_FACTORY_SWAP_CONTRACT':
          contractFunctions.getDelegateFactorySwapContract().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'delegateFactory',
              name: 'swapContract',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_DELEGATE_FACTORY_CREATE_DELEGATE':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitDelegateFactoryCreateDelegate(action.delegateTradeWallet, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'delegateFactory',
              name: 'createDelegate',
              parameters: {
                delegateTradeWallet: action.delegateTradeWallet
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_DELEGATE_FACTORY_HAS':
          contractFunctions.getDelegateFactoryHas(action.locator).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'delegateFactory',
              name: 'has',
              timestamp: Date.now(),
              parameters: {
                locator: action.locator
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        default:
      }

      return next(action);
    };
  };
}