"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizeConnectedDelegateSender = exports.submitConnectedDelegateSetRule = exports.submitConnectedDelegateUnsetRuleAndIntent = exports.submitConnectedDelegateSetRuleAndIntent = exports.exampleSetRule = exports.approveDelegateTransferAST = exports.exampleSetRuleAndIntent = void 0;

var _contractFunctionActions = require("./contractFunctionActions");

var _selectors = require("../../delegateFactory/redux/selectors");

var _contractFunctionActions2 = require("../../swap/redux/contractFunctionActions");

var _utils = require("../utils");

var _contractFunctionActions3 = require("../../erc20/redux/contractFunctionActions");

var _constants = require("../../constants");

var _waitForState = require("../../utils/redux/waitForState");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// EXAMPLE ACTION: sell 25 AST at 0.005 AST/WETH
// TODO: These example actions should be removed after trade-bot is successfully hooked up
var exampleSetRuleAndIntent = function exampleSetRuleAndIntent() {
  return function (dispatch) {
    dispatch(submitConnectedDelegateSetRuleAndIntent({
      signerToken: '0x0bd3a1c841211bbb989b35494f661e52e9071fe9',
      // DAI
      senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
      rule: (0, _utils.getContractPriceFromDisplayPrice)({
        signerToken: '0x0bd3a1c841211bbb989b35494f661e52e9071fe9',
        senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        senderAmountDisplayValue: '1',
        priceDisplayValue: '2'
      }),
      newStakeAmount: '0'
    })); // dispatch(
    //   submitConnectedDelegateSetRuleAndIntent({
    //     senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8', // DAI
    //     signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
    //     rule: getContractPriceFromDisplayPrice({
    //       senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
    //       signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
    //       senderAmountDisplayValue: '1',
    //       priceDisplayValue: '1',
    //     }),
    //     newStakeAmount: '0',
    //   }),
    // )
  };
};

exports.exampleSetRuleAndIntent = exampleSetRuleAndIntent;

var approveDelegateTransferAST = function approveDelegateTransferAST() {
  return function (dispatch, getState) {
    var delegateAddress = (0, _selectors.getConnectedDelegateContractAddress)(getState());
    dispatch((0, _contractFunctionActions3.submitERC20Approve)({
      contractAddress: _constants.AST_CONTRACT_ADDRESS,
      spender: delegateAddress,
      value: _constants.TOKEN_APPROVAL_AMOUNT
    }));
  };
};

exports.approveDelegateTransferAST = approveDelegateTransferAST;

var exampleSetRule = function exampleSetRule() {
  return submitConnectedDelegateSetRule((0, _utils.getContractPriceFromDisplayPrice)({
    senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
    signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
    senderAmountDisplayValue: '25',
    priceDisplayValue: '0.005'
  }));
};

exports.exampleSetRule = exampleSetRule;

var submitConnectedDelegateSetRuleAndIntent = function submitConnectedDelegateSetRuleAndIntent(_ref) {
  var senderToken = _ref.senderToken,
      signerToken = _ref.signerToken,
      rule = _ref.rule,
      newStakeAmount = _ref.newStakeAmount;
  return function (dispatch, getState) {
    var contractAddress = (0, _selectors.getConnectedDelegateContractAddress)(getState());
    dispatch((0, _contractFunctionActions.submitDelegateSetRuleAndIntent)({
      contractAddress: contractAddress,
      senderToken: senderToken,
      signerToken: signerToken,
      rule: rule,
      newStakeAmount: newStakeAmount
    }));
  };
};

exports.submitConnectedDelegateSetRuleAndIntent = submitConnectedDelegateSetRuleAndIntent;

var submitConnectedDelegateUnsetRuleAndIntent = function submitConnectedDelegateUnsetRuleAndIntent(_ref2) {
  var senderToken = _ref2.senderToken,
      signerToken = _ref2.signerToken;
  return function (dispatch, getState) {
    var contractAddress = (0, _selectors.getConnectedDelegateContractAddress)(getState());
    dispatch((0, _contractFunctionActions.submitDelegateUnsetRuleAndIntent)({
      contractAddress: contractAddress,
      senderToken: senderToken,
      signerToken: signerToken
    }));
  };
};

exports.submitConnectedDelegateUnsetRuleAndIntent = submitConnectedDelegateUnsetRuleAndIntent;

var submitConnectedDelegateSetRule = function submitConnectedDelegateSetRule(_ref3) {
  var senderToken = _ref3.senderToken,
      signerToken = _ref3.signerToken,
      maxSenderAmount = _ref3.maxSenderAmount,
      priceCoef = _ref3.priceCoef,
      priceExp = _ref3.priceExp;
  return function (dispatch, getState) {
    var contractAddress = (0, _selectors.getConnectedDelegateContractAddress)(getState());
    dispatch((0, _contractFunctionActions.submitDelegateSetRule)({
      contractAddress: contractAddress,
      senderToken: senderToken,
      signerToken: signerToken,
      maxSenderAmount: maxSenderAmount,
      priceCoef: priceCoef,
      priceExp: priceExp
    }));
  };
};

exports.submitConnectedDelegateSetRule = submitConnectedDelegateSetRule;

var authorizeConnectedDelegateSender = function authorizeConnectedDelegateSender() {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var contractAddress;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dispatch((0, _waitForState.waitForState)({
                  selector: function selector(state) {
                    return !!(0, _selectors.getConnectedDelegateContractAddress)(state);
                  },
                  result: true
                }));

              case 2:
                contractAddress = (0, _selectors.getConnectedDelegateContractAddress)(getState());
                dispatch((0, _contractFunctionActions2.submitSwapAuthorizeSender)({
                  authorizedSender: contractAddress
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

exports.authorizeConnectedDelegateSender = authorizeConnectedDelegateSender;