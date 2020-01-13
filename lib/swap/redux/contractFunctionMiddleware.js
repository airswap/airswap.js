"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = swapMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function swapMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_SWAP_REGISTRY':
          contractFunctions.getSwapRegistry().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'swap',
              name: 'registry',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_SWAP_SENDER_AUTHORIZATIONS':
          contractFunctions.getSwapSenderAuthorizations(action.authorizerAddress, action.authorizedSender).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'swap',
              name: 'senderAuthorizations',
              timestamp: Date.now(),
              parameters: {
                authorizerAddress: action.authorizerAddress,
                authorizedSender: action.authorizedSender
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_SWAP_SIGNER_AUTHORIZATIONS':
          contractFunctions.getSwapSignerAuthorizations(action.authorizerAddress, action.authorizedSigner).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'swap',
              name: 'signerAuthorizations',
              timestamp: Date.now(),
              parameters: {
                authorizerAddress: action.authorizerAddress,
                authorizedSigner: action.authorizedSigner
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_SWAP_SIGNER_MINIMUM_NONCE':
          contractFunctions.getSwapSignerMinimumNonce(action.signer).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'swap',
              name: 'signerMinimumNonce',
              timestamp: Date.now(),
              parameters: {
                signer: action.signer
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_SWAP_SIGNER_NONCE_STATUS':
          contractFunctions.getSwapSignerNonceStatus(action.signer, action.nonce).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'swap',
              name: 'signerNonceStatus',
              timestamp: Date.now(),
              parameters: {
                signer: action.signer,
                nonce: action.nonce
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_SWAP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwap(action.order, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'swap',
              parameters: {
                order: action.order
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_CANCEL':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapCancel(action.nonces, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'cancel',
              parameters: {
                nonces: action.nonces
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_CANCEL_UP_TO':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapCancelUpTo(action.minimumNonce, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'cancelUpTo',
              parameters: {
                minimumNonce: action.minimumNonce
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_AUTHORIZE_SENDER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapAuthorizeSender(action.authorizedSender, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'authorizeSender',
              parameters: {
                authorizedSender: action.authorizedSender
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_AUTHORIZE_SIGNER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapAuthorizeSigner(action.authorizedSigner, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'authorizeSigner',
              parameters: {
                authorizedSigner: action.authorizedSigner
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_REVOKE_SENDER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapRevokeSender(action.authorizedSender, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'revokeSender',
              parameters: {
                authorizedSender: action.authorizedSender
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_SWAP_REVOKE_SIGNER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitSwapRevokeSigner(action.authorizedSigner, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'swap',
              name: 'revokeSigner',
              parameters: {
                authorizedSigner: action.authorizedSigner
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