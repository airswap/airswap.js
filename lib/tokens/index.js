"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch = require('isomorphic-fetch');

var BigNumber = require('bignumber.js');

var _ = require('lodash');

var _require = require('../constants'),
    NETWORK = _require.NETWORK,
    BASE_ASSET_TOKEN_ADDRESSES = _require.BASE_ASSET_TOKEN_ADDRESSES;

var _require2 = require('../swap/utils'),
    flatten = _require2.flatten;

var TOKEN_METADATA_BASE_URL = 'https://token-metadata.airswap.io';
var OPENSEA_API_URL = NETWORK === 4 ? 'https://rinkeby-api.opensea.io/api/v1' : 'https://api.opensea.io/api/v1';
var TOKEN_LIST_URL = "".concat(TOKEN_METADATA_BASE_URL, "/").concat(NETWORK === 4 ? 'rinkebyTokens' : 'tokens');
var MAX_DISPLAY_DECIMALS = 8;

var makeCrawlTokenUrl = function makeCrawlTokenUrl(address, forceAirswapUIApproved) {
  return "".concat(TOKEN_METADATA_BASE_URL, "/crawlTokenData?address=").concat(address).concat(NETWORK === 4 ? '&test=true' : '').concat(forceAirswapUIApproved ? '&forceAirswapUIApproved=true' : '');
};

var makeCrawlNFTItemUrl = function makeCrawlNFTItemUrl(address, id) {
  return "".concat(OPENSEA_API_URL, "/asset/").concat(address, "/").concat(id);
};

BigNumber.config({
  ERRORS: false
});
BigNumber.config({
  EXPONENTIAL_AT: 1e9
}); //eslint-disable-line

