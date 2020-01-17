"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexerIntentsLoaded = exports.getIndexAddresses = exports.makeGetDelegateIndexExists = exports.makeGetIndexerIndexExists = exports.getIndexes = exports.getConnectedOnChainMakerAddresses = exports.getContractLocatorIntentsFormatted = exports.getLocatorIntentsFormatted = exports.getLocatorIntents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _eventTrackingSelectors = require("../../index/redux/eventTrackingSelectors");

var _utils = require("../utils");

var _eventTrackingSelectors2 = require("./eventTrackingSelectors");

var _selectors = require("../../delegateFactory/redux/selectors");

var _eventTrackingSelectors3 = require("../../delegateFactory/redux/eventTrackingSelectors");

var _constants = require("../constants");

var _constants2 = require("../../constants");

var _reducers = require("../../tokens/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIndexes = (0, _reselect.createSelector)(_eventTrackingSelectors2.getIndexerCreateIndexEvents, function (events) {
  return _lodash.default.uniqBy(events.map(function (_ref) {
    var _ref$values = _ref.values,
        senderToken = _ref$values.senderToken,
        signerToken = _ref$values.signerToken,
        indexAddress = _ref$values.indexAddress,
        protocol = _ref$values.protocol;
    return {
      senderToken: senderToken,
      signerToken: signerToken,
      protocol: protocol,
      indexAddress: indexAddress
    };
  }, function (v) {
    return JSON.stringify(v, ['senderToken', 'signerToken', 'indexAddress', 'protocol']);
  }));
});
exports.getIndexes = getIndexes;
var makeGetIndexerIndexExists = (0, _reselect.createSelector)(getIndexes, function (indexerIndexes) {
  return function (signerToken, senderToken, protocol) {
    return !!indexerIndexes.find(function (index) {
      return index.signerToken === signerToken && index.senderToken === senderToken && index.protocol === protocol;
    });
  };
});
exports.makeGetIndexerIndexExists = makeGetIndexerIndexExists;
var makeGetDelegateIndexExists = (0, _reselect.createSelector)(makeGetIndexerIndexExists, function (getIndexerExists) {
  return function (signerToken, senderToken) {
    return getIndexerExists(signerToken, senderToken, _constants.INDEX_TYPES_LOOKUP.contract);
  };
});
exports.makeGetDelegateIndexExists = makeGetDelegateIndexExists;
var getIndexAddresses = (0, _reselect.createSelector)(getIndexes, function (indexes) {
  return indexes.map(function (_ref2) {
    var indexAddress = _ref2.indexAddress;
    return indexAddress;
  });
});
exports.getIndexAddresses = getIndexAddresses;
var getUniqueLocators = (0, _reselect.createSelector)(_eventTrackingSelectors.getIndexSetLocatorEvents, _eventTrackingSelectors.getIndexUnsetLocatorEvents, function (setLocatorEvents, unsetLocatorEvents) {
  return (0, _utils.getUniqueLocatorsFromBlockEvents)(setLocatorEvents, unsetLocatorEvents);
});
var getLocatorIntents = (0, _reselect.createSelector)(getUniqueLocators, getIndexes, _selectors.getDelegates, _reducers.makeDisplayByToken, function (uniqueLocators, indexes, delegates, displayByToken) {
  return _lodash.default.compact(uniqueLocators.map(function (locatorObject) {
    var indexAddress = locatorObject.indexAddress,
        identifier = locatorObject.identifier,
        score = locatorObject.score,
        blockNumber = locatorObject.blockNumber;

    var _ref3 = _lodash.default.find(indexes, {
      indexAddress: indexAddress
    }) || {},
        senderToken = _ref3.senderToken,
        signerToken = _ref3.signerToken,
        protocol = _ref3.protocol;

    if (!(senderToken && signerToken)) {
      // index doesn't exist for this locator
      return null;
    }

    var _parseLocatorAndLocat = (0, _utils.parseLocatorAndLocatorType)(locatorObject.locator, identifier, protocol),
        locator = _parseLocatorAndLocat.locator,
        locatorType = _parseLocatorAndLocat.locatorType;

    if (!(locator && locatorType)) {
      // protocol isn't recognized in ./constants.js
      return null;
    }

    var delegateTradeWallet;

    if (locatorType === 'contract') {
      var delegate = _lodash.default.find(delegates, {
        delegateContract: locator
      });

      if (!delegate) {
        return null;
      }

      delegateTradeWallet = delegate.delegateTradeWallet;
    }

    var scoreFormatted = displayByToken({
      address: _constants2.AST_CONTRACT_ADDRESS
    }, score);
    return {
      senderToken: senderToken,
      signerToken: signerToken,
      protocol: protocol,
      indexAddress: indexAddress,
      identifier: identifier,
      tradeWallet: delegateTradeWallet,
      locator: locator,
      locatorType: locatorType,
      score: score,
      scoreFormatted: scoreFormatted,
      blockNumber: blockNumber
    };
  }));
});
exports.getLocatorIntents = getLocatorIntents;
var getLocatorIntentsFormatted = (0, _reselect.createSelector)(getLocatorIntents, function (intents) {
  return intents.map(_utils.mapOnChainIntentToOffChain);
}); // This selector falsely claims to return "makerAddresses" that are "connected":
// - they are not connected because there is currently no efficient way to determine if a off-chain maker is online
// - the makerAddress values aren't maker addresses, they are "identifiers"
// there's no way to get the data I need, but I need to provide these values or things like the token dropdown in instant will break

exports.getLocatorIntentsFormatted = getLocatorIntentsFormatted;
var getConnectedOnChainMakerAddresses = (0, _reselect.createSelector)(getLocatorIntentsFormatted, function (intents) {
  return intents.map(function (_ref4) {
    var makerAddress = _ref4.makerAddress;
    return makerAddress;
  });
});
exports.getConnectedOnChainMakerAddresses = getConnectedOnChainMakerAddresses;
var getContractLocatorIntentsFormatted = (0, _reselect.createSelector)(getLocatorIntentsFormatted, function (intents) {
  return _lodash.default.filter(intents, {
    locatorType: 'contract'
  });
});
exports.getContractLocatorIntentsFormatted = getContractLocatorIntentsFormatted;
var getIndexerIntentsLoaded = (0, _reselect.createSelector)(_eventTrackingSelectors2.getIndexerCreateIndexHistoricalFetchStatus, _eventTrackingSelectors.getIndexSetLocatorHistoricalFetchStatus, _eventTrackingSelectors3.getDelegateFactoryCreateDelegateHistoricalFetchStatus, _eventTrackingSelectors.getIndexUnsetLocatorHistoricalFetchStatus, function (createIndex, setLocator, createDelegate, unsetLocator) {
  return createIndex.fetched && setLocator.fetched && createDelegate.fetched && unsetLocator.fetched;
});
exports.getIndexerIntentsLoaded = getIndexerIntentsLoaded;