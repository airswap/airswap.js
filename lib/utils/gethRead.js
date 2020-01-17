"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var ethers = require('ethers');

var _require = require('../constants'),
    alchemyWeb3 = _require.alchemyWeb3,
    httpProvider = _require.httpProvider,
    NO_ALCHEMY_WEBSOCKETS = _require.NO_ALCHEMY_WEBSOCKETS;

function send(_x) {
  return _send.apply(this, arguments);
}

function _send() {
  _send = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var method, params;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = _ref.method, params = _ref.params;
            return _context.abrupt("return", NO_ALCHEMY_WEBSOCKETS ? httpProvider.send(method, params) : alchemyWeb3.currentProvider.send(method, params));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _send.apply(this, arguments);
}

function fetchBlock(blockNumber) {
  var includeFullTransactions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var method = {
    method: 'eth_getBlockByNumber',
    params: [ethers.utils.hexlify(blockNumber), includeFullTransactions] // [hex block number, include full transactions boolean]

  };
  return send(method).then(parseBlock);
}

function fetchLatestBlock() {
  var includeFullTransactions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var method = {
    method: 'eth_getBlockByNumber',
    params: ['latest', includeFullTransactions] // [hex block number, include full transactions boolean]

  };
  return send(method).then(parseBlock);
}

function fetchCurrentBlockNumber() {
  var method = {
    method: 'eth_blockNumber',
    params: []
  };
  return send(method).then(hexToInt);
}

function fetchPendingBlock() {
  var includeFullTransactions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var method = {
    method: 'eth_getBlockByNumber',
    params: ['pending', includeFullTransactions] // [hex block number, include full transactions boolean]

  };
  return send(method).then(parseBlock);
}

function parseBlock(block) {
  if (!block) {
    return block;
  }

  var numberFields = _.mapValues(_.pick(block, ['number', 'timestamp']), hexToInt);

  return _objectSpread({}, block, numberFields, {
    transactions: block.transactions.map(parseTransaction)
  });
}

function parseTransaction(transaction) {
  if (_.isString(transaction)) {
    return transaction;
  }

  var numberFields = _.mapValues(_.pick(transaction, ['gas', 'gasPrice', 'transactionIndex', 'value']), hexToInt);

  return _objectSpread({}, transaction, numberFields);
}

function getLogs(params) {
  var method = {
    method: 'eth_getLogs',
    params: params
  };
  return send(method);
}

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16);
}

function call(_x2) {
  return _call.apply(this, arguments);
}

function _call() {
  _call = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(txObj) {
    var blockTag,
        method,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            blockTag = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'latest';
            method = {
              method: 'eth_call',
              params: [txObj, blockTag]
            };
            return _context2.abrupt("return", send(method));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _call.apply(this, arguments);
}

module.exports = {
  fetchBlock: fetchBlock,
  fetchLatestBlock: fetchLatestBlock,
  getLogs: getLogs,
  call: call,
  fetchPendingBlock: fetchPendingBlock,
  fetchCurrentBlockNumber: fetchCurrentBlockNumber,
  alchemyWeb3: alchemyWeb3
};