function fetchTokens() {
  return new Promise(function (resolve, reject) {
    fetch(TOKEN_LIST_URL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(resolve);
  });
}

function _crawlToken(tokenAddress, forceUIApproval) {
  return new Promise(function (resolve, reject) {
    fetch(makeCrawlTokenUrl(tokenAddress, forceUIApproval), {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(resolve);
  });
}

function _crawlNFTItem(tokenAddress, tokenId) {
  return new Promise(function (resolve, reject) {
    fetch(makeCrawlNFTItemUrl(tokenAddress, tokenId), {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(resolve);
  });
}

function parseAmount(amount, precision) {
  var num = new BigNumber(Math.max(0, Number(amount)));
  return Number(num.toFixed(precision, BigNumber.ROUND_FLOOR));
}

var TokenMetadata =
/*#__PURE__*/
function () {
  function TokenMetadata() {
    var _this = this;

    _classCallCheck(this, TokenMetadata);

    this.tokens = [];
    this.nftItems = [];
    this.ready = fetchTokens().then(function (tokens) {
      return _this.setTokens(tokens);
    });
  }

  _createClass(TokenMetadata, [{
    key: "setTokens",
    value: function setTokens(tokens) {
      this.tokens = tokens;
      this.airswapUITokens = _.filter(tokens, {
        airswapUI: 'yes'
      });
      this.tokensByAddress = _.keyBy(tokens, 'address');
      this.tokenSymbolsByAddress = _.mapValues(this.tokensByAddress, function (t) {
        return t.symbol;
      });
      this.tokenAddresses = _.map(this.tokens, function (t) {
        return t.address;
      });
      this.tokensBySymbol = _.keyBy(tokens, 'symbol');
      this.tokenAddressesBySymbol = _.mapValues(this.tokensBySymbol, function (t) {
        return t.address;
      });
      return tokens;
    }
  }, {
    key: "crawlToken",
    value: function crawlToken(address) {
      var _this2 = this;

      var forceUIApproval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return _crawlToken(address, forceUIApproval).then(function (token) {
        _this2.tokens.push(token);

        return token;
      });
    }
  }, {
    key: "crawlNFTItem",
    value: function () {
      var _crawlNFTItem2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(address, id) {
        var nftItem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _crawlNFTItem(address, id).then(function (token) {
                  return {
                    name: token.asset_contract.name,
                    symbol: token.asset_contract.symbol,
                    address: token.asset_contract.address,
                    id: token.token_id,
                    kind: 'ERC721',
                    img_url: token.image_url
                  };
                });

              case 2:
                nftItem = _context.sent;
                this.nftItems.push(nftItem);
                return _context.abrupt("return", nftItem);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function crawlNFTItem(_x, _x2) {
        return _crawlNFTItem2.apply(this, arguments);
      }

      return crawlNFTItem;
    }()
  }, {
    key: "formatSignificantDigitsByToken",
    value: function formatSignificantDigitsByToken(tokenQuery, value) {
      var token = _.find(this.tokens, tokenQuery);

      if (!token) {
        throw new Error('token not in metadata, crawl before for next retry');
      }

      var decimals = token.decimals;
      return parseAmount(value, Math.min(Number(decimals), MAX_DISPLAY_DECIMALS));
    }
  }, {
    key: "formatAtomicValueByToken",
    value: function formatAtomicValueByToken(tokenQuery, value) {
      var token = _.find(this.tokens, tokenQuery);

      if (!token) {
        throw new Error('token not in metadata, crawl before for next retry');
      }

      var decimals = token.decimals;
      var power = Math.pow(10, Number(decimals));
      return new BigNumber(value).times(power).toFixed(0);
    }
  }, {
    key: "formatFullValueByToken",
    value: function formatFullValueByToken(tokenQuery, value) {
      var token = _.find(this.tokens, tokenQuery);

      if (!token) {
        throw new Error('token not in metadata, crawl before for next retry');
      }

      var decimals = token.decimals;
      var power = Math.pow(10, Number(decimals));
      return new BigNumber(value).div(power).toString();
    }
  }, {
    key: "formatDisplayValueByToken",
    value: function formatDisplayValueByToken(tokenQuery, value) {
      return this.formatSignificantDigitsByToken(tokenQuery, this.formatFullValueByToken(tokenQuery, value));
    }
  }, {
    key: "isBaseAsset",
    value: function isBaseAsset(token, pair) {
      var otherToken = _.first(_.without(pair, token));

      if (!otherToken) {
        throw new Error('invalid pair');
      } else if (!_.includes(pair, token)) {
        throw new Error('token not in pair');
      }

      var _this$tokenAddressesB = this.tokenAddressesBySymbol,
          ETH = _this$tokenAddressesB.ETH,
          WETH = _this$tokenAddressesB.WETH,
          DAI = _this$tokenAddressesB.DAI;
      var baseAssets = [ETH, WETH, DAI];

      if (_.includes(baseAssets, token) && !_.includes(baseAssets, otherToken)) {
        return true;
      } else if (!_.includes(baseAssets, token) && _.includes(baseAssets, otherToken)) {
        return false;
      } else if (_.includes(baseAssets, token) && _.includes(baseAssets, otherToken)) {
        if (baseAssets.indexOf(token) === baseAssets.indexOf(otherToken)) {
          throw new Error('tokens cannot be the same');
        } else if (baseAssets.indexOf(token) < baseAssets.indexOf(otherToken)) {
          return true;
        } else if (baseAssets.indexOf(token) > baseAssets.indexOf(otherToken)) {
          return false;
        }
      } else if (!_.includes(baseAssets, token) && !_.includes(baseAssets, otherToken)) {
        var first = _.first(_.sortBy(pair));

        if (token === first) {
          return true;
        }

        return false;
      }
    }
  }, {
    key: "getReadableOrder",
    value: function getReadableOrder(order, tokenSymbolsByAddressParam, formatFullValueByTokenParam, parseValueByTokenParam) {
      var fullByToken = formatFullValueByTokenParam || this.formatFullValueByToken.bind(this);
      var parseByToken = parseValueByTokenParam || this.formatSignificantDigitsByToken.bind(this);
      var tokenSymbolsByAddress = tokenSymbolsByAddressParam || this.tokenSymbolsByAddress;
      var makerAddress = order.makerAddress,
          makerAmount = order.makerAmount,
          makerToken = order.makerToken,
          takerAddress = order.takerAddress,
          takerAmount = order.takerAmount,
          takerToken = order.takerToken,
          expiration = order.expiration,
          nonce = order.nonce;
      var takerAmountFull = fullByToken({
        address: takerToken
      }, takerAmount);
      var makerAmountFull = fullByToken({
        address: makerToken
      }, makerAmount);
      var takerAmountFormatted = parseByToken({
        address: takerToken
      }, takerAmountFull);
      var makerAmountFormatted = parseByToken({
        address: makerToken
      }, makerAmountFull);
      var takerSymbol = tokenSymbolsByAddress[takerToken];
      var makerSymbol = tokenSymbolsByAddress[makerToken];
      var ethAmount = 0;
      var ethAmountFull = 0;
      var tokenAmount = 0;
      var tokenAmountFull = 0;
      var baseTokenAmount = 0;
      var baseTokenAmountFull = 0;
      var baseTokenSymbol = '';
      var tokenSymbol = '';
      var tokenAddress = '';
      var price;

      if (takerSymbol === 'ETH' || takerSymbol === 'WETH') {
        ethAmount = takerAmountFormatted;
        ethAmountFull = takerAmountFull;
        tokenAmount = makerAmountFormatted;
        tokenAmountFull = makerAmountFull;
        tokenSymbol = makerSymbol;
        tokenAddress = makerToken;
      } else if (makerSymbol === 'ETH' || makerSymbol === 'WETH') {
        ethAmount = makerAmountFormatted;
        ethAmountFull = makerAmountFull;
        tokenAmount = takerAmountFormatted;
        tokenAmountFull = takerAmountFull;
        tokenSymbol = takerSymbol;
        tokenAddress = takerToken;
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
        baseTokenAmount = takerAmountFormatted;
        baseTokenAmountFull = takerAmountFull;
        baseTokenSymbol = takerSymbol;
        tokenAmount = makerAmountFormatted;
        tokenAmountFull = makerAmountFull;
        tokenSymbol = makerSymbol;
        tokenAddress = makerToken;
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
        baseTokenAmount = makerAmountFormatted;
        baseTokenAmountFull = makerAmountFull;
        baseTokenSymbol = makerSymbol;
        tokenAmount = takerAmountFormatted;
        tokenAmountFull = takerAmountFull;
        tokenSymbol = takerSymbol;
        tokenAddress = takerToken;
      } // if eth/weth is involved, set price in eth terms
      // otherwise set price in base token terms


      if (takerSymbol === 'ETH' || takerSymbol === 'WETH' || makerSymbol === 'ETH' || makerSymbol === 'WETH') {
        price = parseByToken({
          symbol: 'ETH'
        }, new BigNumber(ethAmountFull).div(tokenAmountFull).toString());
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
        price = parseByToken({
          symbol: takerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
        price = parseByToken({
          symbol: makerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      }

      return _objectSpread({}, order, {
        takerAmountFormatted: takerAmountFormatted,
        makerAmountFormatted: makerAmountFormatted,
        takerSymbol: takerSymbol,
        makerSymbol: makerSymbol,
        makerAddress: makerAddress,
        makerToken: makerToken,
        takerAddress: takerAddress,
        takerToken: takerToken,
        makerAmount: makerAmount,
        takerAmount: takerAmount,
        expiration: expiration,
        nonce: nonce,
        ethAmount: ethAmount,
        price: price,
        tokenSymbol: tokenSymbol,
        tokenAmount: tokenAmount,
        tokenAddress: tokenAddress,
        baseTokenAmount: baseTokenAmount,
        baseTokenSymbol: baseTokenSymbol
      });
    }
  }, {
    key: "getReadableSwapOrder",
    value: function getReadableSwapOrder(orderParams, tokenByAddressParam, formatFullValueByTokenParam, parseValueByTokenParam, baseAsset) {
      var order = orderParams.maker ? flatten(orderParams) : orderParams;
      var fullByToken = formatFullValueByTokenParam || this.formatFullValueByToken.bind(this);
      var parseByToken = parseValueByTokenParam || this.formatSignificantDigitsByToken.bind(this);
      var tokensByAddress = tokenByAddressParam || this.tokensByAddress;
      var makerWallet = order.makerWallet,
          makerAmount = order.makerAmount,
          makerToken = order.makerToken,
          takerWallet = order.takerWallet,
          takerAmount = order.takerAmount,
          takerToken = order.takerToken,
          expiry = order.expiry,
          nonce = order.nonce;
      var takerAmountFull;
      var takerAmountFormatted;
      var makerAmountFull;
      var makerAmountFormatted;

      var makerKind = _.get(tokensByAddress[makerToken], 'kind');

      var takerKind = _.get(tokensByAddress[takerToken], 'kind');

      if (takerKind === 'ERC721') {
        takerAmountFull = takerAmount;
        takerAmountFormatted = takerAmountFull;
      } else {
        takerAmountFull = fullByToken({
          address: takerToken
        }, takerAmount);
        takerAmountFormatted = parseByToken({
          address: takerToken
        }, takerAmountFull);
      }

      if (makerKind === 'ERC721') {
        makerAmountFull = makerAmount;
        makerAmountFormatted = makerAmountFull;
      } else {
        makerAmountFull = fullByToken({
          address: makerToken
        }, makerAmount);
        makerAmountFormatted = parseByToken({
          address: makerToken
        }, makerAmountFull);
      }

      var takerSymbol = _.get(tokensByAddress[takerToken], 'symbol');

      var makerSymbol = _.get(tokensByAddress[makerToken], 'symbol');

      var ethAmount = 0;
      var ethAmountFull = 0;
      var tokenAmount = 0;
      var tokenAmountFull = 0;
      var baseTokenAmount = 0;
      var baseTokenAmountFull = 0;
      var baseTokenSymbol = '';
      var tokenSymbol = '';
      var tokenAddress = '';
      var tokenKind = '';
      var price;

      if (baseAsset === takerToken) {
        baseTokenAmount = takerAmountFormatted;
        baseTokenAmountFull = takerAmountFull;
        baseTokenSymbol = takerSymbol;
        tokenAmount = makerAmountFormatted;
        tokenAmountFull = makerAmountFull;
        tokenSymbol = makerSymbol;
        tokenAddress = makerToken;
        tokenKind = makerKind;
      } else if (baseAsset === makerToken) {
        baseTokenAmount = makerAmountFormatted;
        baseTokenAmountFull = makerAmountFull;
        baseTokenSymbol = makerSymbol;
        tokenAmount = takerAmountFormatted;
        tokenAmountFull = takerAmountFull;
        tokenSymbol = takerSymbol;
        tokenAddress = takerToken;
        tokenKind = takerKind;
      } else if (takerSymbol === 'ETH' || takerSymbol === 'WETH') {
        ethAmount = takerAmountFormatted;
        ethAmountFull = takerAmountFull;
        tokenAmount = makerAmountFormatted;
        tokenAmountFull = makerAmountFull;
        tokenSymbol = makerSymbol;
        tokenAddress = makerToken;
        tokenKind = makerKind;
      } else if (makerSymbol === 'ETH' || makerSymbol === 'WETH') {
        ethAmount = makerAmountFormatted;
        ethAmountFull = makerAmountFull;
        tokenAmount = takerAmountFormatted;
        tokenAmountFull = takerAmountFull;
        tokenSymbol = takerSymbol;
        tokenAddress = takerToken;
        tokenKind = takerKind;
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
        baseTokenAmount = takerAmountFormatted;
        baseTokenAmountFull = takerAmountFull;
        baseTokenSymbol = takerSymbol;
        tokenAmount = makerAmountFormatted;
        tokenAmountFull = makerAmountFull;
        tokenSymbol = makerSymbol;
        tokenAddress = makerToken;
        tokenKind = makerKind;
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
        baseTokenAmount = makerAmountFormatted;
        baseTokenAmountFull = makerAmountFull;
        baseTokenSymbol = makerSymbol;
        tokenAmount = takerAmountFormatted;
        tokenAmountFull = takerAmountFull;
        tokenSymbol = takerSymbol;
        tokenAddress = takerToken;
        tokenKind = takerKind;
      } // set price in base token terms if there is a base token
      // otherwise, set price in eth terms


      if (baseAsset === takerToken) {
        price = parseByToken({
          symbol: takerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      } else if (baseAsset === makerToken) {
        price = parseByToken({
          symbol: makerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      } else if (takerSymbol === 'ETH' || takerSymbol === 'WETH' || makerSymbol === 'ETH' || makerSymbol === 'WETH') {
        price = parseByToken({
          symbol: 'ETH'
        }, new BigNumber(ethAmountFull).div(tokenAmountFull).toString());
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
        price = parseByToken({
          symbol: takerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
        price = parseByToken({
          symbol: makerSymbol
        }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString());
      }

      return _objectSpread({}, order, {
        takerAmountFormatted: takerAmountFormatted,
        makerAmountFormatted: makerAmountFormatted,
        takerSymbol: takerSymbol,
        makerSymbol: makerSymbol,
        makerAddress: makerWallet,
        makerWallet: makerWallet,
        makerToken: makerToken,
        takerAddress: takerWallet,
        takerWallet: takerWallet,
        takerToken: takerToken,
        makerAmount: makerAmount,
        takerAmount: takerAmount,
        expiration: expiry,
        expiry: expiry,
        nonce: nonce,
        ethAmount: ethAmount,
        price: price,
        tokenSymbol: tokenSymbol,
        tokenAmount: tokenAmount,
        tokenAddress: tokenAddress,
        baseTokenAmount: baseTokenAmount,
        baseTokenSymbol: baseTokenSymbol,
        tokenKind: tokenKind
      });
    }
  }]);

  return TokenMetadata;
}();

module.exports = new TokenMetadata();