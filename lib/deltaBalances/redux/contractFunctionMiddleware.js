"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deltaBalancesMiddleware;

var contractFunctions = _interopRequireWildcard(require("../contractFunctions"));

var _resolveBigNumbers = _interopRequireDefault(require("../../utils/resolveBigNumbers"));

var _actions = require("../../wallet/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// This file is generated code, edits will be overwritten
function deltaBalancesMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FETCH_DELTA_BALANCES_ALL_BALANCES_FOR_MANY_ACCOUNTS':
          contractFunctions.getDeltaBalancesAllBalancesForManyAccounts(action.users, action.tokens).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'allBalancesForManyAccounts',
              timestamp: Date.now(),
              parameters: {
                users: action.users,
                tokens: action.tokens
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELTA_BALANCES_TOKEN_BALANCE':
          contractFunctions.getDeltaBalancesTokenBalance(action.user, action.token).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'tokenBalance',
              timestamp: Date.now(),
              parameters: {
                user: action.user,
                token: action.token
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_DELTA_BALANCES_DESTRUCT':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitDeltaBalancesDestruct(signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'deltaBalances',
              name: 'destruct'
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_DELTA_BALANCES_WALLET_ALLOWANCES':
          contractFunctions.getDeltaBalancesWalletAllowances(action.user, action.spender, action.tokens).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'walletAllowances',
              timestamp: Date.now(),
              parameters: {
                user: action.user,
                spender: action.spender,
                tokens: action.tokens
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_DELTA_BALANCES_WITHDRAW':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitDeltaBalancesWithdraw(signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'deltaBalances',
              name: 'withdraw'
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_DELTA_BALANCES_WALLET_BALANCES':
          contractFunctions.getDeltaBalancesWalletBalances(action.user, action.tokens).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'walletBalances',
              timestamp: Date.now(),
              parameters: {
                user: action.user,
                tokens: action.tokens
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELTA_BALANCES_TOKEN_ALLOWANCE':
          contractFunctions.getDeltaBalancesTokenAllowance(action.user, action.spender, action.token).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'tokenAllowance',
              timestamp: Date.now(),
              parameters: {
                user: action.user,
                spender: action.spender,
                token: action.token
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_DELTA_BALANCES_WITHDRAW_TOKEN':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitDeltaBalancesWithdrawToken(action.token, action.amount, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'deltaBalances',
              name: 'withdrawToken',
              parameters: {
                token: action.token,
                amount: action.amount
              }
            });
            action.resolve(id);
          });
          break;

        case 'FETCH_DELTA_BALANCES_ALL_WET_HBALANCES':
          contractFunctions.getDeltaBalancesAllWETHbalances(action.wethAddress, action.users).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'allWETHbalances',
              timestamp: Date.now(),
              parameters: {
                wethAddress: action.wethAddress,
                users: action.users
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELTA_BALANCES_ALL_ALLOWANCES_FOR_MANY_ACCOUNTS':
          contractFunctions.getDeltaBalancesAllAllowancesForManyAccounts(action.users, action.spender, action.tokens).then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'allAllowancesForManyAccounts',
              timestamp: Date.now(),
              parameters: {
                users: action.users,
                spender: action.spender,
                tokens: action.tokens
              }
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'FETCH_DELTA_BALANCES_ADMIN':
          contractFunctions.getDeltaBalancesAdmin().then(function (response) {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: (0, _resolveBigNumbers.default)(response),
              namespace: 'deltaBalances',
              name: 'admin',
              timestamp: Date.now()
            });
            action.resolve(response);
          }).catch(action.reject);
          break;

        case 'SUBMIT_DELTA_BALANCES_CONSTRUCTOR':
          store.dispatch((0, _actions.getSigner)()).then(function (signer) {
            var contractFunctionPromise = contractFunctions.submitDeltaBalancesConstructor(action._deployer, signer);
            var id = Date.now().toString();
            store.dispatch({
              type: 'ADD_TRACKED_TRANSACTION',
              contractFunctionPromise: contractFunctionPromise,
              id: id,
              namespace: 'deltaBalances',
              name: 'constructor',
              parameters: {
                _deployer: action._deployer
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