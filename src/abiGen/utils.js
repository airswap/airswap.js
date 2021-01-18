const ethers = require('ethers')
const _ = require('lodash')
const fs = require('fs')

const getContractFunctionName = (type, name, eventNamespace) => {
  const prefix = type === 'call' ? 'get' : 'submit'

  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return `${prefix}${_.upperFirst(name)}`
  }
  return `${prefix}${_.upperFirst(eventNamespace)}${_.upperFirst(name)}`
}

const getContractFunctionActionType = (type, name, eventNamespace) =>
  _.snakeCase(getContractFunctionName(type, name, eventNamespace)).toUpperCase()

function getInterface(abi) {
  return new ethers.utils.Interface(abi)
}

function getInterfaceEvents(abi) {
  return _.uniqBy(_.values(getInterface(abi).events), 'name')
}

function getInterfaceFunctions(abi) {
  return _.uniqBy(_.values(getInterface(abi).functions), 'name')
}

function getInterfaceCallFunctions(abi) {
  return _.filter(getInterfaceFunctions(abi), { type: 'call' })
}

function getInterfaceTransactionFunctions(abi) {
  return _.filter(getInterfaceFunctions(abi), { type: 'transaction' })
}

const filePrefix = '// This file is generated code, edits will be overwritten\n'

function writeFile(location, contents) {
  fs.writeFileSync(location, `${filePrefix}${contents}`)
}

function getIsOnlyCalls(abi) {
  const contractFunctions = _.uniq(_.values(getInterface(abi).functions))
  return _.filter(contractFunctions, { type: 'call' }).length === contractFunctions.length
}

module.exports = {
  getContractFunctionName,
  getContractFunctionActionType,
  getInterface,
  getInterfaceEvents,
  getInterfaceCallFunctions,
  getInterfaceTransactionFunctions,
  writeFile,
  getIsOnlyCalls,
}
