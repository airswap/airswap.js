"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.getFetchedHistoricalEvents = exports.getFetchingHistoricalEvents = exports.getEvents = exports.getFetchedTrackedEvents = exports.default = void 0;

var _redux = require("redux");

var _reselect = require("reselect");

var _event = require("../../utils/redux/templates/event");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeEventId = function makeEventId(_ref) {
  var name = _ref.name,
      namespace = _ref.namespace;
  return "".concat(namespace).concat(name);
};

var fetchingHistorical = function fetchingHistorical() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'FETCHING_HISTORICAL_EVENTS':
      return _objectSpread({}, state, _defineProperty({}, makeEventId(action), true));

    case 'FETCHED_HISTORICAL_EVENTS':
      return _objectSpread({}, state, _defineProperty({}, makeEventId(action), false));

    default:
      return state;
  }
};

var fetchedHistorical = function fetchedHistorical() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'FETCHED_HISTORICAL_EVENTS':
      return _objectSpread({}, state, _defineProperty({}, makeEventId(action), true));

    default:
      return state;
  }
};

var trackedEvents = (0, _event.makeEventReducer)('trackedEvents');

var _default = (0, _redux.combineReducers)({
  trackedEvents: trackedEvents,
  fetchingHistorical: fetchingHistorical,
  fetchedHistorical: fetchedHistorical
});

exports.default = _default;

var _makeEventSelectors = (0, _event.makeEventSelectors)('trackedEvents', 'events'),
    getFetchedTrackedEvents = _makeEventSelectors.getFetchedTrackedEvents;

exports.getFetchedTrackedEvents = getFetchedTrackedEvents;

var getEvents = function getEvents(state) {
  return state.events;
};

exports.getEvents = getEvents;
var getFetchingHistoricalEvents = (0, _reselect.createSelector)(getEvents, function (events) {
  return events.fetchingHistorical;
});
exports.getFetchingHistoricalEvents = getFetchingHistoricalEvents;
var getFetchedHistoricalEvents = (0, _reselect.createSelector)(getEvents, function (events) {
  return events.fetchedHistorical;
});
exports.getFetchedHistoricalEvents = getFetchedHistoricalEvents;
var selectors = {
  getFetchedTrackedEvents: getFetchedTrackedEvents,
  getFetchingHistoricalEvents: getFetchingHistoricalEvents,
  getFetchedHistoricalEvents: getFetchedHistoricalEvents
};
exports.selectors = selectors;