"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withoutTransactions(_ref) {
  var number = _ref.number,
      timestamp = _ref.timestamp;
  return {
    number: number,
    timestamp: timestamp
  };
}

function blocks() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GOT_LATEST_BLOCK':
      return _objectSpread({}, state, _defineProperty({}, action.block.number, withoutTransactions(action.block)));

    case 'GOT_BLOCK':
      return _objectSpread({}, state, _defineProperty({}, action.block.number, withoutTransactions(action.block)));

    case 'GOT_BLOCKS':
      var blockNumbers = _lodash.default.map(action.blocks, 'number');

      return _objectSpread({}, state, _lodash.default.zipObject(blockNumbers, action.blocks.map(withoutTransactions)));

    default:
      return state;
  }
}

var _default = blocks; // combineReducers({
//   blocks,
// })

exports.default = _default;

var getBlocks = function getBlocks(state) {
  return state.blockTracker;
};

var getBlockNumbers = (0, _reselect.createSelector)(getBlocks, function (b) {
  return _lodash.default.map(_lodash.default.values(b), 'number');
});
var getLatestBlock = (0, _reselect.createSelector)(getBlocks, function (blocksObj) {
  return _lodash.default.last(_lodash.default.sortBy(_lodash.default.values(blocksObj), 'number'));
});
var selectors = {
  getBlocks: getBlocks,
  getBlockNumbers: getBlockNumbers,
  getLatestBlock: getLatestBlock
};
exports.selectors = selectors;