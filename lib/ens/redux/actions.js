"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findENSNameByAddress = exports.findAddressByENSName = exports.gotENSLookupSuccess = exports.gotENSLookupError = exports.setENSReady = void 0;

var setENSReady = function setENSReady() {
  return {
    type: 'ENS_READY'
  };
};

exports.setENSReady = setENSReady;

var gotENSLookupError = function gotENSLookupError(errorMsg) {
  return {
    type: 'ENS_LOOKUP_ERROR',
    error: errorMsg
  };
};

exports.gotENSLookupError = gotENSLookupError;

var gotENSLookupSuccess = function gotENSLookupSuccess(address, ensName) {
  return {
    type: 'ENS_LOOKUP_SUCCESS',
    address: address.toLowerCase(),
    ensName: ensName
  };
};

exports.gotENSLookupSuccess = gotENSLookupSuccess;

var findAddressByENSName = function findAddressByENSName(ensName) {
  return {
    type: 'FIND_ADDRESS_BY_ENS_NAME',
    name: ensName
  };
};

exports.findAddressByENSName = findAddressByENSName;

var findENSNameByAddress = function findENSNameByAddress(address) {
  return {
    type: 'FIND_ENS_NAME_BY_ADDRESS',
    address: address.toLowerCase()
  };
};

exports.findENSNameByAddress = findENSNameByAddress;