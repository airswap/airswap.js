"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ethers = require('ethers');

var _ = require('lodash');

var tokenMetadata = require('../tokens');

var _require = require('../constants'),
    httpProvider = _require.httpProvider,
    DELTA_BALANCES_CONTRACT_ADDRESS = _require.DELTA_BALANCES_CONTRACT_ADDRESS,
    abis = _require.abis,
    TOKEN_APPROVAL_CHECK_AMOUNT = _require.TOKEN_APPROVAL_CHECK_AMOUNT,
    ETH_ADDRESS = _require.ETH_ADDRESS;

var defaultProvider = httpProvider;
var deltaBalancesContract = new ethers.Contract(DELTA_BALANCES_CONTRACT_ADDRESS, abis[DELTA_BALANCES_CONTRACT_ADDRESS], defaultProvider);

function getManyBalancesManyAddresses(tokens, addresses) {
  return deltaBalancesContract.allBalancesForManyAccounts(addresses, tokens).then(function (results) {
    var t = tokens.length;

    var balances = _.map(addresses, function (address, i) {
      var bnBalances = results.slice(i * t, (i + 1) * t);
      return [address, _.zipObject(tokens, _.map(bnBalances, function (b) {
        return b.toString();
      }))];
    });

    return _.fromPairs(balances);
  });
}

function getManyAllowancesManyAddresses(tokens, addresses, spender) {
  return deltaBalancesContract.allAllowancesForManyAccounts(addresses, spender, tokens).then(function (results) {
    var t = tokens.length;

    var allAllowances = _.map(addresses, function (address, i) {
      var allowances = results.slice(i * t, (i + 1) * t);
      return [address, _.zipObject(tokens, _.map(allowances, function (b, j) {
        if (tokens[j] === ETH_ADDRESS) {
          return true;
        }

        return Number(b.toString()) > Number(TOKEN_APPROVAL_CHECK_AMOUNT);
      }))];
    });

    return _.fromPairs(allAllowances);
  });
}

function getAirSwapTokenBalancesForManyAddresses(_x) {
  return _getAirSwapTokenBalancesForManyAddresses.apply(this, arguments);
}

function _getAirSwapTokenBalancesForManyAddresses() {
  _getAirSwapTokenBalancesForManyAddresses = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(addresses) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return tokenMetadata.ready;

          case 2:
            return _context.abrupt("return", getManyBalancesManyAddresses(tokenMetadata.tokenAddresses, addresses));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getAirSwapTokenBalancesForManyAddresses.apply(this, arguments);
}

function getAirSwapTokenAllowancesForManyAddresses(_x2, _x3) {
  return _getAirSwapTokenAllowancesForManyAddresses.apply(this, arguments);
}

function _getAirSwapTokenAllowancesForManyAddresses() {
  _getAirSwapTokenAllowancesForManyAddresses = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(addresses, spender) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tokenMetadata.ready;

          case 2:
            return _context2.abrupt("return", getManyAllowancesManyAddresses(tokenMetadata.tokenAddresses, addresses, spender));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getAirSwapTokenAllowancesForManyAddresses.apply(this, arguments);
}

module.exports = {
  getManyBalancesManyAddresses: getManyBalancesManyAddresses,
  getManyAllowancesManyAddresses: getManyAllowancesManyAddresses,
  getAirSwapTokenBalancesForManyAddresses: getAirSwapTokenBalancesForManyAddresses,
  getAirSwapTokenAllowancesForManyAddresses: getAirSwapTokenAllowancesForManyAddresses
};