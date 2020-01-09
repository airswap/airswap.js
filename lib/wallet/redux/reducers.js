"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectors = exports.getWalletAction = exports.getWalletConnectionError = exports.getConnectedWalletAddress = exports.getWalletType = exports.getExpressLoginCredentials = exports.getAvailableWalletState = exports.getConnectedWalletState = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

var _constants = require("../../constants");

var _constants2 = require("../static/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  connectingWallet: false,
  walletType: '',
  address: '',
  error: '',
  walletAction: {} // REDUCER DEFINITION

};

function walletConnection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONNECT_WALLET':
      return _objectSpread({}, state, {
        error: '',
        connectingWallet: true
      });

    case 'CONNECTED_WALLET':
      return _objectSpread({}, state, {
        connectingWallet: false,
        walletType: action.walletType,
        address: action.address
      });

    case 'CLEAR_WALLET':
      return defaultState;

    case 'ERROR_CONNECTING_WALLET':
      return _objectSpread({}, defaultState, {
        connectingWallet: false,
        error: action.error
      });

    case 'START_WALLET_ACTION':
      var actionType = action.actionType,
          params = action.params;
      return _objectSpread({}, state, {
        walletAction: {
          actionType: actionType,
          params: params
        }
      });

    case 'FINISH_WALLET_ACTION':
      return _objectSpread({}, state, {
        walletAction: {}
      });

    default:
      return state;
  }
}

function createWalletAvailable(walletType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (action.type === 'SET_WALLET_AVAILABILITY') {
      if (action.wallets[walletType] === undefined) return state;
      return action.wallets[walletType];
    }

    return state;
  };
}

function walletExpressLogin() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONNECTED_WALLET':
      return {
        walletType: action.walletType,
        address: action.address
      };

    case 'CLEAR_WALLET':
      return {};

    default:
      return state;
  }
}

var walletAvailable = (0, _redux.combineReducers)(_lodash.default.zipObject(_constants2.web3WalletTypes, _constants2.web3WalletTypes.map(createWalletAvailable)));
var walletState = (0, _redux.combineReducers)({
  connection: walletConnection,
  available: walletAvailable,
  expressLogin: walletExpressLogin
});

var getWalletState = function getWalletState(state) {
  return state.wallet;
};

var getConnectedWalletState = (0, _reselect.createSelector)(getWalletState, function (wallet) {
  return wallet.connection;
});
exports.getConnectedWalletState = getConnectedWalletState;
var getAvailableWalletState = (0, _reselect.createSelector)(getWalletState, function (wallet) {
  return wallet.available;
});
exports.getAvailableWalletState = getAvailableWalletState;
var getExpressLoginCredentials = (0, _reselect.createSelector)(getWalletState, function (wallet) {
  return wallet.expressLogin;
});
/**
 * @function getWalletType
 * @description The currently connected wallet type
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletType}
 */

exports.getExpressLoginCredentials = getExpressLoginCredentials;
var getWalletType = (0, _reselect.createSelector)(getConnectedWalletState, function (wallet) {
  return wallet.walletType;
});
/**
 * @function getConnectedWalletAddress
 * @description The currently connected wallet address
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

exports.getWalletType = getWalletType;
var getConnectedWalletAddress = (0, _reselect.createSelector)(getConnectedWalletState, function (wallet) {
  return wallet.address.toLowerCase();
});
/**
 * @function getWalletConnectionError
 * @description The last error to occur when connecting a wallet. It is cleared when a new 'CONNECT_WALLET' actions is dispatched.
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {string}
 */

exports.getConnectedWalletAddress = getConnectedWalletAddress;
var getWalletConnectionError = (0, _reselect.createSelector)(getConnectedWalletState, function (wallet) {
  return wallet.error;
});
/**
 * @function getIsWalletConnecting
 * @description Returns true if wallet connection has been initiated but not yet completed (like when metamask is in the midst of being enabled, or picking your derivation path on ledger)
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

exports.getWalletConnectionError = getWalletConnectionError;
var getIsWalletConnecting = (0, _reselect.createSelector)(getConnectedWalletState, function (wallet) {
  return wallet.connectingWallet;
});
/**
 * @typedef {Object} SignatureParams
 * @memberof wallet
 * @property {string} signatureText
 */

