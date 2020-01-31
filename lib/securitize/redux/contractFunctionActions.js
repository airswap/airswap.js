"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSecuritizePreTransferCheck = void 0;

// This file is generated code, edits will be overwritten
var fetchSecuritizePreTransferCheck = function fetchSecuritizePreTransferCheck(_ref) {
  var contractAddress = _ref.contractAddress,
      from = _ref.from,
      to = _ref.to,
      value = _ref.value;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        from: from,
        to: to,
        value: value,
        type: 'FETCH_SECURITIZE_PRE_TRANSFER_CHECK',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchSecuritizePreTransferCheck = fetchSecuritizePreTransferCheck;