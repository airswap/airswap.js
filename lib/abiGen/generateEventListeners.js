"use strict";

/* eslint-disable global-require */

/* eslint-disable no-shadow */
var _ = require('lodash');

var _require = require('./utils'),
    getInterfaceEvents = _require.getInterfaceEvents;

function generateEventListeners(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("../".concat(abiLocation));

  var actionsTextArray = getInterfaceEvents(abi).map(function (_ref) {
    var name = _ref.name,
        inputs = _ref.inputs,
        topic = _ref.topic;

    var filteredInputs = _.map(_.filter(inputs, {
      indexed: true
    }), 'name');

    var contractString = contractKey ? "\n  contract: constants.".concat(contractKey, ",") : '';
    var inputsOuterParam = filteredInputs.length ? "".concat(filteredInputs.join(', '), ", ") : '';
    var functionName = "track".concat(_.upperFirst(eventNamespace)).concat(name);
    return "const ".concat(functionName, " = ({ callback, ").concat(inputsOuterParam, "fromBlock, backFillBlockCount, parser, onFetchingHistoricalEvents, onFetchedHistoricalEvents } = {}) => eventTracker.trackEvent({\n  callback,").concat(contractString, "\n  abi,\n  name: '").concat(name, "',\n  params: { ").concat(filteredInputs.join(', '), " },\n  fromBlock,\n  backFillBlockCount,\n  topic: '").concat(topic, "',\n  namespace: '").concat(eventNamespace, "',\n  parser,\n  onFetchingHistoricalEvents,\n  onFetchedHistoricalEvents\n})\n");
  });
  var contractContantsImport = contractKey ? "\nconst constants = require('../constants')" : '';
  return "const eventTracker = require('../events/websocketEventTracker')\n  const abi = require('../".concat(abiLocation, "')").concat(contractContantsImport, "\n\n  ").concat(actionsTextArray.join('\n'), "\n  module.exports = { ").concat(getInterfaceEvents(abi).map(function (_ref2) {
    var name = _ref2.name;
    return "track".concat(_.upperFirst(eventNamespace)).concat(name);
  }), " }\n  ");
}

module.exports = generateEventListeners;