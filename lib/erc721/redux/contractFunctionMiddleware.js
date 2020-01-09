"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ERC721Middleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function ERC721Middleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_ERC_721_SUPPORTS_INTERFACE':
          contractFunctions.getERC721SupportsInterface(action.contractAddress, action.interfaceId).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'supportsInterface',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                interfaceId: action.interfaceId
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_ERC_721_BALANCE_OF':
          contractFunctions.getERC721BalanceOf(action.contractAddress, action.owner).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                owner: action.owner
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_ERC_721_OWNER_OF':
          contractFunctions.getERC721OwnerOf(action.contractAddress, action.tokenId).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'ownerOf',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                tokenId: action.tokenId
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_721_TRANSFER_FROM':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC721TransferFrom(action.contractAddress, action.from, action.to, action.tokenId, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC721',
              name: 'transferFrom',
              parameters: {
                contractAddress: action.contractAddress,
                from: action.from,
                to: action.to,
                tokenId: action.tokenId
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_ERC_721_APPROVE':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC721Approve(action.contractAddress, action.to, action.tokenId, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC721',
              name: 'approve',
              parameters: {
                contractAddress: action.contractAddress,
                to: action.to,
                tokenId: action.tokenId
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_ERC_721_GET_APPROVED':
          contractFunctions.getERC721GetApproved(action.contractAddress, action.tokenId).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'getApproved',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                tokenId: action.tokenId
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_721_SET_APPROVAL_FOR_ALL':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC721SetApprovalForAll(action.contractAddress, action.operator, action._approved, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC721',
              name: 'setApprovalForAll',
              parameters: {
                contractAddress: action.contractAddress,
                operator: action.operator,
                _approved: action._approved
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_ERC_721_IS_APPROVED_FOR_ALL':
          contractFunctions.getERC721IsApprovedForAll(action.contractAddress, action.owner, action.operator).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'isApprovedForAll',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                owner: action.owner,
                operator: action.operator
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_ERC_721_KITTY_INDEX_TO_APPROVED':
          contractFunctions.getERC721KittyIndexToApproved(action.contractAddress, action.tokenId).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC721',
              name: 'kittyIndexToApproved',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                tokenId: action.tokenId
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_721_SAFE_TRANSFER_FROM':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC721SafeTransferFrom(action.contractAddress, action.from, action.to, action.tokenId, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC721',
              name: 'safeTransferFrom',
              parameters: {
                contractAddress: action.contractAddress,
                from: action.from,
                to: action.to,
                tokenId: action.tokenId
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