"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var ethers = require('ethers');

var WebSocket = require('isomorphic-ws');

var jaysonBrowserClient = require('jayson/lib/client/browser');

var fetch = require('node-fetch');

var uuid = require('uuid4');

var _require = require('../constants'),
    REACT_APP_SERVER_URL = _require.REACT_APP_SERVER_URL,
    INDEXER_ADDRESS = _require.INDEXER_ADDRESS;

var _require2 = require('../swap/utils'),
    nest = _require2.nest,
    flatten = _require2.flatten,
    mapNested22OrderTo20Order = _require2.mapNested22OrderTo20Order,
    mapNested22QuoteTo20Quote = _require2.mapNested22QuoteTo20Quote;

var _require3 = require('../delegate'),
    routeDelegateCall = _require3.routeDelegateCall; // Class Constructor
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
  // * `rpcActions`: `Object` - user defined methods; called by peers via JSON-RPC
  // * `messageSigner`: `function` - a function taking the form (message) => signer.sign(message)
  // * `address`: `string` - ethereum address of wallet using the Router
  // * `keyspace`: `boolean` - if true, uses a keyspace messageSigner (message) => keyspace.sign(message), if false, uses an ethereum signer
  // * `requireAuthentication`: `boolean` if authenticated, the indexer allows the setting of intents. If not, only messaging is enabled
  function Router(config) {
    _classCallCheck(this, Router);

    var _config$rpcActions = config.rpcActions,
        rpcActions = _config$rpcActions === void 0 ? {} : _config$rpcActions,
        messageSigner = config.messageSigner,
        _config$address = config.address,
        address = _config$address === void 0 ? '' : _config$address,
        keyspace = config.keyspace,
        requireAuthentication = config.requireAuthentication,
        _config$timeout = config.timeout,
        timeout = _config$timeout === void 0 ? 12000 : _config$timeout,
        _config$supportLegacy = config.supportLegacy,
        supportLegacy = _config$supportLegacy === void 0 ? true : _config$supportLegacy; // Create an ethereum wallet object for signing orders

    this.messageSigner = messageSigner;
    this.address = address.toLowerCase();
    this.requireAuthentication = requireAuthentication;
    this.timeout = timeout;
    this.supportLegacy = supportLegacy;
    var keyspaceSnippet = keyspace ? 'use_pgp=true&' : '';
    var prefix = typeof window !== 'undefined' && window.location.protocol === 'http:' ? 'ws:' : 'wss:'; // Set the websocket url based on environment

    this.socketUrl = "".concat(prefix).concat(REACT_APP_SERVER_URL, "websocket").concat(requireAuthentication ? '' : '/nochallenge', "?".concat(requireAuthentication ? keyspaceSnippet : '', "address=").concat(address.toLowerCase())); // Websocket authentication state

    this.isAuthenticated = false; // Promise resolvers/rejectors and timeouts for each call

    this.RESOLVERS = {};
    this.REJECTORS = {};
    this.TIMEOUTS = {}; // User defined methods that will be invoked by peers on the JSON-RPC

    this.RPC_METHOD_ACTIONS = rpcActions;
    this.getOrders = this.getOrders.bind(this);
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
      } else {
        var messageString = JSON.stringify({
          sender: this.address.toLowerCase(),
          receiver: signerAddress,
          message: JSON.stringify(message),
          id: uuid()
        });
        this.socket.send(messageString); // Set the promise resolvers and rejectors for this call

        if (typeof resolve === 'function') {
          this.RESOLVERS[message.id] = resolve;
        }

        if (typeof reject === 'function') {
          this.REJECTORS[message.id] = reject;
        } // Set a timeout for this call


        this.TIMEOUTS[message.id] = setTimeout(function () {
          if (typeof reject === 'function') {
            reject({
              message: "Request timed out. [".concat(message.id, "]"),
              code: -1
            });
          }
        }, this.timeout);
      }
    } // WebSocket Interaction
    // ----------------
    // Connect to AirSwap by opening websocket. The sequence:
    // 1. Open a websocket connection
    // 2. Receive a challenge (some random data to sign)
    // 3. Sign the data and send it back over the wire
    // 4. Receive an "ok" and start sending and receiving RPC

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      var reconnect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // Promisify the `onmessage` handler. Allows us to return information
      // about the connection state after the authentication handshake
      if (this.supportLegacy) {
        return new Promise(function (resolve, reject) {
          _this.socket = new WebSocket(_this.socketUrl); // Check socket health every 30 seconds

          _this.socket.onopen = function healthCheck() {
            var _this2 = this;

            this.isAlive = true; // trying to make this isomorphic, and ping/pong isn't supported in browser websocket api

            if (this.ping) {
              this.addEventListener('pong', function () {
                _this2.isAlive = true;
              });
              this.interval = setInterval(function () {
                if (_this2.isAlive === false) {
                  _this2.close();
                }

                _this2.isAlive = false;

                _this2.ping();
              }, 30000);
            }
          }; // The connection was closed


          _this.socket.onclose = function () {
            _this.isAuthenticated = false;
            clearInterval(_this.socket.interval);

            if (reconnect) {
              setTimeout(function () {
                _this.connect();
              }, 10000);
            } else {
              reject('socket closed');
            }
          }; // There was an error on the connection


          _this.socket.onerror = function (event) {
            reject(event);
          }; // Received a message


          _this.socket.onmessage = function (event) {
            // We are authenticating
            if (!_this.isAuthenticated && _this.requireAuthentication) {
              switch (event.data) {
                // We have completed the challenge.
                case 'ok':
                  _this.isAuthenticated = true;
                  resolve(event.data);
                  break;

                case 'not authorized':
                  reject(new Error('Address is not authorized.'));
                  break;

                default:
                  // We have been issued a challenge.
                  _this.messageSigner(event.data).then(function (signature) {
                    _this.socket.send(signature);
                  });

              }
            } else if (!_this.isAuthenticated && !_this.requireAuthentication) {
              if (event.data === 'ok') {
                _this.isAuthenticated = true;
                resolve(event.data);
              }
            } else if (_this.isAuthenticated) {
              // We are already authenticated and are receiving an RPC.
              var payload;
              var message;

              try {
                payload = JSON.parse(event.data);
                message = payload.message && JSON.parse(payload.message);
                payload.message = message;
              } catch (e) {}

              if (!payload || !message) {
                return;
              }

              if (message.method) {
                // Another peer is invoking a method.
                if (_this.RPC_METHOD_ACTIONS[message.method]) {
                  _this.RPC_METHOD_ACTIONS[message.method](payload);
                }
              } else if (message.id) {
                // We have received a response from a method call.
                var isError = Object.prototype.hasOwnProperty.call(message, 'error');

                if (!isError && message.result) {
                  // Resolve the call if a resolver exists.
                  if (typeof _this.RESOLVERS[message.id] === 'function') {
                    _this.RESOLVERS[message.id](message.result);
                  }
                } else if (isError) {
                  // Reject the call if a resolver exists.
                  if (typeof _this.REJECTORS[message.id] === 'function') {
                    _this.REJECTORS[message.id](message.error);
                  }
                } // Call lifecycle finished; tear down resolver, rejector, and timeout


                delete _this.RESOLVERS[message.id];
                delete _this.REJECTORS[message.id];
                clearTimeout(_this.TIMEOUTS[message.id]);
              }
            }
          };
        });
      }

      return Promise.resolve('ok');
    } // Disconnect from AirSwap by closing websocket

  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.close(1000);
    } // Interacting with the Indexer
    // ----------------
    // Query the indexer for trade intents.
    // * returns a `Promise` which is resolved with an array of `intents`

  }, {
    key: "findIntents",
    value: function findIntents(makerTokens, takerTokens) {
      var _this3 = this;

      var role = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'maker';

      if (!makerTokens || !takerTokens) {
        throw new Error('missing arguments makerTokens or takerTokens');
      }

      var payload = Router.makeRPC('findIntents', {
        makerTokens: makerTokens,
        takerTokens: takerTokens,
        role: role
      });
      return new Promise(function (resolve, reject) {
        return _this3.call(INDEXER_ADDRESS, payload, resolve, reject);
      });
    } // Call `getIntents` on the indexer to return an array of tokens that the specified address has published intent to trade
    // * parameter `address` is a lowercased Ethereum address to fetch intents for
    // * returns a `Promise` which is resolved with an array of intents set by a specific address

  }, {
    key: "getIntents",
    value: function getIntents(address) {
      var _this4 = this;

      var payload = Router.makeRPC('getIntents', {
        address: address
      });
      return new Promise(function (resolve, reject) {
        return _this4.call(INDEXER_ADDRESS, payload, resolve, reject);
      });
    } // Call `setIntents` on the indexer with an array of trade `intent` objects.
    // * returns a `Promise` with the indexer response. Passes `'OK'` if succcessful.

  }, {
    key: "setIntents",
    value: function setIntents(intents) {
      var _this5 = this;

      var payload = Router.makeRPC('setIntents', {
        address: this.address.toLowerCase(),
        intents: intents
      });
      return new Promise(function (resolve, reject) {
        return _this5.call(INDEXER_ADDRESS, payload, resolve, reject);
      });
    }
  }, {
    key: "getSignerSideOrder",
    value: function getSignerSideOrder(signerAddress, params) {
      var _this6 = this;

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
        return _this6.call(signerAddress, payload, res, rej, locator, locatorType);
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
      var _this7 = this;

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
        return _this7.call(signerAddress, payload, res, rej, locator, locatorType);
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
      var _this8 = this;

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
        return _this8.call(makerAddress, payload, res, rej);
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
      var _this9 = this;

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
        return _this9.call(makerAddress, payload, res, rej, locator, locatorType);
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
      var _this10 = this;

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
        return _this10.call(makerAddress, payload, res, rej, locator, locatorType);
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
      var _this11 = this;

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
        return _this11.call(makerAddress, payload, res, rej, locator, locatorType);
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
      var _this12 = this;

      var makerAmount = params.makerAmount,
          takerAmount = params.takerAmount,
          makerToken = params.makerToken,
          takerToken = params.takerToken,
          locator = params.locator,
          locatorType = params.locatorType;
      var swapVersion = params.swapVersion || 1;
      var BadArgumentsError = new Error('bad arguments passed to getOrder');

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

      if (!makerAmount && !takerAmount) throw BadArgumentsError;
      if (makerAmount && takerAmount) throw BadArgumentsError;
      if (!takerToken || !makerToken) throw BadArgumentsError;
      var query = {
        makerToken: makerToken,
        takerToken: takerToken,
        makerAmount: makerAmount ? String(makerAmount) : null,
        takerAmount: takerAmount ? String(takerAmount) : null
      };
      var payload = Router.makeRPC('getQuote', query);
      return new Promise(function (res, rej) {
        return _this12.call(makerAddress, payload, res, rej);
      }).then(function (quote) {
        return _objectSpread({}, quote, {
          swapVersion: swapVersion
        });
      });
    } // Given an array of trade intents, make a JSON-RPC `getOrder` call for each `intent`

  }, {
    key: "getOrders",
    value: function getOrders(intents, params) {
      var _this13 = this;

      var makerAmount = params.makerAmount,
          takerAmount = params.takerAmount;

      if (!Array.isArray(intents) || !(makerAmount || takerAmount)) {
        throw new Error('bad arguments passed to getOrders');
      }

      return Promise.all(intents.map(function (_ref) {
        var makerAddress = _ref.makerAddress,
            makerToken = _ref.makerToken,
            takerToken = _ref.takerToken;
        var payload = Router.makeRPC('getOrder', _objectSpread({
          makerToken: makerToken,
          takerToken: takerToken,
          takerAddress: _this13.address.toLowerCase()
        }, params)); // `Promise.all` will return a complete array of resolved promises, or just the first rejection if a promise fails.
        // To mitigate this, we `catch` errors on individual promises so that `Promise.all` always returns a complete array

        return new Promise(function (res, rej) {
          return _this13.call(makerAddress, payload, res, rej);
        }).catch(function (e) {
          return e;
        });
      }));
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