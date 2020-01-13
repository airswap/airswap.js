"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walletMiddleware;
exports.errorConnectingWallet = exports.connectedWallet = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ismobilejs = _interopRequireDefault(require("ismobilejs"));

var _web = _interopRequireDefault(require("@portis/web3"));

var _fortmatic = _interopRequireDefault(require("fortmatic"));

var _walletlink = _interopRequireDefault(require("walletlink"));

var _ethers = require("ethers");

var _redux = require("../../tokens/redux");

var _redux2 = require("../../gas/redux");

var _reducers = require("./reducers");

var _getSigner = _interopRequireDefault(require("../getSigner"));

var _transformations = require("../../utils/transformations");

var _constants = require("../../constants");

var _constants2 = require("../static/constants");

var _actions = require("./actions");

var _reducers2 = require("../../abis/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connectedWallet = function connectedWallet(walletType, address) {
  return {
    type: 'CONNECTED_WALLET',
    walletType: walletType,
    address: address
  };
};

exports.connectedWallet = connectedWallet;

var errorConnectingWallet = function errorConnectingWallet(error) {
  return {
    type: 'ERROR_CONNECTING_WALLET',
    error: error
  };
};

exports.errorConnectingWallet = errorConnectingWallet;
var signer;
var walletActions;

var startWalletAction =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store, actionType, argParams) {
    var state, _argParams, args, abis, params, to, contractInterface, data, parsed, parametersValues, parameters, gasLimit, tokens, order, tokenAddress, _gasSelectors$getCurr, gwei, gasPrice;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            state = store.getState();
            _argParams = _slicedToArray(argParams, 1), args = _argParams[0];
            abis = (0, _reducers2.getAbis)(state);

            if (!(actionType === 'sendTransaction')) {
              _context.next = 21;
              break;
            }

            _context.next = 6;
            return args.to;

          case 6:
            to = _context.sent;
            contractInterface = new _ethers.ethers.utils.Interface(abis[to.toLowerCase()]);
            data = args.data;
            parsed = contractInterface.parseTransaction({
              data: data
            });
            parametersValues = _lodash.default.map(parsed.args, function (s) {
              return (s.toString ? s.toString() : s).toLowerCase();
            });
            parameters = _lodash.default.zipObject(_lodash.default.find(contractInterface.abi, {
              name: parsed.name
            }).inputs.map(function (_ref2) {
              var name = _ref2.name;
              return name;
            }), parametersValues);
            params = {
              name: parsed.name,
              parameters: parameters,
              to: to.toLowerCase()
            };
            store.dispatch({
              type: 'START_WALLET_ACTION',
              actionType: actionType,
              params: params
            });
            gasLimit = 300000; // a value left over frome trade-flow for all non-fills, has worked without issue

            if (parsed.name === 'fill' || parsed.name === 'swap') {
              tokens = _redux.selectors.getTokens(state);
              order = _redux.selectors.makeGetReadableOrder(state)(parameters);
              tokenAddress = order.tokenAddress;
              gasLimit = _lodash.default.get(_lodash.default.find(tokens, {
                address: tokenAddress
              }), 'gasLimit', 400000);
            } else if (parsed.name === 'setRuleAndIntent') {
              gasLimit = 500000;
            } else if (parsed.name === 'createDelegate') {
              gasLimit = 3000000;
            } else if (parsed.name === 'createIndex') {
              gasLimit = 1500000;
            }

            _gasSelectors$getCurr = _redux2.selectors.getCurrentGasPriceSettings(state), gwei = _gasSelectors$getCurr.gwei;
            gasPrice = _ethers.ethers.utils.parseUnits("".concat(gwei), 'gwei').toNumber();
            return _context.abrupt("return", {
              gasLimit: Number(gasLimit),
              gasPrice: gasPrice
            });

          case 21:
            if (actionType === 'signMessage') {
              params = {
                signatureText: args
              };
              store.dispatch({
                type: 'START_WALLET_ACTION',
                actionType: actionType,
                params: params
              });
            } else if (actionType === 'signTypedData') {
              params = {
                signatureText: args
              };
              store.dispatch({
                type: 'START_WALLET_ACTION',
                actionType: actionType,
                params: params
              });
            }

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function startWalletAction(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var finishWalletAction = function finishWalletAction(store, actionType, params) {
  return store.dispatch({
    type: 'FINISH_WALLET_ACTION',
    actionType: actionType,
    params: params
  });
};

var web3PollingInterval;

function pollWeb3Address(address) {
  web3PollingInterval = window.setInterval(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (window.web3.eth && window.web3.eth.defaultAccount && window.web3.eth.defaultAccount !== address) {
              window.location.reload();
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })), 3000); // If someone changes their account in metaMask, clear the app
} // catch all connection function that will try to connect to any web3 wallet
// usually used for mobile wallets


