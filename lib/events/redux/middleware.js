"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventsMiddleware;

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../../constants");

var _event = require("../../utils/redux/templates/event");

var _redux = require("../../blockTracker/redux");

var _redux2 = require("../../deltaBalances/redux");

var _reducers = require("./reducers");

var _utils = require("../utils");

var gethRead = _interopRequireWildcard(require("../../utils/gethRead"));

var _index = require("../index");

var _actions = require("../../blockTracker/redux/actions");

var _websocketEventTracker = _interopRequireDefault(require("../websocketEventTracker"));

var _eventTracker = _interopRequireDefault(require("../eventTracker"));

var _eventTrackingActions = require("../../swap/redux/eventTrackingActions");

var _eventTrackingActions2 = require("../../swapLegacy/redux/eventTrackingActions");

var _debouncedQueue = _interopRequireDefault(require("../../utils/debouncedQueue"));

var _actions2 = require("./actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var eventTracker = _constants.NO_ALCHEMY_WEBSOCKETS ? _eventTracker.default : _websocketEventTracker.default;
var queue;

function processEventLogs(logs, store, callback) {
  var eventIds = _lodash.default.map(_reducers.selectors.getFetchedTrackedEvents(store.getState()), _utils.getEventId);

  var newEvents = _lodash.default.filter(logs, function (event) {
    return event && !_lodash.default.includes(eventIds, (0, _utils.getEventId)(event));
  });

  if (logs && logs.length && newEvents.length) {
    queue.push(newEvents);

    if (callback) {
      callback(newEvents);
    }
  }
}

var initPollExchangeFills = _lodash.default.once(function (store) {
  var callback = function callback(logs) {
    return processEventLogs(logs, store);
  }; // TODO: this if/else is temporary, these need to be dispatched from instant/airswap-trader repos respectively


  if (_constants.IS_INSTANT || _constants.IS_EXPLORER) {
    eventTracker.trackEvent((0, _eventTrackingActions2.trackSwapLegacyFilled)({
      callback: callback,
      backFillBlockCount: 7000
    }));
    eventTracker.trackEvent((0, _eventTrackingActions.trackSwapSwap)({
      callback: callback,
      backFillBlockCount: 7000
    }));
  } else {
    eventTracker.trackEvent((0, _eventTrackingActions.trackSwapSwap)({
      callback: callback,
      fromBlock: _constants.SWAP_CONTRACT_DEPLOY_BLOCK
    }));
    eventTracker.trackEvent((0, _eventTrackingActions.trackSwapCancel)({
      callback: callback,
      fromBlock: _constants.SWAP_CONTRACT_DEPLOY_BLOCK
    }));
  }
});

var pollERC20Transfers = function pollERC20Transfers(store, block) {
  var state = store.getState();

  var addresses = _redux2.selectors.getTrackedWalletAddresses(state);

  if (!addresses.length) {
    return null;
  }

  var _buildGlobalERC20Tran = (0, _index.buildGlobalERC20TransfersTopics)(addresses),
      fromTopics = _buildGlobalERC20Tran.fromTopics,
      toTopics = _buildGlobalERC20Tran.toTopics;

  Promise.all([(0, _index.fetchLogs)(null, _constants.ERC20abi, fromTopics, block.number, block.number), // might sometimes fetch balances twice, but better than missing an update
  (0, _index.fetchLogs)(null, _constants.ERC20abi, toTopics, block.number, block.number)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fromLogs = _ref2[0],
        toLogs = _ref2[1];

    var logs = [].concat(_toConsumableArray(fromLogs), _toConsumableArray(toLogs));

    if (logs && logs.length) {
      store.dispatch((0, _event.makeEventFetchingActionsCreators)('erc20Transfers').got(logs));
    }
  });
};

function fetchMissingBlocksForFetchedEvents(store, action) {
  var fetchedBlockNumbers = _redux.selectors.getBlockNumbers(store.getState());

  var eventBlockNumbers = _lodash.default.get(action, 'response', []).filter(function (event) {
    return event.name === 'Filled';
  }).map(function (_ref3) {
    var blockNumber = _ref3.blockNumber;
    return blockNumber;
  });

  var blockPromises = _lodash.default.without.apply(_lodash.default, [eventBlockNumbers].concat(_toConsumableArray(fetchedBlockNumbers))).map(
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(blockNumber) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", gethRead.fetchBlock(blockNumber));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }());

  Promise.all(blockPromises).then(function (blocks) {
    if (blocks.length) {
      store.dispatch((0, _actions.gotBlocks)(blocks));
    }
  });
}

function eventsMiddleware(store) {
  queue = new _debouncedQueue.default(function (newEvents) {
    var newEventsAction = (0, _event.makeEventFetchingActionsCreators)('trackedEvents').got(newEvents);
    store.dispatch(newEventsAction);
  });
  initPollExchangeFills(store);
  return function (next) {
    return function (action) {
      switch (action.type) {
        case (0, _event.makeEventActionTypes)('trackedEvents').got:
          fetchMissingBlocksForFetchedEvents(store, action);
          break;

        case 'GOT_LATEST_BLOCK':
          // check for erc20 transfers on each new block
          pollERC20Transfers(store, action.block);
          break;

        case 'TRACK_EVENT':
          if (action.fromBlock || action.backFillBlockCount) {
            store.dispatch((0, _actions2.fetchingHistoricalEvents)(action));
          }

          eventTracker.trackEvent(_objectSpread({}, action, {
            callback: function callback(logs) {
              return processEventLogs(logs, store, action.callback);
            },
            onFetchedHistoricalEvents: function onFetchedHistoricalEvents(events) {
              store.dispatch((0, _actions2.fetchedHistoricalEvents)(action, events));
            }
          }));
          break;

        default:
      }

      next(action);
    };
  };
}