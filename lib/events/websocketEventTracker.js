"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var ethers = require('ethers');

var blockTracker = require('../blockTracker');

var _require = require('../constants'),
    alchemyWeb3 = _require.alchemyWeb3;

var _require2 = require('./utils'),
    parseEventLog = _require2.parseEventLog,
    fetchLogs = _require2.fetchLogs;

var Interface = ethers.utils.Interface;

function subscribe(_x, _x2, _x3, _x4, _x5, _x6) {
  return _subscribe.apply(this, arguments);
}

function _subscribe() {
  _subscribe = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(contractAddress, abi, topic, fromBlock, callback, parser) {
    var query, logParams, abiInterface, subscription;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = {
              address: contractAddress || undefined,
              topics: topic
            };
            logParams = _.pickBy(_objectSpread({}, query, {
              fromBlock: fromBlock
            }), _.identity);
            abiInterface = new Interface(abi);
            subscription = alchemyWeb3.eth.subscribe('logs', logParams, function (error, log) {
              if (error) {}

              if (parser) {
                callback(parser(parseEventLog(log, abiInterface)));
              } else {
                var parsedEventLog = parseEventLog(log, abiInterface);
                callback([parsedEventLog]);
              }
            });
            return _context2.abrupt("return", subscription);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _subscribe.apply(this, arguments);
}

var EventTracker =
/*#__PURE__*/
function () {
  function EventTracker() {
    _classCallCheck(this, EventTracker);

    this.trackedEvents = [];
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

      function trackEvent(_x7) {
        return _trackEvent.apply(this, arguments);
      }

      return trackEvent;
    }() // eslint-disable-next-line

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

      subscribe(contract, abi, topics, blockNumber, callback, parser);
    } // eslint-disable-next-line

  }, {
    key: "getEventTopics",
    value: function getEventTopics(_ref) {
      var name = _ref.name,
          paramsInputs = _ref.params,
          abi = _ref.abi;
      var params = paramsInputs || {}; // default to empty object if undefined

      var abiInterface = new ethers.utils.Interface(abi);
      var events = abiInterface.events;
      var abiEvent = events[name];

      if (!abiEvent) {
        throw new Error("".concat(name, " not an abi event, possible events are ").concat(_.uniq(_.map(_.values(events), 'name')).join(', ')));
      }

      var paramsArray = abiEvent.inputs.map(function (_ref2) {
        var inputName = _ref2.name;
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