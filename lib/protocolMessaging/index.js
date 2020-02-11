"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var ethers = require('ethers');

var jaysonBrowserClient = require('jayson/lib/client/browser');

var fetch = require('node-fetch');

var uuid = require('uuid4');

var _require = require('../swap/utils'),
    nest = _require.nest,
    flatten = _require.flatten,
    mapNested22OrderTo20Order = _require.mapNested22OrderTo20Order,
    mapNested22QuoteTo20Quote = _require.mapNested22QuoteTo20Quote;

var _require2 = require('../delegate'),
    routeDelegateCall = _require2.routeDelegateCall; // Class Constructor
// ----------------


var quoteQueryDefaults = {
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateAmount: '0'
};
var orderQueryDefaults = {
  senderWallet: '0x0000000000000000000000000000000000000000',
  affiliateToken: '0x0000000000000000000000000000000000000000',
  affiliateAmount: '0'
};

function typeSafeOrder(params, locatorType) {
  if (locatorType === 'contract') {
    return mapNested22QuoteTo20Quote(params);
  }

  var nonce = params.nonce,
      expiry = params.expiry,
      signature = params.signature,
      signer = params.signer,
      sender = params.sender,
      affiliate = params.affiliate;
  var safeOrder = mapNested22OrderTo20Order({
    signer: _objectSpread({}, signer, {
      wallet: signer.wallet.toLowerCase()
    }),
    sender: _objectSpread({}, sender, {
      wallet: sender.wallet.toLowerCase()
    }),
    affiliate: _objectSpread({}, affiliate, {
      wallet: affiliate.wallet.toLowerCase()
    }),
    signature: _objectSpread({}, signature, {
      v: "".concat(signature.v),
      signatory: signature.signatory.toLowerCase(),
      validator: signature.validator.toLowerCase()
    }),
    nonce: "".concat(nonce),
    expiry: "".concat(expiry)
  }, true);
  return safeOrder;
}

