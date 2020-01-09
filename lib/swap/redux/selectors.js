"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwapCancelEventsAllContracts = exports.getSwapSwapEventsAllContracts = exports.getConnectedWrapperDelegateApproval = exports.getConnectedDelegateApprovals = exports.getSwapDelegateApprovals = exports.getFormattedSwapCancels = exports.getFormattedSwapFills = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _eventTrackingSelectors = require("./eventTrackingSelectors");

var _redux = require("../../blockTracker/redux");

var _reducers = require("../../tokens/redux/reducers");

var callDataSelectors = _interopRequireWildcard(require("./callDataSelectors"));

var _reducers2 = require("../../wallet/redux/reducers");

var _constants = require("../../constants");

var _utils = require("../../swap/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getFormattedSwapFills = (0, _reselect.createSelector)(_eventTrackingSelectors.getSwapSwapEvents, _reducers.makeGetReadableSwapOrder, function (events, getReadableSwapOrder) {
  return events.map(function (_ref) {
    var transactionHash = _ref.transactionHash,
        values = _ref.values;
    return _objectSpread({
      transactionHash: transactionHash
    }, getReadableSwapOrder((0, _utils.mapFlat22OrderTo20Order)(values)), {
      timestamp: values.timestamp
    });
  });
});
exports.getFormattedSwapFills = getFormattedSwapFills;
var getFormattedSwapCancels = (0, _reselect.createSelector)(_eventTrackingSelectors.getSwapCancelEvents, _redux.selectors.getBlocks, function (events, blockObj) {
  return events.map(function (_ref2) {
    var transactionHash = _ref2.transactionHash,
        blockNumber = _ref2.blockNumber,
        values = _ref2.values;
    return _objectSpread({
      transactionHash: transactionHash
    }, (0, _utils.mapFlat22OrderTo20Order)(values), {
      timestamp: _lodash.default.get(blockObj, "".concat(blockNumber, ".timestamp"))
    });
  });
});
exports.getFormattedSwapCancels = getFormattedSwapCancels;
var getSwapDelegateApprovals = (0, _reselect.createSelector)(callDataSelectors.getSwapSenderAuthorizations, function (approvals) {
  return _lodash.default.reduce(approvals, function (agg, val) {
    var approved = val.response;
    var _val$parameters = val.parameters,
        authorizerAddress = _val$parameters.authorizerAddress,
        authorizedSender = _val$parameters.authorizedSender;
    return _lodash.default.merge({}, agg, _defineProperty({}, authorizerAddress, _defineProperty({}, authorizedSender, approved)));
  }, {});
});
exports.getSwapDelegateApprovals = getSwapDelegateApprovals;
var getConnectedDelegateApprovals = (0, _reselect.createSelector)(getSwapDelegateApprovals, _reducers2.getConnectedWalletAddress, function (approvals, walletAddress) {
  return _lodash.default.get(approvals, walletAddress);
});
exports.getConnectedDelegateApprovals = getConnectedDelegateApprovals;
var getConnectedWrapperDelegateApproval = (0, _reselect.createSelector)(getConnectedDelegateApprovals, function (connectedApprovals) {
  return _lodash.default.get(connectedApprovals, _constants.WRAPPER_CONTRACT_ADDRESS);
});
exports.getConnectedWrapperDelegateApproval = getConnectedWrapperDelegateApproval;

var getFetchedTrackedEvents = function getFetchedTrackedEvents(state) {
  return state.events.trackedEvents.fetched;
};

var getSwapSwapEventsAllContracts = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0xd5fe17cd50e0d3d39b905ea598bbabccf2f8cda62a3b2fc64e09de00247a4724'
  }).map(function (event) {
    return _objectSpread({}, event, {
      values: (0, _utils.mapFlat22OrderTo20Order)(event.values)
    });
  });
});
exports.getSwapSwapEventsAllContracts = getSwapSwapEventsAllContracts;
var getSwapCancelEventsAllContracts = (0, _reselect.createSelector)(getFetchedTrackedEvents, function (events) {
  return _lodash.default.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d'
  }).map(function (event) {
    return _objectSpread({}, event, {
      values: (0, _utils.mapFlat22OrderTo20Order)(event.values)
    });
  });
});
exports.getSwapCancelEventsAllContracts = getSwapCancelEventsAllContracts;