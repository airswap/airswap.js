"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getAbis = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _index = require("../index");

var _selectors = require("../../delegateFactory/redux/selectors");

var _delegate = _interopRequireDefault(require("../delegate.json"));

var _index2 = _interopRequireDefault(require("../index.json"));

var _selectors2 = require("../../indexer/redux/selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAbiForToken(token) {
  if (token.kind === 'ERC721') {
    return 'erc721';
  }

  return 'erc20';
}

var keyMapping = {
  erc721: _index.erc721,
  erc20: _index.erc20
};

function abiReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.abis;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.tokens) {
        var addresses = action.tokens.map(function (_ref) {
          var address = _ref.address;
          return address.toLowerCase();
        });
        var tokenAbis = action.tokens.map(getAbiForToken);

        var newAbis = _lodash.default.zipObject(addresses, tokenAbis); // old state remains, new state fills in gaps, but doesn't overwrite
        // this is so custom contracts like WETH and AST aren't overwritten by their generic equivalents


        return _objectSpread({}, newAbis, state);
      } else if (action.token) {
        return _objectSpread(_defineProperty({}, action.token.address.toLowerCase(), getAbiForToken(action.token)), state);
      }

      return state;

    default:
      return state;
  }
}

var getAbisState = function getAbisState(state) {
  return state.abis;
};

var getAbis = (0, _reselect.createSelector)(getAbisState, _selectors.getDelegateContractAddresses, _selectors2.getIndexAddresses, function (abi, delegateContracts, indexContracts) {
  var delegateContractMapping = _lodash.default.zipObject(delegateContracts, delegateContracts.map(function () {
    return _delegate.default;
  }));

  var indexContractMapping = _lodash.default.zipObject(indexContracts, indexContracts.map(function () {
    return _index2.default;
  }));

  var abiMapping = _lodash.default.mapValues(abi, function (val) {
    if (_lodash.default.isArray(val)) {
      return val;
    }

    return keyMapping[val];
  });

  return _objectSpread({}, abiMapping, delegateContractMapping, indexContractMapping);
});
exports.getAbis = getAbis;
var _default = abiReducer;
exports.default = _default;