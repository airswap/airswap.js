"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ethers = require('ethers');

var _require = require('../constants'),
    AIRSWAP_GETH_NODE_ADDRESS = _require.AIRSWAP_GETH_NODE_ADDRESS;

var provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS);
var blocks = {}; // binary search function for finding the closest block to a timestamp

function lookupBlockByTimestamp(_x, _x2) {
  return _lookupBlockByTimestamp.apply(this, arguments);
}

function _lookupBlockByTimestamp() {
  _lookupBlockByTimestamp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(timestamp, blockNumber) {
    var block, firstBlock, lastBlock, differenceInSeconds, averageBlockSeconds, blockNumberDifferenceEstimate, newComparisonBlockNumber, newComparisonBlock, timedifference;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (blockNumber) {
              _context.next = 23;
              break;
            }

            _context.t0 = blocks[1];

            if (_context.t0) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return provider.getBlock(1);

          case 5:
            _context.t0 = _context.sent;

          case 6:
            firstBlock = _context.t0;
            blocks[1] = firstBlock;
            _context.next = 10;
            return provider.getBlock();

          case 10:
            lastBlock = _context.sent;
            blocks[lastBlock.number] = lastBlock;

            if (!(timestamp < firstBlock.timestamp)) {
              _context.next = 16;
              break;
            }

            throw new Error("timestamp preceeds ethereum blockchain, block 1 at ".concat(firstBlock.timestamp));

          case 16:
            if (!(timestamp > lastBlock.timestamp)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", lastBlock.number);

          case 18:
            _context.next = 20;
            return provider.getBlock();

          case 20:
            block = _context.sent;
            _context.next = 29;
            break;

          case 23:
            _context.t1 = blocks[blockNumber];

            if (_context.t1) {
              _context.next = 28;
              break;
            }

            _context.next = 27;
            return provider.getBlock(blockNumber);

          case 27:
            _context.t1 = _context.sent;

          case 28:
            block = _context.t1;

          case 29:
            blocks[block.number] = block;
            differenceInSeconds = timestamp - block.timestamp;
            averageBlockSeconds = 15;
            blockNumberDifferenceEstimate = Math.floor(differenceInSeconds / averageBlockSeconds);
            newComparisonBlockNumber = Math.abs(block.number + blockNumberDifferenceEstimate);
            _context.t2 = blocks[newComparisonBlockNumber];

            if (_context.t2) {
              _context.next = 39;
              break;
            }

            _context.next = 38;
            return provider.getBlock(newComparisonBlockNumber);

          case 38:
            _context.t2 = _context.sent;

          case 39:
            newComparisonBlock = _context.t2;
            blocks[newComparisonBlock.number] = newComparisonBlock;
            timedifference = timestamp - newComparisonBlock.timestamp;

            if (!(Math.abs(timedifference) < averageBlockSeconds)) {
              _context.next = 44;
              break;
            }

            return _context.abrupt("return", newComparisonBlockNumber);

          case 44:
            return _context.abrupt("return", lookupBlockByTimestamp(timestamp, newComparisonBlockNumber));

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _lookupBlockByTimestamp.apply(this, arguments);
}

module.exports = {
  lookupBlockByTimestamp: lookupBlockByTimestamp
};