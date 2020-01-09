"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeGetERC721ApproveTransaction = exports.makeGetIsERC721Approved = exports.makeGetIsERC721Owner = exports.makeGetERC721Owner = void 0;

var _reselect = require("reselect");

var _callDataSelectors = require("./callDataSelectors");

var _contractTransactionSelectors = require("./contractTransactionSelectors");

var _constants = require("../../constants");

var _reducers = require("../../wallet/redux/reducers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var makeGetERC721Owner = (0, _reselect.createSelector)(_callDataSelectors.getERC721OwnerOf, function (values) {
  return function (contractAddress, tokenId) {
    var owner = values.find(function (callData) {
      return callData.name === 'ownerOf' && callData.parameters.contractAddress === contractAddress && callData.parameters.tokenId === tokenId;
    });
    if (owner) return owner.response;
  };
});
exports.makeGetERC721Owner = makeGetERC721Owner;
var makeGetIsERC721Owner = (0, _reselect.createSelector)(_callDataSelectors.getERC721OwnerOf, _reducers.getConnectedWalletAddress, function (values, connectedWalletAddress) {
  return function (contractAddress, tokenId) {
    var owner = values.find(function (callData) {
      return callData.name === 'ownerOf' && callData.parameters.contractAddress === contractAddress && callData.parameters.tokenId === tokenId;
    });
    if (owner) return owner.response.toLowerCase() === connectedWalletAddress.toLowerCase();
    return false;
  };
});
exports.makeGetIsERC721Owner = makeGetIsERC721Owner;
var makeGetIsERC721Approved = (0, _reselect.createSelector)(_callDataSelectors.getERC721GetApproved, _callDataSelectors.getERC721KittyIndexToApproved, function (values, kittyValues) {
  return function (contractAddress, tokenId) {
    var approvedAddress = [].concat(_toConsumableArray(values), _toConsumableArray(kittyValues)).find(function (callData) {
      return (callData.name === 'getApproved' || callData.name === 'kittyIndexToApproved') && callData.parameters.contractAddress === contractAddress && callData.parameters.tokenId === tokenId;
    });
    return approvedAddress && approvedAddress.response.toLowerCase() === _constants.SWAP_CONTRACT_ADDRESS;
  };
});
exports.makeGetIsERC721Approved = makeGetIsERC721Approved;
var makeGetERC721ApproveTransaction = (0, _reselect.createSelector)(_contractTransactionSelectors.getERC721ApproveTransactions, function (values) {
  return function (contractAddress, tokenId) {
    return values.find(function (callData) {
      return callData.name === 'approve' && callData.parameters.contractAddress === contractAddress && callData.parameters.tokenId === tokenId;
    });
  };
});
exports.makeGetERC721ApproveTransaction = makeGetERC721ApproveTransaction;