"use strict";

var _ = require('lodash');

var t = require('tcomb-validation');

var validator = require('validator');

var _require = require('./constants'),
    GAS_LEVELS = _require.GAS_LEVELS,
    FIAT_CURRENCIES = _require.FIAT_CURRENCIES;

function isAddress(str) {
  return /^0x[a-f0-9]{40}$/.test(str);
}

function isAtomicAmount(str) {
  return /^[0-9]{1,}$/.test(str);
}

var Address = t.refinement(t.String, isAddress);

Address.getValidationErrorMessage = function (value, path) {
  return "\"".concat(value, "\" at \"").concat(path, "\" is invalid. A valid address format is lowercased, starts with 0x, and is 42 chars.");
};

var AtomicAmount = t.refinement(t.String, isAtomicAmount);

AtomicAmount.getValidationErrorMessage = function (value, path) {
  return "\"".concat(value, "\" at \"").concat(path, "\" is invalid. An atomic amount is a string, chars 0-9 (no decimal values).");
};

var UUID = t.refinement(t.String, validator.isUUID);

var stringLiteral = function stringLiteral(str) {
  return t.refinement(t.String, function (val) {
    return val === str;
  });
};

var gasLevel = t.refinement(t.String, function (s) {
  return _.includes(GAS_LEVELS, s);
});
var Currency = t.refinement(t.String, function (s) {
  return _.includes(Object.keys(FIAT_CURRENCIES), s);
});

var throwTypeError = function throwTypeError(type) {
  return function (value) {
    var validation = t.validate(value, type);

    if (validation.isValid()) {
      return type(value);
    }

    throw new Error(validation.firstError().message);
  };
};

module.exports = {
  Address: Address,
  gasLevel: gasLevel,
  Currency: Currency,
  AtomicAmount: AtomicAmount,
  stringLiteral: stringLiteral,
  UUID: UUID,
  throwTypeError: throwTypeError
};