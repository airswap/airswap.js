"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ethers = require('ethers');

var _ = require('lodash');

var fetch = require('isomorphic-fetch');

var _require = require('../constants'),
    GAS_URL = _require.GAS_URL;

function fetchGasSettings() {
  return new Promise(function (resolve, reject) {
    fetch(GAS_URL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(resolve);
  });
}

var Gas =
/*#__PURE__*/
function () {
  function Gas() {
    var _this = this;

    _classCallCheck(this, Gas);

    this.settings = {};
    this.ready = this.pollGasSettings();
    setInterval(function () {
      return _this.pollGasSettings();
    }, 10000);
  }

  _createClass(Gas, [{
    key: "pollGasSettings",
    value: function () {
      var _pollGasSettings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var settings, fast, fastest, average, safeLow;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchGasSettings();

              case 2:
                settings = _context.sent;
                fast = settings.fast, fastest = settings.fastest, average = settings.average, safeLow = settings.safeLow;
                this.settings = _.mapValues({
                  fast: fast,
                  fastest: fastest,
                  average: average,
                  safeLow: safeLow
                }, function (v) {
                  return v / 10;
                });
                return _context.abrupt("return", this.settings);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function pollGasSettings() {
        return _pollGasSettings.apply(this, arguments);
      }

      return pollGasSettings;
    }()
  }, {
    key: "getGasSettingsForTransaction",
    value: function getGasSettingsForTransaction() {
      var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fast';
      var gasLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300000;
      var gwei = this.settings[setting];
      var gasPrice = ethers.utils.parseUnits("".concat(gwei), 'gwei').toNumber();
      return {
        gasLimit: Number(gasLimit),
        gasPrice: gasPrice
      };
    }
  }]);

  return Gas;
}();

module.exports = {
  fetchGasSettings: fetchGasSettings,
  Gas: Gas
};