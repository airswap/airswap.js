/* eslint-disable */

const fs = require('fs')
const ethers = require('ethers')
const _ = require('lodash')

function getInterface(abi) {
  return new ethers.utils.Interface(abi)
}

function getInterfaceEvents(abi) {
  return _.uniqBy(_.values(getInterface(abi).events), 'name')
}

// eslint-disable-next-line
function generateTrackedAction(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const actionsTextArray = _.filter(abi, { type: 'event' }).map(({ name, inputs }) => {
    const filteredInputs = _.map(_.filter(inputs, { indexed: true }), 'name')
    const contractString = contractKey ? `\n  contract: constants.${contractKey},` : ''

    return `export const track${_.upperFirst(eventNamespace)}${name} = ({ callback, ${filteredInputs.join(
      ', ',
    )}, fromBlock, backFillBlockCount } = {}) => ({
  callback,${contractString}
  abi,
  name: '${name}',
  params: { ${filteredInputs.join(', ')} },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: '${eventNamespace}',
})
`
  })
  const contractContantsImport = contractKey
    ? `
const constants = require('../../constants')`
    : ''
  return [`const abi = require('../../${abiLocation}')${contractContantsImport}\n`, ...actionsTextArray].join('\n')
}

// eslint-disable-next-line
function generateEventTrackingSelectors(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const selectorTextArray = getInterfaceEvents(abi).map(
    ({ name, topic }) => `
export const get${_.upperFirst(eventNamespace)}${_.upperFirst(name)}Events = createSelector(
  getFetchedTrackedEvents,
  events => _.filter(events, { topic: '${topic}'${contractKey ? `, address: constants.${contractKey},` : ''} })
)`,
  )
  const contractConstantsImport = contractKey
    ? `
import constants from '../../constants'`
    : ''
  return [
    `import _ from 'lodash'
import { createSelector } from 'reselect'${contractConstantsImport}

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched`,
    ...selectorTextArray,
  ].join('\n')
}

function generateReduxIndex() {
  return `import middleware from './middleware'
import reducers from './reducers'
import * as eventTrackingSelectors from './eventTrackingSelectors'

const selectors = {
  ...eventTrackingSelectors,
}

export { middleware, reducers, selectors }
`
}

function generateMiddleware() {
  return ``
}

function generateReducers() {
  return ``
}

function getInputNames(inputs) {}

function generateContractFunctions(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const contractFunctions = _.uniq(_.values(getInterface(abi).functions))
  const functionArray = contractFunctions.map(({ inputs, outputs, payable, type, name }) => {
    const inputNames = _.map(inputs, ({ name, type }, i) => name || `${type}Input${i + 1}`)
    const signerParameter = type === 'transaction' ? `${inputNames.length ? ', ' : ''}signer` : ''
    const functionArgs = inputs.length ? `{ ${inputNames.join(', ')} }` : ''
    const getContract = type === 'transaction' ? `signer` : 'constants.httpProvider'
    const lastParamContractAddress = contractKey ? '' : ', contractAddress'
    const paramContractAddress = contractKey
      ? ''
      : `contractAddress${inputs.length || type === 'transaction' ? ', ' : ''}`
    return `export function ${name}(${paramContractAddress}${functionArgs}${signerParameter}) {
  const contract = get${_.upperFirst(eventNamespace)}Contract(${getContract}${lastParamContractAddress})
  return contract.${name}(${inputNames.join(', ')})
}
`
  })
  const passedInContractAddress = contractKey ? '' : ', contractAddress'
  const contractConstantsImport = `\nconst constants = require('../constants')\n`
  const contractAddress = contractKey ? `constants.${contractKey}` : 'contractAddress'
  return [
    `const ethers = require('ethers')
const abi = require('../${abiLocation}')${contractConstantsImport}
function get${_.upperFirst(eventNamespace)}Contract(provider${passedInContractAddress}) {
  return new ethers.Contract(${contractAddress}, abi, provider)
}
`,
    ...functionArray,
  ].join('\n')
}

const abiLocation = 'abis/WETH_ABI.json'
const namespace = 'weth'
const contractKey = 'WETH_CONTRACT_ADDRESS'

fs.mkdir(`./${namespace}/redux/`, { recursive: true }, err => {
  if (err) throw err
  fs.writeFileSync(
    `./${namespace}/redux/eventTrackingSelectors.js`,
    generateEventTrackingSelectors(abiLocation, contractKey, namespace),
  )
  fs.writeFileSync(
    `./${namespace}/redux/eventTrackingActions.js`,
    generateTrackedAction(abiLocation, contractKey, namespace),
  )
  fs.writeFileSync(`./${namespace}/redux/index.js`, generateReduxIndex())
  fs.writeFileSync(`./${namespace}/redux/middleware.js`, generateMiddleware())
  fs.writeFileSync(`./${namespace}/redux/reducers.js`, generateReducers())
  fs.writeFileSync(
    `./${namespace}/contractFunctions.js`,
    generateContractFunctions(abiLocation, contractKey, namespace),
  )
})
