"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

var _reselect = require("reselect");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  initializing: false,
  loadingHDWAccounts: false,
  pageOffset: 0,
  selectedAccount: 0,
  accounts: [],
  balances: {}
};

var HDW = function HDW() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INITIALIZE_HDW':
      return _objectSpread({}, defaultState, {
        initializing: true
      });

    case 'CANCEL_HDW_INITIALIZATION':
      return _objectSpread({}, state, {
        initializing: false
      });

    case 'CONFIRM_HDW_PATH':
      return _objectSpread({}, state, {
        initializing: false
      });

    case 'LOADING_HDW_ACCOUNTS':
      return _objectSpread({}, state, {
        loadingHDWAccounts: true
      });

    case 'LOADED_HDW_ACCOUNTS':
      return _objectSpread({}, state, {
        accounts: action.accounts,
        loadingHDWAccounts: false
      });

    case 'ERROR_CONNECTING_TO_WALLET':
      return _objectSpread({}, state, {
        loadingHDWAccounts: false,
        initializing: false
      });

    case 'SET_HDW_SUBPATH':
      return _objectSpread({}, state, {
        subPath: action.subPath,
        accounts: []
      });

    case 'CLOSE_MODAL':
      return _objectSpread({}, state, {
        initializing: false
      });

    case 'SET_HDW_PAGE_OFFSET':
      return _objectSpread({}, state, {
        pageOffset: action.pageOffset
      });

    default:
      return state;
  }
};

var _default = HDW;
exports.default = _default;

var getHDWState = function getHDWState(state) {
  return state.hdw;
};

var getHDWSettings = (0, _reselect.createSelector)(getHDWState, function (_ref) {
  var subPath = _ref.subPath,
      accounts = _ref.accounts,
      initializing = _ref.initializing,
      loadingHDWAccounts = _ref.loadingHDWAccounts,
      pageOffset = _ref.pageOffset,
      balances = _ref.balances;
  return {
    subPath: subPath,
    accounts: accounts,
    initializing: initializing,
    loadingHDWAccounts: loadingHDWAccounts,
    pageOffset: pageOffset,
    balances: balances
  };
});
var selectors = {
  getHDWSettings: getHDWSettings
};
exports.selectors = selectors;