// This file is generated code, edits will be overwritten
const ethers = require('ethers')
const abi = require('../abis/erc721.json')
const constants = require('../constants')

function getERC721Contract(provider, contractAddress) {
  return new ethers.Contract(contractAddress, abi, provider)
}
function getERC721SupportsInterface(contractAddress, interfaceId) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.supportsInterface(interfaceId)
}

function getERC721BalanceOf(contractAddress, owner) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.balanceOf(owner)
}

function getERC721OwnerOf(contractAddress, tokenId) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.ownerOf(tokenId)
}

function submitERC721TransferFrom(contractAddress, from, to, tokenId, signer) {
  const contract = getERC721Contract(signer, contractAddress)
  return contract.transferFrom(from, to, tokenId)
}

function submitERC721Approve(contractAddress, to, tokenId, signer) {
  const contract = getERC721Contract(signer, contractAddress)
  return contract.approve(to, tokenId)
}

function getERC721GetApproved(contractAddress, tokenId) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.getApproved(tokenId)
}

function submitERC721SetApprovalForAll(contractAddress, operator, _approved, signer) {
  const contract = getERC721Contract(signer, contractAddress)
  return contract.setApprovalForAll(operator, _approved)
}

function getERC721IsApprovedForAll(contractAddress, owner, operator) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.isApprovedForAll(owner, operator)
}

function getERC721KittyIndexToApproved(contractAddress, tokenId) {
  const contract = getERC721Contract(constants.httpProvider, contractAddress)
  return contract.kittyIndexToApproved(tokenId)
}

function submitERC721SafeTransferFrom(contractAddress, from, to, tokenId, signer) {
  const contract = getERC721Contract(signer, contractAddress)
  return contract.safeTransferFrom(from, to, tokenId)
}

module.exports = {
  getERC721SupportsInterface,
  getERC721BalanceOf,
  getERC721OwnerOf,
  submitERC721TransferFrom,
  submitERC721Approve,
  getERC721GetApproved,
  submitERC721SetApprovalForAll,
  getERC721IsApprovedForAll,
  getERC721KittyIndexToApproved,
  submitERC721SafeTransferFrom,
}
