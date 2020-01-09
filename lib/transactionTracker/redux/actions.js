"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotBlocks = exports.gotLatestBlock = exports.gotBlock = void 0;

var ethers = _interopRequireWildcard(require("ethers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// localStorage is used to cache blocks, and if they are too big it causes data to be dropped, depending on your browser
// as a workaround we only include the data we need
function trimBlockForLocalStorage(_ref) {
  var number = _ref.number,
      timestamp = _ref.timestamp,
      transactions = _ref.transactions;
  return {
    number: number,
    timestamp: timestamp,
    transactions: transactions.map(function (_ref2) {
      var to = _ref2.to,
          from = _ref2.from,
          value = _ref2.value;
      return {
        to: to,
        from: from,
        value: value
      };
    })
  };
}

var gotBlock = function gotBlock(block) {
  return {
    type: 'GOT_BLOCK',
    block: trimBlockForLocalStorage(_objectSpread({}, block, {
      timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
      number: ethers.utils.bigNumberify(block.number).toNumber()
    }))
  };
};

exports.gotBlock = gotBlock;

var gotLatestBlock = function gotLatestBlock(block) {
  return {
    type: 'GOT_LATEST_BLOCK',
    block: trimBlockForLocalStorage(_objectSpread({}, block, {
      timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
      number: ethers.utils.bigNumberify(block.number).toNumber()
    }))
  };
};

exports.gotLatestBlock = gotLatestBlock;

var gotBlocks = function gotBlocks(blocks) {
  return {
    type: 'GOT_BLOCKS',
    blocks: blocks.map(function (block) {
      return trimBlockForLocalStorage(_objectSpread({}, block, {
        timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
        number: ethers.utils.bigNumberify(block.number).toNumber()
      }));
    })
  };
};

exports.gotBlocks = gotBlocks;