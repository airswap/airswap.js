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
    return `export const track${_.upperFirst(
      eventNamespace,
    )}${name} = ({ callback, ${inputsOuterParam}fromBlock, backFillBlockCount } = {}) => ({
  callback,${contractString}
  abi,
  name: '${name}',
  params: { ${filteredInputs.join(', ')} },
  fromBlock,
  backFillBlockCount,
  topic: '${topic}',
  namespace: '${eventNamespace}',
})
`
  })
  const contractContantsImport = contractKey
    ? `
const constants = require('../constants')`
    : ''
  return `const abi = require('../${abiLocation}')${contractContantsImport}\n
  ${actionsTextArray.join('\n')}
  `
}

module.exports = generateEventListeners
