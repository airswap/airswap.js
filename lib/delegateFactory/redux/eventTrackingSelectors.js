"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelegateFactoryCreateDelegateHistoricalFetchStatus = exports.getDelegateFactoryCreateDelegateEvents = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _constants = _interopRequireDefault(require("../../constants"));

var _reducers = require("../../events/redux/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is generated code, edits will be overwritten
var getDelegateFactoryCreateDelegateEvents = (0, _reselect.createSelector)(_reducers.getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xff8beab89e8c26a642d622a3afc4cddcb2f06b35a39b280a98b1f7a465080115',
    address: _constants.default.DELEGATE_FACTORY_CONTRACT_ADDRESS
  });
});
exports.getDelegateFactoryCreateDelegateEvents = getDelegateFactoryCreateDelegateEvents;
var getDelegateFactoryCreateDelegateHistoricalFetchStatus = (0, _reselect.createSelector)(_reducers.getFetchingHistoricalEvents, _reducers.getFetchedHistoricalEvents, function (fetchingValues, fetchedValues) {
  var fetching = fetchingValues.delegateFactoryCreateDelegate;
  var fetched = fetchedValues.delegateFactoryCreateDelegate;
  return {
    fetching: fetching,
    fetched: fetched
  };
});
exports.getDelegateFactoryCreateDelegateHistoricalFetchStatus = getDelegateFactoryCreateDelegateHistoricalFetchStatus;