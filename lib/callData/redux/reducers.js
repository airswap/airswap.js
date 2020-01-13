"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// import { createSelector } from 'reselect'
function callData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GOT_CALL_RESPONSE':
      var response = action.response,
          namespace = action.namespace,
          name = action.name,
          parameters = action.parameters,
          timestamp = action.timestamp;
      return [{
        response: response,
        namespace: namespace,
        name: name,
        parameters: parameters,
        timestamp: timestamp
      }].concat(_toConsumableArray(state));

    default:
      return state;
  }
}

var _default = callData;
exports.default = _default;

var getCallData = function getCallData(state) {
  return state.callData;
};

var selectors = {
  getCallData: getCallData
};
exports.selectors = selectors;