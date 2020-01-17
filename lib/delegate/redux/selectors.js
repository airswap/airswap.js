"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeGetFormattedDelegateRulesByBaseTokenSymbol = exports.makeGetFormattedDelegateRulesByBaseToken = exports.getDelegateProvidedOrders = exports.getConnectedDelegateSenderAuthorization = exports.getFormattedDelegateRules = exports.getConnectedDelegateASTApproval = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _utils = require("../utils");

var _reducers = require("../../tokens/redux/reducers");

var _reducers2 = require("../../deltaBalances/redux/reducers");

var _reducers3 = require("../../wallet/redux/reducers");

var _selectors = require("../../delegateFactory/redux/selectors");

var _eventTrackingSelectors = require("./eventTrackingSelectors");

var _callDataSelectors = require("./callDataSelectors");

var _selectors2 = require("../../erc20/redux/selectors");

var _constants = require("../../constants");

var _selectors3 = require("../../indexer/redux/selectors");

var _eventTrackingSelectors2 = require("../../swap/redux/eventTrackingSelectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDelegateRulesEvents = (0, _reselect.createSelector)(_eventTrackingSelectors.getDelegateSetRuleEvents, function (events) {
  return _lodash.default.sortBy(events.map(function (_ref) {
    var values = _ref.values,
        blockNumber = _ref.blockNumber;
    return _objectSpread({
      blockNumber: blockNumber
    }, values);
  }), 'blockNumber').reverse();
});
var getConnectedDelegateSenderAuthorization = (0, _reselect.createSelector)(_eventTrackingSelectors2.getSwapAuthorizeSenderEvents, _reducers3.getConnectedWalletAddress, _selectors.getConnectedDelegateContractAddress, function (authorizeEvents, walletAddress, delegateContract) {
  var authorizations = authorizeEvents.map(function (_ref2) {
    var values = _ref2.values;
    return values;
  });
  return !!authorizations.find(function (_ref3) {
    var authorizerAddress = _ref3.authorizerAddress,
        authorizedSender = _ref3.authorizedSender;
    return walletAddress === authorizerAddress.toLowerCase() && delegateContract === authorizedSender.toLowerCase();
  });
});
exports.getConnectedDelegateSenderAuthorization = getConnectedDelegateSenderAuthorization;
var getDelegateProvidedOrders = (0, _reselect.createSelector)(_eventTrackingSelectors.getDelegateProvideOrderEvents, function (events) {
  return events.map(function (_ref4) {
    var _ref4$values = _ref4.values,
        owner = _ref4$values.owner,
        tradeWallet = _ref4$values.tradeWallet,
        senderToken = _ref4$values.senderToken,
        signerToken = _ref4$values.signerToken,
        senderAmount = _ref4$values.senderAmount,
        priceCoef = _ref4$values.priceCoef,
        priceExp = _ref4$values.priceExp,
        blockNumber = _ref4.blockNumber;
    return {
      owner: owner,
      tradeWallet: tradeWallet,
      senderToken: senderToken,
      signerToken: signerToken,
      senderAmount: senderAmount,
      priceCoef: priceCoef,
      priceExp: priceExp,
      blockNumber: blockNumber
    };
  });
});
exports.getDelegateProvidedOrders = getDelegateProvidedOrders;
var getFormattedDelegateRules = (0, _reselect.createSelector)(_callDataSelectors.getDelegateRules, getDelegateRulesEvents, _selectors3.getLocatorIntents, getDelegateProvidedOrders, _reducers.getTokensSymbolsByAddress, _reducers2.getConnectedSwapApprovals, getConnectedDelegateSenderAuthorization, _reducers.makeDisplayByToken, function (allRules, rulesEvents, locatorIntents, providedOrders, tokensSymbolsByAddress, connectedSwapApprovals, delegateSenderApproval, displayByToken) {
  if (_lodash.default.isEmpty(tokensSymbolsByAddress)) {
    return [];
  }

  var rules = allRules.filter(function (rule) {
    return !(rule.response.priceCoef === '0' && rule.response.priceExp === '0');
  }); // this is the only deterministic way to tell if a rule has been unset

  return _lodash.default.compact(rules.map(function (val) {
    var _val$parameters = val.parameters,
        delegateAddress = _val$parameters.contractAddress,
        senderToken = _val$parameters.senderToken,
        signerToken = _val$parameters.signerToken;

    var rule = _lodash.default.find(rulesEvents, {
      senderToken: senderToken,
      signerToken: signerToken
    });

    if (!rule) {
      return null;
    }

    var intent = locatorIntents.find(function (i) {
      return delegateAddress === i.identifier && signerToken === i.signerToken && senderToken === i.senderToken;
    });

    if (!intent) {
      return null;
    }

    var score = intent.score;
    var blockNumber = rule.blockNumber,
        maxSenderAmount = rule.maxSenderAmount,
        priceCoef = rule.priceCoef,
        priceExp = rule.priceExp;

    var providedOrdersForRule = _lodash.default.filter(providedOrders || [], function (order) {
      return order.blockNumber >= blockNumber && order.senderToken === senderToken && order.signerToken === signerToken;
    });

    var providedOrdersSenderSum = _lodash.default.reduce(providedOrdersForRule, function (sum, order) {
      return (0, _bignumber.default)(sum).add(order.senderAmount).toString();
    }, '0');

    var providedOrdersSignerSum = _lodash.default.reduce(providedOrdersForRule, function (sum, order) {
      return (0, _bignumber.default)(sum).add(order.signerAmount).toString();
    }, '0');

    var providedOrdersSenderSumDisplayValue = "".concat(displayByToken({
      address: senderToken
    }, providedOrdersSenderSum));
    var providedOrdersSignerSumDisplayValue = "".concat(displayByToken({
      address: signerToken
    }, providedOrdersSignerSum));

    var _getDisplayPriceFromC = (0, _utils.getDisplayPriceFromContractPrice)({
      senderToken: senderToken,
      signerToken: signerToken,
      maxSenderAmount: maxSenderAmount,
      priceCoef: priceCoef,
      priceExp: priceExp
    }),
        senderAmountDisplayValue = _getDisplayPriceFromC.senderAmountDisplayValue,
        signerAmountDisplayValue = _getDisplayPriceFromC.signerAmountDisplayValue,
        priceDisplayValue = _getDisplayPriceFromC.priceDisplayValue;

    var getDisplayPriceByBaseToken = function getDisplayPriceByBaseToken(baseToken) {
      return (0, _utils.getDisplayPriceFromContractPrice)({
        senderToken: senderToken,
        signerToken: signerToken,
        maxSenderAmount: maxSenderAmount,
        priceCoef: priceCoef,
        priceExp: priceExp,
        baseToken: baseToken
      });
    };

    var fillRatio = (0, _bignumber.default)(providedOrdersSenderSum).div(maxSenderAmount).toNumber();
    return {
      delegateAddress: delegateAddress,
      score: score,
      senderAmountDisplayValue: senderAmountDisplayValue,
      signerAmountDisplayValue: signerAmountDisplayValue,
      priceDisplayValue: priceDisplayValue,
      senderToken: senderToken,
      signerToken: signerToken,
      providedOrdersSenderSumDisplayValue: providedOrdersSenderSumDisplayValue,
      providedOrdersSignerSumDisplayValue: providedOrdersSignerSumDisplayValue,
      fillRatio: fillRatio,
      senderSymbol: tokensSymbolsByAddress[senderToken],
      signerSymbol: tokensSymbolsByAddress[signerToken],
      maxSenderAmount: maxSenderAmount,
      providedOrders: providedOrdersForRule,
      approvals: {
        tokenSwapApproval: _lodash.default.get(connectedSwapApprovals, senderToken),
        delegateSenderApproval: delegateSenderApproval
      },
      getDisplayPriceByBaseToken: getDisplayPriceByBaseToken
    };
  }));
});
exports.getFormattedDelegateRules = getFormattedDelegateRules;
var makeGetFormattedDelegateRulesByBaseToken = (0, _reselect.createSelector)(getFormattedDelegateRules, function (formattedRules) {
  return function (baseToken) {
    return formattedRules.map(function (rule) {
      return _objectSpread({}, rule, rule.getDisplayPriceByBaseToken(baseToken));
    });
  };
});
exports.makeGetFormattedDelegateRulesByBaseToken = makeGetFormattedDelegateRulesByBaseToken;
var makeGetFormattedDelegateRulesByBaseTokenSymbol = (0, _reselect.createSelector)(getFormattedDelegateRules, _reducers.getTokenAddressesBySymbol, function (formattedRules, tokenAddressesBySymbol) {
  return function (baseTokenSymbol) {
    return formattedRules.map(function (rule) {
      return _objectSpread({}, rule, rule.getDisplayPriceByBaseToken(tokenAddressesBySymbol[baseTokenSymbol]));
    });
  };
});
exports.makeGetFormattedDelegateRulesByBaseTokenSymbol = makeGetFormattedDelegateRulesByBaseTokenSymbol;
var getConnectedDelegateASTApproval = (0, _reselect.createSelector)(_selectors2.getConnectedERC20Approvals, _selectors.getConnectedDelegateContractAddress, function (approvals, delegateAddress) {
  return _lodash.default.get(approvals, "".concat(delegateAddress, ".").concat(_constants.AST_CONTRACT_ADDRESS));
});
exports.getConnectedDelegateASTApproval = getConnectedDelegateASTApproval;