"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexerMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function indexerMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_INDEXER_INDEXES':
          contractFunctions.getIndexerIndexes(action.signerToken, action.senderToken, action.protocol).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'indexes',
              timestamp: Date.now(),
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEXER_IS_OWNER':
          contractFunctions.getIndexerIsOwner().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'isOwner',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEXER_LOCATOR_WHITELISTS':
          contractFunctions.getIndexerLocatorWhitelists(action.protocol).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'locatorWhitelists',
              timestamp: Date.now(),
              parameters: {
                protocol: action.protocol
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEXER_OWNER':
          contractFunctions.getIndexerOwner().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'owner',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_INDEXER_RENOUNCE_OWNERSHIP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerRenounceOwnership(signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'renounceOwnership'
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_INDEXER_STAKING_TOKEN':
          contractFunctions.getIndexerStakingToken().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'stakingToken',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEXER_TOKEN_BLACKLIST':
          contractFunctions.getIndexerTokenBlacklist(action.token).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'tokenBlacklist',
              timestamp: Date.now(),
              parameters: {
                token: action.token
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_INDEXER_TRANSFER_OWNERSHIP':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerTransferOwnership(action.newOwner, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'transferOwnership',
              parameters: {
                newOwner: action.newOwner
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_SET_LOCATOR_WHITELIST':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerSetLocatorWhitelist(action.protocol, action.newLocatorWhitelist, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'setLocatorWhitelist',
              parameters: {
                protocol: action.protocol,
                newLocatorWhitelist: action.newLocatorWhitelist
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_CREATE_INDEX':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerCreateIndex(action.signerToken, action.senderToken, action.protocol, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'createIndex',
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_ADD_TOKEN_TO_BLACKLIST':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerAddTokenToBlacklist(action.token, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'addTokenToBlacklist',
              parameters: {
                token: action.token
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_REMOVE_TOKEN_FROM_BLACKLIST':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerRemoveTokenFromBlacklist(action.token, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'removeTokenFromBlacklist',
              parameters: {
                token: action.token
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_SET_INTENT':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerSetIntent(action.signerToken, action.senderToken, action.protocol, action.stakingAmount, action.locator, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'setIntent',
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol,
                stakingAmount: action.stakingAmount,
                locator: action.locator
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_INDEXER_UNSET_INTENT':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitIndexerUnsetIntent(action.signerToken, action.senderToken, action.protocol, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'indexer',
              name: 'unsetIntent',
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_INDEXER_GET_LOCATORS':
          contractFunctions.getIndexerGetLocators(action.signerToken, action.senderToken, action.protocol, action.cursor, action.limit).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'getLocators',
              timestamp: Date.now(),
              parameters: {
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol,
                cursor: action.cursor,
                limit: action.limit
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_INDEXER_GET_STAKED_AMOUNT':
          contractFunctions.getIndexerGetStakedAmount(action.user, action.signerToken, action.senderToken, action.protocol).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'indexer',
              name: 'getStakedAmount',
              timestamp: Date.now(),
              parameters: {
                user: action.user,
                signerToken: action.signerToken,
                senderToken: action.senderToken,
                protocol: action.protocol
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