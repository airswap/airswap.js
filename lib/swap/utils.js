"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _ = require('lodash');

function flatten(nestedSwap) {
  var toReturn = {};

  _.each(_.keys(nestedSwap), function (i) {
    if (_typeof(nestedSwap[i]) === 'object') {
      var flatObject = flatten(nestedSwap[i]);

      _.each(_.keys(flatObject), function (x) {
        toReturn[i + _.upperFirst(x)] = flatObject[x];
      });
    } else {
      toReturn[i] = nestedSwap[i];
    }
  });

  return toReturn;
}

function recurseNest(keyArray, endVal) {
  var _keyArray = _toArray(keyArray),
      key = _keyArray[0],
      rest = _keyArray.slice(1);

  if (rest.length === 0) {
    return _defineProperty({}, key, endVal);
  }

  return _defineProperty({}, key, recurseNest(rest, endVal));
}

function nest(flattenedSwap) {
  return _.reduce(flattenedSwap, function (result, value, key) {
    var keyArray = _.kebabCase(key).split('-');

    var nested = recurseNest(keyArray, value);
    return _.merge({}, result, nested);
  }, {});
}

function getSwapOrderId(orderParams) {
  if (!_.isObject(orderParams)) {
    return false;
  }

  var order = orderParams;

  if (order.makerToken || order.signerToken || order.makerWallet || order.signerWallet) {
    // order is flat
    order = nest(order);
  } // now order is nested


  if (order.signer && order.signer.wallet) {
    // order is 2.2
    order = mapNested22OrderTo20Order(order);
  } // now order is nested 2.2


  var _order = order,
      wallet = _order.maker.wallet,
      nonce = _order.nonce;
  return "".concat(wallet).concat(nonce);
}

function mapParty(party) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var wallet = party.wallet,
      kind = party.kind,
      amount = party.amount,
      token = party.token,
      id = party.id;
  return filter ? {
    wallet: wallet,
    kind: kind,
    amount: amount,
    token: token,
    id: id
  } : party;
}

function mapNested22OrderTo20Order(order) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var nonce = order.nonce,
      expiry = order.expiry,
      signer = order.signer,
      maker = order.maker,
      sender = order.sender,
      taker = order.taker,
      affiliate = order.affiliate,
      signature = order.signature,
      rest = _objectWithoutProperties(order, ["nonce", "expiry", "signer", "maker", "sender", "taker", "affiliate", "signature"]);

  return _objectSpread({}, filter ? {} : rest, {
    nonce: nonce,
    expiry: expiry,
    maker: mapParty(signer || maker || {}, filter),
    taker: mapParty(sender || taker || {}, filter),
    affiliate: affiliate,
    signature: signature
  });
}

function mapNested20OrderTo22Order(order) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var nonce = order.nonce,
      expiry = order.expiry,
      maker = order.maker,
      signer = order.signer,
      taker = order.taker,
      sender = order.sender,
      affiliate = order.affiliate,
      signature = order.signature,
      rest = _objectWithoutProperties(order, ["nonce", "expiry", "maker", "signer", "taker", "sender", "affiliate", "signature"]);

  return _objectSpread({}, filter ? {} : rest, {
    nonce: nonce,
    expiry: expiry,
    signer: mapParty(maker || signer || {}, filter),
    sender: mapParty(taker || sender || {}, filter),
    affiliate: affiliate,
    signature: signature
  });
}

function mapFlat20OrderTo22Order(order) {
  var nonce = order.nonce,
      expiry = order.expiry,
      signerWallet = order.signerWallet,
      signerToken = order.signerToken,
      signerAmount = order.signerAmount,
      signerId = order.signerId,
      signerKind = order.signerKind,
      makerWallet = order.makerWallet,
      makerToken = order.makerToken,
      makerAmount = order.makerAmount,
      makerId = order.makerId,
      makerKind = order.makerKind,
      senderWallet = order.senderWallet,
      senderToken = order.senderToken,
      senderAmount = order.senderAmount,
      senderId = order.senderId,
      senderKind = order.senderKind,
      takerWallet = order.takerWallet,
      takerToken = order.takerToken,
      takerAmount = order.takerAmount,
      takerId = order.takerId,
      takerKind = order.takerKind,
      affiliateWallet = order.affiliateWallet,
      affiliateToken = order.affiliateToken,
      affiliateAmount = order.affiliateAmount,
      affiliateId = order.affiliateId,
      affiliateKind = order.affiliateKind,
      signatureSigner = order.signatureSigner,
      signatureVersion = order.signatureVersion,
      signatureR = order.signatureR,
      signatureS = order.signatureS,
      signatureV = order.signatureV,
      rest = _objectWithoutProperties(order, ["nonce", "expiry", "signerWallet", "signerToken", "signerAmount", "signerId", "signerKind", "makerWallet", "makerToken", "makerAmount", "makerId", "makerKind", "senderWallet", "senderToken", "senderAmount", "senderId", "senderKind", "takerWallet", "takerToken", "takerAmount", "takerId", "takerKind", "affiliateWallet", "affiliateToken", "affiliateAmount", "affiliateId", "affiliateKind", "signatureSigner", "signatureVersion", "signatureR", "signatureS", "signatureV"]);

  return _objectSpread({}, rest, {
    nonce: nonce,
    expiry: expiry,
    signerWallet: makerWallet || signerWallet,
    signerToken: makerToken || signerToken,
    signerAmount: makerAmount || signerAmount,
    signerId: makerId || signerId,
    signerKind: makerKind || signerKind,
    senderWallet: takerWallet || senderWallet,
    senderToken: takerToken || senderToken,
    senderAmount: takerAmount || senderAmount,
    senderId: takerId || senderId,
    senderKind: takerKind || senderKind,
    affiliateWallet: affiliateWallet,
    affiliateToken: affiliateToken,
    affiliateAmount: affiliateAmount,
    affiliateId: affiliateId,
    affiliateKind: affiliateKind,
    signatureSigner: signatureSigner,
    signatureVersion: signatureVersion,
    signatureR: signatureR,
    signatureS: signatureS,
    signatureV: signatureV
  }, rest);
}

