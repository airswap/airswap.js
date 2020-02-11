"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable */
var fs = require('fs');

var _ = require('lodash');

require('./abiMapping');

var generateContractFunctions = require('./abiGen/generateContractFunctions');

var generateEventListeners = require('./abiGen/generateEventListeners');

var _require = require('./abiGen/utils'),
    writeFile = _require.writeFile,
    getInterface = _require.getInterface,
    getInterfaceEvents = _require.getInterfaceEvents,
    getInterfaceCallFunctions = _require.getInterfaceCallFunctions,
    getInterfaceTransactionFunctions = _require.getInterfaceTransactionFunctions,
    getIsOnlyCalls = _require.getIsOnlyCalls; // eslint-disable-next-line


function generateTrackedAction(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var actionsTextArray = _.filter(abi, {
    type: 'event'
  }).map(function (_ref) {
    var name = _ref.name,
        inputs = _ref.inputs;

    var filteredInputs = _.map(_.filter(inputs, {
      indexed: true
    }), 'name');

    var contractString = contractKey ? "\n  contract: constants.".concat(contractKey, ",") : '';
    var inputsOuterParam = filteredInputs.length ? "".concat(filteredInputs.join(', '), ", ") : '';
    return "export const track".concat(_.upperFirst(eventNamespace)).concat(name, " = ({ callback, ").concat(inputsOuterParam, "fromBlock, backFillBlockCount } = {}) => ({\n  callback,").concat(contractString, "\n  abi,\n  name: '").concat(name, "',\n  params: { ").concat(filteredInputs.join(', '), " },\n  fromBlock,\n  backFillBlockCount,\n  type: 'TRACK_EVENT',\n  namespace: '").concat(eventNamespace, "',\n})\n");
  });

  var contractContantsImport = contractKey ? "\nconst constants = require('../../constants')" : '';
  return ["const abi = require('../../".concat(abiLocation, "')").concat(contractContantsImport, "\n")].concat(_toConsumableArray(actionsTextArray)).join('\n');
} // eslint-disable-next-line


function generateEventTrackingSelectors(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var selectorTextArray = getInterfaceEvents(abi).map(function (_ref2) {
    var name = _ref2.name,
        topic = _ref2.topic;
    return "\nexport const get".concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name), "Events = createSelector(\n  getFetchedTrackedEvents,\n  events => _.filter(events, { topic: '").concat(topic, "'").concat(contractKey ? ", address: constants.".concat(contractKey, ",") : '', " })\n)\n\nexport const get").concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name), "HistoricalFetchStatus = createSelector(\n  getFetchingHistoricalEvents,\n  getFetchedHistoricalEvents,\n  (fetchingValues, fetchedValues) => {\n    const fetching = fetchingValues.").concat(eventNamespace).concat(name, "\n    const fetched = fetchedValues.").concat(eventNamespace).concat(name, "\n    return {\n      fetching, \n      fetched,\n    }\n  }\n)\n\n");
  });
  var contractConstantsImport = contractKey ? "\nimport constants from '../../constants'" : '';
  return "import _ from 'lodash'\nimport { createSelector } from 'reselect'".concat(contractConstantsImport, "\nimport { getFetchedTrackedEvents, getFetchingHistoricalEvents, getFetchedHistoricalEvents } from '../../events/redux/reducers'\n").concat(selectorTextArray.join('\n'), "\n");
}

function generateReduxIndex(abiLocation) {
  var events = getInterfaceEvents(require("./".concat(abiLocation)));
  return "import middleware from './middleware'\nimport reducers from './reducers'\n".concat(events.length ? "import * as eventTrackingSelectors from './eventTrackingSelectors'" : '', "\n\nconst selectors = {\n").concat(events.length ? '...eventTrackingSelectors,' : '', "\n}\n\nexport { middleware, reducers, selectors }\n");
}

function generateMiddleware() {
  return "";
}

function generateReducers() {
  return "";
}

var getContractFunctionName = function getContractFunctionName(type, name, eventNamespace) {
  var prefix = type === 'call' ? 'get' : 'submit';

  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return "".concat(prefix).concat(_.upperFirst(name));
  } else {
    return "".concat(prefix).concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name));
  }
};

var getContractFunctionActionName = function getContractFunctionActionName(type, name, eventNamespace) {
  var prefix = type === 'call' ? 'fetch' : 'submit';

  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return "".concat(prefix).concat(_.upperFirst(name));
  } else {
    return "".concat(prefix).concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name));
  }
};

var getContractFunctionActionType = function getContractFunctionActionType(type, name, eventNamespace) {
  return _.snakeCase(getContractFunctionActionName(type, name, eventNamespace)).toUpperCase();
};

