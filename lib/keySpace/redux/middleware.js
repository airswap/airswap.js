"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keySpaceMiddleware;

var _index = _interopRequireDefault(require("../index"));

var _actions = require("../../wallet/redux/actions");

var _transformations = require("../../utils/transformations");

var _reducers = require("./reducers");

var _reducers2 = require("../../wallet/redux/reducers");

var _reducers3 = require("../../protocolMessaging/redux/reducers");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var keySpace;

function initialzeKeySpace(_x) {
  return _initialzeKeySpace.apply(this, arguments);
}

function _initialzeKeySpace() {
  _initialzeKeySpace = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store) {
    var signer, signedSeed, onRequestSignedSeed, onGeneratedSignedSeed, onRequestPGPKeyPair, onGeneratedPGPKeyPair;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return store.dispatch((0, _actions.getSigner)());

          case 2:
            signer = _context.sent;
            signedSeed = _reducers.selectors.getSignedSeed(store.getState());

            onRequestSignedSeed = function onRequestSignedSeed(seed) {
              return store.dispatch({
                type: 'REQUEST_SIGNED_SEED',
                seed: seed
              });
            };

            onGeneratedSignedSeed = function onGeneratedSignedSeed(signedSeed) {
              return store.dispatch({
                type: 'GENERATED_SIGNED_SEED',
                signedSeed: signedSeed
              });
            }; // eslint-disable-line


            onRequestPGPKeyPair = function onRequestPGPKeyPair(address) {
              return store.dispatch({
                type: 'REQUEST_PGP_KEY_PAIR',
                address: address
              });
            };

            onGeneratedPGPKeyPair = function onGeneratedPGPKeyPair(keyPair) {
              return store.dispatch({
                type: 'GENERATED_PGP_KEY_PAIR',
                keyPair: keyPair
              });
            };

            keySpace = new _index.default({
              signer: signer,
              signedSeed: signedSeed,
              onRequestSignedSeed: onRequestSignedSeed,
              onGeneratedSignedSeed: onGeneratedSignedSeed,
              onRequestPGPKeyPair: onRequestPGPKeyPair,
              onGeneratedPGPKeyPair: onGeneratedPGPKeyPair
            });
            window.keySpace = keySpace;
            return _context.abrupt("return", keySpace.setUpPGP());

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _initialzeKeySpace.apply(this, arguments);
}

function keySpaceMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'CONNECTED_WALLET':
          if (_reducers3.selectors.getRouterRequireAuth(store.getState()) && (_constants.IS_INSTANT || _constants.IS_EXPLORER)) {
            store.dispatch({
              type: 'INITIALIZE_KEYSPACE'
            });
          }

          break;

        case 'INITIALIZE_KEYSPACE':
          initialzeKeySpace(store).then(function () {
            store.dispatch({
              type: 'KEYSPACE_READY'
            });
            var connectedAddress = (0, _reducers2.getConnectedWalletAddress)(store.getState());
            store.dispatch({
              type: 'SET_SIGNED_SEED',
              signedSeed: keySpace.signedSeed,
              address: connectedAddress
            });
          }).catch(function (error) {
            return store.dispatch({
              type: 'KEYSPACE_INIT_ERROR',
              error: (0, _transformations.formatErrorMessage)(error)
            });
          });
          break;

        case 'GET_KEYSPACE':
          if (keySpace.initialized) {
            action.resolve(keySpace);
          } else {
            action.reject('KeySpace not initialized');
          }

          break;

        case 'GET_PGP_SIGNATURE':
          keySpace.sign(action.text).then(action.resolve).catch(action.reject);
          break;

        default:
      }

      return next(action);
    };
  };
}