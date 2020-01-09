"use strict";

// This file is generated code, edits will be overwritten
var ethers = require('ethers');

var abi = require('../abis/swap.json');

var constants = require('../constants');

function getSwapContract(provider) {
  return new ethers.Contract(constants.SWAP_CONTRACT_ADDRESS, abi, provider);
}

function getSwapRegistry() {
  var contract = getSwapContract(constants.httpProvider);
  return contract.registry();
}

function getSwapSenderAuthorizations(authorizerAddress, authorizedSender) {
  var contract = getSwapContract(constants.httpProvider);
  return contract.senderAuthorizations(authorizerAddress, authorizedSender);
}

function getSwapSignerAuthorizations(authorizerAddress, authorizedSigner) {
  var contract = getSwapContract(constants.httpProvider);
  return contract.signerAuthorizations(authorizerAddress, authorizedSigner);
}

function getSwapSignerMinimumNonce(signer) {
  var contract = getSwapContract(constants.httpProvider);
  return contract.signerMinimumNonce(signer);
}

function getSwapSignerNonceStatus(signer, nonce) {
  var contract = getSwapContract(constants.httpProvider);
  return contract.signerNonceStatus(signer, nonce);
}

function submitSwap(order, signer) {
  var contract = getSwapContract(signer);
  return contract.swap(order);
}

function submitSwapCancel(nonces, signer) {
  var contract = getSwapContract(signer);
  return contract.cancel(nonces);
}

function submitSwapCancelUpTo(minimumNonce, signer) {
  var contract = getSwapContract(signer);
  return contract.cancelUpTo(minimumNonce);
}

function submitSwapAuthorizeSender(authorizedSender, signer) {
  var contract = getSwapContract(signer);
  return contract.authorizeSender(authorizedSender);
}

function submitSwapAuthorizeSigner(authorizedSigner, signer) {
  var contract = getSwapContract(signer);
  return contract.authorizeSigner(authorizedSigner);
}

function submitSwapRevokeSender(authorizedSender, signer) {
  var contract = getSwapContract(signer);
  return contract.revokeSender(authorizedSender);
}

function submitSwapRevokeSigner(authorizedSigner, signer) {
  var contract = getSwapContract(signer);
  return contract.revokeSigner(authorizedSigner);
}

module.exports = {
  getSwapRegistry: getSwapRegistry,
  getSwapSenderAuthorizations: getSwapSenderAuthorizations,
  getSwapSignerAuthorizations: getSwapSignerAuthorizations,
  getSwapSignerMinimumNonce: getSwapSignerMinimumNonce,
  getSwapSignerNonceStatus: getSwapSignerNonceStatus,
  submitSwap: submitSwap,
  submitSwapCancel: submitSwapCancel,
  submitSwapCancelUpTo: submitSwapCancelUpTo,
  submitSwapAuthorizeSender: submitSwapAuthorizeSender,
  submitSwapAuthorizeSigner: submitSwapAuthorizeSigner,
  submitSwapRevokeSender: submitSwapRevokeSender,
  submitSwapRevokeSigner: submitSwapRevokeSigner
};