function generateContractFunctionActions(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var contractFunctions = _.uniq(_.values(getInterface(abi).functions));

  var actionsTextArray = contractFunctions.map(function (_ref3) {
    var inputs = _ref3.inputs,
        outputs = _ref3.outputs,
        payable = _ref3.payable,
        type = _ref3.type,
        name = _ref3.name;

    var filteredInputs = _.map(inputs, 'name');

    if (!contractKey) filteredInputs = ['contractAddress'].concat(_toConsumableArray(filteredInputs));
    if (payable) filteredInputs.push('ethAmount');
    var inputsOuterParam = filteredInputs.length ? "{".concat(filteredInputs.join(', '), "}") : '';
    var inputsInnerParam = filteredInputs.length ? "".concat(filteredInputs.join(',\n'), ", ") : '';
    var actionName = getContractFunctionActionName(type, name, eventNamespace);
    var actionType = getContractFunctionActionType(type, name, eventNamespace);
    return "export const ".concat(actionName, " = (").concat(inputsOuterParam, ") => dispatch => new Promise((resolve, reject) => dispatch({").concat(inputsInnerParam, "\n  type: '").concat(actionType, "',\n  resolve,\n  reject,\n}))\n");
  });
  return actionsTextArray.join('\n');
}

function generateContractFunctionMiddleware(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var contractFunctions = _.uniq(_.values(getInterface(abi).functions));

  var onlyCalls = getIsOnlyCalls(abi);
  var actionsTextArray = contractFunctions.map(function (_ref4) {
    var inputs = _ref4.inputs,
        outputs = _ref4.outputs,
        payable = _ref4.payable,
        type = _ref4.type,
        name = _ref4.name;

    var filteredInputs = _.map(inputs, 'name');

    if (payable) filteredInputs = ['ethAmount'].concat(_toConsumableArray(filteredInputs));
    if (!contractKey) filteredInputs = ['contractAddress'].concat(_toConsumableArray(filteredInputs));
    var functionName = getContractFunctionName(type, name, eventNamespace);
    var actionName = getContractFunctionActionName(type, name, eventNamespace);
    var actionType = getContractFunctionActionType(type, name, eventNamespace);
    var caseContent;
    var parameters = filteredInputs.length ? "\nparameters: {".concat(filteredInputs.map(function (input) {
      return "".concat(input, ": action.").concat(input);
    }).join(', '), ", }") : '';

    if (type === 'call') {
      var functionArguments = filteredInputs.length ? "".concat(filteredInputs.map(function (input) {
        return "action.".concat(input);
      }).join(', ')) : '';
      caseContent = "contractFunctions.".concat(functionName, "(").concat(functionArguments, ").then(response => {\n        store.dispatch({\n         type: 'GOT_CALL_RESPONSE',\n         response: resolveBigNumbers(response),\n         namespace: '").concat(eventNamespace, "',\n         name: '").concat(name, "',\n         timestamp: Date.now(),").concat(parameters, "\n        })\n        action.resolve(response)\n      }).catch(action.reject)");
    } else {
      var _functionArguments = filteredInputs.length ? "".concat(filteredInputs.map(function (input) {
        return "action.".concat(input);
      }).join(', '), ",") : '';

      caseContent = "store.dispatch(getSigner()).then(signer => {\n       const contractFunctionPromise = contractFunctions.".concat(actionName, "(").concat(_functionArguments, "signer)\n       const id = Date.now().toString()\n       store.dispatch({\n         type: 'ADD_TRACKED_TRANSACTION',\n         contractFunctionPromise,\n         id,\n         namespace: '").concat(eventNamespace, "',\n         name: '").concat(name, "',").concat(parameters, "\n       })\n       action.resolve(id)\n      })");
    }

    return "\n  case '".concat(actionType, "':\n    ").concat(caseContent, "\n  break");
  });
  var actionCases = actionsTextArray.join('');
  var getSigner = onlyCalls ? '' : "import { getSigner } from '../../wallet/redux/actions'\n";
  return "\nimport * as contractFunctions from '../contractFunctions'\nimport resolveBigNumbers from '../../utils/resolveBigNumbers'\n\n".concat(getSigner, "  \nexport default function ").concat(eventNamespace, "Middleware(store) {\n  return next => action => {\n    switch (action.type) {\n      ").concat(actionCases, "\n      default:\n    }\n    return next(action)\n  }\n}\n  \n");
} // eslint-disable-next-line


function generateCallDataSelectors(abiLocation, contractKey) {
  var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var selectorTextArray = getInterfaceCallFunctions(abi).map(function (_ref5) {
    var name = _ref5.name,
        type = _ref5.type,
        inputs = _ref5.inputs;
    return "\nexport const ".concat(getContractFunctionName(type, name, namespace), " = createSelector(\n  getCallData,\n  values =>  {\n   const filteredValues = _.filter(values, { name: '").concat(name, "', namespace: '").concat(namespace, "' })\n   const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()\n   return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))\n  }\n)\n");
  });
  return "import _ from 'lodash'\nimport { createSelector } from 'reselect'\n\nconst getCallData = state => state.callData\n".concat(selectorTextArray.join('\n'), "\n");
}

var getContractFunctionSelectorName = function getContractFunctionSelectorName(type, name, eventNamespace) {
  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return "".concat(_.upperFirst(name));
  } else {
    return "".concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name));
  }
}; // eslint-disable-next-line


