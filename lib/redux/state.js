"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureActionContainers = exports.configureStateContainers = exports.rootReducerObj = exports.middleware = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var tokens = _interopRequireWildcard(require("../tokens/redux"));

var wallet = _interopRequireWildcard(require("../wallet/redux"));

var deltaBalances = _interopRequireWildcard(require("../deltaBalances/redux"));

var events = _interopRequireWildcard(require("../events/redux"));

var api = _interopRequireWildcard(require("../api/redux"));

var ens = _interopRequireWildcard(require("../ens/redux"));

var erc20 = _interopRequireWildcard(require("../erc20/redux"));

var erc721 = _interopRequireWildcard(require("../erc721/redux"));

var keySpace = _interopRequireWildcard(require("../keySpace/redux"));

var dexIndex = _interopRequireWildcard(require("../dexIndex/redux"));

var protocolMessaging = _interopRequireWildcard(require("../protocolMessaging/redux"));

var swap = _interopRequireWildcard(require("../swap/redux"));

var swapLegacy = _interopRequireWildcard(require("../swapLegacy/redux"));

var gas = _interopRequireWildcard(require("../gas/redux"));

var fiat = _interopRequireWildcard(require("../fiat/redux"));

var hdw = _interopRequireWildcard(require("../HDW/redux"));

var blockTracker = _interopRequireWildcard(require("../blockTracker/redux"));

var transactionTracker = _interopRequireWildcard(require("../transactionTracker/redux"));

var wrapper = _interopRequireWildcard(require("../wrapper/redux"));

var callData = _interopRequireWildcard(require("../callData/redux"));

var abis = _interopRequireWildcard(require("../abis/redux"));

var indexer = _interopRequireWildcard(require("../indexer/redux"));

var index = _interopRequireWildcard(require("../index/redux"));

var delegateFactory = _interopRequireWildcard(require("../delegateFactory/redux"));

var delegate = _interopRequireWildcard(require("../delegate/redux"));

var weth = _interopRequireWildcard(require("../weth/redux"));

var _redux27 = require("../utils/redux");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var state = {
  tokens: tokens,
  wallet: wallet,
  deltaBalances: deltaBalances,
  events: events,
  api: api,
  ens: ens,
  erc20: erc20,
  erc721: erc721,
  keySpace: keySpace,
  dexIndex: dexIndex,
  protocolMessaging: protocolMessaging,
  swap: swap,
  swapLegacy: swapLegacy,
  gas: gas,
  fiat: fiat,
  hdw: hdw,
  blockTracker: blockTracker,
  transactionTracker: transactionTracker,
  wrapper: wrapper,
  callData: callData,
  abis: abis,
  indexer: indexer,
  index: index,
  delegateFactory: delegateFactory,
  delegate: delegate,
  weth: weth
};

var middleware = _lodash.default.flatten(_lodash.default.map(_lodash.default.values(state), 'middleware'));

exports.middleware = middleware;

var rootReducerObj = _lodash.default.mapValues(state, 'reducers');

exports.rootReducerObj = rootReducerObj;

var configureStateContainers = function configureStateContainers(connect) {
  return _lodash.default.mapValues(_lodash.default.merge.apply(_lodash.default, [{}].concat(_toConsumableArray(_lodash.default.compact(_lodash.default.map(_lodash.default.values(state), 'containers'))))), function (containerSelector) {
    return containerSelector(connect);
  });
};

exports.configureStateContainers = configureStateContainers;

var configureActionContainers = function configureActionContainers(connect) {
  return _lodash.default.mapValues(_lodash.default.merge.apply(_lodash.default, [{}].concat(_toConsumableArray(_lodash.default.compact(_lodash.default.map(_lodash.default.values(state), 'actions'))))), function (action, name) {
    return (0, _redux27.connectActionContainer)(action, name)(connect);
  });
};

exports.configureActionContainers = configureActionContainers;