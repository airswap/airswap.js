"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var t = require('tcomb');

var fetch = require('isomorphic-fetch');

var querystring = require('querystring');

var ethers = require('ethers');

var openpgp = require('openpgp');

var _require = require('../constants'),
    PGP_CONTRACT_ADDRESS = _require.PGP_CONTRACT_ADDRESS,
    abis = _require.abis,
    NETWORK = _require.NETWORK,
    SLS_PGP_URL = _require.SLS_PGP_URL;

var _require2 = require('../ipfs'),
    ipfsStoreJSON = _require2.ipfsStoreJSON,
    ipfsFetchJSONFromCID = _require2.ipfsFetchJSONFromCID;

var keyspaceDefaultSeedFn = function keyspaceDefaultSeedFn(address) {
  return "I'm generating my encryption keys for AirSwap ".concat(address);
};

var keyspaceSignatureTextFn = function keyspaceSignatureTextFn(ipfsKeyHash) {
  return "IPFS location of my Keyspace identity: ".concat(ipfsKeyHash);
};

var key = t.struct({
  public: t.String,
  private: t.String
});
var ipfsHash = t.refinement(t.String, function (s) {
  return s.length > 30;
}, 'ipfsHash');

function generateKeyPair(_x, _x2) {
  return _generateKeyPair.apply(this, arguments);
}

function _generateKeyPair() {
  _generateKeyPair = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(signedSeed, signer) {
    var address, _ref8, privateKeyArmored, publicKeyArmored;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return signer.getAddress();

          case 2:
            address = _context13.sent;
            _context13.next = 5;
            return openpgp.generateKey({
              userIds: [{
                address: address
              }],
              curve: 'p256',
              // ECC curve name, most widely supported
              passphrase: signedSeed
            });

          case 5:
            _ref8 = _context13.sent;
            privateKeyArmored = _ref8.privateKeyArmored;
            publicKeyArmored = _ref8.publicKeyArmored;
            return _context13.abrupt("return", key({
              private: privateKeyArmored,
              public: publicKeyArmored
            }));

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));
  return _generateKeyPair.apply(this, arguments);
}

function getPGPContract(signer) {
  return new ethers.Contract(PGP_CONTRACT_ADDRESS, abis[PGP_CONTRACT_ADDRESS], signer);
}
/* eslint-disable */


function storeIPFSHashOnPGPContract(_x3, _x4) {
  return _storeIPFSHashOnPGPContract.apply(this, arguments);
}

function _storeIPFSHashOnPGPContract() {
  _storeIPFSHashOnPGPContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(ipfsKeyHash, signer) {
    var pgpContract;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            pgpContract = getPGPContract(signer);
            return _context14.abrupt("return", pgpContract.addPublicKey(ipfsKeyHash));

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));
  return _storeIPFSHashOnPGPContract.apply(this, arguments);
}

