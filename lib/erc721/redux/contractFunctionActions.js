"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitERC721SafeTransferFrom = exports.fetchERC721KittyIndexToApproved = exports.fetchERC721IsApprovedForAll = exports.submitERC721SetApprovalForAll = exports.fetchERC721GetApproved = exports.submitERC721Approve = exports.submitERC721TransferFrom = exports.fetchERC721OwnerOf = exports.fetchERC721BalanceOf = exports.fetchERC721SupportsInterface = void 0;

// This file is generated code, edits will be overwritten
var fetchERC721SupportsInterface = function fetchERC721SupportsInterface(_ref) {
  var contractAddress = _ref.contractAddress,
      interfaceId = _ref.interfaceId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        interfaceId: interfaceId,
        type: 'FETCH_ERC_721_SUPPORTS_INTERFACE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721SupportsInterface = fetchERC721SupportsInterface;

var fetchERC721BalanceOf = function fetchERC721BalanceOf(_ref2) {
  var contractAddress = _ref2.contractAddress,
      owner = _ref2.owner;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        owner: owner,
        type: 'FETCH_ERC_721_BALANCE_OF',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721BalanceOf = fetchERC721BalanceOf;

var fetchERC721OwnerOf = function fetchERC721OwnerOf(_ref3) {
  var contractAddress = _ref3.contractAddress,
      tokenId = _ref3.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        tokenId: tokenId,
        type: 'FETCH_ERC_721_OWNER_OF',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721OwnerOf = fetchERC721OwnerOf;

var submitERC721TransferFrom = function submitERC721TransferFrom(_ref4) {
  var contractAddress = _ref4.contractAddress,
      from = _ref4.from,
      to = _ref4.to,
      tokenId = _ref4.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        from: from,
        to: to,
        tokenId: tokenId,
        type: 'SUBMIT_ERC_721_TRANSFER_FROM',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC721TransferFrom = submitERC721TransferFrom;

var submitERC721Approve = function submitERC721Approve(_ref5) {
  var contractAddress = _ref5.contractAddress,
      to = _ref5.to,
      tokenId = _ref5.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        to: to,
        tokenId: tokenId,
        type: 'SUBMIT_ERC_721_APPROVE',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC721Approve = submitERC721Approve;

var fetchERC721GetApproved = function fetchERC721GetApproved(_ref6) {
  var contractAddress = _ref6.contractAddress,
      tokenId = _ref6.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        tokenId: tokenId,
        type: 'FETCH_ERC_721_GET_APPROVED',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721GetApproved = fetchERC721GetApproved;

var submitERC721SetApprovalForAll = function submitERC721SetApprovalForAll(_ref7) {
  var contractAddress = _ref7.contractAddress,
      operator = _ref7.operator,
      _approved = _ref7._approved;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        operator: operator,
        _approved: _approved,
        type: 'SUBMIT_ERC_721_SET_APPROVAL_FOR_ALL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC721SetApprovalForAll = submitERC721SetApprovalForAll;

var fetchERC721IsApprovedForAll = function fetchERC721IsApprovedForAll(_ref8) {
  var contractAddress = _ref8.contractAddress,
      owner = _ref8.owner,
      operator = _ref8.operator;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        owner: owner,
        operator: operator,
        type: 'FETCH_ERC_721_IS_APPROVED_FOR_ALL',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721IsApprovedForAll = fetchERC721IsApprovedForAll;

var fetchERC721KittyIndexToApproved = function fetchERC721KittyIndexToApproved(_ref9) {
  var contractAddress = _ref9.contractAddress,
      tokenId = _ref9.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        tokenId: tokenId,
        type: 'FETCH_ERC_721_KITTY_INDEX_TO_APPROVED',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.fetchERC721KittyIndexToApproved = fetchERC721KittyIndexToApproved;

var submitERC721SafeTransferFrom = function submitERC721SafeTransferFrom(_ref10) {
  var contractAddress = _ref10.contractAddress,
      from = _ref10.from,
      to = _ref10.to,
      tokenId = _ref10.tokenId;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        contractAddress: contractAddress,
        from: from,
        to: to,
        tokenId: tokenId,
        type: 'SUBMIT_ERC_721_SAFE_TRANSFER_FROM',
        resolve: resolve,
        reject: reject
      });
    });
  };
};

exports.submitERC721SafeTransferFrom = submitERC721SafeTransferFrom;