"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/erc721.json');

var constants = require('../constants');

function getERC721Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function getERC721SupportsInterface(contractAddress, interfaceId) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.supportsInterface(interfaceId);
}

function getERC721BalanceOf(contractAddress, owner) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.balanceOf(owner);
}

function getERC721OwnerOf(contractAddress, tokenId) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.ownerOf(tokenId);
}

function submitERC721TransferFrom(contractAddress, from, to, tokenId, signer) {
  var contract = getERC721Contract(signer, contractAddress);
  return contract.transferFrom(from, to, tokenId);
}

function submitERC721Approve(contractAddress, to, tokenId, signer) {
  var contract = getERC721Contract(signer, contractAddress);
  return contract.approve(to, tokenId);
}

function getERC721GetApproved(contractAddress, tokenId) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.getApproved(tokenId);
}

function submitERC721SetApprovalForAll(contractAddress, operator, _approved, signer) {
  var contract = getERC721Contract(signer, contractAddress);
  return contract.setApprovalForAll(operator, _approved);
}

function getERC721IsApprovedForAll(contractAddress, owner, operator) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.isApprovedForAll(owner, operator);
}

function getERC721KittyIndexToApproved(contractAddress, tokenId) {
  var contract = getERC721Contract(constants.httpProvider, contractAddress);
  return contract.kittyIndexToApproved(tokenId);
}

function submitERC721SafeTransferFrom(contractAddress, from, to, tokenId, signer) {
  var contract = getERC721Contract(signer, contractAddress);
  return contract.safeTransferFrom(from, to, tokenId);
}

module.exports = {
  getERC721SupportsInterface: getERC721SupportsInterface,
  getERC721BalanceOf: getERC721BalanceOf,
  getERC721OwnerOf: getERC721OwnerOf,
  submitERC721TransferFrom: submitERC721TransferFrom,
  submitERC721Approve: submitERC721Approve,
  getERC721GetApproved: getERC721GetApproved,
  submitERC721SetApprovalForAll: submitERC721SetApprovalForAll,
  getERC721IsApprovedForAll: getERC721IsApprovedForAll,
  getERC721KittyIndexToApproved: getERC721KittyIndexToApproved,
  submitERC721SafeTransferFrom: submitERC721SafeTransferFrom
};