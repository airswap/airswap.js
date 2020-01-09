"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var ethers = require('ethers');

var _require = require('../constants'),
    httpProvider = _require.httpProvider,
    ERC20abi = _require.ERC20abi,
    abis = _require.abis,
    SWAP_LEGACY_CONTRACT_ADDRESS = _require.SWAP_LEGACY_CONTRACT_ADDRESS,
    SWAP_CONTRACT_ADDRESS = _require.SWAP_CONTRACT_ADDRESS;

var _require2 = require('../utils/gethRead'),
    getLogs = _require2.getLogs;

var queries = {};
var _ethers$utils = ethers.utils,
    hexlify = _ethers$utils.hexlify,
    hexStripZeros = _ethers$utils.hexStripZeros;

function fetchLogs(_x, _x2, _x3, _x4, _x5) {
  return _fetchLogs.apply(this, arguments);
}

function _fetchLogs() {
  _fetchLogs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(contractAddress, abi, topic, fromBlock, toBlock) {
    var toBlockOverride, fromBlockOverride, topicParam, query, logs, logParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_.isUndefined(toBlock) || _.isNull(toBlock))) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return httpProvider.getBlockNumber();

          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = Number(toBlock);

          case 7:
            toBlockOverride = _context.t0;
            fromBlockOverride = _.isUndefined(fromBlock) || _.isNull(fromBlock) ? Number(toBlockOverride) - 7000 : Number(fromBlock); // default is around 1 day of blocks

            if (topic) {
              if (_.isArray(topic)) {
                topicParam = topic;
              } else {
                topicParam = [topic];
              }
            }

            query = {
              address: contractAddress || undefined,
              topics: topicParam
            };
            logParams = [_objectSpread({}, query, {
              fromBlock: hexStripZeros(hexlify(fromBlockOverride)),
              toBlock: hexStripZeros(hexlify(toBlockOverride))
            })];
            _context.prev = 12;
            _context.next = 15;
            return getLogs(logParams);

          case 15:
            logs = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](12);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              setTimeout(function () {
                return fetchLogs(contractAddress, abi, topic, fromBlock, toBlock).then(resolve).catch(reject);
              }, 1000);
            }));

          case 21:
            return _context.abrupt("return", parseEventLogs(logs, abi));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 18]]);
  }));
  return _fetchLogs.apply(this, arguments);
}

var abiInterfaces = {};

function parseEventLogs(logs, abi) {
  return _.compact(logs.map(function (log) {
    var abiInterface;

    if (abiInterfaces[log.address]) {
      abiInterface = abiInterfaces[log.address];
    } else {
      abiInterface = new ethers.utils.Interface(abi);
      abiInterfaces[log.address] = abiInterface;
    }

    var parsedLog;

    try {
      parsedLog = abiInterface.parseLog(log);
    } catch (e) {
      // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
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
        removed = log.removed;
    var _parsedLog = parsedLog,
        name = _parsedLog.name,
        signature = _parsedLog.signature,
        topic = _parsedLog.topic;
    return _objectSpread({}, {
      address: address,
      topics: topics,
      data: data,
      blockNumber: ethers.utils.bigNumberify(blockNumber).toNumber(),
      transactionHash: transactionHash,
      removed: removed
    }, {
      name: name,
      signature: signature,
      topic: topic
    }, {
      values: formattedLogValues,
      parsedLogValues: parsedLogValues
    });
  }));
}

function pollLogs(_x6, _x7, _x8, _x9, _x10) {
  return _pollLogs.apply(this, arguments);
}

function _pollLogs() {
  _pollLogs = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(successCallback, failureCallback, contractAddress, abi, topic) {
    var query;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = {
              contractAddress: contractAddress,
              abi: abi,
              topic: topic
            };
            queries[JSON.stringify(query)] = {
              query: query,
              successCallback: successCallback
            };

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _pollLogs.apply(this, arguments);
}

function fetchExchangeLogs(eventName, fromBlock, toBlock) {
  var abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS]);
  var topic = eventName ? abiInterface.events[eventName].topic : null;
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topic, fromBlock, toBlock);
}

var swapLegacyContractCreationBlock = "0x".concat(4349701 .toString(16));

function fetchFilledExchangeLogsForMakerAddress(makerAddress) {
  var fromBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : swapLegacyContractCreationBlock;
  var abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS]);
  var topics = abiInterface.events.Filled.encodeTopics([makerAddress.toLowerCase()]);
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock);
}

function fetchCanceledExchangeLogsForMakerAddress(makerAddress) {
  var fromBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : swapLegacyContractCreationBlock;
  var abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS]);
  var topics = abiInterface.events.Canceled.encodeTopics([makerAddress.toLowerCase()]);
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock);
}

function fetchFailedExchangeLogsForMakerAddress(makerAddress) {
  var fromBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : swapLegacyContractCreationBlock;
  var abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS]);
  var topics = abiInterface.events.Failed.encodeTopics([null, makerAddress.toLowerCase()]);
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock);
}

function fetchSwapFillsForMakerAddress(makerAddress) {
  var fromBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var abiInterface = new ethers.utils.Interface(abis[SWAP_CONTRACT_ADDRESS]);
  var topics = abiInterface.events.Swap.encodeTopics([null, null, makerAddress.toLowerCase()]);
  return fetchLogs(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], topics, fromBlock);
}

