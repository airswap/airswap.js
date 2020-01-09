"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash');

var _require = require('../utils/gethRead'),
    fetchBlock = _require.fetchBlock,
    fetchCurrentBlockNumber = _require.fetchCurrentBlockNumber;

var BlockTracker =
/*#__PURE__*/
function () {
  function BlockTracker() {
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    var blockMemoryLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;

    _classCallCheck(this, BlockTracker);

    this.interval = interval;
    this.blockMemoryLimit = blockMemoryLimit;
    this.blocks = {};
    this.blockProcessors = [];
    this.readyPromise = this.init();
  }

  _createClass(BlockTracker, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var blockNumber, block;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchCurrentBlockNumber();

              case 2:
                blockNumber = _context.sent;
                _context.next = 5;
                return fetchBlock(blockNumber);

              case 5:
                block = _context.sent;
                this.blocks[block.number] = block;
                this.pollForNextBlock();
                return _context.abrupt("return", true);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "onBlock",
    value: function () {
      var _onBlock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(processNewBlock) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.readyPromise;

              case 2:
                processNewBlock(this.getLatestBlock());
                this.blockProcessors.push(processNewBlock);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onBlock(_x) {
        return _onBlock.apply(this, arguments);
      }

      return onBlock;
    }()
  }, {
    key: "getSortedBlocks",
    value: function getSortedBlocks() {
      return _.sortBy(_.values(this.blocks), 'number');
    }
  }, {
    key: "getLatestBlock",
    value: function getLatestBlock() {
      return _.last(this.getSortedBlocks());
    }
  }, {
    key: "getLatestBlockNumber",
    value: function getLatestBlockNumber() {
      return _.get(this.getLatestBlock(), 'number');
    }
  }, {
    key: "getOldestBlock",
    value: function getOldestBlock() {
      return _.head(this.getSortedBlocks());
    }
  }, {
    key: "getOldestBlockNumber",
    value: function getOldestBlockNumber() {
      return _.get(this.getOldestBlock(), 'number');
    }
  }, {
    key: "pollForNextBlock",
    value: function () {
      var _pollForNextBlock = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this = this;

        var currentBlockNumber, oldestBlockNumber, latestBlock, latestBlockNumber, range;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentBlockNumber = this.getLatestBlockNumber();
                oldestBlockNumber = this.getOldestBlockNumber();
                _context4.prev = 2;
                _context4.next = 5;
                return fetchCurrentBlockNumber();

              case 5:
                latestBlockNumber = _context4.sent;

                if (!(latestBlockNumber > currentBlockNumber)) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 9;
                return fetchBlock(latestBlockNumber);

              case 9:
                latestBlock = _context4.sent;
                this.blocks[latestBlock.number] = latestBlock; // free up memory if limit is set

                if (Object.keys(this.blocks).length > this.blockMemoryLimit) {
                  delete this.blocks[oldestBlockNumber];
                }

                this.blockProcessors.map(function (processNewBlock) {
                  return processNewBlock(latestBlock);
                });

                if (latestBlock.number > currentBlockNumber + 1) {
                  range = _.range(currentBlockNumber + 1, latestBlock.number);
                  range.map(
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee3(n) {
                      var missedBlock;
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return fetchBlock(n);

                            case 2:
                              missedBlock = _context3.sent;
                              _this.blocks[missedBlock.number] = missedBlock;

                              _this.blockProcessors.map(function (processNewBlock) {
                                return processNewBlock(missedBlock);
                              });

                            case 5:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, this);
                    }));

                    return function (_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }

              case 14:
                _context4.next = 18;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](2);

              case 18:
                setTimeout(this.pollForNextBlock.bind(this), this.interval);

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 16]]);
      }));

      function pollForNextBlock() {
        return _pollForNextBlock.apply(this, arguments);
      }

      return pollForNextBlock;
    }()
  }]);

  return BlockTracker;
}();

module.exports = new BlockTracker();