"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegateMiddleware;

var _waitForState = require("../../utils/redux/waitForState");

var _selectors = require("../../delegateFactory/redux/selectors");

var _eventTrackingActions = require("../../swap/redux/eventTrackingActions");

var _reducers = require("../../wallet/redux/reducers");

var _contractFunctionActions = require("../../swap/redux/contractFunctionActions");

var _eventTrackingActions2 = require("./eventTrackingActions");

var _contractFunctionActions2 = require("./contractFunctionActions");

var _constants = require("../../constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function waitForDelegateContract(_x) {
  return _waitForDelegateContract.apply(this, arguments);
}

function _waitForDelegateContract() {
  _waitForDelegateContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", store.dispatch((0, _waitForState.waitForState)({
              selector: function selector(state) {
                return !!(0, _selectors.getConnectedDelegateContractAddress)(state);
              },
              result: true
            })));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _waitForDelegateContract.apply(this, arguments);
}

function setUpDelegateListeners(_x2) {
  return _setUpDelegateListeners.apply(this, arguments);
}

function _setUpDelegateListeners() {
  _setUpDelegateListeners = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(store) {
    var state, walletAddress, delegateAddress;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return waitForDelegateContract(store);

          case 2:
            // as soon as a delegate contract is found for the connected address, invoke the following listeners:
            state = store.getState();
            walletAddress = (0, _reducers.getConnectedWalletAddress)(state);
            delegateAddress = (0, _selectors.getConnectedDelegateContractAddress)(state); // listen to swap sender authorizations for the delegate and update the state accordingly

            store.dispatch((0, _eventTrackingActions.trackSwapAuthorizeSender)({
              authorizerAddress: walletAddress,
              authorizedSender: delegateAddress,
              fromBlock: _constants.DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
              callback: function callback() {
                return store.dispatch((0, _contractFunctionActions.fetchSwapSenderAuthorizations)({
                  authorizerAddress: walletAddress,
                  authorizedSender: delegateAddress
                }));
              }
            })); // listen to rule creation on the delegate and update the contract accordingly

            store.dispatch((0, _eventTrackingActions2.trackDelegateSetRule)({
              owner: walletAddress,
              fromBlock: _constants.DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
              callback: function callback(events) {
                events.map(function (_ref) {
                  var _ref$values = _ref.values,
                      senderToken = _ref$values.senderToken,
                      signerToken = _ref$values.signerToken;
                  store.dispatch((0, _contractFunctionActions2.fetchDelegateRules)({
                    senderToken: senderToken,
                    signerToken: signerToken,
                    contractAddress: delegateAddress
                  }));
                });
              }
            }));
            store.dispatch((0, _eventTrackingActions2.trackDelegateProvideOrder)({
              owner: walletAddress,
              fromBlock: _constants.DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK
            })); // listen to rule delegation on the delegate and update the contract accordingly

            store.dispatch((0, _eventTrackingActions2.trackDelegateUnsetRule)({
              owner: walletAddress,
              fromBlock: _constants.DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
              callback: function callback(events) {
                return events.map(function (_ref2) {
                  var _ref2$values = _ref2.values,
                      senderToken = _ref2$values.senderToken,
                      signerToken = _ref2$values.signerToken;
                  store.dispatch((0, _contractFunctionActions2.fetchDelegateRules)({
                    senderToken: senderToken,
                    signerToken: signerToken,
                    contractAddress: delegateAddress
                  }));
                });
              }
            }));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _setUpDelegateListeners.apply(this, arguments);
}

function delegateMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'REDUX_STORAGE_LOAD':
          next(action);

          if (_constants.IS_INSTANT) {
            setUpDelegateListeners(store);
          }

          break;

        default:
          next(action);
      }
    };
  };
}