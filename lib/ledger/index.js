"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var ProviderEngine = require('web3-provider-engine');

var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');

var _require = require('@ledgerhq/hw-app-eth/lib/Eth'),
    AppEth = _require.default;

var _require2 = require('@ledgerhq/hw-transport-u2f'),
    TransportU2F = _require2.default;

var HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet');

var stripHexPrefix = require('strip-hex-prefix');

var EthereumTx = require('ethereumjs-tx');

var _require3 = require('../constants'),
    NETWORK = _require3.NETWORK,
    AIRSWAP_GETH_NODE_ADDRESS = _require3.AIRSWAP_GETH_NODE_ADDRESS;

var getLedgerAccount =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(subPath) {
    var transport, eth, path, addressPromise;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return TransportU2F.create(10000, 10000);

          case 2:
            transport = _context.sent;
            eth = new AppEth(transport);
            path = "".concat(subPath);
            addressPromise = eth.getAddress(path, false, true);
            addressPromise.then(function () {
              return transport.close();
            });
            return _context.abrupt("return", addressPromise);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getLedgerAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

var makeLedgerProvider =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(path) {
    var engine, getTransport, ledger, rpcProvider;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            engine = new ProviderEngine();

            getTransport = function getTransport() {
              return TransportU2F.create(10000, 10000);
            };

            ledger = createLedgerSubprovider(getTransport, {
              networkId: NETWORK,
              accountsLength: 1,
              path: path,
              accountsOffset: 0
            });
            rpcProvider = new RpcSubprovider({
              rpcUrl: AIRSWAP_GETH_NODE_ADDRESS
            });
            engine.addProvider(ledger);
            engine.addProvider(rpcProvider);
            engine.start();
            return _context2.abrupt("return", engine);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function makeLedgerProvider(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var allowedHdPaths = ["44'/60'", "44'/61'"];

function makeError(msg, id) {
  var err = new Error(msg);
  err.id = id;
  return err;
}

function obtainPathComponentsFromDerivationPath(derivationPath) {
  // check if derivation path follows 44'/60'/x'/n pattern
  var regExp = /^(44'\/6[0|1]'\/\d+'?\/\d+'?)(\/\d+)?$/;
  var matchResult = regExp.exec(derivationPath);

  if (matchResult === null) {
    throw makeError("To get multiple accounts your derivation path must follow pattern 44'/60|61'/x'/n ", 'InvalidDerivationPath');
  }

  return {
    basePath: matchResult[1],
    index: parseInt(_.trimStart(matchResult[2], '/'), 10)
  };
}

var defaultOptions = {
  networkId: 1,
  // mainnet
  path: "44'/60'/0'/0",
  // ledger default derivation path
  askConfirm: false,
  accountsLength: 1,
  accountsOffset: 0
};

function createLedgerSubprovider(getTransport, options) {
  var _defaultOptions$optio = _objectSpread({}, defaultOptions, options),
      networkId = _defaultOptions$optio.networkId,
      path = _defaultOptions$optio.path,
      askConfirm = _defaultOptions$optio.askConfirm,
      accountsLength = _defaultOptions$optio.accountsLength,
      accountsOffset = _defaultOptions$optio.accountsOffset;

  if (!allowedHdPaths.some(function (hdPref) {
    return path.startsWith(hdPref);
  })) {
    throw makeError("Ledger derivation path allowed are ".concat(allowedHdPaths.join(', '), ". ").concat(path, " is not supported"), 'InvalidDerivationPath');
  }

  var pathComponents = obtainPathComponentsFromDerivationPath(path);
  var addressToPathMap = {};

  function _getAccounts2() {
    return _getAccounts.apply(this, arguments);
  }

  function _getAccounts() {
    _getAccounts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var transport, eth, addresses, i, accountPath, address;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return getTransport();

            case 3:
              transport = _context3.sent;
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.reject(_context3.t0));

            case 9:
              _context3.prev = 9;
              eth = new AppEth(transport);
              addresses = {};
              i = accountsOffset;

            case 13:
              if (!(i < accountsOffset + accountsLength)) {
                _context3.next = 30;
                break;
              }

              accountPath = "".concat(pathComponents.basePath, "/").concat(pathComponents.index + i);
              address = void 0;
              _context3.prev = 16;
              _context3.next = 19;
              return eth.getAddress(accountPath, askConfirm, false);

            case 19:
              address = _context3.sent;
              _context3.next = 25;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t1 = _context3["catch"](16);
              return _context3.abrupt("return", Promise.reject(_context3.t1));

            case 25:
              addresses[path] = address.address.toLowerCase();
              addressToPathMap[address.address.toLowerCase()] = path;

            case 27:
              i++;
              _context3.next = 13;
              break;

            case 30:
              return _context3.abrupt("return", addresses);

            case 31:
              _context3.prev = 31;
              transport.close();
              return _context3.finish(31);

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 6], [9,, 31, 34], [16, 22]]);
    }));
    return _getAccounts.apply(this, arguments);
  }

  function _signPersonalMessage2(_x3) {
    return _signPersonalMessage.apply(this, arguments);
  }

  function _signPersonalMessage() {
    _signPersonalMessage = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(msgData) {
      var dPath, transport, eth, result, v, vHex;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dPath = addressToPathMap[msgData.from.toLowerCase()];

              if (dPath) {
                _context4.next = 3;
                break;
              }

              throw new Error("address unknown '".concat(msgData.from, "'"));

            case 3:
              _context4.next = 5;
              return getTransport();

            case 5:
              transport = _context4.sent;
              _context4.prev = 6;
              eth = new AppEth(transport);
              _context4.prev = 8;
              _context4.next = 11;
              return eth.signPersonalMessage(dPath, stripHexPrefix(msgData.data));

            case 11:
              result = _context4.sent;
              _context4.next = 17;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](8);
              return _context4.abrupt("return", Promise.reject(_context4.t0));

            case 17:
              v = parseInt(result.v, 10) - 27;
              vHex = v.toString(16);

              if (vHex.length < 2) {
                vHex = "0".concat(v);
              }

              return _context4.abrupt("return", "0x".concat(result.r).concat(result.s).concat(vHex));

            case 21:
              _context4.prev = 21;
              transport.close();
              return _context4.finish(21);

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[6,, 21, 24], [8, 14]]);
    }));
    return _signPersonalMessage.apply(this, arguments);
  }

  function _signTransaction2(_x4) {
    return _signTransaction.apply(this, arguments);
  }

  function _signTransaction() {
    _signTransaction = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(txData) {
      var dPath, transport, eth, tx, result, signedChainId, validChainId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dPath = addressToPathMap[txData.from];

              if (dPath) {
                _context5.next = 3;
                break;
              }

              throw new Error("address unknown '".concat(txData.from, "'"));

            case 3:
              _context5.next = 5;
              return getTransport();

            case 5:
              transport = _context5.sent;
              _context5.prev = 6;
              eth = new AppEth(transport);
              tx = new EthereumTx(txData); // Set the EIP155 bits

              tx.raw[6] = Buffer.from([networkId]); // v

              tx.raw[7] = Buffer.from([]); // r

              tx.raw[8] = Buffer.from([]); // s
              // Pass hex-rlp to ledger for signing

              _context5.next = 14;
              return eth.signTransaction(dPath, tx.serialize().toString('hex'));

            case 14:
              result = _context5.sent;
              // Store signature in transaction
              tx.v = Buffer.from(result.v, 'hex');
              tx.r = Buffer.from(result.r, 'hex');
              tx.s = Buffer.from(result.s, 'hex'); // EIP155: v should be chain_id * 2 + {35, 36}

              signedChainId = Math.floor((tx.v[0] - 35) / 2); // eslint-disable-next-line

              validChainId = networkId & 0xff; // FIXME this is to fixed a current workaround that app don't support > 0xff

              if (!(signedChainId !== validChainId)) {
                _context5.next = 22;
                break;
              }

              throw makeError("Invalid networkId signature returned. Expected: ".concat(networkId, ", Got: ").concat(signedChainId), 'InvalidNetworkId');

            case 22:
              return _context5.abrupt("return", "0x".concat(tx.serialize().toString('hex')));

            case 23:
              _context5.prev = 23;
              transport.close();
              return _context5.finish(23);

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[6,, 23, 26]]);
    }));
    return _signTransaction.apply(this, arguments);
  }

  var ledgerTimeout = 30000;
  var subprovider = new HookedWalletSubprovider({
    getAccounts: function getAccounts(callback) {
      _getAccounts2().then(function (res) {
        return callback(null, Object.values(res));
      }).catch(function (err) {
        return callback(err, null);
      });
    },
    signPersonalMessage: function signPersonalMessage(txData, callback) {
      var timedOut;
      var finished;
      window.setTimeout(function () {
        timedOut = true;
        if (!finished) callback("Ledger ".concat(ledgerTimeout / 1000, " second timeout reached"), null);
      }, ledgerTimeout);

      _signPersonalMessage2(txData).then(function (res) {
        if (!timedOut) {
          callback(null, res);
          finished = true;
        }
      }).catch(function (err) {
        if (!timedOut) {
          callback(err, null);
          finished = true;
        }
      });
    },
    signTransaction: function signTransaction(txData, callback) {
      var timedOut;
      var finished;
      window.setTimeout(function () {
        timedOut = true;
        if (!finished) callback("Ledger ".concat(ledgerTimeout / 1000, " second timeout reached"), null);
      }, ledgerTimeout);

      _signTransaction2(txData).then(function (res) {
        if (!timedOut) {
          callback(null, res);
          finished = true;
        }
      }).catch(function (err) {
        if (!timedOut) {
          callback(err, null);
          finished = true;
        }
      });
    }
  });
  return subprovider;
}

module.exports = {
  getLedgerAccount: getLedgerAccount,
  makeLedgerProvider: makeLedgerProvider
};