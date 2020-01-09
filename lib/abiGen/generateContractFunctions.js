"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable global-require */

/* eslint-disable no-shadow */
var _ = require('lodash');

var _require = require('./utils'),
    getContractFunctionName = _require.getContractFunctionName,
    getInterface = _require.getInterface;

function getInputNames(inputs) {
  return _.map(inputs, function (_ref, i) {
    var name = _ref.name,
        type = _ref.type;
    return name || "".concat(type, "Input").concat(i + 1);
  });
}

function buildContractFunctionParams(inputs, type, payable, contractKey) {
  var inputNames = getInputNames(inputs);
  var parameters = inputNames;

  if (type === 'transaction') {
    parameters.push('signer');
  }

  if (payable) {
    parameters = ['ethAmount'].concat(_toConsumableArray(parameters));
  }

  if (!contractKey) {
    parameters = ['contractAddress'].concat(_toConsumableArray(parameters));
  }

  return parameters;
}

function generateContractFunctions(abiLocation, contractKey) {
  var eventNamespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var abi = require("../".concat(abiLocation));

  var contractFunctions = _.uniq(_.values(getInterface(abi).functions));

  var functionArray = contractFunctions.map(function (_ref2) {
    var inputs = _ref2.inputs,
        payable = _ref2.payable,
        type = _ref2.type,
        name = _ref2.name;
    var parameters = buildContractFunctionParams(inputs, type, payable, contractKey);
    var functionArgs = parameters.length ? "".concat(parameters.join(', ')) : '';
    var getContract = type === 'transaction' ? 'signer' : 'constants.httpProvider';
    var lastParamContractAddress = contractKey ? '' : ', contractAddress';
    var functionName = getContractFunctionName(type, name, eventNamespace);
    var inputNames = getInputNames(inputs);
    var innerParamEthAmount = !payable ? '' : "".concat(inputNames.length ? ', ' : '', "{ value: ethers.utils.bigNumberify(ethAmount || '0') }");
    return "function ".concat(functionName, "(").concat(functionArgs, ") {\n  const contract = get").concat(_.upperFirst(eventNamespace), "Contract(").concat(getContract).concat(lastParamContractAddress, ")\n  return contract.").concat(name, "(").concat(inputNames.join(', ')).concat(innerParamEthAmount, ")\n}\n");
  });
  var passedInContractAddress = contractKey ? '' : ', contractAddress';
  var contractConstantsImport = "\nconst constants = require('../constants')\n";
  var contractAddress = contractKey ? "constants.".concat(contractKey) : 'contractAddress';
  return "const ethers = require('ethers')\nconst abi = require('../".concat(abiLocation, "')").concat(contractConstantsImport, "\nfunction get").concat(_.upperFirst(eventNamespace), "Contract(provider").concat(passedInContractAddress, ") {\n  return new ethers.Contract(").concat(contractAddress, ", abi, provider)\n}\n ").concat(functionArray.join('\n'), "\n \n module.exports = { ").concat(contractFunctions.map(function (_ref3) {
    var name = _ref3.name,
        type = _ref3.type;
    return "".concat(getContractFunctionName(type, name, eventNamespace), " ");
  }), " }\n");
}

module.exports = generateContractFunctions;