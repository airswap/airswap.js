"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash'); // const blockTracker = require('../blockTracker')


var TransactionTracker =
/*#__PURE__*/
function () {
  function TransactionTracker() {
    _classCallCheck(this, TransactionTracker);

    this.trackedTransactions = [];
  }

  _createClass(TransactionTracker, [{
    key: "trackTransaction",
    value: function () {
      var _trackTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var transaction;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                transaction = _ref.transaction;

                if (!_.find(this.trackedTransactions, {
                  transactionHash: transaction.hash
                })) {
                  this.trackedTransactions.push({
                    transactionHash: transaction.hash,
                    transaction: transaction,
                    mining: true,
                    mined: false
                  });
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function trackTransaction(_x) {
        return _trackTransaction.apply(this, arguments);
      }

      return trackTransaction;
    }()
  }]);

  return TransactionTracker;
}();

module.exports = new TransactionTracker();