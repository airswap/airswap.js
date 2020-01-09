"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchedHistoricalEvents = exports.fetchingHistoricalEvents = exports.fetchHistoricalSwapCancelsByMakerAddress = exports.fetchHistoricalSwapFillsByMakerAddress = void 0;

var _constants = require("../../constants");

var _actions = require("../../swap/redux/actions");

var fetchHistoricalSwapFillsByMakerAddress = function fetchHistoricalSwapFillsByMakerAddress(signerWallet) {
  return (0, _actions.trackSwapAllContracts)({
    signerWallet: signerWallet,
    fromBlock: _constants.SWAP_CONTRACT_DEPLOY_BLOCK
  });
};

exports.fetchHistoricalSwapFillsByMakerAddress = fetchHistoricalSwapFillsByMakerAddress;

var fetchHistoricalSwapCancelsByMakerAddress = function fetchHistoricalSwapCancelsByMakerAddress(signerWallet) {
  return (0, _actions.trackSwapCancelAllContracts)({
    signerWallet: signerWallet,
    fromBlock: _constants.SWAP_CONTRACT_DEPLOY_BLOCK
  });
};

exports.fetchHistoricalSwapCancelsByMakerAddress = fetchHistoricalSwapCancelsByMakerAddress;

var fetchingHistoricalEvents = function fetchingHistoricalEvents(_ref) {
  var name = _ref.name,
      namespace = _ref.namespace,
      contract = _ref.contract,
      params = _ref.params;
  return {
    name: name,
    namespace: namespace,
    contract: contract,
    params: params,
    type: 'FETCHING_HISTORICAL_EVENTS'
  };
};

exports.fetchingHistoricalEvents = fetchingHistoricalEvents;

var fetchedHistoricalEvents = function fetchedHistoricalEvents(_ref2, events) {
  var name = _ref2.name,
      namespace = _ref2.namespace,
      contract = _ref2.contract,
      params = _ref2.params;
  return {
    name: name,
    namespace: namespace,
    events: events,
    contract: contract,
    params: params,
    type: 'FETCHED_HISTORICAL_EVENTS'
  };
};

exports.fetchedHistoricalEvents = fetchedHistoricalEvents;