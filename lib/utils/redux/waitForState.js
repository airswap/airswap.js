"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForStateMiddleware = waitForStateMiddleware;
exports.waitForState = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _uuid = _interopRequireDefault(require("uuid4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waitForState = function waitForState(_ref) {
  var selector = _ref.selector,
      result = _ref.result;
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      return dispatch({
        type: 'WAIT_FOR_STATE',
        resolve: resolve,
        reject: reject,
        selector: selector,
        result: result,
        key: (0, _uuid.default)()
      });
    });
  };
};

exports.waitForState = waitForState;
var awaitedStates = {};

function checkAwaitedStates(store) {
  var state = store.getState();

  _lodash.default.each(awaitedStates, function (_ref2, key) {
    var selector = _ref2.selector,
        result = _ref2.result,
        resolve = _ref2.resolve,
        reject = _ref2.reject;

    try {
      if (_lodash.default.isEqual(selector(state), result)) {
        awaitedStates = _lodash.default.pickBy(awaitedStates, function (val, k) {
          return k !== key;
        });
        resolve(selector(state));
      }
    } catch (e) {
      awaitedStates = _lodash.default.pickBy(awaitedStates, function (val, k) {
        return k !== key;
      });
      reject(e);
    }
  });
}

function waitForStateMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'WAIT_FOR_STATE':
          var key = action.key,
              resolve = action.resolve,
              reject = action.reject,
              selector = action.selector,
              result = action.result;
          awaitedStates[key] = {
            resolve: resolve,
            reject: reject,
            selector: selector,
            result: result
          };
          break;

        default:
      }

      next(action);
      checkAwaitedStates(store);
    };
  };
}