var Router =
/*#__PURE__*/
function () {
  // * `address`: `string` - ethereum address of wallet using the Router
  function Router(config) {
    _classCallCheck(this, Router);

    var _config$address = config.address,
        address = _config$address === void 0 ? '' : _config$address,
        _config$timeout = config.timeout,
        timeout = _config$timeout === void 0 ? 12000 : _config$timeout; // Create an ethereum wallet object for signing orders

    this.address = address.toLowerCase();
    this.timeout = timeout; // Websocket authentication state

    this.isAuthenticated = false; // Promise resolvers/rejectors and timeouts for each call

    this.RESOLVERS = {};
    this.REJECTORS = {};
    this.TIMEOUTS = {};
  } // RPC Methods
  // ----------------
  // Prepare a formatted query to be submitted as a JSON-RPC call


  _createClass(Router, [{
    key: "call",
    // Send a JSON-RPC `message` to a `receiver` address.
    // Optionally pass `resolve` and `reject` callbacks to handle a response
    value: function call(signerAddress, message, resolve, reject, locator, locatorType) {
      if (locatorType && _.includes(['http', 'https'], locatorType)) {
        var timeout = setTimeout(function () {
          return reject({
            message: "Request timed out.",
            code: -1
          });
        }, this.timeout);

        var callServer = function callServer(request, callback) {
          var options = {
            method: 'POST',
            body: request,
            headers: {
              'Content-Type': 'application/json'
            }
          };
          fetch(locator, options).then(function (res) {
            return res.text();
          }).then(function (text) {
            callback(null, text);
          }).catch(function (err) {
            callback(err);
          });
        };

        var client = jaysonBrowserClient(callServer);
        client.request(message.method, message.params, function (err, error, response) {
          clearTimeout(timeout);

          if (err) {
            reject(err);
          } else if (error) {
            reject("Maker Error: ".concat(error.message));
          } else {
            resolve(response);
          }
        });
      } else if (locatorType === 'contract') {
        routeDelegateCall(locator, message, signerAddress, this.address).then(function (resp) {
          resolve(resp);
        }).catch(function (e) {
          reject(e);
        });
      }
    }
  }, {
    key: "getSignerSideOrder",
    value: function getSignerSideOrder(signerAddress, params) {
      var _this = this;

      var signerToken = params.signerToken,
          senderToken = params.senderToken,
          senderAmount = params.senderAmount,
          affiliateToken = params.affiliateToken,
          affiliateAmount = params.affiliateAmount,
          locator = params.locator,
          locatorType = params.locatorType;
      var query = Object.assign({}, orderQueryDefaults, {
        signerToken: signerToken,
        senderToken: senderToken,
        senderAmount: senderAmount,
        senderWallet: this.address.toLowerCase(),
        affiliateToken: affiliateToken,
        affiliateAmount: affiliateAmount
      });
      var payload = Router.makeRPC('getSignerSideOrder', query);
      return new Promise(function (res, rej) {
        return _this.call(signerAddress, payload, res, rej, locator, locatorType);
      }).then(function (order) {
        return _objectSpread({}, typeSafeOrder(order, locatorType), {
          swap: {
            version: 2
          },
          locator: {
            type: locatorType,
            value: locator
          }
        });
      });
    }
  }, {
    key: "getSenderSideOrder",
    value: function getSenderSideOrder(signerAddress, params) {
      var _this2 = this;

      var signerToken = params.signerToken,
          senderToken = params.senderToken,
          signerAmount = params.signerAmount,
          affiliateToken = params.affiliateToken,
          affiliateAmount = params.affiliateAmount,
          locator = params.locator,
          locatorType = params.locatorType;
      var query = Object.assign({}, orderQueryDefaults, {
        signerToken: signerToken,
        senderToken: senderToken,
        signerAmount: signerAmount,
        senderWallet: this.address.toLowerCase(),
        affiliateToken: affiliateToken,
        affiliateAmount: affiliateAmount
      });
      var payload = Router.makeRPC('getSenderSideOrder', query);
      return new Promise(function (res, rej) {
        return _this2.call(signerAddress, payload, res, rej, locator, locatorType);
      }).then(function (order) {
        return _objectSpread({}, typeSafeOrder(order, locatorType), {
          swap: {
            version: 2
          },
          locator: {
            type: locatorType,
            value: locator
          }
        });
      });
    } // Make a JSON-RPC `getOrder` call on a maker and recieve back a signed order (or a timeout if they fail to respond)
    // * `makerAddress`: `string` - the maker address to request an order from
    // * `params`: `Object` - order parameters. Must specify 1 of either `makerAmount` or `takerAmount`. Must also specify `makerToken` and `takerToken` addresses

  }, {
    key: "getOrder",
    value: function getOrder(makerAddress, params) {
      var _this3 = this;

      var makerAmount = params.makerAmount,
          takerAmount = params.takerAmount,
          makerToken = params.makerToken,
          takerToken = params.takerToken,
          locator = params.locator,
          locatorType = params.locatorType;
      var BadArgumentsError = new Error('bad arguments passed to getOrder');
      var swapVersion = params.swapVersion || 1;

      if (swapVersion === 2) {
        if (takerAmount) {
          return this.getSignerSideOrder(makerAddress, {
            senderAmount: takerAmount,
            signerToken: makerToken,
            senderToken: takerToken,
            locator: locator,
            locatorType: locatorType
          });
        } else if (makerAmount) {
          return this.getSenderSideOrder(makerAddress, {
            signerAmount: makerAmount,
            signerToken: makerToken,
            senderToken: takerToken,
            locator: locator,
            locatorType: locatorType
          });
        }
      }

      if (!makerAmount && !takerAmount) throw BadArgumentsError;
      if (makerAmount && takerAmount) throw BadArgumentsError;
      if (!takerToken || !makerToken) throw BadArgumentsError;
      var query = {
        makerToken: makerToken,
        takerToken: takerToken,
        makerAmount: makerAmount ? String(makerAmount) : null,
        takerAmount: takerAmount ? String(takerAmount) : null,
        takerAddress: this.address.toLowerCase()
      };
      var payload = Router.makeRPC('getOrder', query);
      return new Promise(function (res, rej) {
        return _this3.call(makerAddress, payload, res, rej);
      }).then(function (order) {
        if (makerAmount && makerAmount !== order.makerAmount) {
          return {
            message: 'makerAmount specified in getOrder request does not match makerAmount sent from maker; discarding order'
          };
        } else if (takerAmount && takerAmount !== order.takerAmount) {
          return {
            message: 'takerAmount specified in getOrder request does not match takerAmount sent from maker; discarding order'
          };
        }

        return _objectSpread({}, order, {
          v: order.v ? ethers.utils.bigNumberify(order.v).toNumber() : order.v,
          expiration: order.expiration ? ethers.utils.bigNumberify(order.expiration).toNumber() : order.expiration,
          makerAddress: (order.makerAddress || '').toLowerCase(),
          // normalizes the case of addresses in returned orders
          takerAddress: (order.takerAddress || '').toLowerCase(),
          makerToken: (order.makerToken || '').toLowerCase(),
          takerToken: (order.takerToken || '').toLowerCase(),
          swapVersion: swapVersion,
          nonce: order.nonce ? "".concat(order.nonce) : order.nonce
        });
      });
    }
  }, {
    key: "getSignerSideQuote",
    value: function getSignerSideQuote(makerAddress, params) {
      var _this4 = this;

      var signerToken = params.signerToken,
          senderToken = params.senderToken,
          senderAmount = params.senderAmount,
          locator = params.locator,
          locatorType = params.locatorType;
      var query = Object.assign({}, quoteQueryDefaults, {
        signerToken: signerToken,
        senderToken: senderToken,
        senderAmount: senderAmount
      });
      var payload = Router.makeRPC('getSignerSideQuote', query);
      return new Promise(function (res, rej) {
        return _this4.call(makerAddress, payload, res, rej, locator, locatorType);
      }).then(function (quote) {
        var flatQuote = flatten(quote);

        var combinedQuote = _objectSpread({}, query, flatQuote, {
          swapVersion: 2,
          locator: {
            type: locatorType,
            value: locator
          }
        });

        return mapNested22QuoteTo20Quote(nest(combinedQuote));
      });
    }
  }, {
    key: "getSenderSideQuote",
    value: function getSenderSideQuote(makerAddress, params) {
      var _this5 = this;

      var signerToken = params.signerToken,
          senderToken = params.senderToken,
          signerAmount = params.signerAmount,
          locator = params.locator,
          locatorType = params.locatorType;
      var query = Object.assign({}, quoteQueryDefaults, {
        signerToken: signerToken,
        senderToken: senderToken,
        signerAmount: signerAmount
      });
      var payload = Router.makeRPC('getSenderSideQuote', query);
      return new Promise(function (res, rej) {
        return _this5.call(makerAddress, payload, res, rej, locator, locatorType);
      }).then(function (quote) {
        var flatQuote = flatten(quote);

        var combinedQuote = _objectSpread({}, query, flatQuote, {
          swapVersion: 2,
          locator: {
            type: locatorType,
            value: locator
          }
        });

        return mapNested22QuoteTo20Quote(nest(combinedQuote));
      });
    }
  }, {
    key: "getMaxQuote",
    value: function getMaxQuote(makerAddress, params) {
      var _this6 = this;

      var makerToken = params.makerToken,
          takerToken = params.takerToken,
          signerToken = params.signerToken,
          senderToken = params.senderToken,
          locator = params.locator,
          locatorType = params.locatorType;
      var BadArgumentsError = new Error('bad arguments passed to getMaxQuote');
      var swapVersion = params.swapVersion || 1;
      if (!(takerToken && makerToken || signerToken && senderToken)) throw BadArgumentsError;
      var query = swapVersion === 2 ? {
        signerToken: signerToken || makerToken,
        senderToken: senderToken || takerToken
      } : {
        makerToken: makerToken,
        takerToken: takerToken
      };
      var payload = Router.makeRPC('getMaxQuote', query);
      return new Promise(function (res, rej) {
        return _this6.call(makerAddress, payload, res, rej, locator, locatorType);
      }).then(function (quote) {
        if (swapVersion === 2) {
          var flatQuote = flatten(quote);

          var combinedQuote = _objectSpread({}, query, flatQuote, {
            swapVersion: 2,
            locator: {
              type: locatorType,
              value: locator
            }
          });

          return mapNested22QuoteTo20Quote(nest(combinedQuote));
        }

        return _objectSpread({}, quote, query, {
          swapVersion: swapVersion
        });
      });
    }
  }, {
    key: "getQuote",
    value: function getQuote(makerAddress, params) {
      var makerAmount = params.makerAmount,
          takerAmount = params.takerAmount,
          makerToken = params.makerToken,
          takerToken = params.takerToken,
          locator = params.locator,
          locatorType = params.locatorType;
      var swapVersion = params.swapVersion || 1;

      if (swapVersion === 2) {
        if (takerAmount) {
          return this.getSignerSideQuote(makerAddress, {
            senderAmount: takerAmount,
            signerToken: makerToken,
            senderToken: takerToken,
            locator: locator,
            locatorType: locatorType
          });
        } else if (makerAmount) {
          return this.getSenderSideQuote(makerAddress, {
            signerAmount: makerAmount,
            signerToken: makerToken,
            senderToken: takerToken,
            locator: locator,
            locatorType: locatorType
          });
        }
      }
    }
  }], [{
    key: "makeRPC",
    value: function makeRPC(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : uuid();
      return {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: id
      };
    }
  }]);

  return Router;
}();

module.exports = Router;