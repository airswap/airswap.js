/* eslint-disable global-require */
/* eslint-disable no-shadow */
const _ = require('lodash')
const { getInterfaceEvents } = require('./utils')

function getFunctionName(eventNamespace, name) {
  const functionInnerName = _.upperFirst(eventNamespace) === name ? name : `${_.upperFirst(eventNamespace)}${name}`
  return `fetch${functionInnerName}Logs`
}

function generateEventLogs(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`../${abiLocation}`)
  const actionsTextArray = getInterfaceEvents(abi).map(({ name, inputs }) => {
    const filteredInputs = _.map(_.filter(inputs, { indexed: true }), 'name')
    if (!contractKey) {
      filteredInputs.push('contractAddress')
    }

    const contractString = contractKey ? `\n  constants.${contractKey},` : 'contractAddress,'
    const inputsOuterParam = filteredInputs.length ? `${filteredInputs.join(', ')}, ` : ''

    const functionName = getFunctionName(eventNamespace, name)

    const eventTopicsParamsString = filteredInputs.length ? `, params: { ${inputsOuterParam} }` : ''

    return `const ${functionName} = ({ ${inputsOuterParam}fromBlock, toBlock, parser, provider } = {}) => fetchLogs(
  ${contractString}
  abi,
  getEventTopics({ abi, name: '${name}'${eventTopicsParamsString} }),
  fromBlock,
  toBlock,
  parser,
  provider
)
`
  })
  const contractContantsImport = contractKey
    ? `
const constants = require('../constants')`
    : ''
  return `const { fetchLogs, getEventTopics } = require('../events/utils')
  const abi = require('../${abiLocation}')${contractContantsImport}\n
  ${actionsTextArray.join('\n')}
  module.exports = { ${getInterfaceEvents(abi).map(({ name }) => getFunctionName(eventNamespace, name))} }
  `
}

module.exports = generateEventLogs
