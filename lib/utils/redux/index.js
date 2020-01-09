"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeContainers = exports.makeSelectorsNested = exports.makeSelectors = exports.makeReducer = exports.makeActionCreators = exports.makeActionTypes = exports.backCamelize = exports.connectActionContainer = exports.connectSelectorContainer = exports.makePromiseAction = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// GENERALIZED REDUX UTILS
var makePromiseAction = function makePromiseAction(action) {
  return function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (dispatch) {
      return new Promise(function (resolve, reject) {
        return dispatch(_objectSpread({}, action, {
          resolve: resolve,
          reject: reject
        }, params));
      });
    };
  };
};

exports.makePromiseAction = makePromiseAction;

var connectSelectorContainer = function connectSelectorContainer(selector, name) {
  return function (connect) {
    return function (Component) {
      return connect(function (state) {
        return _defineProperty({}, name, selector(state));
      }, null)(Component);
    };
  };
};

exports.connectSelectorContainer = connectSelectorContainer;

var connectActionContainer = function connectActionContainer(action, name) {
  return function (connect) {
    return function (Component) {
      return connect(null, _defineProperty({}, name, action))(Component);
    };
  };
}; // ACTION CREATION UTILITIES


exports.connectActionContainer = connectActionContainer;

var actionize = function actionize(str) {
  return _lodash.default.toUpper(_lodash.default.snakeCase(str));
};

var backCamelize = function backCamelize(str) {
  var _str = _toArray(str),
      first = _str[0],
      rest = _str.slice(1);

  return "".concat(_lodash.default.capitalize(first)).concat(_lodash.default.camelCase(rest.join('')));
};

exports.backCamelize = backCamelize;

var concatCamelAction = function concatCamelAction(first, rest) {
  return actionize("".concat(_lodash.default.camelCase(first)).concat(backCamelize(rest)));
};

var makeItemsAction = function makeItemsAction(type, name) {
  var paramsKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return _defineProperty({}, type, function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return _objectSpread({
      type: concatCamelAction(type, name)
    }, _lodash.default.zipObject(paramsKeys, paramsKeys.map(function (key, i) {
      return params[i];
    })));
  });
};

var makeActionTypes = function makeActionTypes(ACTIONS, name) {
  return _lodash.default.reduce(ACTIONS, function (obj, val) {
    return _objectSpread({}, obj, _defineProperty({}, val.action, concatCamelAction(val.action, name)));
  }, {});
};

exports.makeActionTypes = makeActionTypes;

var makeActionCreators = function makeActionCreators(ACTIONS, name) {
  return _lodash.default.reduce(ACTIONS, function (obj, val) {
    return _objectSpread({}, obj, makeItemsAction(val.action, name, val.paramsKeys));
  }, {});
}; // REDUCER CREATION UTILITIES


exports.makeActionCreators = makeActionCreators;

var concatCamelReducer = function concatCamelReducer(first, rest) {
  return "".concat(_lodash.default.camelCase(first)).concat(backCamelize(rest));
};

var makeReducer = function makeReducer(REDUCERS, ACTIONS, name) {
  var actionTypes = _lodash.default.invert(makeActionTypes(ACTIONS, name));

  return (0, _redux.combineReducers)(_lodash.default.mapKeys(_lodash.default.mapValues(REDUCERS, function (reducer) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : reducer.defaultState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      var caseResponse = reducer.switch[actionTypes[action.type]];

      if (!_lodash.default.isUndefined(caseResponse)) {
        return _lodash.default.isFunction(caseResponse) ? caseResponse(action, state) : caseResponse;
      }

      return state;
    };
  }), function (reducer, key) {
    return key;
  }));
}; // SELECTOR CREATION UTILITIES


exports.makeReducer = makeReducer;

var makeSelectors = function makeSelectors(REDUCERS, name, statePath) {
  var getState = function getState(state) {
    return _lodash.default.get(state, "".concat(statePath, ".").concat(name));
  };

  var values = _lodash.default.keys(REDUCERS).map(function (key) {
    return (0, _reselect.createSelector)(getState, function (state) {
      return state[key];
    });
  });

  var keys = _lodash.default.keys(REDUCERS).map(function (key) {
    return concatCamelReducer('get', concatCamelReducer(key, name));
  });

  return _lodash.default.zipObject(keys, values);
};

exports.makeSelectors = makeSelectors;

var makeSelectorsNested = function makeSelectorsNested(REDUCERS, name, statePath) {
  var getState = function getState(state) {
    return _lodash.default.get(state, "".concat(statePath, ".").concat(name));
  };

  var values = _lodash.default.keys(REDUCERS).map(function (key) {
    return (0, _reselect.createSelector)(getState, function (state) {
      return state[key];
    });
  });

  var keys = _lodash.default.keys(REDUCERS);

  return _lodash.default.zipObject(keys, values);
}; // CONTAINER CREATION UTILITIES


exports.makeSelectorsNested = makeSelectorsNested;

var trimGet = function trimGet(str) {
  return _lodash.default.camelCase(_lodash.default.trimStart(str, 'get'));
};

var makeContainers = function makeContainers(selectors) {
  var containers = _lodash.default.map(selectors, function (selector, name) {
    return connectSelectorContainer(selector, trimGet(name));
  });

  var keys = _lodash.default.map(_lodash.default.keys(selectors), function (key) {
    return trimGet(key);
  });

  return _lodash.default.zipObject(keys, containers);
};

exports.makeContainers = makeContainers;