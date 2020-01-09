"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _lodash = _interopRequireDefault(require("lodash"));

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _querystring = _interopRequireDefault(require("querystring"));

var storage = _interopRequireWildcard(require("redux-storage"));

var _reduxStorageEngineLocalstorage = _interopRequireDefault(require("redux-storage-engine-localstorage"));

var _reduxStorageDecoratorFilter = _interopRequireDefault(require("redux-storage-decorator-filter"));

var _state = require("./state");

var _waitForState = require("../utils/redux/waitForState");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var storageKey = '@airswap.js';

var qs = _querystring.default.parse(window.location.search);

if (qs.hardReset) localStorage.removeItem(storageKey);
window._ = _lodash.default;
var actionsBlacklist = ['GOT_LATEST_BLOCK']; // ['GOT_CONNECTED_USERS', 'GOT_GAS_SETTINGS', 'GOT_ETH_PRICES', 'GOT_GAS_DATA']

var composeEnhancers = (0, _reduxDevtoolsExtension.composeWithDevTools)({
  actionsBlacklist: [].concat(actionsBlacklist, ['REDUX_STORAGE_SAVE']),
  maxAge: 500
});

function configureStore() {
  var projectMiddleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var projectRootReducerObj = arguments.length > 1 ? arguments[1] : undefined;
  var defaultState = arguments.length > 2 ? arguments[2] : undefined;
  var persistedState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var engine = (0, _reduxStorageEngineLocalstorage.default)(storageKey);
  engine = (0, _reduxStorageDecoratorFilter.default)(engine, [['keySpace', 'signedSeed'], 'blockTracker', ['wallet', 'expressLogin']].concat(_toConsumableArray(persistedState)));
  var persistMiddleware = storage.createMiddleware(engine, actionsBlacklist);
  var rootReducer = (0, _redux.combineReducers)(_lodash.default.pickBy(_objectSpread({}, projectRootReducerObj, _state.rootReducerObj), _lodash.default.identity));
  var reducer = storage.reducer(rootReducer);
  var store = (0, _redux.createStore)(reducer, defaultState, composeEnhancers(_redux.applyMiddleware.apply(void 0, [_reduxThunk.default, persistMiddleware, _waitForState.waitForStateMiddleware].concat(_toConsumableArray(_state.middleware), _toConsumableArray(projectMiddleware)))));
  var load = storage.createLoader(engine);
  load(store).then(function (newState) {
    store.dispatch({
      type: 'LOADED_PREVIOUS_REDUX_STORAGE'
    });
  }).catch(function () {
    return void 0;
  });
  return store;
}