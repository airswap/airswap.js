"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectedDelegateContractAddress = exports.getConnectedDelegateContract = exports.getDelegateContractAddresses = exports.getDelegates = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _eventTrackingSelectors = require("./eventTrackingSelectors");

var _reducers = require("../../wallet/redux/reducers");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDelegates = (0, _reselect.createSelector)(_eventTrackingSelectors.getDelegateFactoryCreateDelegateEvents, function (events) {
  var delegates = events.map(function (event) {
    var values = event.values,
        blockNumber = event.blockNumber;

    var _$mapValues = _lodash.default.mapValues(values, function (address) {
      return address.toLowerCase();
    }),
        delegateContract = _$mapValues.delegateContract,
        swapContract = _$mapValues.swapContract,
        indexerContract = _$mapValues.indexerContract,
        delegateContractOwner = _$mapValues.delegateContractOwner,
        delegateTradeWallet = _$mapValues.delegateTradeWallet;

    return {
      delegateContract: delegateContract,
      swapContract: swapContract,
      indexerContract: indexerContract,
      delegateContractOwner: delegateContractOwner,
      delegateTradeWallet: delegateTradeWallet,
      blockNumber: blockNumber
    };
  }).filter(function (_ref) {
    var swapContract = _ref.swapContract,
        indexerContract = _ref.indexerContract;
    return swapContract === _constants.SWAP_CONTRACT_ADDRESS && indexerContract === _constants.INDEXER_CONTRACT_ADDRESS;
  });
  return _lodash.default.sortBy(delegates, 'blockNumber') // sorts from lowest blockNumber to highest
  .reverse(); // sorts from highest blockNumber to lowest
});
exports.getDelegates = getDelegates;
var getDelegateContractAddresses = (0, _reselect.createSelector)(getDelegates, function (delegates) {
  return delegates.map(function (_ref2) {
    var delegateContract = _ref2.delegateContract;
    return delegateContract;
  });
});
exports.getDelegateContractAddresses = getDelegateContractAddresses;
var getConnectedDelegateContract = (0, _reselect.createSelector)(getDelegates, _reducers.getConnectedWalletAddress, function (delegates, walletAddress) {
  return delegates.find( // find returns the first matching value, which means it will return the most recently deployed delegate contract
  // since the most recently deployed contract has the highest block number
  function (_ref3) {
    var delegateContractOwner = _ref3.delegateContractOwner,
        delegateTradeWallet = _ref3.delegateTradeWallet;
    return delegateContractOwner === walletAddress && delegateTradeWallet === walletAddress;
  });
});
exports.getConnectedDelegateContract = getConnectedDelegateContract;
var getConnectedDelegateContractAddress = (0, _reselect.createSelector)(getConnectedDelegateContract, function (delegate) {
  return _lodash.default.get(delegate, 'delegateContract');
});
exports.getConnectedDelegateContractAddress = getConnectedDelegateContractAddress;