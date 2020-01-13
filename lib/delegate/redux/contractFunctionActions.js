"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDelegateGetMaxQuote = exports.fetchDelegateGetSenderSideQuote = exports.fetchDelegateGetSignerSideQuote = exports.submitDelegateSetTradeWallet = exports.submitDelegateProvideOrder = exports.submitDelegateUnsetRuleAndIntent = exports.submitDelegateSetRuleAndIntent = exports.submitDelegateUnsetRule = exports.submitDelegateSetRule = exports.submitDelegateTransferOwnership = exports.fetchDelegateTradeWallet = exports.fetchDelegateSwapContract = exports.fetchDelegateRules = exports.submitDelegateRenounceOwnership = exports.fetchDelegateProtocol = exports.fetchDelegateOwner = exports.fetchDelegateIsOwner = exports.fetchDelegateIndexer = void 0;

// This file is generated code, edits will be overwritten
var fetchDelegateIndexer = function fetchDelegateIndexer(_ref) {
  var contractAddress = _ref.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_INDEXER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateIndexer = fetchDelegateIndexer;

var fetchDelegateIsOwner = function fetchDelegateIsOwner(_ref2) {
  var contractAddress = _ref2.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_IS_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateIsOwner = fetchDelegateIsOwner;

var fetchDelegateOwner = function fetchDelegateOwner(_ref3) {
  var contractAddress = _ref3.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_OWNER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateOwner = fetchDelegateOwner;

var fetchDelegateProtocol = function fetchDelegateProtocol(_ref4) {
  var contractAddress = _ref4.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_PROTOCOL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateProtocol = fetchDelegateProtocol;

var submitDelegateRenounceOwnership = function submitDelegateRenounceOwnership(_ref5) {
  var contractAddress = _ref5.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'SUBMIT_DELEGATE_RENOUNCE_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateRenounceOwnership = submitDelegateRenounceOwnership;

var fetchDelegateRules = function fetchDelegateRules(_ref6) {
  var contractAddress = _ref6.contractAddress,
      senderToken = _ref6.senderToken,
      signerToken = _ref6.signerToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        type: 'FETCH_DELEGATE_RULES',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateRules = fetchDelegateRules;

var fetchDelegateSwapContract = function fetchDelegateSwapContract(_ref7) {
  var contractAddress = _ref7.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_SWAP_CONTRACT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateSwapContract = fetchDelegateSwapContract;

var fetchDelegateTradeWallet = function fetchDelegateTradeWallet(_ref8) {
  var contractAddress = _ref8.contractAddress;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        type: 'FETCH_DELEGATE_TRADE_WALLET',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateTradeWallet = fetchDelegateTradeWallet;

var submitDelegateTransferOwnership = function submitDelegateTransferOwnership(_ref9) {
  var contractAddress = _ref9.contractAddress,
      newOwner = _ref9.newOwner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        newOwner: newOwner,
        type: 'SUBMIT_DELEGATE_TRANSFER_OWNERSHIP',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateTransferOwnership = submitDelegateTransferOwnership;

var submitDelegateSetRule = function submitDelegateSetRule(_ref10) {
  var contractAddress = _ref10.contractAddress,
      senderToken = _ref10.senderToken,
      signerToken = _ref10.signerToken,
      maxSenderAmount = _ref10.maxSenderAmount,
      priceCoef = _ref10.priceCoef,
      priceExp = _ref10.priceExp;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        maxSenderAmount: maxSenderAmount,
        priceCoef: priceCoef,
        priceExp: priceExp,
        type: 'SUBMIT_DELEGATE_SET_RULE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateSetRule = submitDelegateSetRule;

var submitDelegateUnsetRule = function submitDelegateUnsetRule(_ref11) {
  var contractAddress = _ref11.contractAddress,
      senderToken = _ref11.senderToken,
      signerToken = _ref11.signerToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        type: 'SUBMIT_DELEGATE_UNSET_RULE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateUnsetRule = submitDelegateUnsetRule;

var submitDelegateSetRuleAndIntent = function submitDelegateSetRuleAndIntent(_ref12) {
  var contractAddress = _ref12.contractAddress,
      senderToken = _ref12.senderToken,
      signerToken = _ref12.signerToken,
      rule = _ref12.rule,
      newStakeAmount = _ref12.newStakeAmount;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        rule: rule,
        newStakeAmount: newStakeAmount,
        type: 'SUBMIT_DELEGATE_SET_RULE_AND_INTENT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateSetRuleAndIntent = submitDelegateSetRuleAndIntent;

var submitDelegateUnsetRuleAndIntent = function submitDelegateUnsetRuleAndIntent(_ref13) {
  var contractAddress = _ref13.contractAddress,
      senderToken = _ref13.senderToken,
      signerToken = _ref13.signerToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        type: 'SUBMIT_DELEGATE_UNSET_RULE_AND_INTENT',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateUnsetRuleAndIntent = submitDelegateUnsetRuleAndIntent;

var submitDelegateProvideOrder = function submitDelegateProvideOrder(_ref14) {
  var contractAddress = _ref14.contractAddress,
      order = _ref14.order;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        order: order,
        type: 'SUBMIT_DELEGATE_PROVIDE_ORDER',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateProvideOrder = submitDelegateProvideOrder;

var submitDelegateSetTradeWallet = function submitDelegateSetTradeWallet(_ref15) {
  var contractAddress = _ref15.contractAddress,
      newTradeWallet = _ref15.newTradeWallet;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        newTradeWallet: newTradeWallet,
        type: 'SUBMIT_DELEGATE_SET_TRADE_WALLET',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitDelegateSetTradeWallet = submitDelegateSetTradeWallet;

var fetchDelegateGetSignerSideQuote = function fetchDelegateGetSignerSideQuote(_ref16) {
  var contractAddress = _ref16.contractAddress,
      senderAmount = _ref16.senderAmount,
      senderToken = _ref16.senderToken,
      signerToken = _ref16.signerToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderAmount: senderAmount,
        senderToken: senderToken,
        signerToken: signerToken,
        type: 'FETCH_DELEGATE_GET_SIGNER_SIDE_QUOTE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateGetSignerSideQuote = fetchDelegateGetSignerSideQuote;

var fetchDelegateGetSenderSideQuote = function fetchDelegateGetSenderSideQuote(_ref17) {
  var contractAddress = _ref17.contractAddress,
      signerAmount = _ref17.signerAmount,
      signerToken = _ref17.signerToken,
      senderToken = _ref17.senderToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        signerAmount: signerAmount,
        signerToken: signerToken,
        senderToken: senderToken,
        type: 'FETCH_DELEGATE_GET_SENDER_SIDE_QUOTE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateGetSenderSideQuote = fetchDelegateGetSenderSideQuote;

var fetchDelegateGetMaxQuote = function fetchDelegateGetMaxQuote(_ref18) {
  var contractAddress = _ref18.contractAddress,
      senderToken = _ref18.senderToken,
      signerToken = _ref18.signerToken;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        senderToken: senderToken,
        signerToken: signerToken,
        type: 'FETCH_DELEGATE_GET_MAX_QUOTE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchDelegateGetMaxQuote = fetchDelegateGetMaxQuote;