"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containers = exports.selectors = exports.makeGetReadableSwapOrder = exports.makeParseByToken = exports.makeGetReadableOrder = exports.getBaseTokens = exports.getTokenAddressesBySymbol = exports.getTokensSymbolsByAddress = exports.makeClampValue = exports.makeDisplayByAddress = exports.makeDisplayBySymbol = exports.makeParseBySymbol = exports.makeDisplayByToken = exports.makeAtomicByToken = exports.makeFullByToken = exports.makeFormatBySymbol = exports.makeGetNFTItemByAddressAndId = exports.getTokensByAddress = exports.getTokensBySymbol = exports.getTokenBySymbol = exports.getTokenAddresses = exports.getTokensSymbols = exports.areTokensReady = exports.getNFTItems = exports.getTokens = exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _reselect = require("reselect");

var _constants = require("../../constants");

var _transformations = require("../../utils/transformations");

var _redux2 = require("../../utils/redux");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var defaultState = []; // REDUCER DEFINITION

var data = function data() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.tokens) {
        var intersection = _lodash.default.intersection(_lodash.default.map(state, 'address'), _lodash.default.map(action.tokens, 'address'));

        var intersectionOverwrite = _lodash.default.map(intersection, function (address) {
          return Object.assign({}, _lodash.default.find(action.tokens, {
            address: address
          }), _lodash.default.find(state, {
            address: address
          }));
        });

        return _lodash.default.uniqBy([].concat(_toConsumableArray(action.tokens), _toConsumableArray(intersectionOverwrite), _toConsumableArray(state)), 'address');
      } else if (action.token) {
        return _lodash.default.uniqBy([action.token].concat(_toConsumableArray(state)), 'address');
      }

      return state;

    default:
      return state;
  }
};

var nftItems = function nftItems() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_NFT_ITEM':
      return _lodash.default.uniqBy([action.token].concat(_toConsumableArray(state)), function (token) {
        return [token.address, token.id].join(',');
      });

    default:
      return state;
  }
};

var ready = function ready() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'TOKENS_LOADED':
      return true;

    default:
      return state;
  }
};

var _default = (0, _redux.combineReducers)({
  data: data,
  nftItems: nftItems,
  ready: ready
}); // Tokens


exports.default = _default;

var getNFTItems = function getNFTItems(state) {
  return state.tokens.nftItems;
};

exports.getNFTItems = getNFTItems;
var getTokens = (0, _reselect.createSelector)(function (state) {
  return state.tokens.data;
}, getNFTItems, function (tokens, nfts) {
  return _objectSpread({}, tokens, nfts);
});
exports.getTokens = getTokens;
var getAirSwapApprovedTokens = (0, _reselect.createSelector)(getTokens, function (tokens) {
  return _lodash.default.filter(tokens, {
    airswapUI: 'yes'
  });
});

var areTokensReady = function areTokensReady(state) {
  return state.tokens.ready;
};

exports.areTokensReady = areTokensReady;
var getTokenAddresses = (0, _reselect.createSelector)(getTokens, function (t) {
  return _lodash.default.map(t, 'address');
});
exports.getTokenAddresses = getTokenAddresses;

var getTokenBySymbol = function getTokenBySymbol(state, symbol) {
  return _lodash.default.find(getTokens(state), {
    symbol: symbol
  });
};

