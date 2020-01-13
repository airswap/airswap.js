"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash');

var _require = require('../index/eventListeners'),
    trackIndexSetLocator = _require.trackIndexSetLocator,
    trackIndexUnsetLocator = _require.trackIndexUnsetLocator;

var _require2 = require('./eventListeners'),
    trackIndexerCreateIndex = _require2.trackIndexerCreateIndex;

var _require3 = require('./utils'),
    parseLocatorAndLocatorType = _require3.parseLocatorAndLocatorType,
    getUniqueLocatorsFromBlockEvents = _require3.getUniqueLocatorsFromBlockEvents,
    mapOnChainIntentToOffChain = _require3.mapOnChainIntentToOffChain;

var _require4 = require('../constants'),
    INDEXER_CONTRACT_DEPLOY_BLOCK = _require4.INDEXER_CONTRACT_DEPLOY_BLOCK;

var Indexer =
/*#__PURE__*/
function () {
  function Indexer() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        onIndexAdded = _ref.onIndexAdded,
        onLocatorAdded = _ref.onLocatorAdded,
        onLocatorUnset = _ref.onLocatorUnset;

    _classCallCheck(this, Indexer);

    this.indexEvents = [];
    this.indexes = [];
    this.locatorEvents = [];
    this.locators = [];
    this.unsetLocatorEvents = [];
    this.unsetLocators = [];
    this.onIndexAdded = onIndexAdded || _.identity;
    this.onLocatorAdded = onLocatorAdded || _.identity;
    this.onLocatorUnset = onLocatorUnset || _.identity;
    var initialIndexLoad = new Promise(function (resolve) {
      return trackIndexerCreateIndex({
        callback: function () {
          var _callback = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(events) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _this.indexEvents = [].concat(_toConsumableArray(_this.indexEvents), _toConsumableArray(events));

                    _this.addIndexesFromEvents(events);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function callback(_x) {
            return _callback.apply(this, arguments);
          }

          return callback;
        }(),
        onFetchedHistoricalEvents: function onFetchedHistoricalEvents(events) {
          return resolve(events);
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK
      });
    });
    var initialLocatorLoad = new Promise(function (resolve) {
      return trackIndexSetLocator({
        callback: function () {
          var _callback2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(events) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _this.locatorEvents = [].concat(_toConsumableArray(_this.locatorEvents), _toConsumableArray(events));

                    _this.addLocatorFromEvents(events);

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function callback(_x2) {
            return _callback2.apply(this, arguments);
          }

          return callback;
        }(),
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
        onFetchedHistoricalEvents: function onFetchedHistoricalEvents(events) {
          return resolve(events);
        }
      });
    });
    var initialUnsetLocatorLoad = new Promise(function (resolve) {
      return trackIndexUnsetLocator({
        callback: function () {
          var _callback3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(events) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _this.unsetLocatorEvents = [].concat(_toConsumableArray(_this.unsetLocatorEvents), _toConsumableArray(events));

                    _this.addUnsetLocatorFromEvents(events);

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function callback(_x3) {
            return _callback3.apply(this, arguments);
          }

          return callback;
        }(),
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
        onFetchedHistoricalEvents: function onFetchedHistoricalEvents(events) {
          return resolve(events);
        }
      });
    });
    this.ready = Promise.all([initialIndexLoad, initialLocatorLoad, initialUnsetLocatorLoad]);
  }

  _createClass(Indexer, [{
    key: "addIndexesFromEvents",
    value: function () {
      var _addIndexesFromEvents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(events) {
        var _this2 = this;

        var indexes;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                indexes = events.map(function (_ref2) {
                  var values = _ref2.values;
                  return values;
                });
                indexes.forEach(function (index) {
                  _this2.onIndexAdded(index);
                });
                this.indexes = [].concat(_toConsumableArray(this.indexes), _toConsumableArray(indexes));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addIndexesFromEvents(_x4) {
        return _addIndexesFromEvents.apply(this, arguments);
      }

      return addIndexesFromEvents;
    }()
  }, {
    key: "addLocatorFromEvents",
    value: function () {
      var _addLocatorFromEvents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(events) {
        var _this3 = this;

        var locators;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                locators = events.map(function (_ref3) {
                  var values = _ref3.values,
                      address = _ref3.address,
                      blockNumber = _ref3.blockNumber,
                      logIndex = _ref3.logIndex;
                  var indexAddress = address.toLowerCase();
                  return _objectSpread({}, values, {
                    indexAddress: indexAddress,
                    blockNumber: blockNumber,
                    logIndex: logIndex
                  });
                });
                locators.forEach(function (locator) {
                  _this3.onLocatorAdded(locator);
                });
                this.locators = [].concat(_toConsumableArray(this.locators), _toConsumableArray(locators));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addLocatorFromEvents(_x5) {
        return _addLocatorFromEvents.apply(this, arguments);
      }

      return addLocatorFromEvents;
    }()
  }, {
    key: "addUnsetLocatorFromEvents",
    value: function () {
      var _addUnsetLocatorFromEvents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(events) {
        var _this4 = this;

        var unsetLocators;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                unsetLocators = events.map(function (_ref4) {
                  var values = _ref4.values,
                      address = _ref4.address,
                      blockNumber = _ref4.blockNumber,
                      logIndex = _ref4.logIndex;
                  var indexAddress = address.toLowerCase();
                  return _objectSpread({}, values, {
                    indexAddress: indexAddress,
                    blockNumber: blockNumber,
                    logIndex: logIndex
                  });
                });
                unsetLocators.forEach(function (locator) {
                  _this4.onLocatorUnset(locator);
                });
                this.unsetLocators = [].concat(_toConsumableArray(this.unsetLocators), _toConsumableArray(unsetLocators));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function addUnsetLocatorFromEvents(_x6) {
        return _addUnsetLocatorFromEvents.apply(this, arguments);
      }

      return addUnsetLocatorFromEvents;
    }()
  }, {
    key: "getIntents",
    value: function getIntents() {
      var _this5 = this;

      var locators = getUniqueLocatorsFromBlockEvents(this.locatorEvents, this.unsetLocatorEvents);
      return locators.map(function (locator) {
        var _ref5 = _this5.indexes.find(function (_ref6) {
          var indexAddress = _ref6.indexAddress;
          return indexAddress === locator.indexAddress;
        }) || {},
            signerToken = _ref5.signerToken,
            senderToken = _ref5.senderToken,
            protocol = _ref5.protocol;

        parseLocatorAndLocatorType(locator.locator, locator.identifier);
        return _objectSpread({
          signerToken: signerToken,
          senderToken: senderToken,
          protocol: protocol,
          identifier: locator.identifier
        }, parseLocatorAndLocatorType(locator.locator, locator.identifier, protocol), {
          swapVersion: 2
        });
      }).filter(function (_ref7) {
        var identifier = _ref7.identifier,
            locator = _ref7.locator,
            locatorType = _ref7.locatorType,
            senderToken = _ref7.senderToken,
            signerToken = _ref7.signerToken;
        return identifier && locator && locatorType && senderToken && signerToken;
      });
    }
  }, {
    key: "getLegacyFormattedIntents",
    value: function getLegacyFormattedIntents() {
      return this.getIntents().map(function (intent) {
        return mapOnChainIntentToOffChain(intent);
      });
    }
  }]);

  return Indexer;
}();

module.exports = Indexer;