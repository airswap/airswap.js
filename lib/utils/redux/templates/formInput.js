"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFormInputContainers = exports.makeFormInputSelectorsNested = exports.makeFormInputSelectors = exports.makeFormInputReducer = exports.makeMiddlewareFormInputFn = exports.makeFormInputActionTypesMap = exports.makeFormInputActionTypes = exports.makeFormInputActionsCreators = exports.FORM_INPUT_ACTIONS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FORM INPUT REDUX GENERATORS
var FORM_INPUT_ACTIONS = [{
  action: 'change',
  paramsKeys: ['value']
}, {
  action: 'parsedValue',
  paramsKeys: ['value']
}, {
  action: 'clear'
}, {
  action: 'violationOn',
  paramsKeys: ['violation']
}];
exports.FORM_INPUT_ACTIONS = FORM_INPUT_ACTIONS;

var makeFormInputActionsCreators = function makeFormInputActionsCreators(name) {
  return (0, _index.makeActionCreators)(FORM_INPUT_ACTIONS, name);
};

exports.makeFormInputActionsCreators = makeFormInputActionsCreators;

var makeFormInputActionTypes = function makeFormInputActionTypes(name) {
  return (0, _index.makeActionTypes)(FORM_INPUT_ACTIONS, name);
};

exports.makeFormInputActionTypes = makeFormInputActionTypes;

var makeFormInputActionTypesMap = function makeFormInputActionTypesMap(name) {
  return _lodash.default.invert((0, _index.makeActionTypes)(FORM_INPUT_ACTIONS, name));
};

exports.makeFormInputActionTypesMap = makeFormInputActionTypesMap;

var makeMiddlewareFormInputFn = function makeMiddlewareFormInputFn(parsingFn, name, store, action) {
  var _makeFormInputActions = makeFormInputActionsCreators(name),
      parsedValue = _makeFormInputActions.parsedValue,
      violationOn = _makeFormInputActions.violationOn;

  for (var _len = arguments.length, rest = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    rest[_key - 4] = arguments[_key];
  }

  var parsingResp = parsingFn.apply(void 0, [store, action].concat(rest));
  store.dispatch(parsedValue(parsingResp.value));

  if (parsingResp.violation) {
    store.dispatch(violationOn(parsingResp.violation));
  }
};

exports.makeMiddlewareFormInputFn = makeMiddlewareFormInputFn;
var FORM_INPUT_REDUCERS = {
  value: {
    defaultState: '',
    switch: {
      parsedValue: function parsedValue(_ref) {
        var value = _ref.value;
        return value;
      },
      clear: ''
    }
  },
  violation: {
    defaultState: '',
    switch: {
      violationOn: function violationOn(_ref2) {
        var violation = _ref2.violation;
        return violation;
      },
      clear: ''
    }
  }
};

var makeFormInputReducer = function makeFormInputReducer(items) {
  return (0, _index.makeReducer)(FORM_INPUT_REDUCERS, FORM_INPUT_ACTIONS, items);
};

exports.makeFormInputReducer = makeFormInputReducer;

var makeFormInputSelectors = function makeFormInputSelectors(items, statePath) {
  return (0, _index.makeSelectors)(FORM_INPUT_REDUCERS, items, statePath);
};

exports.makeFormInputSelectors = makeFormInputSelectors;

var makeFormInputSelectorsNested = function makeFormInputSelectorsNested(items, statePath) {
  return (0, _index.makeSelectorsNested)(FORM_INPUT_REDUCERS, items, statePath);
};

exports.makeFormInputSelectorsNested = makeFormInputSelectorsNested;

var makeFormInputContainers = function makeFormInputContainers(items, statePath) {
  return (0, _index.makeContainers)(makeFormInputSelectors(items, statePath));
};

exports.makeFormInputContainers = makeFormInputContainers;