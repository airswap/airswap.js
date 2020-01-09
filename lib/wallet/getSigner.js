"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var uuid = require('uuid4');

var ethers = require('ethers');

var ethUtil = require('ethereumjs-util');

var _require = require('../constants'),
    httpProvider = _require.httpProvider,
    NETWORK = _require.NETWORK,
    NETWORK_MAPPING = _require.NETWORK_MAPPING;

var walletTypes = require('./static/walletTypes.json');

var UncheckedJsonRpcSigner = require('./uncheckedJsonRpcSigner');

var _require2 = require('../gas'),
    Gas = _require2.Gas;

function traceMethodCalls(obj, _ref, walletType) {
  var startWalletAction = _ref.startWalletAction,
      finishWalletAction = _ref.finishWalletAction;
  var supportsSignTypedData = !!_.get(_.find(walletTypes, {
    type: walletType
  }), 'supportsSignTypedData');
  var handler = {
    get: function get(target, propKey) {
      if (propKey === 'walletType') {
        return walletType;
      } else if (propKey === 'supportsSignTypedData') {
        return supportsSignTypedData;
      } else if (typeof target[propKey] === 'function' && propKey === 'sendTransaction') {
        return (
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _len,
                args,
                _key,
                transactionArguments,
                tx,
                rest,
                result,
                _args = arguments;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = _args[_key];
                    }

                    if (!startWalletAction) {
                      _context.next = 10;
                      break;
                    }

                    _context.next = 4;
                    return startWalletAction(propKey, args);

                  case 4:
                    _context.t1 = _context.sent;

                    if (_context.t1) {
                      _context.next = 7;
                      break;
                    }

                    _context.t1 = {};

                  case 7:
                    _context.t0 = _context.t1;
                    _context.next = 11;
                    break;

                  case 10:
                    _context.t0 = {};

                  case 11:
                    transactionArguments = _context.t0;
                    tx = args[0], rest = args.slice(1);
                    result = target[propKey].apply(this, [_objectSpread({}, tx, transactionArguments)].concat(_toConsumableArray(rest)));
                    result.finally(function () {
                      return finishWalletAction && finishWalletAction(propKey, args);
                    });
                    return _context.abrupt("return", result);

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }))
        );
      } else if (startWalletAction && finishWalletAction && typeof target[propKey] === 'function' && propKey === 'signMessage') {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          startWalletAction(propKey, args);
          var addressPromise = target.getAddress();
          return addressPromise.then(function (from) {
            var msg = ethUtil.bufferToHex(new Buffer(_.first(args), 'utf8'));
            var params = [msg, from.toLowerCase()];
            var result = new Promise(function (resolve, reject) {
              return target.provider._sendAsync({
                id: uuid(),
                method: 'personal_sign',
                params: params
              }, function (err, resp) {
                if (err) {
                  reject(err);
                } else {
                  resolve(_.get(resp, 'result'));
                }
              });
            });
            result.finally(function () {
              return finishWalletAction(propKey, args);
            });
            return result;
          });
        };
      } else if (propKey === 'signTypedData') {
        return function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          if (!supportsSignTypedData) {
            return Promise.reject("signTypedData not supported by ".concat(walletType));
          }

          startWalletAction(propKey, args);
          var addressPromise = target.getAddress();
          return addressPromise.then(function (from) {
            var data = _.first(args);

            var result = function (type) {
              switch (type) {
                case 'metamask':
                  return new Promise(function (resolve, reject) {
                    target.provider._web3Provider.sendAsync({
                      id: uuid(),
                      method: 'eth_signTypedData_v3',
                      params: [from, JSON.stringify(data)],
                      from: from
                    }, function (err, resp) {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(_.get(resp, 'result'));
                      }
                    });
                  });

                case 'fortmatic':
                  return new Promise(function (resolve, reject) {
                    target.provider._web3Provider.sendAsync({
                      id: uuid(),
                      method: 'eth_signTypedData_v3',
                      params: [from, JSON.stringify(data)],
                      from: from
                    }, function (err, resp) {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(_.get(resp, 'result'));
                      }
                    });
                  });

                default:
                  return Promise.reject("signTypedData not supported by ".concat(walletType));
              }
            }(walletType);

            result.finally(function () {
              return finishWalletAction(propKey, args);
            });
            return result;
          });
        };
      }

      return target[propKey];
    }
  };
  return new Proxy(obj, handler);
}

function getSigner(params) {
  var walletActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var walletType = arguments.length > 2 ? arguments[2] : undefined;

  if (!walletActions.startWalletAction) {
    var gas = new Gas();

    walletActions.startWalletAction = function () {
      return (// eslint-disable-line
        gas.getGasSettingsForTransaction('average')
      );
    };
  }

  var privateKey = params.privateKey,
      web3Provider = params.web3Provider;

  if (!(privateKey || web3Provider)) {
    throw new Error("must set 'privateKey' or 'web3Provider' in params");
  } else if (privateKey) {
    return traceMethodCalls(new ethers.Wallet(privateKey, httpProvider), walletActions);
  } else {
    var networkVersion;

    if (web3Provider.isPortis || web3Provider.isLedger || web3Provider.isFortmatic) {
      networkVersion = NETWORK;
    } else if (web3Provider.networkVersion) {
      networkVersion = Number(web3Provider.networkVersion);
    } else {
      try {
        networkVersion = Number(web3Provider.send({
          method: 'net_version'
        }).result);
      } catch (e) {
        networkVersion = NETWORK;
      }
    }

    if (NETWORK !== networkVersion) {
      throw new Error("Please set your wallet to use ".concat(NETWORK_MAPPING[NETWORK]));
    }

    var tempProvider = new ethers.providers.Web3Provider(web3Provider);
    var signer = new UncheckedJsonRpcSigner(tempProvider.getSigner());
    return traceMethodCalls(signer, walletActions, walletType);
  }
}

module.exports = getSigner;