function connectWeb3(store) {
  var walletType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'web3';

  var availableWallets = _reducers.selectors.getAvailableWalletState(store.getState());

  if (!availableWallets[walletType] && walletType !== 'web3') {
    store.dispatch(errorConnectingWallet("".concat(walletType, " not detected in browser.")));
    return;
  }

  if (window.ethereum) {
    window.ethereum.isMetaMask = true;
    window.ethereum.enable().then(function () {
      signer = (0, _getSigner.default)({
        web3Provider: window.ethereum
      }, walletActions, walletType);
      var addressPromise = signer.getAddress();
      addressPromise.then(function (address) {
        pollWeb3Address(address.toLowerCase());
        store.dispatch(connectedWallet(walletType, address.toLowerCase()));
      });
    }).catch(function (e) {
      store.dispatch(errorConnectingWallet((0, _transformations.formatErrorMessage)(e)));
    });
  } else if (window.web3) {
    signer = (0, _getSigner.default)({
      web3Provider: window.web3.currentProvider
    }, walletActions);
    var addressPromise = signer.getAddress();
    addressPromise.then(function (address) {
      return store.dispatch(connectedWallet(walletType, address.toLowerCase()));
    });
  } else {
    store.dispatch(errorConnectingWallet('No enabled web3 found in browser'));
  }
}

function connectPrivateKey(store) {
  if (process.env.REACT_APP_PRIVATE_KEY) {
    signer = (0, _getSigner.default)({
      privateKey: process.env.REACT_APP_PRIVATE_KEY
    }, walletActions);
    window.setTimeout(function () {
      return store.dispatch(connectedWallet('privateKey', signer.address.toLowerCase()));
    }); // window.timeout is needed because of redux restriction where triggered middleware events show up before originating middleware events
  } else {
    store.dispatch(errorConnectingWallet('privateKey not in env variables'));
  }
}

function connectPortis(store) {
  var portisConfig = {
    nodeUrl: _constants.AIRSWAP_GETH_NODE_ADDRESS,
    chainId: _constants.NETWORK,
    nodeProtocol: 'rpc'
  };
  var portis = new _web.default(_constants.PORTIS_ID, portisConfig);
  window.portis = portis;
  portis.onLogin(function () {
    signer = (0, _getSigner.default)({
      web3Provider: _objectSpread({}, portis.provider, {
        isMetaMask: true
      })
    }, walletActions); // need to tell ethers.js this is metamask because this line will cause bugs otherwise https://github.com/ethers-io/ethers.js/blob/061b0eae1d4c570aedd9bee1971afa43fcdae1a6/src.ts/providers/web3-provider.ts#L61

    var addressPromise = signer.getAddress();
    addressPromise.then(function (address) {
      store.dispatch(connectedWallet('portis', address.toLowerCase()));
    });
  });
  portis.showPortis();
}

function connectFortmatic(store) {
  var fm = new _fortmatic.default(_constants.FORTMATIC_ID);
  var provider = fm.getProvider();
  provider.enable().then(function () {
    signer = (0, _getSigner.default)({
      web3Provider: provider
    }, walletActions);
    var addressPromise = signer.getAddress();
    addressPromise.then(function (address) {
      store.dispatch(connectedWallet('fortmatic', address.toLowerCase()));
    }).catch(function (e) {
      return store.dispatch(errorConnectingWallet(e));
    });
  });
}

function connectWalletLink(store) {
  var walletLink = new _walletlink.default({
    appName: process.env.REACT_APP_NAME || 'AirSwap',
    appLogoUrl: _constants.AIRSWAP_LOGO_URL
  });
  var provider = walletLink.makeWeb3Provider(_constants.NODESMITH_GETH_NODE, _constants.NETWORK);
  provider.enable().then(function () {
    signer = (0, _getSigner.default)({
      web3Provider: provider
    }, walletActions);
    var addressPromise = signer.getAddress();
    addressPromise.then(function (address) {
      store.dispatch(connectedWallet('walletLink', address.toLowerCase()));
    }).catch(function (e) {
      return store.dispatch(errorConnectingWallet(e));
    });
  });
}

