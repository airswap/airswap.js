"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectedWrapperWethApproval = exports.getConnectedERC20Approvals = exports.getERC20Approvals = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

var _reducers = require("../../wallet/redux/reducers");

var _constants = require("../../constants");

var _eventTrackingSelectors = require("./eventTrackingSelectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getERC20Approvals = (0, _reselect.createSelector)(_eventTrackingSelectors.getERC20ApprovalEvents, function (events) {
  var approvals = events.map(function (_ref) {
    var _ref$values = _ref.values,
        owner = _ref$values.owner,
        spender = _ref$values.spender,
        value = _ref$values.value,
        address = _ref.address;
    return _lodash.default.mapValues({
      owner: owner,
      spender: spender,
      value: value,
      contractAddress: address
    }, function (s) {
      return s.toLowerCase();
    });
  });
  return _lodash.default.reduce(approvals, function (agg, _ref2) {
    var owner = _ref2.owner,
        spender = _ref2.spender,
        value = _ref2.value,
        contractAddress = _ref2.contractAddress;
    var approved = Number(value) > 0;
    return _lodash.default.merge({}, agg, _defineProperty({}, owner, _defineProperty({}, spender, _defineProperty({}, contractAddress, approved))));
  }, {});
});
exports.getERC20Approvals = getERC20Approvals;
var getConnectedERC20Approvals = (0, _reselect.createSelector)(getERC20Approvals, _reducers.getConnectedWalletAddress, function (approvals, walletAddress) {
  return _lodash.default.get(approvals, walletAddress);
});
exports.getConnectedERC20Approvals = getConnectedERC20Approvals;
var getConnectedWrapperWethApproval = (0, _reselect.createSelector)(getConnectedERC20Approvals, function (connectedApprovals) {
  return _lodash.default.get(connectedApprovals, "".concat(_constants.WRAPPER_CONTRACT_ADDRESS, ".").concat(_constants.WETH_CONTRACT_ADDRESS));
});
exports.getConnectedWrapperWethApproval = getConnectedWrapperWethApproval;