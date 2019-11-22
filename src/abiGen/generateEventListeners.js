/* eslint-disable global-require */
/* eslint-disable no-shadow */
const _ = require('lodash')
const { getInterfaceEvents } = require('./utils')

function generateEventListeners(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`../${abiLocation}`)
  const actionsTextArray = getInterfaceEvents(abi).map(({ name, inputs, topic }) => {
    const filteredInputs = _.map(_.filter(inputs, { indexed: true }), 'name')
    const contractString = contractKey ? `\n  contract: constants.${contractKey},` : ''
    const inputsOuterParam = filteredInputs.length ? `${filteredInputs.join(', ')}, ` : ''
    const functionName = `track${_.upperFirst(eventNamespace)}${name}`

    return `const ${functionName} = ({ callback, ${inputsOuterParam}fromBlock, backFillBlockCount, parser, onFetchingHistoricalEvents, onFetchedHistoricalEvents } = {}) => eventTracker.trackEvent({
  callback,${contractString}
  abi,
  name: '${name}',
  params: { ${filteredInputs.join(', ')} },
  fromBlock,
  backFillBlockCount,
  topic: '${topic}',
  namespace: '${eventNamespace}',
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents
})
`
  })
  const contractContantsImport = contractKey
    ? `
const constants = require('../constants')`
    : ''
  return `const eventTracker = require('../events/websocketEventTracker')
  const abi = require('../${abiLocation}')${contractContantsImport}\n
  ${actionsTextArray.join('\n')}
  module.exports = { ${getInterfaceEvents(abi).map(({ name }) => `track${_.upperFirst(eventNamespace)}${name}`)} }
  `
}

module.exports = generateEventListeners
