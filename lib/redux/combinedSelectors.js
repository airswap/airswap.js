"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableMarketplaceTokens = exports.getIndexerTokens = exports.getAvailableMarketplaceTokensByAddress = exports.getAvailableTokensByAddress = exports.getAvailableTokens = exports.getAvailableMarketsByBaseTokenAddress = exports.getConnectedMakerAddressesWithIndexerIntents = exports.getConnectedIndexerIntents = exports.getOnAndOffChainIntents = exports.makeGetFormattedMaxOrderLiquidityByTokenPair = exports.makeGetFormattedLiquidityByTokenPair = exports.getTransactionHistory = void 0;

var _tcombValidation = _interopRequireDefault(require("tcomb-validation"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bignumber = _interopRequireDefault(require("bignumber.js/bignumber"));

var _reselect = require("reselect");

var _redux = require("../erc20/redux");

var _redux2 = require("../swapLegacy/redux");

var _redux3 = require("../swap/redux");

var _reducers = require("../tokens/redux/reducers");

var _reducers2 = require("../deltaBalances/redux/reducers");

var _reducers3 = require("../api/redux/reducers");

var _reducers4 = require("../transactionTracker/redux/reducers");

var _constants = require("../constants");

var _transformations = require("../utils/transformations");

var _tcomb = require("../swap/tcomb");

var _tcomb2 = require("../swapLegacy/tcomb");

var _reducers5 = require("../abis/redux/reducers");

var _selectors = require("../indexer/redux/selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @typedef {Object} TransactionHistoryItem
 * @memberof wallet
 * @property {string} transactionHash Unique ID of the transaction
 * @property {Object} transaction The transaction Object returned by ethers
 * @property {Object} transactionReceipt The transaction receipt Object returned by ethers
 * @property {('Failed' | 'Pending' | 'Confirmed')} textStatus
 * @property {('' | 'Invalid Order' | 'Expired' | 'Already Filled' | 'Invalid ETH Amount' | 'Sender is not Taker' | 'Order Cancelled')} eventStatus
 * @property {string} description A text summary of what this transaction is doing
 * @property {number} timestamp Unix timestamp of when transaction was submitted
 */

/**
 * @function getTransactionHistory
 * @description A selector that returns an array of all transactions that have been submitted by the connected wallet during the lifetime of the application, with attached derived metadata
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.TransactionHistoryItem}
 */
var getTransactionHistory = (0, _reselect.createSelector)(_redux2.selectors.getTransactionsFillOrder, _redux2.selectors.getTransactionReceiptsFillOrder, _redux2.selectors.getTransactionsCancelOrder, _redux2.selectors.getTransactionReceiptsCancelOrder, _redux3.selectors.getTransactionsFillSwap, _redux3.selectors.getTransactionReceiptsFillSwap, _redux3.selectors.getTransactionsFillSwapSimple, _redux3.selectors.getTransactionReceiptsFillSwapSimple, _redux3.selectors.getTransactionsCancelSwap, _redux3.selectors.getTransactionReceiptsCancelSwap, _redux.selectors.getTransactionsApproveToken, _redux.selectors.getTransactionReceiptsApproveToken, _redux.selectors.getTransactionsWrapWeth, _redux.selectors.getTransactionReceiptsWrapWeth, _redux.selectors.getTransactionsUnwrapWeth, _redux.selectors.getTransactionReceiptsUnwrapWeth, _reducers.selectors.getTokensByAddress, _reducers.selectors.makeGetReadableOrder, _reducers.selectors.makeGetReadableSwapOrder, _reducers4.selectors.getTransactions, _reducers5.getAbis, function (fillTransactions, fillReceipts, cancelTransactions, cancelReceipts, fillSwapTransactions, fillSwapReceipts, fillSwapSimpleTransactions, fillSwapSimpleReceipts, cancelSwapTransactions, cancelSwapReceipts, approveTransactions, approveReceipts, wrapTransaction, wrapTransactionsReceipts, unwrapTransaction, unwrapTransactionsReceipts, tokensByAddress, getReadableOrder, getReadableSwapOrder, transactionHistory, abis) {
  var receipts = _lodash.default.compact([].concat(_toConsumableArray(_lodash.default.values(fillReceipts)), _toConsumableArray(_lodash.default.values(cancelReceipts)), _toConsumableArray(_lodash.default.values(fillSwapReceipts)), _toConsumableArray(_lodash.default.values(fillSwapSimpleReceipts)), _toConsumableArray(_lodash.default.values(cancelSwapReceipts)), _toConsumableArray(_lodash.default.values(approveReceipts)), _toConsumableArray(_lodash.default.values(wrapTransactionsReceipts)), _toConsumableArray(_lodash.default.values(unwrapTransactionsReceipts)), _toConsumableArray(_lodash.default.map(transactionHistory, 'transactionReceipt'))));

  var transactions = _lodash.default.compact([].concat(_toConsumableArray(_lodash.default.values(fillTransactions)), _toConsumableArray(_lodash.default.values(cancelTransactions)), _toConsumableArray(_lodash.default.values(fillSwapTransactions)), _toConsumableArray(_lodash.default.values(fillSwapSimpleTransactions)), _toConsumableArray(_lodash.default.values(cancelSwapTransactions)), _toConsumableArray(_lodash.default.values(approveTransactions)), _toConsumableArray(_lodash.default.values(wrapTransaction)), _toConsumableArray(_lodash.default.values(unwrapTransaction)), _toConsumableArray(_lodash.default.map(transactionHistory, 'transaction')))).map(function (tx) {
    var transactionReceipt = _lodash.default.find(receipts, {
      transactionHash: tx.hash
    });

    var _getTransactionTextSt = (0, _transformations.getTransactionTextStatus)(transactionReceipt),
        textStatus = _getTransactionTextSt.textStatus,
        eventStatus = _getTransactionTextSt.eventStatus;

    return {
      transactionHash: tx.hash,
      transaction: tx,
      description: (0, _transformations.getTransactionDescription)(tx, tokensByAddress, getReadableOrder, getReadableSwapOrder, abis),
      transactionReceipt: transactionReceipt,
      textStatus: textStatus,
      eventStatus: eventStatus,
      timestamp: tx.timestamp
    };
  });

  return transactions;
});
exports.getTransactionHistory = getTransactionHistory;
var getOnAndOffChainIntents = (0, _reselect.createSelector)(_selectors.getLocatorIntentsFormatted, _reducers3.selectors.getIndexerIntents, function (intents, apiIntents) {
  return [].concat(_toConsumableArray(intents), _toConsumableArray(apiIntents));
});
/*
 filters down all indexer intents to only those that have a makerAddress that is router-connected or on-chain
 */

exports.getOnAndOffChainIntents = getOnAndOffChainIntents;
var getConnectedIndexerIntents = (0, _reselect.createSelector)(getOnAndOffChainIntents, _reducers3.selectors.getFetchedConnectedUsers, _selectors.getConnectedOnChainMakerAddresses, function (intents, connectedMakers, onChainMakers) {
  return _lodash.default.filter(intents, function (_ref) {
    var makerAddress = _ref.makerAddress;
    return _lodash.default.includes([].concat(_toConsumableArray(onChainMakers), _toConsumableArray(connectedMakers)), makerAddress);
  });
});
/*
 filters down all indexer intents to only those that have a makerAddress that is router-connected
 */

exports.getConnectedIndexerIntents = getConnectedIndexerIntents;
var getConnectedMakerAddressesWithIndexerIntents = (0, _reselect.createSelector)(getConnectedIndexerIntents, function (intents) {
  return _lodash.default.map(intents, 'makerAddress');
});
/*
 filters down router-connected intents to tokenAddresses that are
 - router-connected
 - have an intent
 */

exports.getConnectedMakerAddressesWithIndexerIntents = getConnectedMakerAddressesWithIndexerIntents;
var getConnectedIndexerTokenAddresses = (0, _reselect.createSelector)(getConnectedIndexerIntents, function (intents) {
  return _toConsumableArray(_lodash.default.reduce(intents, function (set, intent) {
    set.add(intent.makerToken);
    set.add(intent.takerToken);
    return set;
  }, new Set()));
});
/*
"AVAILABLE MARKETS" ARE INTENTS THAT MEET BOTH CRITERIA BELOW
 - either the makertoken or takertoken of the intent involves a "BASE ASSET"
 - the maker responsible for the intent is connected to the network
*/

var getAvailableMarketsByBaseTokenAddress = (0, _reselect.createSelector)(getConnectedIndexerIntents, _reducers.selectors.getTokensBySymbol, function (intents, tokensBySymbol) {
  var markets = {};
  if (!tokensBySymbol || !Object.keys(tokensBySymbol).length) return;

  _constants.BASE_ASSET_TOKENS_SYMBOLS.map(function (symbol) {
    return tokensBySymbol[symbol];
  }).forEach(function (token) {
    if (!token) return;
    markets[token.address] = 0;
  });

  intents.forEach(function (intent) {
    if (Object.prototype.hasOwnProperty.call(markets, intent.takerToken)) {
      markets[intent.takerToken]++;
      return;
    }

    if (Object.prototype.hasOwnProperty.call(markets, intent.makerToken)) {
      markets[intent.makerToken]++;
    }
  });
  return markets;
});
/*
"AVAILABLE" TOKENS MEET THE FOLLOWING REQUIREMENTS
 - APPROVED (airswapUI: 'yes')
 - INDEXER (there exist an intent on the indexer for this token)
 - CONNECTED (the makerAddress of that intent is currently connected to the router)
*/

exports.getAvailableMarketsByBaseTokenAddress = getAvailableMarketsByBaseTokenAddress;
var getAvailableTokens = (0, _reselect.createSelector)(_reducers.selectors.getAirSwapApprovedTokens, // APPROVED
getConnectedIndexerTokenAddresses, // INDEXER & CONNECTED
function (approvedTokens, indexerTokenAddresses) {
  return _lodash.default.filter(approvedTokens, function (token) {
    return _lodash.default.includes(indexerTokenAddresses, token.address);
  });
});
/*
"INDEXER" TOKENS MEET THE FOLLOWING REQUIREMENTS
 - there exist an intent on the indexer for this token
*/

exports.getAvailableTokens = getAvailableTokens;
var getIndexerTokens = (0, _reselect.createSelector)(getOnAndOffChainIntents, function (intents) {
  return _toConsumableArray(_lodash.default.reduce(intents, function (set, intent) {
    set.add(intent.makerToken);
    set.add(intent.takerToken);
    return set;
  }, new Set()));
});
/*
AVAILABLE MARKETPLACE TOKENS MEET THE FOLLOWING REQUIREMENTS
 - APPROVED (airswapUI: 'yes')
 - INDEXER (there exist an intent on the indexer for this token)
 - CONNECTED (the makerAddress of that intent is currently connected to the router)
 - Current base tokens are excluded (by default this is ETH/WETH)
*/

exports.getIndexerTokens = getIndexerTokens;
var getAvailableMarketplaceTokens = (0, _reselect.createSelector)(_reducers.selectors.getAirSwapApprovedTokens, // APPROVED
getConnectedIndexerTokenAddresses, // INDEXER & CONNECTED
function (approvedTokens, indexerTokenAddresses) {
  return _lodash.default.filter(approvedTokens, function (token) {
    return _lodash.default.includes(indexerTokenAddresses, token.address) && !_lodash.default.includes(_constants.ETH_BASE_ADDRESSES, token.address);
  });
});
/*
TOKENS BY ADDRESS
*/

exports.getAvailableMarketplaceTokens = getAvailableMarketplaceTokens;
var getAvailableTokensByAddress = (0, _reselect.createSelector)(getAvailableTokens, function (tokens) {
  return _lodash.default.keyBy(tokens, 'address');
});
exports.getAvailableTokensByAddress = getAvailableTokensByAddress;
var getAvailableMarketplaceTokensByAddress = (0, _reselect.createSelector)(getAvailableMarketplaceTokens, function (tokens) {
  return _lodash.default.keyBy(tokens, 'address');
});
exports.getAvailableMarketplaceTokensByAddress = getAvailableMarketplaceTokensByAddress;
var getLiquidity = (0, _reselect.createSelector)(_reducers3.selectors.getMaxQuotes, getConnectedIndexerIntents, _reducers2.selectors.getBalances, function (responses, intents, balances) {
  var _$partition = _lodash.default.partition(responses, function (q) {
    return _tcombValidation.default.validate(q, _tcomb.Quote).isValid() || _tcombValidation.default.validate(q, _tcomb2.LegacyQuote).isValid();
  }),
      _$partition2 = _slicedToArray(_$partition, 1),
      quoteResponses = _$partition2[0];

  var formattedQuotes = _lodash.default.map(quoteResponses, function (quote) {
    return _lodash.default.mapValues(quote, function (v) {
      return v.toLowerCase();
    });
  }); // lowercase all addresses (doesn't effect number strings)


  var intentValues = _lodash.default.map(intents, function (_ref2) {
    var makerAddress = _ref2.makerAddress,
        makerToken = _ref2.makerToken,
        takerToken = _ref2.takerToken;

    var intentQuote = _lodash.default.find(formattedQuotes, {
      makerAddress: makerAddress,
      makerToken: makerToken,
      takerToken: takerToken
    });

    var makerTokenBalance = _lodash.default.get(balances, "".concat(makerAddress.toLowerCase(), ".").concat(makerToken.toLowerCase())); // adding eth address lowercasing only ever helps things


    var val = '0';

    if (intentQuote) {
      val = intentQuote.makerAmount;
    } else if (makerTokenBalance) {
      val = makerTokenBalance;
    }

    return [makerToken, takerToken, val];
  });

  return _lodash.default.reduce(intentValues, function (sumObj, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 3),
        makerToken = _ref4[0],
        takerToken = _ref4[1],
        val = _ref4[2];

    var intentKey = [makerToken, takerToken].join('-');
    sumObj[intentKey] = new _bignumber.default(sumObj[intentKey] || '0').add(val).toString(); //eslint-disable-line

    return sumObj;
  }, {});
});
var getMaxOrderLiquidity = (0, _reselect.createSelector)(_reducers3.selectors.getMaxQuotes, getConnectedIndexerIntents, _reducers2.selectors.getBalances, function (responses, intents, balances) {
  var _$partition3 = _lodash.default.partition(responses, function (q) {
    return _tcombValidation.default.validate(q, _tcomb.Quote).isValid() || _tcombValidation.default.validate(q, _tcomb2.LegacyQuote).isValid();
  }),
      _$partition4 = _slicedToArray(_$partition3, 1),
      quoteResponses = _$partition4[0];

  var formattedQuotes = _lodash.default.map(quoteResponses, function (quote) {
    return _lodash.default.mapValues(quote, function (v) {
      return v.toLowerCase();
    });
  }); // lowercase all addresses (doesn't effect number strings)


  var intentValues = _lodash.default.map(intents, function (_ref5) {
    var makerAddress = _ref5.makerAddress,
        makerToken = _ref5.makerToken,
        takerToken = _ref5.takerToken;

    var intentQuote = _lodash.default.find(formattedQuotes, {
      makerAddress: makerAddress,
      makerToken: makerToken,
      takerToken: takerToken
    });

    var makerTokenBalance = _lodash.default.get(balances, "".concat(makerAddress.toLowerCase(), ".").concat(makerToken.toLowerCase())); // adding eth address lowercasing only ever helps things


    var val = '0';

    if (intentQuote) {
      val = intentQuote.makerAmount;
    } else if (makerTokenBalance) {
      val = makerTokenBalance;
    }

    return [makerToken, takerToken, val];
  });

  return _lodash.default.reduce(intentValues, function (maxObj, _ref6) {
    var _ref7 = _slicedToArray(_ref6, 3),
        makerToken = _ref7[0],
        takerToken = _ref7[1],
        val = _ref7[2];

    var intentKey = [makerToken, takerToken].join('-');
    maxObj[intentKey] = (maxObj[intentKey] || 0) < Number(val) ? val : maxObj[intentKey]; //eslint-disable-line

    return maxObj;
  }, {});
});
/**
 * @function makeGetFormattedLiquidityByTokenPair
 * @description A selector that returns a function that takes a ({makerToken, takerToken}) and returns The sum() (number) of the maker liquidity across all connected makers
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */

var makeGetFormattedLiquidityByTokenPair = (0, _reselect.createSelector)(getLiquidity, _reducers.selectors.makeDisplayByToken, function (liquidityObj, displayByToken) {
  return function (_ref8) {
    var makerToken = _ref8.makerToken,
        takerToken = _ref8.takerToken;
    var val = liquidityObj[[makerToken, takerToken].join('-')];

    if (!val) {
      return 0;
    }

    return displayByToken({
      address: makerToken
    }, val);
  };
});
/**
 * @function makeGetFormattedMaxOrderLiquidityByTokenPair
 * @description A selector that returns a function that takes a ({makerToken, takerToken}) and returns The max() (number) of the maker liquidity across all connected makers
 * @memberof api
 * @param state Redux store state
 * @returns {function(): number}
 */

exports.makeGetFormattedLiquidityByTokenPair = makeGetFormattedLiquidityByTokenPair;
var makeGetFormattedMaxOrderLiquidityByTokenPair = (0, _reselect.createSelector)(getMaxOrderLiquidity, _reducers.selectors.makeDisplayByToken, function (liquidityObj, displayByToken) {
  return function (_ref9) {
    var makerToken = _ref9.makerToken,
        takerToken = _ref9.takerToken;
    var val = liquidityObj[[makerToken, takerToken].join('-')];

    if (!val) {
      return 0;
    }

    return displayByToken({
      address: makerToken
    }, val);
  };
});
exports.makeGetFormattedMaxOrderLiquidityByTokenPair = makeGetFormattedMaxOrderLiquidityByTokenPair;