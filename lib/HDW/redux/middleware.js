"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HDWMiddleware;

var _lodash = _interopRequireDefault(require("lodash"));

var _hdkey = _interopRequireDefault(require("hdkey"));

var _hdkey2 = _interopRequireDefault(require("ethereumjs-wallet/hdkey"));

var actions = _interopRequireWildcard(require("./actions"));

var _actions2 = require("../../deltaBalances/redux/actions");

var _constants = require("../static/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { initLedger } from '../../wallet/redux/actions'
var addressMapping = {};
var increment = 3;
var offset;
var publicKey;
var chainCode;
var walletType;
var path;
var resolveHDW;
var rejectHDW;

var getHWDAddresses = function getHWDAddresses(store, start) {
  var hdk = new _hdkey.default();
  hdk.publicKey = new Buffer(publicKey, 'hex');
  hdk.chainCode = new Buffer(chainCode, 'hex');
  var accounts = [];

  for (var i = start; i < start + increment; i++) {
    var derivedKey = hdk.derive("m/".concat(i));

    var address = _hdkey2.default.fromExtendedKey(derivedKey.publicExtendedKey).getWallet().getAddress().toString('hex');

    var aPath = "".concat(path, "/").concat(i);
    var aAddress = "0x".concat(address);
    accounts.push({
      path: aPath,
      address: aAddress,
      index: i
    });
    addressMapping[aPath] = aAddress;
    store.dispatch((0, _actions2.addTrackedAddress)({
      address: aAddress,
      tokenAddress: _constants.ETH_ADDRESS
    }));
  }

  store.dispatch({
    type: 'LOADED_HDW_ACCOUNTS',
    accounts: accounts
  });
};

function HDWMiddleware(store) {
  // TODO: Delete after ledger is integrated on instant, this is convenient for testing
  // window.setTimeout(() => store.dispatch(initLedger(), 1000))
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'INITIALIZE_HDW':
          offset = 0;
          walletType = action.walletType;
          path = action.path || _constants.defaultHDWPaths[walletType];
          resolveHDW = action.resolve;
          rejectHDW = action.reject;
          store.dispatch({
            type: 'GET_HDW_CHAIN_KEY',
            walletType: walletType,
            path: path,
            resolve: function resolve(response) {
              publicKey = response.publicKey;
              chainCode = response.chainCode;
              getHWDAddresses(store, offset);
            },
            reject: function reject(err) {
              rejectHDW(err);
            }
          });
          break;

        case 'NEXT_HDW_ACCOUNTS':
          offset += increment;
          store.dispatch(actions.setHDWPageOffset(offset));
          getHWDAddresses(store, offset);
          break;

        case 'PREV_HDW_ACCOUNTS':
          offset = Math.max(offset - increment, 0);
          store.dispatch(actions.setHDWPageOffset(offset));
          getHWDAddresses(store, offset);
          break;

        case 'SET_HDW_SUBPATH':
          path = action.path;
          store.dispatch({
            type: 'GET_HDW_CHAIN_KEY',
            walletType: walletType,
            path: path,
            resolve: function resolve(response) {
              publicKey = response.publicKey;
              chainCode = response.chainCode;
              getHWDAddresses(store, offset);
            },
            reject: function reject(err) {
              rejectHDW(err);
            }
          });
          break;

        case 'CONFIRM_HDW_PATH':
          resolveHDW({
            path: _lodash.default.trimStart(action.path, 'm/'),
            address: addressMapping[action.path],
            walletType: walletType
          });
          break;

        case 'CANCEL_HDW_INITIALIZATION':
          if (rejectHDW) {
            rejectHDW('Wallet initialization cancelled.');
          }

          break;

        case 'ERROR_CONNECTING_WALLET':
          if (resolveHDW) {
            store.dispatch(actions.cancelHDWInitialization());
          }

          break;

        default:
      }

      return next(action);
    };
  };
}