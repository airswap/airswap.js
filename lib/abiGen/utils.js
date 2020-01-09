"use strict";

var ethers = require('ethers');

var _ = require('lodash');

var fs = require('fs');

var getContractFunctionName = function getContractFunctionName(type, name, eventNamespace) {
  var prefix = type === 'call' ? 'get' : 'submit';

  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return "".concat(prefix).concat(_.upperFirst(name));
  }

  return "".concat(prefix).concat(_.upperFirst(eventNamespace)).concat(_.upperFirst(name));
};

var getContractFunctionActionType = function getContractFunctionActionType(type, name, eventNamespace) {
  return _.snakeCase(getContractFunctionName(type, name, eventNamespace)).toUpperCase();
};

function getInterface(abi) {
  return new ethers.utils.Interface(abi);
}

function getInterfaceEvents(abi) {
  return _.uniqBy(_.values(getInterface(abi).events), 'name');
}

function getInterfaceFunctions(abi) {
  return _.uniqBy(_.values(getInterface(abi).functions), 'name');
}

function getInterfaceCallFunctions(abi) {
  return _.filter(getInterfaceFunctions(abi), {
    type: 'call'
  });
}

function getInterfaceTransactionFunctions(abi) {
  return _.filter(getInterfaceFunctions(abi), {
    type: 'transaction'
  });
}

var filePrefix = '// This file is generated code, edits will be overwritten\n';

function writeFile(location, contents) {
  fs.writeFileSync(location, "".concat(filePrefix).concat(contents));
}

module.exports = {
  getContractFunctionName: getContractFunctionName,
  getContractFunctionActionType: getContractFunctionActionType,
  getInterface: getInterface,
  getInterfaceEvents: getInterfaceEvents,
  getInterfaceCallFunctions: getInterfaceCallFunctions,
  getInterfaceTransactionFunctions: getInterfaceTransactionFunctions,
  writeFile: writeFile
};