"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callData;

var _lodash = _interopRequireDefault(require("lodash"));

var _contractFunctionActions = require("../../swap/redux/contractFunctionActions");

var _contractFunctionActions2 = require("../../erc20/redux/contractFunctionActions");

var _actions = require("../../erc721/redux/actions");

var _actions2 = require("../../deltaBalances/redux/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callData(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'TRANSACTION_LOG_EVENT':
          var event = action.event,
              parameters = action.parameters;
          var eventName = event.name.toLowerCase();

          if (eventName === 'authorizesender') {
            store.dispatch((0, _contractFunctionActions.fetchSwapSenderAuthorizations)({
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              authorizerAddress: event.values.authorizerAddress.toLowerCase(),
              authorizedSender: event.values.authorizedSender.toLowerCase()
            }));
          }

          if (eventName === 'approval') {
            if (action.namespace === 'ERC721') {
              store.dispatch((0, _actions.fetchERC721GetApprovedOverride)({
                contractAddress: parameters.contractAddress.toLowerCase(),
                tokenId: parameters.tokenId.toLowerCase()
              }));
            } else {
              var parsedEventValues = _lodash.default.mapKeys(event.values, function (val, key) {
                return _lodash.default.trimStart(key, '_');
              });

              store.dispatch((0, _contractFunctionActions2.fetchERC20Allowance)({
                // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
                contractAddress: event.address.toLowerCase(),
                owner: parsedEventValues.owner.toLowerCase(),
                spender: parsedEventValues.spender.toLowerCase()
              })); // put approvals in deltaBalances as well

              store.dispatch((0, _actions2.getTokenAllowancesForConnectedAddress)([event.address.toLowerCase()]));
            }
          }

          break;

        default:
      }

      return next(action);
    };
  };
}