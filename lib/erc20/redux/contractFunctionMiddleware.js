"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ERC20Middleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function ERC20Middleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_ERC_20_NAME':
          contractFunctions.getERC20Name(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'name',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_20_APPROVE':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC20Approve(action.contractAddress, action.spender, action.value, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC20',
              name: 'approve',
              parameters: {
                contractAddress: action.contractAddress,
                spender: action.spender,
                value: action.value
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_ERC_20_TOTAL_SUPPLY':
          contractFunctions.getERC20TotalSupply(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'totalSupply',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_20_TRANSFER_FROM':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC20TransferFrom(action.contractAddress, action.from, action.to, action.value, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC20',
              name: 'transferFrom',
              parameters: {
                contractAddress: action.contractAddress,
                from: action.from,
                to: action.to,
                value: action.value
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_ERC_20_DECIMALS':
          contractFunctions.getERC20Decimals(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'decimals',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_ERC_20_VERSION':
          contractFunctions.getERC20Version(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'version',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_ERC_20_BALANCE_OF':
          contractFunctions.getERC20BalanceOf(action.contractAddress, action.owner).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
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

        case 'FETCH_ERC_20_SYMBOL':
          contractFunctions.getERC20Symbol(action.contractAddress).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'symbol',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_ERC_20_TRANSFER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC20Transfer(action.contractAddress, action.to, action.value, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC20',
              name: 'transfer',
              parameters: {
                contractAddress: action.contractAddress,
                to: action.to,
                value: action.value
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_ERC_20_APPROVE_AND_CALL':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitERC20ApproveAndCall(action.contractAddress, action.spender, action.value, action.extraData, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'ERC20',
              name: 'approveAndCall',
              parameters: {
                contractAddress: action.contractAddress,
                spender: action.spender,
                value: action.value,
                extraData: action.extraData
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_ERC_20_ALLOWANCE':
          contractFunctions.getERC20Allowance(action.contractAddress, action.owner, action.spender).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'ERC20',
              name: 'allowance',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                owner: action.owner,
                spender: action.spender
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