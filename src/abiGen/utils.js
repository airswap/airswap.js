const ethers = require('ethers')
const _ = require('lodash')

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

module.exports = {
  getContractFunctionName,
  getContractFunctionActionType,
  getInterface,
}
