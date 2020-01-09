"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHTTPContainers = exports.makeHTTPSelectors = exports.makeHTTPReducer = exports.makeMiddlewareHTTPFn = exports.makeHTTPActionTypes = void 0;

var _transformations = require("../../transformations");

var _index = require("../index");

// HTTP ASYNC FETCH REDUX GENERATORS
var HTTP_ACTIONS = [{
  action: 'getting'
}, {
  action: 'got',
  paramsKeys: ['response']
}, {
  action: 'errorGetting',
  paramsKeys: ['error']
}];

var makeHTTPFetchingActionsCreators = function makeHTTPFetchingActionsCreators(items) {
  return (0, _index.makeActionCreators)(HTTP_ACTIONS, items);
};

var makeHTTPActionTypes = function makeHTTPActionTypes(items) {
  return (0, _index.makeActionTypes)(HTTP_ACTIONS, items);
};

exports.makeHTTPActionTypes = makeHTTPActionTypes;

var makeMiddlewareHTTPFn = function makeMiddlewareHTTPFn(fetchingFn, items, store) {
  var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _makeHTTPFetchingActi = makeHTTPFetchingActionsCreators(items),
      getting = _makeHTTPFetchingActi.getting,
      got = _makeHTTPFetchingActi.got,
      errorGetting = _makeHTTPFetchingActi.errorGetting;

  store.dispatch(getting(items));
  fetchingFn(store, action).then(function (response) {
    return store.dispatch(got(response));
  }).catch(function (error) {
    return store.dispatch(errorGetting((0, _transformations.formatErrorMessage)(error)));
  });
  var increment = action.increment;

  if (increment) {
    window.setInterval(function () {
      fetchingFn(store, action).then(function (response) {
        return store.dispatch(got(response));
      }).catch(function (error) {
        return store.dispatch(errorGetting((0, _transformations.formatErrorMessage)(error)));
      });
    }, increment);
  }
};

exports.makeMiddlewareHTTPFn = makeMiddlewareHTTPFn;
var HTTP_REDUCERS = {
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
      getting: [],
      got: function got(_ref2) {
        var response = _ref2.response;
        return response;
      },
      errorGetting: []
    }
  }
};

var makeHTTPReducer = function makeHTTPReducer(items) {
  return (0, _index.makeReducer)(HTTP_REDUCERS, HTTP_ACTIONS, items);
};

exports.makeHTTPReducer = makeHTTPReducer;

var makeHTTPSelectors = function makeHTTPSelectors(items, statePath) {
  return (0, _index.makeSelectors)(HTTP_REDUCERS, items, statePath);
};

exports.makeHTTPSelectors = makeHTTPSelectors;

var makeHTTPContainers = function makeHTTPContainers(items, statePath) {
  return (0, _index.makeContainers)(makeHTTPSelectors((items, statePath)));
};

exports.makeHTTPContainers = makeHTTPContainers;