/**
 * @typedef {Object} SendTransactionParams
 * @memberof wallet
 * @property {string} name The name of the function being invoked on the contract
 * @property {string} to The Contract the transaction is being sent to
 * @property {string[]} parameters The input parameters of the contract function (currently unnamed, can name if needed)
 */

/**
 * @typedef {Object} WalletAction
 * @description When actionType === 'signMessage', params are SignatureParams, when actionType === 'sendTransaction', params are SendTransactionParams
 * @memberof wallet
 * @property {('signMessage'|'sendTransaction')} actionType
 * @property {(wallet.SignatureParams | wallet.SendTransactionParams)} params
 */

/**
 * A selector to get the currently executing wallet action. Returns an empty object when nothing is executing.
 * @function getWalletAction
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {wallet.WalletAction}
 */

var getWalletAction = (0, _reselect.createSelector)(getConnectedWalletState, function (wallet) {
  return wallet.walletAction;
});
/**
 * @function getIsWalletGeneratingKeySpaceKeys
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

exports.getWalletAction = getWalletAction;
var getIsWalletGeneratingKeySpaceKeys = (0, _reselect.createSelector)(getWalletAction, function (_ref) {
  var actionType = _ref.actionType,
      params = _ref.params;
  return actionType === 'signMessage' && _lodash.default.startsWith(params.signatureText, (0, _constants.keyspaceDefaultSeedFn)());
});
/**
 * @function getIsWalletAuthenticatingKeySpaceKeys
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsWalletAuthenticatingKeySpaceKeys = (0, _reselect.createSelector)(getWalletAction, function (_ref2) {
  var actionType = _ref2.actionType,
      params = _ref2.params;
  return actionType === 'signMessage' && _lodash.default.startsWith(params.signatureText, (0, _constants.keyspaceSignatureTextFn)());
});
/**
 * @function getIsWalletWrappingWeth
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsWalletWrappingWeth = (0, _reselect.createSelector)(getWalletAction, function (_ref3) {
  var actionType = _ref3.actionType,
      params = _ref3.params;
  return actionType === 'sendTransaction' && params.to === _constants.WETH_CONTRACT_ADDRESS && params.name === 'deposit';
});
/**
 * @function getIsWalletUnwrappingWeth
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsWalletUnwrappingWeth = (0, _reselect.createSelector)(getWalletAction, function (_ref4) {
  var actionType = _ref4.actionType,
      params = _ref4.params;
  return actionType === 'sendTransaction' && params.to === _constants.WETH_CONTRACT_ADDRESS && params.name === 'withdraw';
});
/**
 * @function getIsWalletApprovingToken
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsWalletApprovingToken = (0, _reselect.createSelector)(getWalletAction, function (_ref5) {
  var actionType = _ref5.actionType,
      params = _ref5.params;
  return actionType === 'sendTransaction' && params.name === 'approve';
});
/**
 * @function getIsWalletFillingOrder
 * @memberof wallet
 * @param {Object} state Redux store state
 * @returns {boolean}
 */

var getIsWalletFillingOrder = (0, _reselect.createSelector)(getWalletAction, function (_ref6) {
  var actionType = _ref6.actionType,
      params = _ref6.params;
  return actionType === 'sendTransaction' && params.to === _constants.SWAP_LEGACY_CONTRACT_ADDRESS && params.name === 'fill';
});
var selectors = {
  getConnectedWalletAddress: getConnectedWalletAddress,
  getWalletConnectionError: getWalletConnectionError,
  getWalletType: getWalletType,
  getWalletAction: getWalletAction,
  getIsWalletGeneratingKeySpaceKeys: getIsWalletGeneratingKeySpaceKeys,
  getIsWalletAuthenticatingKeySpaceKeys: getIsWalletAuthenticatingKeySpaceKeys,
  getIsWalletWrappingWeth: getIsWalletWrappingWeth,
  getIsWalletUnwrappingWeth: getIsWalletUnwrappingWeth,
  getIsWalletApprovingToken: getIsWalletApprovingToken,
  getIsWalletFillingOrder: getIsWalletFillingOrder,
  getIsWalletConnecting: getIsWalletConnecting,
  getAvailableWalletState: getAvailableWalletState,
  getExpressLoginCredentials: getExpressLoginCredentials
};
exports.selectors = selectors;
var _default = walletState;
exports.default = _default;