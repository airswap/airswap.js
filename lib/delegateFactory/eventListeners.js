"use strict";

// This file is generated code, edits will be overwritten
var eventTracker = require('../events/websocketEventTracker');

var abi = require('../abis/delegateFactory.json');

var constants = require('../constants');

var trackDelegateFactoryCreateDelegate = function trackDelegateFactoryCreateDelegate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      delegateContract = _ref.delegateContract,
      delegateContractOwner = _ref.delegateContractOwner,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount,
      parser = _ref.parser,
      onFetchingHistoricalEvents = _ref.onFetchingHistoricalEvents,
      onFetchedHistoricalEvents = _ref.onFetchedHistoricalEvents;

  return eventTracker.trackEvent({
    callback: callback,
    contract: constants.DELEGATE_FACTORY_CONTRACT_ADDRESS,
    abi: abi,
    name: 'CreateDelegate',
    params: {
      delegateContract: delegateContract,
      delegateContractOwner: delegateContractOwner
    },
    fromBlock: fromBlock,
    backFillBlockCount: backFillBlockCount,
    topic: '0xff8beab89e8c26a642d622a3afc4cddcb2f06b35a39b280a98b1f7a465080115',
    namespace: 'delegateFactory',
    parser: parser,
    onFetchingHistoricalEvents: onFetchingHistoricalEvents,
    onFetchedHistoricalEvents: onFetchedHistoricalEvents
  });
};

module.exports = {
  trackDelegateFactoryCreateDelegate: trackDelegateFactoryCreateDelegate
};