function generateContractTransactionSelectors(abiLocation, contractKey) {
  var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("./".concat(abiLocation));

  var selectorTextArray = getInterfaceTransactionFunctions(abi).map(function (_ref6) {
    var name = _ref6.name,
        type = _ref6.type;
    // inputs
    // let filteredInputs = _.map(inputs, 'name')
    // if (!contractKey) filteredInputs = ['contractAddress', ...filteredInputs]
    // const selectorOuterParams = filteredInputs.length ? `{ ${filteredInputs.join(', ')} }` : ''
    // const selectorInnerParams = filteredInputs.length ? `${filteredInputs.join(', ')}` : ''
    return "\nexport const get".concat(getContractFunctionSelectorName(type, name, namespace), "Transactions = createSelector(\n  getTransactions,\n   transactions =>  {\n   const filteredValues = _.filter(transactions, { name: '").concat(name, "', namespace: '").concat(namespace, "' })\n   const sortedValues = _.sortBy(filteredValues, 'id')\n   return sortedValues\n  }\n)\n");
  });
  return "import _ from 'lodash'\nimport { createSelector } from 'reselect'\nimport { selectors as transactionSelectors } from '../../transactionTracker/redux'\n\nconst { getTransactions } = transactionSelectors\n\n".concat(selectorTextArray.join('\n'), "\n");
}

var modules = [{
  abiLocation: 'abis/WETH_ABI.json',
  namespace: 'weth',
  contractKey: 'WETH_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/hst.json',
  namespace: 'ERC20',
  contractKey: ''
}, {
  abiLocation: 'abis/swap.json',
  namespace: 'swap',
  contractKey: 'SWAP_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/indexer.json',
  namespace: 'indexer',
  contractKey: 'INDEXER_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/deltaBalancesABI.json',
  namespace: 'deltaBalances',
  contractKey: 'DELTA_BALANCES_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/wrapper.json',
  namespace: 'wrapper',
  contractKey: 'WRAPPER_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/erc721.json',
  namespace: 'ERC721',
  contractKey: ''
}, {
  abiLocation: 'abis/delegate.json',
  namespace: 'delegate',
  contractKey: ''
}, {
  abiLocation: 'abis/index.json',
  namespace: 'index',
  contractKey: ''
}, {
  abiLocation: 'abis/delegateFactory.json',
  namespace: 'delegateFactory',
  contractKey: 'DELEGATE_FACTORY_CONTRACT_ADDRESS'
}, {
  abiLocation: 'abis/SecuritizeTokenInterface.json',
  namespace: 'securitize',
  contractKey: ''
}];
modules.map(createSubmodules);

function createSubmodules(_ref7) {
  var abiLocation = _ref7.abiLocation,
      namespace = _ref7.namespace,
      contractKey = _ref7.contractKey;
  fs.mkdir("./".concat(namespace.toLowerCase(), "/redux/"), {
    recursive: true
  }, function (err) {
    if (err) throw err;

    var abi = require("./".concat(abiLocation));

    var isOnlyCalls = getIsOnlyCalls(abi);
    var events = getInterfaceEvents(require("./".concat(abiLocation)));
    writeFile("./".concat(namespace.toLowerCase(), "/contractFunctions.js"), generateContractFunctions(abiLocation, contractKey, namespace));

    if (events.length) {
      writeFile("./".concat(namespace.toLowerCase(), "/eventListeners.js"), generateEventListeners(abiLocation, contractKey, namespace));
    }

    if (events.length) {
      writeFile("./".concat(namespace.toLowerCase(), "/redux/eventTrackingSelectors.js"), generateEventTrackingSelectors(abiLocation, contractKey, namespace));
      writeFile("./".concat(namespace.toLowerCase(), "/redux/eventTrackingActions.js"), generateTrackedAction(abiLocation, contractKey, namespace));
    }

    writeFile("./".concat(namespace.toLowerCase(), "/redux/contractFunctionActions.js"), generateContractFunctionActions(abiLocation, contractKey, namespace));
    writeFile("./".concat(namespace.toLowerCase(), "/redux/contractFunctionMiddleware.js"), generateContractFunctionMiddleware(abiLocation, contractKey, namespace));
    writeFile("./".concat(namespace.toLowerCase(), "/redux/callDataSelectors.js"), generateCallDataSelectors(abiLocation, contractKey, namespace));

    if (!isOnlyCalls) {
      writeFile("./".concat(namespace.toLowerCase(), "/redux/contractTransactionSelectors.js"), generateContractTransactionSelectors(abiLocation, contractKey, namespace));
    }

    try {
      fs.writeFileSync("./".concat(namespace, "/redux/index.js"), generateReduxIndex(abiLocation), {
        flag: 'wx'
      });
    } catch (e) {// console.log('redux/index.js already exists')
    }

    try {
      fs.writeFileSync("./".concat(namespace, "/redux/middleware.js"), generateMiddleware(), {
        flag: 'wx'
      });
    } catch (e) {// console.log('redux/middleware.js already exists')
    }

    try {
      fs.writeFileSync("./".concat(namespace, "/redux/reducers.js"), generateReducers(), {
        flag: 'wx'
      });
    } catch (e) {// console.log('redux/reducers.js already exists')
    }
  });
}