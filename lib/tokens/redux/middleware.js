"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = balancesMiddleware;
exports.addTokens = exports.addNFTItem = exports.addToken = void 0;

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function dispatchTokenInit(_x) {
  return _dispatchTokenInit.apply(this, arguments);
}

function _dispatchTokenInit() {
  _dispatchTokenInit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(store) {
    var tokens;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index.default.ready;

          case 2:
            tokens = _context.sent;
            store.dispatch(addTokens(_toConsumableArray(tokens)));
            store.dispatch({
              type: 'TOKENS_LOADED'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _dispatchTokenInit.apply(this, arguments);
}

var addToken = function addToken(token) {
  return {
    type: 'ADD_TOKEN',
    token: token
  };
};

exports.addToken = addToken;

var addNFTItem = function addNFTItem(token) {
  return {
    type: 'ADD_NFT_ITEM',
    token: token
  };
};

exports.addNFTItem = addNFTItem;

var addTokens = function addTokens(tokens) {
  return {
    type: 'ADD_TOKEN',
    tokens: tokens
  };
};

exports.addTokens = addTokens;

function balancesMiddleware(store) {
  dispatchTokenInit(store);
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'CRAWL_TOKEN':
          _index.default.crawlToken(action.address, action.forceUIApproval).then(function (token) {
            return store.dispatch(addToken(token));
          });

          break;

        case 'CRAWL_NFT_ITEM':
          _index.default.crawlNFTItem(action.address, action.id).then(function (token) {
            return store.dispatch(addNFTItem(token));
          });

          break;

        default:
      }

      return next(action);
    };
  };
}