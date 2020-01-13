"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackDelegateFactoryCreateDelegate = void 0;

// This file is generated code, edits will be overwritten
var abi = require('../../abis/delegateFactory.json');

var constants = require('../../constants');

var trackDelegateFactoryCreateDelegate = function trackDelegateFactoryCreateDelegate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      callback = _ref.callback,
      delegateContract = _ref.delegateContract,
      delegateContractOwner = _ref.delegateContractOwner,
      fromBlock = _ref.fromBlock,
      backFillBlockCount = _ref.backFillBlockCount;

  return {
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
    type: 'TRACK_EVENT',
    namespace: 'delegateFactory'
  };
};

exports.trackDelegateFactoryCreateDelegate = trackDelegateFactoryCreateDelegate;