"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approveERC721 = exports.fetchERC721GetApprovedOverride = void 0;

var _constants = require("../../constants");

var _contractFunctionActions = require("./contractFunctionActions");

var _constants2 = require("../constants");

var fetchERC721GetApprovedOverride = function fetchERC721GetApprovedOverride(_ref) {
  var contractAddress = _ref.contractAddress,
      tokenId = _ref.tokenId;
  return contractAddress.toLowerCase() === _constants2.CRYPTO_KITTIES_CONTRACT_ADDRESS ? (0, _contractFunctionActions.fetchERC721KittyIndexToApproved)({
    contractAddress: contractAddress,
    tokenId: tokenId
  }) : (0, _contractFunctionActions.fetchERC721GetApproved)({
    contractAddress: contractAddress,
    tokenId: tokenId
  });
};

exports.fetchERC721GetApprovedOverride = fetchERC721GetApprovedOverride;

var approveERC721 = function approveERC721(tokenAddress, tokenId) {
  return (0, _contractFunctionActions.submitERC721Approve)({
    contractAddress: tokenAddress,
    tokenId: tokenId,
    to: _constants.SWAP_CONTRACT_ADDRESS
  });
};

exports.approveERC721 = approveERC721;