exports.getTokenBySymbol = getTokenBySymbol;
var getTokensBySymbol = (0, _reselect.createSelector)(getTokens, function (t) {
  return _lodash.default.keyBy(t, 'symbol');
});
exports.getTokensBySymbol = getTokensBySymbol;
var getAirSwapApprovedTokensBySymbol = (0, _reselect.createSelector)(getAirSwapApprovedTokens, function (t) {
  return _lodash.default.keyBy(t, 'symbol');
});
var getTokensByAddress = (0, _reselect.createSelector)(getTokens, function (t) {
  return _lodash.default.keyBy(t, 'address');
});
exports.getTokensByAddress = getTokensByAddress;
var getAirSwapApprovedTokensByAddress = (0, _reselect.createSelector)(getAirSwapApprovedTokens, function (t) {
  return _lodash.default.keyBy(t, 'address');
});
var getTokensSymbols = (0, _reselect.createSelector)(getTokens, function (t) {
  return _lodash.default.map(t, 'symbol');
});
exports.getTokensSymbols = getTokensSymbols;
var getTokensSymbolsByAddress = (0, _reselect.createSelector)(getTokensByAddress, function (tokensByAddress) {
  return _lodash.default.mapValues(tokensByAddress, function (t) {
    return t.symbol;
  });
});
exports.getTokensSymbolsByAddress = getTokensSymbolsByAddress;
var getTokenAddressesBySymbol = (0, _reselect.createSelector)(getTokensBySymbol, function (tokensBySymbol) {
  return _lodash.default.mapValues(tokensBySymbol, function (t) {
    return t.address;
  });
});
exports.getTokenAddressesBySymbol = getTokenAddressesBySymbol;
var makeGetNFTItemByAddressAndId = (0, _reselect.createSelector)(getNFTItems, function (items) {
  return function (tokenAddress, tokenId) {
    return _lodash.default.find(items, function (t) {
      return t.address === tokenAddress && t.id === tokenId;
    });
  };
});
exports.makeGetNFTItemByAddressAndId = makeGetNFTItemByAddressAndId;
var makeFormatBySymbol = (0, _reselect.createSelector)(getTokensBySymbol, getTokensSymbols, function (tokensBySymbol, tokensSymbols) {
  return _lodash.default.zipObject(tokensSymbols, tokensSymbols.map(function (symbol) {
    var decimals = tokensBySymbol[symbol].decimals;
    var power = window.Math.pow(10, Number(decimals));
    return {
      display: function display(value) {
        return new _bignumber.default(value).div(power).toString();
      },
      full: function full(value) {
        return new _bignumber.default(value).mul(power).toString();
      }
    };
  }));
});
exports.makeFormatBySymbol = makeFormatBySymbol;
var makeParseBySymbol = (0, _reselect.createSelector)(getTokensBySymbol, getTokensSymbols, function (tokensBySymbol, tokensSymbols) {
  return _lodash.default.zipObject(tokensSymbols, tokensSymbols.map(function (symbol) {
    return function (value) {
      var decimals = tokensBySymbol[symbol].decimals;
      return (0, _transformations.parseAmount)(value, window.Math.min(Number(decimals), _constants.MAX_DISPLAY_DECIMALS));
    };
  }));
});
exports.makeParseBySymbol = makeParseBySymbol;
var makeParseByToken = (0, _reselect.createSelector)(getTokens, function (tokens) {
  return function (tokenQuery, displayAmount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) {
      return '0';
    }

    var decimals = token.decimals;
    return (0, _transformations.parseAmount)(displayAmount, window.Math.min(Number(decimals), _constants.MAX_DISPLAY_DECIMALS));
  };
});
exports.makeParseByToken = makeParseByToken;
var makeFullByToken = (0, _reselect.createSelector)(getTokens, function (tokens) {
  return function (tokenQuery, displayAmount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) return '0';
    if (!Number(token.decimals)) return displayAmount;
    var power = window.Math.pow(10, Number(token.decimals));
    return new _bignumber.default(displayAmount).div(power).toString();
  };
});
exports.makeFullByToken = makeFullByToken;
var makeAtomicByToken = (0, _reselect.createSelector)(getTokens, function (tokens) {
  return function (tokenQuery, displayAmount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) return '0';
    if (!Number(token.decimals)) return displayAmount;
    var power = window.Math.pow(10, Number(token.decimals));
    return new _bignumber.default(displayAmount).mul(power).toString();
  };
});
exports.makeAtomicByToken = makeAtomicByToken;
var makeDisplayByToken = (0, _reselect.createSelector)(getTokens, makeParseBySymbol, function (tokens, parseBySymbol) {
  return function (tokenQuery, displayAmount) {
    var token = _lodash.default.find(tokens, tokenQuery);

    if (!token) return '0';
    if (!Number(token.decimals)) return displayAmount;
    var power = window.Math.pow(10, Number(token.decimals));
    var val = parseBySymbol[token.symbol](new _bignumber.default(displayAmount).div(power).toString());
    return val;
  };
});
exports.makeDisplayByToken = makeDisplayByToken;
var makeDisplayBySymbol = (0, _reselect.createSelector)(getTokensSymbols, makeFormatBySymbol, makeParseBySymbol, function (tokensSymbols, formatBySymbol, parseBySymbol) {
  return _lodash.default.zipObject(tokensSymbols, tokensSymbols.map(function (symbol) {
    return function (value) {
      return parseBySymbol[symbol](formatBySymbol[symbol].display(value));
    };
  }));
});
exports.makeDisplayBySymbol = makeDisplayBySymbol;
var makeDisplayByAddress = (0, _reselect.createSelector)(getTokensSymbolsByAddress, makeDisplayBySymbol, function (tokensSymbolsByAddress, displayBySymbol) {
  return function (address) {
    return displayBySymbol[tokensSymbolsByAddress[address]];
  };
});
exports.makeDisplayByAddress = makeDisplayByAddress;
var makeGetReadableOrder = (0, _reselect.createSelector)(getTokensSymbolsByAddress, makeFullByToken, makeParseByToken, function (tokenSymbolsByAddress, fullByToken, parseByToken) {
  return function (order) {
    return _index.default.ready ? _index.default.getReadableOrder(order, tokenSymbolsByAddress, fullByToken, parseByToken) : [];
  };
});
exports.makeGetReadableOrder = makeGetReadableOrder;
var makeGetReadableSwapOrder = (0, _reselect.createSelector)(getTokensByAddress, makeFullByToken, makeParseByToken, function (tokenByAddress, fullByToken, parseByToken) {
  return function (order) {
    return _index.default.ready ? _index.default.getReadableSwapOrder(order, tokenByAddress, fullByToken, parseByToken) : [];
  };
});
exports.makeGetReadableSwapOrder = makeGetReadableSwapOrder;
var makeClampValue = (0, _reselect.createSelector)(makeParseBySymbol, function (parseBySymbol) {
  return function (symbol, amount) {
    var maxValue = 1000000;
    var parsedAmount = parseBySymbol[symbol](Number(amount));
    return Math.min(maxValue, parsedAmount);
  };
});
exports.makeClampValue = makeClampValue;
var getBaseTokens = (0, _reselect.createSelector)(getTokensBySymbol, function (tokenSymbols) {
  var ret = {};

  _constants.BASE_ASSET_TOKENS_SYMBOLS.forEach(function (baseAssetSymbol) {
    ret[baseAssetSymbol] = tokenSymbols[baseAssetSymbol];
  });

  return ret;
});
exports.getBaseTokens = getBaseTokens;
var makeGetExchangeFillGasLimitByToken = (0, _reselect.createSelector)(getTokens, function (tokens) {
  return function (tokenQuery) {
    var token = _lodash.default.find(tokens, tokenQuery);

    return _lodash.default.get(token, 'gasLimit', _constants.GAS_LIMITS.exchangeFill);
  };
});
var selectors = {
  getTokens: getTokens,
  getNFTItems: getNFTItems,
  areTokensReady: areTokensReady,
  getTokensSymbols: getTokensSymbols,
  getTokenAddresses: getTokenAddresses,
  getTokenBySymbol: getTokenBySymbol,
  getTokensBySymbol: getTokensBySymbol,
  getTokensByAddress: getTokensByAddress,
  makeGetNFTItemByAddressAndId: makeGetNFTItemByAddressAndId,
  makeFormatBySymbol: makeFormatBySymbol,
  makeFullByToken: makeFullByToken,
  makeAtomicByToken: makeAtomicByToken,
  makeDisplayByToken: makeDisplayByToken,
  makeParseBySymbol: makeParseBySymbol,
  makeDisplayBySymbol: makeDisplayBySymbol,
  makeDisplayByAddress: makeDisplayByAddress,
  makeClampValue: makeClampValue,
  getTokensSymbolsByAddress: getTokensSymbolsByAddress,
  getTokenAddressesBySymbol: getTokenAddressesBySymbol,
  getBaseTokens: getBaseTokens,
  makeGetReadableOrder: makeGetReadableOrder,
  getAirSwapApprovedTokens: getAirSwapApprovedTokens,
  getAirSwapApprovedTokensBySymbol: getAirSwapApprovedTokensBySymbol,
  getAirSwapApprovedTokensByAddress: getAirSwapApprovedTokensByAddress,
  makeParseByToken: makeParseByToken,
  makeGetExchangeFillGasLimitByToken: makeGetExchangeFillGasLimitByToken,
  makeGetReadableSwapOrder: makeGetReadableSwapOrder
};
exports.selectors = selectors;
var containers = {
  makeFormatBySymbol: (0, _redux2.connectSelectorContainer)(makeFormatBySymbol, 'formatBySymbol'),
  makeParseBySymbol: (0, _redux2.connectSelectorContainer)(makeParseBySymbol, 'parseBySymbol'),
  makeClampValue: (0, _redux2.connectSelectorContainer)(makeClampValue, 'clampValue'),
  getTokens: (0, _redux2.connectSelectorContainer)(getTokens, 'tokens')
};
exports.containers = containers;