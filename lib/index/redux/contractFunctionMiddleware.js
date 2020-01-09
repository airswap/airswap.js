"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function indexMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_INDEX_ENTRIES':
          contractFunctions.getIndexEntries(action.contractAddress, action.identifier).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'entries',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEX_IS_OWNER':
          contractFunctions.getIndexIsOwner(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'isOwner',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEX_LENGTH':
          contractFunctions.getIndexLength(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'length',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEX_OWNER':
          contractFunctions.getIndexOwner(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'owner',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_INDEX_RENOUNCE_OWNERSHIP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexRenounceOwnership(action.contractAddress, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'index',
              name: 'renounceOwnership',
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEX_TRANSFER_OWNERSHIP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexTransferOwnership(action.contractAddress, action.newOwner, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'index',
              name: 'transferOwnership',
              parameters: {
                contractAddress: action.contractAddress,
                newOwner: action.newOwner
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEX_SET_LOCATOR':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexSetLocator(action.contractAddress, action.identifier, action.score, action.locator, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'index',
              name: 'setLocator',
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier,
                score: action.score,
                locator: action.locator
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEX_UNSET_LOCATOR':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexUnsetLocator(action.contractAddress, action.identifier, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'index',
              name: 'unsetLocator',
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEX_UPDATE_LOCATOR':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexUpdateLocator(action.contractAddress, action.identifier, action.score, action.locator, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'index',
              name: 'updateLocator',
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier,
                score: action.score,
                locator: action.locator
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_INDEX_GET_SCORE':
          contractFunctions.getIndexGetScore(action.contractAddress, action.identifier).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'getScore',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEX_GET_LOCATOR':
          contractFunctions.getIndexGetLocator(action.contractAddress, action.identifier).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'getLocator',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                identifier: action.identifier
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEX_GET_LOCATORS':
          contractFunctions.getIndexGetLocators(action.contractAddress, action.cursor, action.limit).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'index',
              name: 'getLocators',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                cursor: action.cursor,
                limit: action.limit
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