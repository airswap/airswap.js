"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var _require = require('../constants'),
    SLS_PGP_URL = _require.SLS_PGP_URL;

var IPFS = require('ipfs-mini');

var axios = require('axios');

var ipfsInfura = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});
var ipfsAirSwap = new IPFS({
  host: 'ipfs.airswap.io',
  port: 443,
  protocol: 'https'
});

var pinJSONToIPFSPinata = function pinJSONToIPFSPinata(JSONBody) {
  var url = "".concat(SLS_PGP_URL, "/storePinata");
  return axios.post(url, JSONBody).then(function (resp) {
    return resp.data.IpfsHash;
  });
};

function ipfsStoreJSON(_x) {
  return _ipfsStoreJSON.apply(this, arguments);
}

function _ipfsStoreJSON() {
  _ipfsStoreJSON = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(obj) {
    var storeString;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storeString = _.isString(obj) ? JSON.stringify(JSON.parse(obj)) : JSON.stringify(obj);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              // this "resolved" syntax is required since there isn't a Promise.none()
              var resolved = 0;
              ipfsAirSwap.add(storeString).then(resolve).catch(function (e) {
                resolved++;

                if (resolved === 2) {
                  reject(e);
                }
              });
              ipfsInfura.add(storeString).then(resolve).catch(function (e) {
                resolved++;

                if (resolved === 2) {
                  reject(e);
                }
              });
              pinJSONToIPFSPinata(JSON.parse(storeString)); // pinata will always take the longest to resolve since they don't support reads
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _ipfsStoreJSON.apply(this, arguments);
}

var fetchIPFSContentFromCloudfare = function fetchIPFSContentFromCloudfare(cid) {
  return axios.get("https://cloudflare-ipfs.com/ipfs/".concat(cid)).then(function (resp) {
    return JSON.stringify(resp.data);
  });
};

function ipfsFetchJSONFromCID(_x2) {
  return _ipfsFetchJSONFromCID.apply(this, arguments);
}

function _ipfsFetchJSONFromCID() {
  _ipfsFetchJSONFromCID = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(cid) {
    var content;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              if (!cid) {
                resolve(undefined);
                return;
              } // this "resolved" syntax is required since there isn't a Promise.none()


              var resolved = 0;
              ipfsAirSwap.cat(cid).then(resolve).catch(function (e) {
                resolved++;

                if (resolved === 3) {
                  reject(e);
                }
              });
              ipfsInfura.cat(cid).then(resolve).catch(function (e) {
                resolved++;

                if (resolved === 3) {
                  reject(e);
                }
              });
              fetchIPFSContentFromCloudfare(cid).then(resolve).catch(function (e) {
                resolved++;

                if (resolved === 3) {
                  reject(e);
                }
              });
            });

          case 2:
            content = _context2.sent;
            return _context2.abrupt("return", JSON.parse(content));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _ipfsFetchJSONFromCID.apply(this, arguments);
}

module.exports = {
  ipfsStoreJSON: ipfsStoreJSON,
  ipfsFetchJSONFromCID: ipfsFetchJSONFromCID
};