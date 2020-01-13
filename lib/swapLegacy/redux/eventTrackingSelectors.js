"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFetchedSwapLegacyFailed = exports.getFetchedSwapLegacyCanceled = exports.getFetchedSwapLegacyFilled = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFetchedTrackedEvents = function getFetchedTrackedEvents(state) {
  return state.events.trackedEvents.fetched;
};

var getFetchedSwapLegacyFilled = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xe59c5e56d85b2124f5e7f82cb5fcc6d28a4a241a9bdd732704ac9d3b6bfc98ab'
  });
});
exports.getFetchedSwapLegacyFilled = getFetchedSwapLegacyFilled;
var getFetchedSwapLegacyCanceled = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8ce0bae8f3488649f2f29762dfc77af336a695060bc787b9c813c6fdd79fdf25'
  });
});
exports.getFetchedSwapLegacyCanceled = getFetchedSwapLegacyCanceled;
var getFetchedSwapLegacyFailed = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8e49dd3f283d9a844668a6f422edaa50c4c22987511ec284cebec288ca54f37a'
  });
});
exports.getFetchedSwapLegacyFailed = getFetchedSwapLegacyFailed;