"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ethers = require('ethers');

var _ = require('lodash');

var _require = require('../utils/gethRead'),
    getLogs = _require.getLogs;

function getEventId(_ref) {
  var transactionHash = _ref.transactionHash,
      logIndex = _ref.logIndex;
  return "".concat(transactionHash, "-").concat(logIndex);
}

function parseEventLog(log, abiInterface) {
  var parsedLog;

  try {
    parsedLog = abiInterface.parseLog(log);
  } catch (e) {
    // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
    return null;
  }

  if (!parsedLog) {
    return null;
  }

  var parsedLogValues = _.mapValues(parsedLog.values, function (v) {
    return ((v.toString ? v.toString() : v) || '').toLowerCase();
  }); // converts bignumbers to strings and lowercases everything (most importantly addresses)


  var argumentRange = _.range(Number(parsedLogValues.length)).map(function (p) {
    return p.toString();
  });

  var formattedLogValues = _.pickBy(parsedLogValues, function (param, key) {
    return !_.includes(argumentRange, key) && key !== 'length';
  } // removes some extra junk ethers puts in the parsed logs
  );

  var address = log.address,
      topics = log.topics,
      data = log.data,
      blockNumber = log.blockNumber,
      transactionHash = log.transactionHash,
      removed = log.removed,
      transactionIndex = log.transactionIndex,
      logIndex = log.logIndex;
  var _parsedLog = parsedLog,
      name = _parsedLog.name,
      signature = _parsedLog.signature,
      topic = _parsedLog.topic;
  return _objectSpread({}, {
    address: address.toLowerCase(),
    topics: topics,
    data: data,
    blockNumber: ethers.utils.bigNumberify(blockNumber).toNumber(),
    transactionIndex: ethers.utils.bigNumberify(transactionIndex).toNumber(),
    logIndex: ethers.utils.bigNumberify(logIndex).toNumber(),
    transactionHash: transactionHash,
    removed: removed
  }, {
    name: name,
    signature: signature,
    topic: topic
  }, {
    values: formattedLogValues
  });
}

var _ethers$utils = ethers.utils,
    hexlify = _ethers$utils.hexlify,
    hexStripZeros = _ethers$utils.hexStripZeros;

function fetchLogs(_x, _x2, _x3, _x4, _x5, _x6) {
  return _fetchLogs.apply(this, arguments);
}

function _fetchLogs() {
  _fetchLogs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(contractAddress, abi, topic, fromBlock, toBlock, parser) {
    var query, logs, logParams, parsedEventLogs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = {
              address: contractAddress || undefined,
              topics: _.isArray(topic) ? topic : [topic]
            };
            logParams = [_objectSpread({}, query, {
              fromBlock: hexStripZeros(hexlify(fromBlock)),
              toBlock: hexStripZeros(hexlify(toBlock))
            })];
            _context.prev = 2;
            _context.next = 5;
            return getLogs(logParams);

          case 5:
            logs = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              setTimeout(function () {
                return fetchLogs(contractAddress, abi, topic, fromBlock, toBlock, parser).then(resolve).catch(reject);
              }, 1000);
            }));

          case 11:
            parsedEventLogs = parseEventLogs(logs, abi);
            return _context.abrupt("return", parser ? parser(parsedEventLogs) : parsedEventLogs);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8]]);
  }));
  return _fetchLogs.apply(this, arguments);
}

var abiInterfaces = {};

function parseEventLogs(logs, abi) {
  if (logs.length === 0) {
    return logs;
  }

  var _logs = _slicedToArray(logs, 1),
      firstLog = _logs[0];

  var abiInterface;

  if (abiInterfaces[firstLog.address]) {
    abiInterface = abiInterfaces[firstLog.address];
  } else {
    abiInterface = new ethers.utils.Interface(abi);
    abiInterfaces[firstLog.address] = abiInterface;
  }

  return _.compact(logs.map(function (log) {
    return parseEventLog(log, abiInterface);
  }));
}

module.exports = {
  getEventId: getEventId,
  parseEventLog: parseEventLog,
  fetchLogs: fetchLogs
};