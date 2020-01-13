"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = balancesMiddleware;
exports.gotTokenApprovals = exports.gotSwapTokenApprovals = exports.gotTokenBalances = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _index = require("../index");

var _reducers = require("../../wallet/redux/reducers");

var _redux = require("../../tokens/redux");

var _constants = require("../../constants");

var _event = require("../../utils/redux/templates/event");

var _actions = require("./actions");

var _reducers2 = require("./reducers");

var _debouncedQueue = _interopRequireDefault(require("../../utils/debouncedQueue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var gotTokenBalances = function gotTokenBalances(balances) {
  return {
    type: 'GOT_TOKEN_BALANCES',
    balances: balances
  };
};

exports.gotTokenBalances = gotTokenBalances;

var gotSwapTokenApprovals = function gotSwapTokenApprovals(approvals) {
  return {
    type: 'GOT_SWAP_TOKEN_ALLOWANCES',
    approvals: approvals
  };
};

exports.gotSwapTokenApprovals = gotSwapTokenApprovals;

var gotTokenApprovals = function gotTokenApprovals(approvals) {
  return {
    type: 'GOT_TOKEN_ALLOWANCES',
    approvals: approvals
  };
};

exports.gotTokenApprovals = gotTokenApprovals;
var websocketChunkSize = 20;
var balancesQueue;

function loadBalancesForTokenAddressMap(tokenAddressMap) {
  _lodash.default.mapValues(tokenAddressMap, function (tokens, address) {
    _lodash.default.chunk(tokens, websocketChunkSize).map(function (tokenSubset) {
      // We have to make sure an individual eth_call doesn't get too big or it will crash websocket providers that have a max packet size
      (0, _index.getManyBalancesManyAddresses)(tokenSubset, [address]).then(function (results) {
        balancesQueue.push(results);
      });
    });
  });
}

var swapAllowancesQueue;

function loadSwapAllowancesForTokenAddressMap(tokenAddressMap) {
  _lodash.default.mapValues(tokenAddressMap, function (tokens, address) {
    _lodash.default.chunk(tokens, websocketChunkSize).map(function (tokenSubset) {
      (0, _index.getManyAllowancesManyAddresses)(tokenSubset, [address], _constants.SWAP_CONTRACT_ADDRESS).then(function (results) {
        swapAllowancesQueue.push(results);
      });
    });
  });
}

var swapLegacyAllowancesQueue;

function loadSwapLegacyAllowancesForTokenAddressMap(tokenAddressMap) {
  _lodash.default.mapValues(tokenAddressMap, function (tokens, address) {
    _lodash.default.chunk(tokens, websocketChunkSize).map(function (tokenSubset) {
      // We have to make sure an individual eth_call doesn't get too big or it will crash websocket providers that have a max packet size
      (0, _index.getManyAllowancesManyAddresses)(tokenSubset, [address], _constants.SWAP_LEGACY_CONTRACT_ADDRESS).then(function (results) {
        swapLegacyAllowancesQueue.push(results);
      });
    });
  });
}

function reduceERC20LogsToTokenAddressMap(logs) {
  var tokenAddressMap = _lodash.default.reduce(logs, function (obj, log) {
    var values = _lodash.default.values(log.values);

    var tokenAddress = log.address;

    var _values = _slicedToArray(values, 2),
        address1 = _values[0],
        address2 = _values[1];

    obj[address1] = _lodash.default.isArray(obj[address1]) ? _lodash.default.uniq([].concat(_toConsumableArray(obj[address1]), [tokenAddress])) : [tokenAddress]; //eslint-disable-line

    obj[address2] = _lodash.default.isArray(obj[address2]) ? _lodash.default.uniq([].concat(_toConsumableArray(obj[address2]), [tokenAddress])) : [tokenAddress]; //eslint-disable-line

    return obj;
  }, {});

  return tokenAddressMap;
}

function reduceSwapFillsLogsToTokenAddressMap(logs) {
  var parsedLogs = _lodash.default.reduce(logs, function (obj, log) {
    var _log$values = log.values,
        makerWallet = _log$values.makerWallet,
        takerWallet = _log$values.takerWallet,
        makerToken = _log$values.makerToken,
        takerToken = _log$values.takerToken;
    obj[makerWallet] = _lodash.default.isArray(obj[makerWallet]) //eslint-disable-line
    ? _lodash.default.uniq([].concat(_toConsumableArray(obj[makerWallet]), [makerToken, takerToken])) : [makerToken, takerToken];
    obj[takerWallet] = _lodash.default.isArray(obj[takerWallet]) //eslint-disable-line
    ? _lodash.default.uniq([].concat(_toConsumableArray(obj[takerWallet]), [makerToken, takerToken])) : [takerToken, takerToken];
    return obj;
  }, {});

  return parsedLogs;
}

function reduceBlockTransactionsToTokenAddressMap(block) {
  var blockAddresses = _lodash.default.reduce(block.transactions, function (addressesAccumulator, _ref) {
    var to = _ref.to,
        from = _ref.from;
    return _lodash.default.uniq(_lodash.default.compact([(to || '').toLowerCase(), (from || '').toLowerCase()].concat(_toConsumableArray(addressesAccumulator))));
  }, []);

  return _lodash.default.zipObject(blockAddresses, blockAddresses.map(function () {
    return [_constants.ETH_ADDRESS];
  }));
}

function filterTokenAddressMapByTrackedAddresses(tokenAddressMap, store) {
  var trackedTokensByAddress = _reducers2.selectors.getTrackedTokensByAddress(store.getState());

  var mappedValues = _lodash.default.mapValues(tokenAddressMap, function (tokenAddresses, walletAddress) {
    var intersection = _lodash.default.intersection(trackedTokensByAddress[walletAddress], tokenAddresses);

    return intersection.length ? intersection : null;
  });

  var cleanedMappedValues = _lodash.default.pickBy(mappedValues, _lodash.default.identity);

  return cleanedMappedValues;
}

function initializeTrackedAddresses(store) {
  var state = store.getState();

  var balances = _reducers2.selectors.getBalances(state);

  var trackedAddresses = _reducers2.selectors.getTrackedAddresses(state);

  var uninitializedTrackedAddresses = _lodash.default.filter(trackedAddresses, function (_ref2) {
    var address = _ref2.address,
        tokenAddress = _ref2.tokenAddress;
    return _lodash.default.isUndefined(_lodash.default.get(balances, "".concat(address, ".").concat(tokenAddress)));
  });

  var uninitializedTrackedTokensByAddress = _lodash.default.reduce(uninitializedTrackedAddresses, function (obj, _ref3) {
    var address = _ref3.address,
        tokenAddress = _ref3.tokenAddress;

    if (_lodash.default.isArray(obj[address])) {
      obj[address] = _lodash.default.uniq([].concat(_toConsumableArray(obj[address]), [tokenAddress])); // eslint-disable-line
    } else {
      obj[address] = [tokenAddress]; // eslint-disable-line
    }

    return obj;
  }, {});

  loadBalancesForTokenAddressMap(uninitializedTrackedTokensByAddress, store);
  loadSwapAllowancesForTokenAddressMap(uninitializedTrackedTokensByAddress, store);
  loadSwapLegacyAllowancesForTokenAddressMap(uninitializedTrackedTokensByAddress, store);
}

function addConnectedAddressToTrackedAddresses(store) {
  var tokens = process.env.INSTANT ? _redux.selectors.getAvailableTokens(store.getState()) : _redux.selectors.getAirSwapApprovedTokens(store.getState());

  var approvedTokens = _lodash.default.filter(tokens, function (t) {
    return t.kind !== 'ERC721';
  });

  var connectedAddress = (0, _reducers.getConnectedWalletAddress)(store.getState());

  if (approvedTokens.length && connectedAddress) {
    var tokenAddresses = _lodash.default.map(approvedTokens, 'address');

    var trackedAddresses = tokenAddresses.map(function (tokenAddress) {
      return {
        address: connectedAddress,
        tokenAddress: tokenAddress
      };
    });
    store.dispatch((0, _actions.addTrackedAddresses)(trackedAddresses));
  }
}

function balancesMiddleware(store) {
  balancesQueue = new _debouncedQueue.default(function (results) {
    var mergedResults = _lodash.default.merge.apply(_lodash.default, [{}].concat(_toConsumableArray(results)));

    store.dispatch(gotTokenBalances(mergedResults));
  }, 500);
  swapAllowancesQueue = new _debouncedQueue.default(function (results) {
    var mergedResults = _lodash.default.merge.apply(_lodash.default, [{}].concat(_toConsumableArray(results)));

    store.dispatch(gotSwapTokenApprovals(mergedResults));
  }, 500);
  swapLegacyAllowancesQueue = new _debouncedQueue.default(function (results) {
    var mergedResults = _lodash.default.merge.apply(_lodash.default, [{}].concat(_toConsumableArray(results)));

    store.dispatch(gotTokenApprovals(mergedResults));
  }, 500);
  return function (next) {
    return function (action) {
      var state = store.getState();
      var address = (0, _reducers.getConnectedWalletAddress)(state);

      var connectedTokenAddressMap = _lodash.default.pick(_reducers2.selectors.getTrackedTokensByAddress(state), [address]);

      switch (action.type) {
        case 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS':
          loadBalancesForTokenAddressMap(connectedTokenAddressMap, store);
          break;

        case 'GET_TOKEN_BALANCES_FOR_CONNECTED_ADDRESS':
          loadBalancesForTokenAddressMap(_defineProperty({}, address, action.tokens), store);
          break;

        case 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS':
          loadSwapAllowancesForTokenAddressMap(connectedTokenAddressMap, store);
          loadSwapLegacyAllowancesForTokenAddressMap(connectedTokenAddressMap, store);
          break;

        case 'GET_TOKEN_ALLOWANCES_FOR_CONNECTED_ADDRESS':
          loadSwapAllowancesForTokenAddressMap(_defineProperty({}, address, action.tokens), store);
          loadSwapLegacyAllowancesForTokenAddressMap(_defineProperty({}, address, action.tokens), store);
          break;

        case (0, _event.makeEventActionTypes)('erc20Transfers').got:
          var erc20Logs = _lodash.default.get(action, 'response', []);

          var tokenAddressMap = filterTokenAddressMapByTrackedAddresses(reduceERC20LogsToTokenAddressMap(erc20Logs), store);
          loadBalancesForTokenAddressMap(tokenAddressMap, store);
          break;

        case (0, _event.makeEventActionTypes)('trackedEvents').got:
          var response = _lodash.default.get(action, 'response', []);

          var swapLogs = _lodash.default.filter(response, {
            name: 'Swap'
          });

          var swapTokenAddressMap = filterTokenAddressMapByTrackedAddresses(reduceSwapFillsLogsToTokenAddressMap(swapLogs), store);
          loadBalancesForTokenAddressMap(swapTokenAddressMap, store);
          break;

        case 'GOT_LATEST_BLOCK':
          var bts = reduceBlockTransactionsToTokenAddressMap(action.block);
          var blockTokenAddressMap = filterTokenAddressMapByTrackedAddresses(bts, store);
          loadBalancesForTokenAddressMap(blockTokenAddressMap, store);
          break;

        default:
      }

      next(action); // next(action) mutates the store with the action synchronously, so everything below uses the state after the action occurs

      switch (action.type) {
        case 'ADD_TRACKED_ADDRESSES':
          initializeTrackedAddresses(store);
          break;

        case 'ADD_TRACKED_ADDRESS':
          initializeTrackedAddresses(store);
          break;

        case 'CONNECTED_WALLET':
          addConnectedAddressToTrackedAddresses(store);
          break;

        case 'TOKENS_LOADED':
          // since we track all approved tokens for the connected address, we need to check on both CONNECTED_WALLET and TOKENS_LOADED actions
          addConnectedAddressToTrackedAddresses(store);
          break;

        default:
      }
    };
  };
}