function fetchSwapCancelsForMakerAddress(makerAddress) {
  var fromBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var abiInterface = new ethers.utils.Interface(abis[SWAP_CONTRACT_ADDRESS]);
  var topics = abiInterface.events.Cancel.encodeTopics([null, makerAddress.toLowerCase()]);
  return fetchLogs(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], topics, fromBlock);
}

function fetchERC20Logs(contractAddress, eventName, fromBlock, toBlock) {
  var abiInterface = new ethers.utils.Interface(ERC20abi);
  var topic = eventName ? abiInterface.events[eventName].topic : null;
  return fetchLogs(contractAddress, ERC20abi, topic, fromBlock, toBlock);
}

function buildGlobalERC20TransfersTopics(addresses) {
  var erc20ABIInterface = new ethers.utils.Interface(ERC20abi);
  var addressTopics = addresses.map(function (address) {
    return _.last(erc20ABIInterface.events.Transfer.encodeTopics([address.toLowerCase()]));
  });
  var fromTopics = [erc20ABIInterface.events.Transfer.topic, addressTopics, null];
  var toTopics = [erc20ABIInterface.events.Transfer.topic, null, addressTopics];
  return {
    fromTopics: fromTopics,
    toTopics: toTopics
  };
}

function fetchGlobalERC20TransfersFrom(_x11, _x12, _x13) {
  return _fetchGlobalERC20TransfersFrom.apply(this, arguments);
}

function _fetchGlobalERC20TransfersFrom() {
  _fetchGlobalERC20TransfersFrom = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(addresses, fromBlock, toBlock) {
    var _buildGlobalERC20Tran, fromTopics;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _buildGlobalERC20Tran = buildGlobalERC20TransfersTopics(addresses), fromTopics = _buildGlobalERC20Tran.fromTopics;
            return _context3.abrupt("return", fetchLogs(null, ERC20abi, fromTopics, fromBlock, toBlock));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _fetchGlobalERC20TransfersFrom.apply(this, arguments);
}

function fetchGlobalERC20TransfersTo(_x14, _x15, _x16) {
  return _fetchGlobalERC20TransfersTo.apply(this, arguments);
}

function _fetchGlobalERC20TransfersTo() {
  _fetchGlobalERC20TransfersTo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(addresses, fromBlock, toBlock) {
    var _buildGlobalERC20Tran2, toTopics;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _buildGlobalERC20Tran2 = buildGlobalERC20TransfersTopics(addresses), toTopics = _buildGlobalERC20Tran2.toTopics;
            return _context4.abrupt("return", fetchLogs(null, ERC20abi, toTopics, fromBlock, toBlock));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _fetchGlobalERC20TransfersTo.apply(this, arguments);
}

function fetchGlobalERC20Transfers(_x17, _x18, _x19) {
  return _fetchGlobalERC20Transfers.apply(this, arguments);
} // EXAMPLES
//
// ** fetch all ERC20 Approvals **
// fetchERC20Logs(null, 'Approval')
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch all AST transfers **
// fetchERC20Logs(AST_CONTRACT_ADDRESS, 'Transfer')
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch all Airswap Exchange Contract events  **
// fetchExchangeLogs()
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch global ERC20 transfer events for eth addresses passed in  **
//  fetchGlobalERC20Transfers(['0xDead0717B16b9F56EB6e308E4b29230dc0eEE0B6', '0x1550d41be3651686e1aeeea073d8d403d0bd2e30'])
//   .then(console.log)
//   .catch(console.log)


function _fetchGlobalERC20Transfers() {
  _fetchGlobalERC20Transfers = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(addresses, fromBlock, toBlock) {
    var events;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = _;
            _context5.next = 3;
            return Promise.all([fetchGlobalERC20TransfersFrom(addresses, fromBlock, toBlock), fetchGlobalERC20TransfersTo(addresses, fromBlock, toBlock)]);

          case 3:
            _context5.t1 = _context5.sent;
            events = _context5.t0.flatten.call(_context5.t0, _context5.t1);
            return _context5.abrupt("return", _.uniqBy(events, function (_ref) {
              var parsedLogValues = _ref.parsedLogValues,
                  transactionHash = _ref.transactionHash;
              return "".concat(transactionHash).concat(parsedLogValues[0]).concat(parsedLogValues[1]).concat(parsedLogValues[2]);
            } // generates unique id for transfer event, since one transactionHash can have multiple transfers
            ));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _fetchGlobalERC20Transfers.apply(this, arguments);
}

module.exports = {
  fetchLogs: fetchLogs,
  pollLogs: pollLogs,
  fetchExchangeLogs: fetchExchangeLogs,
  fetchERC20Logs: fetchERC20Logs,
  fetchGlobalERC20Transfers: fetchGlobalERC20Transfers,
  buildGlobalERC20TransfersTopics: buildGlobalERC20TransfersTopics,
  fetchFilledExchangeLogsForMakerAddress: fetchFilledExchangeLogsForMakerAddress,
  fetchCanceledExchangeLogsForMakerAddress: fetchCanceledExchangeLogsForMakerAddress,
  fetchFailedExchangeLogsForMakerAddress: fetchFailedExchangeLogsForMakerAddress,
  fetchSwapFillsForMakerAddress: fetchSwapFillsForMakerAddress,
  fetchSwapCancelsForMakerAddress: fetchSwapCancelsForMakerAddress
};