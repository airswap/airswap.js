"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDelegateIndex = void 0;

var _contractFunctionActions = require("./contractFunctionActions");

var _constants = require("../constants");

var createDelegateIndex = function createDelegateIndex(_ref) {
  var signerToken = _ref.signerToken,
      senderToken = _ref.senderToken;
  return (0, _contractFunctionActions.submitIndexerCreateIndex)({
    signerToken: signerToken,
    senderToken: senderToken,
    protocol: _constants.INDEX_TYPES_LOOKUP.contract
  });
};

exports.createDelegateIndex = createDelegateIndex;