"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash');

var ethers = require('ethers');

var blockTracker = require('../blockTracker');

var _require = require('./utils'),
    fetchLogs = _require.fetchLogs;

var EventTracker =
/*#__PURE__*/
function () {
  function EventTracker() {
    var _this = this;

    _classCallCheck(this, EventTracker);

    this.trackedEvents = [];
    blockTracker.onBlock(function (block) {
      return _this.processBlock(block);
    });
  }

  _createClass(EventTracker, [{
    key: "trackEvent",
    value: function () {
      var _trackEvent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(event) {
        var latestBlockNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return blockTracker.readyPromise;

              case 2:
                latestBlockNumber = blockTracker.getLatestBlockNumber();
                this.subscribeToEvent(event, latestBlockNumber);
                this.trackedEvents.push(event);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function trackEvent(_x) {
        return _trackEvent.apply(this, arguments);
      }

      return trackEvent;
    }()
  }, {
    key: "processBlock",
    value: function processBlock(_ref) {
      var _this2 = this;

      var number = _ref.number;

      if (!this.trackedEvents.length) {
        return;
      }

      this.trackedEvents.map(function (event) {
        return _this2.processEvent(event, number);
      });
    } // eslint-disable-next-line

  }, {
    key: "fetchHistoricalLogs",
    value: function fetchHistoricalLogs(event, contractAddress, abi, topics, fromBlock, toBlock, callback) {
      var onFetchingHistoricalEvents = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _.identity;
      var onFetchedHistoricalEvents = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _.identity;
      var parser = arguments.length > 9 ? arguments[9] : undefined;
      onFetchingHistoricalEvents();
      fetchLogs(contractAddress, abi, topics, fromBlock, toBlock, parser).then(function (events) {
        onFetchedHistoricalEvents(events);
        callback(events);
      });
    }
  }, {
    key: "subscribeToEvent",
    value: function subscribeToEvent(event, blockNumber) {
      //eslint-disable-line
      var contract = event.contract,
          abi = event.abi,
          callback = event.callback,
          parser = event.parser,
          backFillBlockCount = event.backFillBlockCount,
          fromBlock = event.fromBlock,
          onFetchingHistoricalEvents = event.onFetchingHistoricalEvents,
          onFetchedHistoricalEvents = event.onFetchedHistoricalEvents;
      var fromBlockNumberOverride;

      if (!_.isUndefined(fromBlock)) {
        fromBlockNumberOverride = Number(fromBlock);
      } else if (!_.isUndefined(backFillBlockCount)) {
        fromBlockNumberOverride = blockNumber - Number(backFillBlockCount);
      }

      var topics = this.getEventTopics(event);

      if (fromBlockNumberOverride) {
        this.fetchHistoricalLogs(event, contract, abi, topics, fromBlockNumberOverride, blockNumber, callback, onFetchingHistoricalEvents, onFetchedHistoricalEvents, parser);
      }
    }
  }, {
    key: "processEvent",
    value: function processEvent(event, blockNumber) {
      //eslint-disable-line
      var contract = event.contract,
          abi = event.abi,
          callback = event.callback,
          parser = event.parser;
      var topics = this.getEventTopics(event);
      fetchLogs(contract, abi, topics, blockNumber, blockNumber).then(function (logs) {
        callback(parser ? parser(logs) : logs);
      });
    } // eslint-disable-next-line

  }, {
    key: "getEventTopics",
    value: function getEventTopics(_ref2) {
      var name = _ref2.name,
          paramsInputs = _ref2.params,
          abi = _ref2.abi;
      var params = paramsInputs || {}; // default to empty object if undefined

      var abiInterface = new ethers.utils.Interface(abi);
      var events = abiInterface.events;
      var abiEvent = events[name];

      if (!abiEvent) {
        throw new Error("".concat(name, " not an abi event, possible events are ").concat(_.uniq(_.map(_.values(events), 'name')).join(', ')));
      }

      var paramsArray = abiEvent.inputs.map(function (_ref3) {
        var inputName = _ref3.name;
        return _.isUndefined(params[inputName]) ? null : params[inputName];
      });
      return abiEvent.encodeTopics(paramsArray);
    }
  }]);

  return EventTracker;
}();

var eventTracker = new EventTracker(); // USAGE

/*
eventTracker.trackEvent({
  contract: SWAP_LEGACY_CONTRACT_ADDRESS, // optional, the contract that emitted the event. If left out, all events matching that signature will be tracked (for all contracts).
  name: 'Filled', // required, the name of the event emitted by the contract
  params: {
    // optional, indexed params emitted by the contract
    takerToken: '0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6',
  },
  abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS], // required, abi of the contract
  callback: logs => console.log(logs),
  backFillBlockCount: 7000, // optional, if included, first callback execution will include that many blocks BEFORE the current block
})
*/

module.exports = eventTracker;