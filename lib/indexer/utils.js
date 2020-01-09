"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var ethers = require('ethers');

var _require = require('./constants'),
    INDEX_TYPES = _require.INDEX_TYPES;

function mapOnChainIntentToOffChain(_ref) {
  var senderToken = _ref.senderToken,
      signerToken = _ref.signerToken,
      identifier = _ref.identifier,
      tradeWallet = _ref.tradeWallet,
      locator = _ref.locator,
      locatorType = _ref.locatorType;

  if (locatorType === 'contract') {
    return {
      address: tradeWallet || identifier,
      makerAddress: tradeWallet || identifier,
      makerToken: senderToken,
      // we reverse signerToken and senderToken for delegates since the connected wallet is the signer instead of the sender
      takerToken: signerToken,
      locator: locator,
      locatorType: locatorType,
      supportedMethods: ['getSignerSideOrder', 'getSenderSideOrder', 'getSignerSideQuote', 'getSenderSideQuote', 'getMaxQuote'],
      swapVersion: 2
    };
  }

  return {
    address: identifier,
    makerAddress: identifier,
    makerToken: signerToken,
    takerToken: senderToken,
    locator: locator,
    locatorType: locatorType,
    supportedMethods: ['getSignerSideOrder', 'getSenderSideOrder', 'getSignerSideQuote', 'getSenderSideQuote', 'getMaxQuote'],
    swapVersion: 2
  };
}

function parseLocatorAndLocatorType(bytes32Locator, identifier, protocol) {
  var locator;
  var locatorType = INDEX_TYPES[protocol];

  if (locatorType === 'contract') {
    locator = identifier.toLowerCase();
  } else if (locatorType === 'https') {
    locator = ethers.utils.parseBytes32String(bytes32Locator);

    if (!_.startsWith(locator, 'https://')) {
      locator = "https://".concat(locator);
    }
  } else if (!locatorType) {
    return {};
  }

  return {
    locator: locator,
    locatorType: locatorType
  };
}

function getUniqueLocatorsFromBlockEvents(locatorEvents, unsetLocatorEvents) {
  var locators = locatorEvents.map(function (_ref2) {
    var values = _ref2.values,
        address = _ref2.address,
        blockNumber = _ref2.blockNumber,
        logIndex = _ref2.logIndex;
    var indexAddress = address.toLowerCase();
    return _objectSpread({}, values, {
      indexAddress: indexAddress,
      blockNumber: blockNumber,
      logIndex: logIndex
    });
  });
  var unsetLocators = unsetLocatorEvents.map(function (_ref3) {
    var values = _ref3.values,
        address = _ref3.address,
        blockNumber = _ref3.blockNumber,
        logIndex = _ref3.logIndex;
    var indexAddress = address.toLowerCase();
    return _objectSpread({}, values, {
      indexAddress: indexAddress,
      blockNumber: blockNumber,
      logIndex: logIndex
    });
  });

  var sortedUnsetLocators = _.sortBy(unsetLocators, 'blockNumber').reverse();

  var uniqueLocators = _.reduce(_.compact(locators), function (agg, val) {
    var existingLocator = _.find(agg, {
      indexAddress: val.indexAddress,
      identifier: val.identifier
    });

    var existingUnsetLocator = _.find(sortedUnsetLocators, {
      indexAddress: val.indexAddress,
      identifier: val.identifier
    });

    if (existingUnsetLocator && existingUnsetLocator.blockNumber > val.blockNumber) {
      return agg;
    }

    if (!existingLocator) {
      return [].concat(_toConsumableArray(agg), [val]);
    } else if (existingLocator.blockNumber < val.blockNumber) {
      var existingLocatorIndex = _.findIndex(agg, {
        indexAddress: val.indexAddress,
        identifier: val.identifier
      });

      return [].concat(_toConsumableArray(agg.slice(0, existingLocatorIndex)), [val], _toConsumableArray(agg.slice(existingLocatorIndex + 1)));
    }

    return agg;
  }, []);

  return _.sortBy(uniqueLocators, 'score').reverse();
}

module.exports = {
  mapOnChainIntentToOffChain: mapOnChainIntentToOffChain,
  parseLocatorAndLocatorType: parseLocatorAndLocatorType,
  getUniqueLocatorsFromBlockEvents: getUniqueLocatorsFromBlockEvents
};