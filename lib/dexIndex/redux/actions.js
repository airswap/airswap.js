"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endDexIndexQuery = exports.startDexIndexQuery = exports.gotDexIndexResponse = exports.fetchSetDexIndexPrices = void 0;

var fetchSetDexIndexPrices = function fetchSetDexIndexPrices(stackId) {
  return {
    type: 'GET_DEXINDEX_PRICES',
    stackId: stackId
  };
};

exports.fetchSetDexIndexPrices = fetchSetDexIndexPrices;

var gotDexIndexResponse = function gotDexIndexResponse(_ref) {
  var stackId = _ref.stackId,
      dexIndexResponse = _ref.dexIndexResponse;
  return {
    type: 'GOT_CHECKOUT_FRAME_DEXINDEX_RESPONSE',
    dexIndexResponse: dexIndexResponse,
    stackId: stackId
  };
};

exports.gotDexIndexResponse = gotDexIndexResponse;

var startDexIndexQuery = function startDexIndexQuery(stackId) {
  return {
    type: 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING',
    isDexIndexQuerying: true,
    stackId: stackId
  };
};

exports.startDexIndexQuery = startDexIndexQuery;

var endDexIndexQuery = function endDexIndexQuery(stackId) {
  return {
    type: 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING',
    isDexIndexQuerying: false,
    stackId: stackId
  };
};

exports.endDexIndexQuery = endDexIndexQuery;