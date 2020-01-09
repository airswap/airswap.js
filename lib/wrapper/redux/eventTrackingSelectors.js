"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWrapperOwnershipTransferredEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _constants = _interopRequireDefault(require("../../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getFetchedTrackedEvents = function getFetchedTrackedEvents(state) {
  return state.events.trackedEvents.fetched;
};

var getWrapperOwnershipTransferredEvents = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    address: _constants.default.WRAPPER_CONTRACT_ADDRESS
  });
});
exports.getWrapperOwnershipTransferredEvents = getWrapperOwnershipTransferredEvents;