function storeHash(_ref) {
  var address = _ref.address,
      signature = _ref.signature,
      ipfsKeyHash = _ref.ipfsKeyHash,
      message = _ref.message;
  return new Promise(function (resolve, reject) {
    return Promise.all([fetch("".concat(SLS_PGP_URL, "/storeHash"), {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        address: address,
        signature: signature,
        ipfsHash: ipfsKeyHash,
        message: message
      })
    })]).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          response = _ref3[0];

      if (!response.ok) {
        reject(response.statusText);
      }

      return response.text();
    }).then(function (res) {
      return resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

var KeySpace =
/*#__PURE__*/
function () {
  function KeySpace(_ref4) {
    var signer = _ref4.signer,
        signedSeed = _ref4.signedSeed,
        seed = _ref4.seed,
        onRequestSignedSeed = _ref4.onRequestSignedSeed,
        onGeneratedSignedSeed = _ref4.onGeneratedSignedSeed,
        onRequestPGPKeyPair = _ref4.onRequestPGPKeyPair,
        onGeneratedPGPKeyPair = _ref4.onGeneratedPGPKeyPair;

    _classCallCheck(this, KeySpace);

    if (!signer) {
      throw new Error('This keyspace implementation requires a valid ethers.js Signer');
    }

    this.onRequestSignedSeed = onRequestSignedSeed.bind(this);
    this.onGeneratedSignedSeed = onGeneratedSignedSeed.bind(this);
    this.onRequestPGPKeyPair = onRequestPGPKeyPair.bind(this);
    this.onGeneratedPGPKeyPair = onGeneratedPGPKeyPair.bind(this);
    this.seed = seed;
    this.signedSeed = signedSeed;
    this.signer = signer;
    this.ipfsHashes = {};
    this.pgpKeys = {};
    this.initialized = this.init();
  }

  _createClass(KeySpace, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.signer.getAddress();

              case 2:
                this.signerAddress = _context.sent.toLowerCase();
                this.seed = this.seed || keyspaceDefaultSeedFn(this.signerAddress);
                _context.prev = 4;
                _context.next = 7;
                return this.getHashByAddress(this.signerAddress);

              case 7:
                this.signerIPFSHash = _context.sent;
                _context.next = 10;
                return ipfsFetchJSONFromCID(this.signerIPFSHash);

              case 10:
                this.signerPGPKey = _context.sent;
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", true);

              case 16:
                return _context.abrupt("return", true);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 13]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "createSignedSeed",
    value: function () {
      var _createSignedSeed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.signer.signMessage(this.seed));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createSignedSeed() {
        return _createSignedSeed.apply(this, arguments);
      }

      return createSignedSeed;
    }()
  }, {
    key: "getHashByAddress",
    value: function () {
      var _getHashByAddress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(address) {
        var that;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                that = this;
                return _context4.abrupt("return", fetch("".concat(SLS_PGP_URL, "/getHashByAddress?").concat(querystring.stringify({
                  address: address.toLowerCase(),
                  network: NETWORK
                })), {
                  method: 'get',
                  mode: 'cors'
                }).then(
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(response) {
                    var ipfsKeyHash;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (response.ok) {
                              _context3.next = 2;
                              break;
                            }

                            throw new Error(response.statusText);

                          case 2:
                            _context3.t0 = ipfsHash;
                            _context3.next = 5;
                            return response.text();

                          case 5:
                            _context3.t1 = _context3.sent;
                            ipfsKeyHash = (0, _context3.t0)(_context3.t1);
                            that.ipfsHashes[address.toLowerCase()] = ipfsKeyHash;
                            return _context3.abrupt("return", ipfsKeyHash);

                          case 9:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  return function (_x6) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getHashByAddress(_x5) {
        return _getHashByAddress.apply(this, arguments);
      }

      return getHashByAddress;
    }()
  }, {
    key: "fetchKeyByAddress",
    value: function () {
      var _fetchKeyByAddress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(address) {
        var ipfsKeyHash, key;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.pgpKeys[address.toLowerCase()]) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this.pgpKeys[address.toLowerCase()]);

              case 2:
                _context5.next = 4;
                return this.getHashByAddress(address.toLowerCase());

              case 4:
                ipfsKeyHash = _context5.sent;
                _context5.next = 7;
                return ipfsFetchJSONFromCID(ipfsKeyHash);

              case 7:
                key = _context5.sent;
                this.pgpKeys[address.toLowerCase()] = key;
                return _context5.abrupt("return", key);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchKeyByAddress(_x7) {
        return _fetchKeyByAddress.apply(this, arguments);
      }

      return fetchKeyByAddress;
    }()
  }, {
    key: "setUpPGP",
    value: function () {
      var _setUpPGP = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var keyPair, ipfsKeyHash, signatureText, signature;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.initialized;

              case 2:
                if (!this.isPGPReady()) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", true);

              case 4:
                if (this.signedSeed) {
                  _context6.next = 16;
                  break;
                }

                // generating signed seed
                this.onRequestSignedSeed(this.seed);
                _context6.prev = 6;
                _context6.next = 9;
                return this.createSignedSeed();

              case 9:
                this.signedSeed = _context6.sent;
                // generated signed seed
                this.onGeneratedSignedSeed(this.signedSeed);
                _context6.next = 16;
                break;

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](6);
                return _context6.abrupt("return", Promise.reject(_context6.t0));

              case 16:
                if (this.signerPGPKey) {
                  _context6.next = 59;
                  break;
                }

                // generating key pair
                this.onRequestPGPKeyPair(this.signerAddress);
                _context6.prev = 18;
                _context6.next = 21;
                return generateKeyPair(this.signedSeed, this.signer);

              case 21:
                keyPair = _context6.sent;
                _context6.next = 27;
                break;

              case 24:
                _context6.prev = 24;
                _context6.t1 = _context6["catch"](18);
                return _context6.abrupt("return", Promise.reject(_context6.t1));

              case 27:
                _context6.prev = 27;
                _context6.t2 = ipfsHash;
                _context6.next = 31;
                return ipfsStoreJSON(keyPair);

              case 31:
                _context6.t3 = _context6.sent;
                ipfsKeyHash = (0, _context6.t2)(_context6.t3);
                _context6.next = 38;
                break;

              case 35:
                _context6.prev = 35;
                _context6.t4 = _context6["catch"](27);
                return _context6.abrupt("return", Promise.reject(_context6.t4));

              case 38:
                signatureText = keyspaceSignatureTextFn(ipfsKeyHash);
                _context6.prev = 39;
                _context6.next = 42;
                return this.signer.signMessage(signatureText);

              case 42:
                signature = _context6.sent;
                _context6.next = 48;
                break;

              case 45:
                _context6.prev = 45;
                _context6.t5 = _context6["catch"](39);
                return _context6.abrupt("return", Promise.reject(_context6.t5));

              case 48:
                _context6.prev = 48;
                _context6.next = 51;
                return storeHash({
                  signature: signature,
                  message: signatureText,
                  ipfsKeyHash: ipfsKeyHash,
                  address: this.signerAddress
                });

              case 51:
                // generated key pair
                this.onGeneratedPGPKeyPair(keyPair);
                _context6.next = 57;
                break;

              case 54:
                _context6.prev = 54;
                _context6.t6 = _context6["catch"](48);
                return _context6.abrupt("return", Promise.reject(_context6.t6));

              case 57:
                this.signerPGPKey = keyPair;
                this.signerIPFSHash = ipfsKeyHash;

              case 59:
                _context6.prev = 59;
                _context6.next = 62;
                return this.fetchKeyByAddress(this.signerAddress);

              case 62:
                _context6.next = 67;
                break;

              case 64:
                _context6.prev = 64;
                _context6.t7 = _context6["catch"](59);
                return _context6.abrupt("return", Promise.reject(_context6.t7));

              case 67:
                return _context6.abrupt("return", this.isPGPReady());

              case 68:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 13], [18, 24], [27, 35], [39, 45], [48, 54], [59, 64]]);
      }));

      function setUpPGP() {
        return _setUpPGP.apply(this, arguments);
      }

      return setUpPGP;
    }()
  }, {
    key: "encrypt",
    value: function () {
      var _encrypt = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(message, toAddress) {
        var toKey, publicKeyArmored, _keys, privKeyObj;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.fetchKeyByAddress(toAddress.toLowerCase());

              case 2:
                toKey = _context8.sent;
                publicKeyArmored = toKey.public;
                _context8.t0 = _slicedToArray;
                _context8.next = 7;
                return openpgp.key.readArmored(this.signerPGPKey.private);

              case 7:
                _context8.t1 = _context8.sent.keys;
                _keys = (0, _context8.t0)(_context8.t1, 1);
                privKeyObj = _keys[0];
                _context8.next = 12;
                return privKeyObj.decrypt(this.signedSeed);

              case 12:
                return _context8.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(resolve, reject) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.t0 = openpgp;
                            _context7.t1 = openpgp.message.fromText(message);
                            _context7.next = 4;
                            return openpgp.key.readArmored(publicKeyArmored);

                          case 4:
                            _context7.t2 = _context7.sent.keys;
                            _context7.t3 = [privKeyObj];
                            _context7.t4 = {
                              message: _context7.t1,
                              publicKeys: _context7.t2,
                              privateKeys: _context7.t3
                            };

                            _context7.t5 = function (ciphertext) {
                              resolve(ciphertext.data);
                            };

                            _context7.t6 = reject;

                            _context7.t0.encrypt.call(_context7.t0, _context7.t4).then(_context7.t5).catch(_context7.t6);

                          case 10:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, this);
                  }));

                  return function (_x10, _x11) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function encrypt(_x8, _x9) {
        return _encrypt.apply(this, arguments);
      }

      return encrypt;
    }()
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(encryptedMessage, fromAddress) {
        var fromKey, publicKeyArmored, _keys2, privKeyObj;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.setUpPGP();

              case 2:
                _context10.next = 4;
                return this.fetchKeyByAddress(fromAddress.toLowerCase());

              case 4:
                fromKey = _context10.sent;
                publicKeyArmored = fromKey.public;
                _context10.t0 = _slicedToArray;
                _context10.next = 9;
                return openpgp.key.readArmored(this.signerPGPKey.private);

              case 9:
                _context10.t1 = _context10.sent.keys;
                _keys2 = (0, _context10.t0)(_context10.t1, 1);
                privKeyObj = _keys2[0];
                _context10.next = 14;
                return privKeyObj.decrypt(this.signedSeed);

              case 14:
                return _context10.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref7 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee9(resolve, reject) {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.t0 = openpgp;
                            _context9.next = 3;
                            return openpgp.message.readArmored(encryptedMessage);

                          case 3:
                            _context9.t1 = _context9.sent;
                            _context9.next = 6;
                            return openpgp.key.readArmored(publicKeyArmored);

                          case 6:
                            _context9.t2 = _context9.sent.keys;
                            _context9.t3 = [privKeyObj];
                            _context9.t4 = {
                              message: _context9.t1,
                              publicKeys: _context9.t2,
                              privateKeys: _context9.t3
                            };

                            _context9.t5 = function (plaintext) {
                              resolve(plaintext.data);
                            };

                            _context9.t6 = reject;

                            _context9.t0.decrypt.call(_context9.t0, _context9.t4).then(_context9.t5).catch(_context9.t6);

                          case 12:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, this);
                  }));

                  return function (_x14, _x15) {
                    return _ref7.apply(this, arguments);
                  };
                }()));

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function decrypt(_x12, _x13) {
        return _decrypt.apply(this, arguments);
      }

      return decrypt;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(text) {
        var privKeyObj, signedData;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.setUpPGP();

              case 2:
                _context11.next = 4;
                return openpgp.key.readArmored(this.signerPGPKey.private);

              case 4:
                privKeyObj = _context11.sent.keys[0];
                _context11.next = 7;
                return privKeyObj.decrypt(this.signedSeed);

              case 7:
                _context11.next = 9;
                return openpgp.sign({
                  message: openpgp.cleartext.fromText(text),
                  // CleartextMessage or Message object
                  privateKeys: [privKeyObj] // for signing

                }).then(function (signed) {
                  return signed.data;
                });

              case 9:
                signedData = _context11.sent;
                return _context11.abrupt("return", signedData);

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function sign(_x16) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }, {
    key: "validate",
    value: function () {
      var _validate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(cleartext, fromAddress) {
        var fromKey, publicKeyArmored, result;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.fetchKeyByAddress(fromAddress.toLowerCase());

              case 2:
                fromKey = _context12.sent;
                publicKeyArmored = fromKey.public;
                _context12.t0 = openpgp;
                _context12.next = 7;
                return openpgp.cleartext.readArmored(cleartext);

              case 7:
                _context12.t1 = _context12.sent;
                _context12.next = 10;
                return openpgp.key.readArmored(publicKeyArmored);

              case 10:
                _context12.t2 = _context12.sent.keys;
                _context12.t3 = {
                  message: _context12.t1,
                  publicKeys: _context12.t2
                };
                _context12.next = 14;
                return _context12.t0.verify.call(_context12.t0, _context12.t3);

              case 14:
                result = _context12.sent;
                return _context12.abrupt("return", _.get(result, 'signatures.0.valid'));

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function validate(_x17, _x18) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "isPGPReady",
    value: function isPGPReady() {
      return this.signedSeed && this.signerIPFSHash && this.signerPGPKey;
    }
  }]);

  return KeySpace;
}();

module.exports = KeySpace;