var detectWeb3Wallets =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(store) {
    var prevWalletsAvailable, walletsAvailable;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            prevWalletsAvailable = _reducers.selectors.getAvailableWalletState(store.getState());

            if (!(window && !window.web3)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", null);

          case 3:
            walletsAvailable = {};

            _constants2.web3WalletTypes.map(function (type) {
              var isAvailable = false;

              switch (type) {
                case 'metamask':
                  isAvailable = !!window.web3.currentProvider.isMetaMask && !_ismobilejs.default.any && !window.web3.currentProvider.isEQLWallet;
                  break;

                case 'trust':
                  isAvailable = !!window.web3.currentProvider.isTrust;
                  break;

                case 'cipher':
                  isAvailable = window.web3.currentProvider.constructor.name === 'CipherProvider';
                  break;

                case 'status':
                  isAvailable = !!window.web3.currentProvider.isStatus;
                  break;

                case 'imtoken':
                  isAvailable = !!window.imToken;
                  break;

                case 'coinbase':
                  isAvailable = !!window.web3.currentProvider.isToshi;
                  break;

                case 'opera':
                  isAvailable = (!!window.opr && !!window.opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) && window.web3 && window.web3.currentProvider && window.web3.currentProvider.isConnected();
                  break;

                case 'equal':
                  isAvailable = !!window.web3.currentProvider.isEQLWallet;
                  break;

                case 'walletLink':
                  isAvailable = !!window.WalletLink && !!window.WalletLinkProvider;
                  break;

                default:
                  isAvailable = false;
              }

              walletsAvailable[type] = isAvailable;
              return walletsAvailable;
            });

            if (!_lodash.default.isEqual(prevWalletsAvailable, walletsAvailable)) {
              store.dispatch({
                type: 'SET_WALLET_AVAILABILITY',
                wallets: walletsAvailable
              });
            }

            return _context3.abrupt("return", walletsAvailable);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function detectWeb3Wallets(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

function attemptExpressLogin(store) {
  var state = store.getState();

  var availableWallets = _reducers.selectors.getAvailableWalletState(state);

  var expressLoginCredentials = _reducers.selectors.getExpressLoginCredentials(state);

  if (!_lodash.default.some(availableWallets) || _lodash.default.isEmpty(expressLoginCredentials)) {
    // don't attempt auto-login if no wallets are currently available
    // don't attempt auto-login if no credentials are stored
    return;
  }

  if (availableWallets[expressLoginCredentials.walletType]) {
    try {
      switch (expressLoginCredentials.walletType // this switch statement allows us to write adaptors to determine wallet availability
      ) {
        case 'equal':
          var res = window.ethereum.send({
            method: 'eth_accounts'
          });

          if ((_lodash.default.first(res.result) || '').toLowerCase() === expressLoginCredentials.address) {
            store.dispatch((0, _actions.connectWallet)(expressLoginCredentials.walletType));
          }

          break;

        default:
          window.ethereum.send({
            method: 'eth_accounts'
          }, function (err, resp) {
            if (err) {
              return err;
            }

            var address = _lodash.default.first(_lodash.default.get(resp, 'result'));

            if (!address) {
              return 'address not found';
            }

            if (address.toLowerCase() === expressLoginCredentials.address) {
              store.dispatch((0, _actions.connectWallet)(expressLoginCredentials.walletType));
            }
          });
      }
    } catch (e) {}
  }
}

function walletMiddleware(store) {
  detectWeb3Wallets(store).then(function (availableWallets) {
    return attemptExpressLogin(store, availableWallets);
  });
  window.setInterval(function () {
    return detectWeb3Wallets(store);
  }, 5000);
  walletActions = _lodash.default.mapValues({
    startWalletAction: startWalletAction,
    finishWalletAction: finishWalletAction
  }, function (action) {
    return _lodash.default.partial(action, store);
  });
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'GET_SIGNER':
          if (signer) {
            action.resolve(signer);
          } else {
            action.reject('wallet not initialized');
          }

          next(action);
          break;

        case 'CLEAR_WALLET':
          if (web3PollingInterval) {
            window.clearInterval(web3PollingInterval);
          }

          signer = undefined;
          next(action);
          break;

        case 'KEYSPACE_INIT_ERROR':
          signer = undefined;
          store.dispatch(errorConnectingWallet(action.error));
          next(action);
          break;

        case 'ERROR_CONNECTING_ROUTER':
          signer = undefined;
          store.dispatch(errorConnectingWallet(action.error));
          next(action);
          break;

        case 'CONNECT_WALLET':
          next(action);

          switch (action.walletType) {
            case 'metamask':
              connectWeb3(store, 'metamask');
              break;

            case 'privateKey':
              connectPrivateKey(store);
              break;

            case 'portis':
              connectPortis(store);
              break;

            case 'fortmatic':
              connectFortmatic(store);
              break;

            case 'equal':
              connectWeb3(store, 'equal');
              break;

            case 'web3':
              connectWeb3(store);
              break;

            case 'trezor':
              // TODO: implement trezor conect
              // connectTrezor(store)
              break;

            case 'walletLink':
              connectWalletLink(store);
              break;

            default:
              throw new Error("".concat(action.walletType, " walletType not expected in wallet middleware"));
          }

          break;

        case 'SET_WALLET_AVAILABILITY':
          next(action);
          attemptExpressLogin(store);
          break;

        case 'REDUX_STORAGE_LOAD':
          next(action);
          attemptExpressLogin(store);
          break;

        default:
          next(action);
      }
    };
  };
}