"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transactionTrackerMiddleware;

var _lodash = _interopRequireDefault(require("lodash"));

var _ethers = require("ethers");

var _transformations = require("../../utils/transformations");

var _revertReason = _interopRequireDefault(require("../../utils/revertReason"));

var _constants = require("../../constants");

var _reducers = require("../../abis/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var submitting = function submitting(_ref) {
  var id = _ref.id,
      namespace = _ref.namespace,
      name = _ref.name,
      parameters = _ref.parameters;
  return {
    type: 'SUBMITTING_TRANSACTION',
    id: id,
    namespace: namespace,
    name: name,
    parameters: parameters
  };
};

var errorSubmitting = function errorSubmitting(_ref2) {
  var id = _ref2.id,
      namespace = _ref2.namespace,
      name = _ref2.name,
      error = _ref2.error;
  return {
    type: 'ERROR_SUBMITTING_TRANSACTION',
    id: id,
    namespace: namespace,
    name: name,
    error: error
  };
};

var submitted = function submitted(_ref3) {
  var id = _ref3.id,
      namespace = _ref3.namespace,
      name = _ref3.name,
      transaction = _ref3.transaction;
  return {
    type: 'SUBMITTED_TRANSACTION',
    id: id,
    namespace: namespace,
    name: name,
    transaction: transaction
  };
};

var mined = function mined(_ref4) {
  var id = _ref4.id,
      namespace = _ref4.namespace,
      name = _ref4.name,
      transactionReceipt = _ref4.transactionReceipt;
  return {
    type: 'MINED_TRANSACTION',
    id: id,
    namespace: namespace,
    name: name,
    transactionReceipt: transactionReceipt
  };
};

var errorMining = function errorMining(_ref5) {
  var id = _ref5.id,
      namespace = _ref5.namespace,
      name = _ref5.name,
      transactionReceipt = _ref5.transactionReceipt,
      error = _ref5.error;
  return {
    type: 'ERROR_MINING_TRANSACTION',
    id: id,
    namespace: namespace,
    name: name,
    transactionReceipt: transactionReceipt,
    error: error
  };
};

function parseEventLog(log, abiInterface) {
  var parsedLog;

  try {
    parsedLog = abiInterface.parseLog(log);
  } catch (e) {
    // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
    return null;
  }

  var parsedLogValues = _lodash.default.mapValues(parsedLog.values, function (v) {
    return ((v.toString ? v.toString() : v) || '').toLowerCase();
  }); // converts bignumbers to strings and lowercases everything (most importantly addresses)


  var argumentRange = _lodash.default.range(Number(parsedLogValues.length)).map(function (p) {
    return p.toString();
  });

  var formattedLogValues = _lodash.default.pickBy(parsedLogValues, function (param, key) {
    return !_lodash.default.includes(argumentRange, key) && key !== 'length';
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
    address: address,
    topics: topics,
    data: data,
    blockNumber: _ethers.ethers.utils.bigNumberify(blockNumber).toNumber(),
    transactionIndex: _ethers.ethers.utils.bigNumberify(transactionIndex).toNumber(),
    logIndex: _ethers.ethers.utils.bigNumberify(logIndex).toNumber(),
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

function trackTransaction(_x, _x2) {
  return _trackTransaction.apply(this, arguments);
} // {
//   type: 'TRANSACTION_LOG_EVENT',
//     event: {
//   address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     topics: [
//     '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
//     '0x00000000000000000000000015fc598e31b98d73a7d56e10f079b827cb97af82'
//   ],
//     data: '0x00000000000000000000000000000000000000000000000000005af3107a4000',
//     blockNumber: 5044840,
//     transactionIndex: 7,
//     logIndex: 7,
//     transactionHash: '0x83de8d44a545c37daf57158ba4eb8b5b744e34582b25e0477436d03191794480',
//     name: 'Deposit',
//     signature: 'Deposit(address,uint256)',
//     topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
//     values: {
//     owner: '0x15fc598e31b98d73a7d56e10f079b827cb97af82',
//       amount: '100000000000000'
//   }
// }
// }


function _trackTransaction() {
  _trackTransaction = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref6, store) {
    var contractFunctionPromise, namespace, name, id, parameters, txn, transaction, abis, minedTxn, transactionReceipt, reason, error;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contractFunctionPromise = _ref6.contractFunctionPromise, namespace = _ref6.namespace, name = _ref6.name, id = _ref6.id, parameters = _ref6.parameters;
            store.dispatch(submitting({
              id: id,
              namespace: namespace,
              name: name,
              parameters: parameters
            }));
            _context.prev = 2;
            _context.next = 5;
            return contractFunctionPromise;

          case 5:
            txn = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            store.dispatch(errorSubmitting({
              id: id,
              namespace: namespace,
              name: name,
              error: (0, _transformations.formatErrorMessage)(_context.t0)
            }));
            return _context.abrupt("return");

          case 12:
            transaction = (0, _transformations.stringBNValues)(txn);
            abis = (0, _reducers.getAbis)(store.getState());
            transaction.parsedInput = (0, _transformations.getParsedInputFromTransaction)(transaction, abis);
            transaction.timestamp = Date.now();
            store.dispatch(submitted({
              id: id,
              namespace: namespace,
              name: name,
              transaction: transaction
            }));
            _context.prev = 17;
            _context.next = 20;
            return _constants.httpProvider.waitForTransaction(txn.hash).then(function () {
              return _constants.httpProvider.getTransactionReceipt(txn.hash);
            });

          case 20:
            minedTxn = _context.sent;
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](17);
            store.dispatch(errorMining({
              id: id,
              namespace: namespace,
              name: name,
              error: (0, _transformations.formatErrorMessage)(_context.t1)
            }));
            return _context.abrupt("return");

          case 27:
            transactionReceipt = (0, _transformations.stringBNValues)(minedTxn);

            if (!(transactionReceipt.status === 0)) {
              _context.next = 36;
              break;
            }

            _context.next = 31;
            return (0, _revertReason.default)(transactionReceipt.transactionHash);

          case 31:
            reason = _context.sent;
            error = (0, _transformations.formatErrorMessage)(reason) || 'Transaction Failed';
            transactionReceipt.revertReason = reason;
            store.dispatch(errorMining({
              id: id,
              namespace: namespace,
              name: name,
              error: (0, _transformations.formatErrorMessage)(error),
              transactionReceipt: transactionReceipt
            }));
            return _context.abrupt("return");

          case 36:
            store.dispatch(mined({
              id: id,
              namespace: namespace,
              name: name,
              transactionReceipt: transactionReceipt
            }));
            transactionReceipt.logs.map(function (log) {
              var abi = abis[log.address.toLowerCase()];

              if (!abi) {
                return;
              }

              var abiInterface = new _ethers.ethers.utils.Interface(abi);
              var parsedLog = parseEventLog(log, abiInterface);
              store.dispatch({
                type: 'TRANSACTION_LOG_EVENT',
                event: parsedLog,
                namespace: namespace,
                name: name,
                parameters: parameters
              });
            });

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8], [17, 23]]);
  }));
  return _trackTransaction.apply(this, arguments);
}

function transactionTrackerMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'ADD_TRACKED_TRANSACTION':
          trackTransaction(action, store);
          break;

        default:
      }

      return next(action);
    };
  };
}