function mapFlat22OrderTo20Order(order) {
  var nonce = order.nonce,
      expiry = order.expiry,
      signerWallet = order.signerWallet,
      signerToken = order.signerToken,
      signerAmount = order.signerAmount,
      signerId = order.signerId,
      signerKind = order.signerKind,
      makerWallet = order.makerWallet,
      makerToken = order.makerToken,
      makerAmount = order.makerAmount,
      makerId = order.makerId,
      makerKind = order.makerKind,
      senderWallet = order.senderWallet,
      senderToken = order.senderToken,
      senderAmount = order.senderAmount,
      senderId = order.senderId,
      senderKind = order.senderKind,
      takerWallet = order.takerWallet,
      takerToken = order.takerToken,
      takerAmount = order.takerAmount,
      takerId = order.takerId,
      takerKind = order.takerKind,
      affiliateWallet = order.affiliateWallet,
      affiliateToken = order.affiliateToken,
      affiliateAmount = order.affiliateAmount,
      affiliateId = order.affiliateId,
      affiliateKind = order.affiliateKind,
      signatureSigner = order.signatureSigner,
      signatureVersion = order.signatureVersion,
      signatureR = order.signatureR,
      signatureS = order.signatureS,
      signatureV = order.signatureV,
      rest = _objectWithoutProperties(order, ["nonce", "expiry", "signerWallet", "signerToken", "signerAmount", "signerId", "signerKind", "makerWallet", "makerToken", "makerAmount", "makerId", "makerKind", "senderWallet", "senderToken", "senderAmount", "senderId", "senderKind", "takerWallet", "takerToken", "takerAmount", "takerId", "takerKind", "affiliateWallet", "affiliateToken", "affiliateAmount", "affiliateId", "affiliateKind", "signatureSigner", "signatureVersion", "signatureR", "signatureS", "signatureV"]);

  return _objectSpread({}, rest, {
    nonce: nonce,
    expiry: expiry,
    makerWallet: signerWallet || makerWallet,
    makerToken: signerToken || makerToken,
    makerAmount: signerAmount || makerAmount,
    makerId: signerId || makerId,
    makerKind: signerKind || makerKind,
    takerWallet: senderWallet || takerWallet,
    takerToken: senderToken || takerToken,
    takerAmount: senderAmount || takerAmount,
    takerId: senderId || takerId,
    takerKind: senderKind || takerKind,
    affiliateWallet: affiliateWallet,
    affiliateToken: affiliateToken,
    affiliateAmount: affiliateAmount,
    affiliateKind: affiliateKind,
    signatureSigner: signatureSigner,
    signatureVersion: signatureVersion,
    signatureR: signatureR,
    signatureS: signatureS,
    signatureV: signatureV
  }, rest);
}

function mapNested22QuoteTo20Quote(quote) {
  var swap = quote.swap,
      signer = quote.signer,
      sender = quote.sender,
      rest = _objectWithoutProperties(quote, ["swap", "signer", "sender"]);

  return _objectSpread({}, rest, {
    maker: signer,
    taker: sender,
    swap: swap
  });
}

function mapNested20QuoteTo22Quote(quote) {
  var swap = quote.swap,
      maker = quote.maker,
      taker = quote.taker,
      rest = _objectWithoutProperties(quote, ["swap", "maker", "taker"]);

  return _objectSpread({}, rest, {
    signer: maker,
    sender: taker,
    swap: swap
  });
}

module.exports = {
  flatten: flatten,
  nest: nest,
  getSwapOrderId: getSwapOrderId,
  mapNested22OrderTo20Order: mapNested22OrderTo20Order,
  mapNested20OrderTo22Order: mapNested20OrderTo22Order,
  mapNested22QuoteTo20Quote: mapNested22QuoteTo20Quote,
  mapNested20QuoteTo22Quote: mapNested20QuoteTo22Quote,
  mapFlat20OrderTo22Order: mapFlat20OrderTo22Order,
  mapFlat22OrderTo20Order: mapFlat22OrderTo20Order
};