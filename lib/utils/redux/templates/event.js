"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEventContainers = exports.makeEventSelectors = exports.makeEventReducer = exports.makeEventActionTypes = exports.makeEventFetchingActionsCreators = void 0;

var _index = require("../index");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var EVENT_ACTIONS = [{
  action: 'getting'
}, {
  action: 'got',
  paramsKeys: ['response']
}, {
  action: 'errorGetting',
  paramsKeys: ['error']
}];

var makeEventFetchingActionsCreators = function makeEventFetchingActionsCreators(name) {
  return (0, _index.makeActionCreators)(EVENT_ACTIONS, name);
};

exports.makeEventFetchingActionsCreators = makeEventFetchingActionsCreators;

var makeEventActionTypes = function makeEventActionTypes(name) {
  return (0, _index.makeActionTypes)(EVENT_ACTIONS, name);
};

exports.makeEventActionTypes = makeEventActionTypes;
var EVENT_REDUCERS = {
  attemptedGetting: {
    defaultState: false,
    switch: {
      getting: true,
      got: true,
      errorGetting: true
    }
  },
  getting: {
    defaultState: false,
    switch: {
      getting: true,
      got: false,
      errorGetting: false
    }
  },
  errorGetting: {
    defaultState: '',
    switch: {
      getting: '',
      got: '',
      errorGetting: function errorGetting(_ref) {
        var error = _ref.error;
        return error;
      }
    }
  },
  fetched: {
    defaultState: [],
    switch: {
      got: function got(_ref2, state) {
        var response = _ref2.response;
        return [].concat(_toConsumableArray(state), _toConsumableArray(response));
      }
    }
  }
};

var makeEventReducer = function makeEventReducer(name) {
  return (0, _index.makeReducer)(EVENT_REDUCERS, EVENT_ACTIONS, name);
};

exports.makeEventReducer = makeEventReducer;

var makeEventSelectors = function makeEventSelectors(name, statePath) {
  return (0, _index.makeSelectors)(EVENT_REDUCERS, name, statePath);
};

exports.makeEventSelectors = makeEventSelectors;

var makeEventContainers = function makeEventContainers(name, statePath) {
  return (0, _index.makeContainers)(makeEventSelectors((name, statePath)));
};

exports.makeEventContainers = makeEventContainers;