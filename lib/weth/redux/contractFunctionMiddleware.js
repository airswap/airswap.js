"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wethMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function wethMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_WETH_NAME':
          contractFunctions.getWethName().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'name',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_WETH_APPROVE':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWethApprove(action.spender, action.amount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'weth',
              name: 'approve',
              parameters: {
                spender: action.spender,
                amount: action.amount
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_WETH_TOTAL_SUPPLY':
          contractFunctions.getWethTotalSupply().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'totalSupply',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_WETH_TRANSFER_FROM':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWethTransferFrom(action.from, action.to, action.amount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'weth',
              name: 'transferFrom',
              parameters: {
                from: action.from,
                to: action.to,
                amount: action.amount
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_WETH_WITHDRAW':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWethWithdraw(action.amount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'weth',
              name: 'withdraw',
              parameters: {
                amount: action.amount
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_WETH_DECIMALS':
          contractFunctions.getWethDecimals().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'decimals',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_WETH_BALANCE_OF':
          contractFunctions.getWethBalanceOf(action.owner).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: {
                owner: action.owner
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_WETH_SYMBOL':
          contractFunctions.getWethSymbol().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'symbol',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_WETH_TRANSFER':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWethTransfer(action.to, action.amount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'weth',
              name: 'transfer',
              parameters: {
                to: action.to,
                amount: action.amount
              }
            });
            action.resolve(id);
          });
          break;

        case 'SUBMIT_WETH_DEPOSIT':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitWethDeposit(action.ethAmount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'weth',
              name: 'deposit',
              parameters: {
                ethAmount: action.ethAmount
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_WETH_ALLOWANCE':
          contractFunctions.getWethAllowance(action.owner, action.spender).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'weth',
              name: 'allowance',
              timestamp: Date.now(),
              parameters: {
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