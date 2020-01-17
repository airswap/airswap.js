"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ethers = require('ethers');

var _require = require('../constants'),
    NETWORK_NAME = _require.NETWORK_NAME,
    httpProvider = _require.httpProvider,
    infuraProvider = _require.infuraProvider;

var _require2 = require('ethers/utils/web'),
    poll = _require2.poll; // const { checkProperties, defineReadOnly, resolveProperties, shallowCopy } = require('ethers/utils/properties')


var provider = new ethers.getDefaultProvider(NETWORK_NAME || 'homestead'); // from: https://github.com/ethers-io/ethers.js/issues/340#issuecomment-447512944

var UncheckedJsonRpcSigner =
/*#__PURE__*/
function (_ethers$Signer) {
  _inherits(UncheckedJsonRpcSigner, _ethers$Signer);

  function UncheckedJsonRpcSigner(signer) {
    var _this;

    _classCallCheck(this, UncheckedJsonRpcSigner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UncheckedJsonRpcSigner).call(this));
    ethers.utils.defineReadOnly(_assertThisInitialized(_assertThisInitialized(_this)), 'signer', signer);
    ethers.utils.defineReadOnly(_assertThisInitialized(_assertThisInitialized(_this)), 'provider', signer.provider);
    return _this;
  }

  _createClass(UncheckedJsonRpcSigner, [{
    key: "getAddress",
    value: function getAddress() {
      return this.signer.getAddress();
    }
  }, {
    key: "sendTransaction",
    value: function sendTransaction(transaction) {
      var _this2 = this;

      // return this.signer.sendUncheckedTransaction(transaction).then(hash => httpProvider.getTransaction(hash))
      return this.signer.sendUncheckedTransaction(transaction).then(function (hash) {
        return poll(
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var tx;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return provider.getTransaction(hash);

                case 2:
                  tx = _context.sent;

                  if (!tx) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return", tx);

                case 5:
                  _context.next = 7;
                  return _this2.signer.provider.getTransaction(hash);

                case 7:
                  tx = _context.sent;

                  if (!tx) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt("return", tx);

                case 10:
                  _context.next = 12;
                  return infuraProvider.getTransaction(hash);

                case 12:
                  tx = _context.sent;

                  if (!tx) {
                    _context.next = 15;
                    break;
                  }

                  return _context.abrupt("return", tx);

                case 15:
                  _context.next = 17;
                  return httpProvider.getTransaction(hash);

                case 17:
                  tx = _context.sent;

                  if (!tx) {
                    _context.next = 20;
                    break;
                  }

                  return _context.abrupt("return", tx);

                case 20:
                  return _context.abrupt("return", undefined);

                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        })), {
          fastRetry: 250
        }).catch(function (error) {
          throw error;
        });
      });
    }
  }, {
    key: "signMessage",
    value: function signMessage(message) {
      return this.signer.signMessage(message);
    }
  }]);

  return UncheckedJsonRpcSigner;
}(ethers.Signer);

module.exports = UncheckedJsonRpcSigner;