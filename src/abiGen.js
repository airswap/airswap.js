/* eslint-disable */

const fs = require('fs')
const _ = require('lodash')
require('./abiMapping')
const generateContractFunctions = require('./abiGen/generateContractFunctions')
const generateEventListeners = require('./abiGen/generateEventListeners')

const {
  writeFile,
  getInterface,
  getInterfaceEvents,
  getInterfaceCallFunctions,
  getInterfaceTransactionFunctions,
} = require('./abiGen/utils')

// eslint-disable-next-line
function generateTrackedAction(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const actionsTextArray = _.filter(abi, { type: 'event' }).map(({ name, inputs }) => {
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
)

export const get${_.upperFirst(eventNamespace)}${_.upperFirst(name)}HistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.${eventNamespace}${name}
    const fetched = fetchedValues.${eventNamespace}${name}
    return {
      fetching, 
      fetched,
    }
  }
)

`,
  )
  const contractConstantsImport = contractKey
    ? `
import constants from '../../constants'`
    : ''
  return `import _ from 'lodash'
import { createSelector } from 'reselect'${contractConstantsImport}
import { getFetchedTrackedEvents, getFetchingHistoricalEvents, getFetchedHistoricalEvents } from '../../events/redux/reducers'
${selectorTextArray.join('\n')}
`
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

const getContractFunctionName = (type, name, eventNamespace) => {
  const prefix = type === 'call' ? 'get' : 'submit'
  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return `${prefix}${_.upperFirst(name)}`
  } else {
    return `${prefix}${_.upperFirst(eventNamespace)}${_.upperFirst(name)}`
  }
}

const getContractFunctionActionName = (type, name, eventNamespace) => {
  const prefix = type === 'call' ? 'fetch' : 'submit'
  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return `${prefix}${_.upperFirst(name)}`
  } else {
    return `${prefix}${_.upperFirst(eventNamespace)}${_.upperFirst(name)}`
  }
}

const getContractFunctionActionType = (type, name, eventNamespace) => {
  return _.snakeCase(getContractFunctionActionName(type, name, eventNamespace)).toUpperCase()
}

function generateContractFunctionActions(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const contractFunctions = _.uniq(_.values(getInterface(abi).functions))
  const actionsTextArray = contractFunctions.map(({ inputs, outputs, payable, type, name }) => {
    let filteredInputs = _.map(inputs, 'name')
    if (!contractKey) filteredInputs = ['contractAddress', ...filteredInputs]
    if (payable) filteredInputs.push('ethAmount')
    const inputsOuterParam = filteredInputs.length ? `{${filteredInputs.join(', ')}}` : ''
    const inputsInnerParam = filteredInputs.length ? `${filteredInputs.join(',\n')}, ` : ''
    const actionName = getContractFunctionActionName(type, name, eventNamespace)
    const actionType = getContractFunctionActionType(type, name, eventNamespace)
    return `export const ${actionName} = (${inputsOuterParam}) => dispatch => new Promise((resolve, reject) => dispatch({${inputsInnerParam}
  type: '${actionType}',
  resolve,
  reject,
}))\n`
  })
  return actionsTextArray.join('\n')
}

function generateContractFunctionMiddleware(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`./${abiLocation}`)
  const contractFunctions = _.uniq(_.values(getInterface(abi).functions))
  const onlyCalls = _.filter(contractFunctions, { type: 'call' }) === contractFunctions.length
  const actionsTextArray = contractFunctions.map(({ inputs, outputs, payable, type, name }) => {
    let filteredInputs = _.map(inputs, 'name')
    if (payable) filteredInputs = ['ethAmount', ...filteredInputs]
    if (!contractKey) filteredInputs = ['contractAddress', ...filteredInputs]
    const functionName = getContractFunctionName(type, name, eventNamespace)
    const actionName = getContractFunctionActionName(type, name, eventNamespace)
    const actionType = getContractFunctionActionType(type, name, eventNamespace)
    let caseContent

    const parameters = filteredInputs.length
      ? `\nparameters: {${filteredInputs.map(input => `${input}: action.${input}`).join(', ')}, }`
      : ''

    if (type === 'call') {
      const functionArguments = filteredInputs.length
        ? `${filteredInputs.map(input => `action.${input}`).join(', ')}`
        : ''
      caseContent = `contractFunctions.${functionName}(${functionArguments}).then(response => {
        store.dispatch({
         type: 'GOT_CALL_RESPONSE',
         response: resolveBigNumbers(response),
         namespace: '${eventNamespace}',
         name: '${name}',
         timestamp: Date.now(),${parameters}
        })
        action.resolve(response)
      }).catch(action.reject)`
    } else {
      const functionArguments = filteredInputs.length
        ? `${filteredInputs.map(input => `action.${input}`).join(', ')},`
        : ''

      caseContent = `store.dispatch(getSigner()).then(signer => {
       const contractFunctionPromise = contractFunctions.${actionName}(${functionArguments}signer)
       const id = Date.now().toString()
       store.dispatch({
         type: 'ADD_TRACKED_TRANSACTION',
         contractFunctionPromise,
         id,
         namespace: '${eventNamespace}',
         name: '${name}',${parameters}
       })
       action.resolve(id)
      })`
    }

    return `
  case '${actionType}':
    ${caseContent}
  break`
  })
  const actionCases = actionsTextArray.join('')

  const getSigner = onlyCalls ? '' : "import { getSigner } from '../../wallet/redux/actions'\n"

  return `
import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

${getSigner}  
export default function ${eventNamespace}Middleware(store) {
  return next => action => {
    switch (action.type) {
      ${actionCases}
      default:
    }
    return next(action)
  }
}
  
`
}

// eslint-disable-next-line
function generateCallDataSelectors(abiLocation, contractKey, namespace = '') {
  const abi = require(`./${abiLocation}`)
  const selectorTextArray = getInterfaceCallFunctions(abi).map(({ name, type, inputs }) => {
    return `
export const ${getContractFunctionName(type, name, namespace)} = createSelector(
  getCallData,
  values =>  {
   const filteredValues = _.filter(values, { name: '${name}', namespace: '${namespace}' })
   const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
   return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
  }
)
`
  })

  return `import _ from 'lodash'
import { createSelector } from 'reselect'

const getCallData = state => state.callData
${selectorTextArray.join('\n')}
`
}

const getContractFunctionSelectorName = (type, name, eventNamespace) => {
  if (_.upperFirst(eventNamespace) === _.upperFirst(name)) {
    return `${_.upperFirst(name)}`
  } else {
    return `${_.upperFirst(eventNamespace)}${_.upperFirst(name)}`
  }
}

// eslint-disable-next-line
function generateContractTransactionSelectors(abiLocation, contractKey, namespace = '') {
  const abi = require(`./${abiLocation}`)
  const selectorTextArray = getInterfaceTransactionFunctions(abi).map(({ name, type }) => {
    // inputs
    // let filteredInputs = _.map(inputs, 'name')
    // if (!contractKey) filteredInputs = ['contractAddress', ...filteredInputs]
    // const selectorOuterParams = filteredInputs.length ? `{ ${filteredInputs.join(', ')} }` : ''
    // const selectorInnerParams = filteredInputs.length ? `${filteredInputs.join(', ')}` : ''

    return `
export const get${getContractFunctionSelectorName(type, name, namespace)}Transactions = createSelector(
  getTransactions,
   transactions =>  {
   const filteredValues = _.filter(transactions, { name: '${name}', namespace: '${namespace}' })
   const sortedValues = _.sortBy(filteredValues, 'id')
   return sortedValues
  }
)
`
  })

  return `import _ from 'lodash'
import { createSelector } from 'reselect'
import { selectors as transactionSelectors } from '../../transactionTracker/redux'

const { getTransactions } = transactionSelectors

${selectorTextArray.join('\n')}
`
}

const modules = [
  {
    abiLocation: 'abis/WETH_ABI.json',
    namespace: 'weth',
    contractKey: 'WETH_CONTRACT_ADDRESS',
  },
  {
    abiLocation: 'abis/hst.json',
    namespace: 'ERC20',
    contractKey: '',
  },
  {
    abiLocation: 'abis/swap.json',
    namespace: 'swap',
    contractKey: 'SWAP_CONTRACT_ADDRESS',
  },
  {
    abiLocation: 'abis/indexer.json',
    namespace: 'indexer',
    contractKey: 'INDEXER_CONTRACT_ADDRESS',
  },
  {
    abiLocation: 'abis/deltaBalancesABI.json',
    namespace: 'deltaBalances',
    contractKey: 'DELTA_BALANCES_CONTRACT_ADDRESS',
  },
  {
    abiLocation: 'abis/wrapper.json',
    namespace: 'wrapper',
    contractKey: 'WRAPPER_CONTRACT_ADDRESS',
  },
  {
    abiLocation: 'abis/erc721.json',
    namespace: 'ERC721',
    contractKey: '',
  },
  {
    abiLocation: 'abis/delegate.json',
    namespace: 'delegate',
    contractKey: '',
  },
  {
    abiLocation: 'abis/index.json',
    namespace: 'index',
    contractKey: '',
  },
  {
    abiLocation: 'abis/delegateFactory.json',
    namespace: 'delegateFactory',
    contractKey: 'DELEGATE_FACTORY_CONTRACT_ADDRESS',
  },
]

modules.map(createSubmodules)

function createSubmodules({ abiLocation, namespace, contractKey }) {
  fs.mkdir(`./${namespace.toLowerCase()}/redux/`, { recursive: true }, err => {
    if (err) throw err

    const events = getInterfaceEvents(require(`./${abiLocation}`))

    writeFile(
      `./${namespace.toLowerCase()}/contractFunctions.js`,
      generateContractFunctions(abiLocation, contractKey, namespace),
    )

    if (events.length) {
      writeFile(
        `./${namespace.toLowerCase()}/eventListeners.js`,
        generateEventListeners(abiLocation, contractKey, namespace),
      )
    }

    if (events.length) {
      writeFile(
        `./${namespace.toLowerCase()}/redux/eventTrackingSelectors.js`,
        generateEventTrackingSelectors(abiLocation, contractKey, namespace),
      )
      writeFile(
        `./${namespace.toLowerCase()}/redux/eventTrackingActions.js`,
        generateTrackedAction(abiLocation, contractKey, namespace),
      )
    }

    writeFile(
      `./${namespace.toLowerCase()}/redux/contractFunctionActions.js`,
      generateContractFunctionActions(abiLocation, contractKey, namespace),
    )
    writeFile(
      `./${namespace.toLowerCase()}/redux/contractFunctionMiddleware.js`,
      generateContractFunctionMiddleware(abiLocation, contractKey, namespace),
    )
    writeFile(
      `./${namespace.toLowerCase()}/redux/callDataSelectors.js`,
      generateCallDataSelectors(abiLocation, contractKey, namespace),
    )
    writeFile(
      `./${namespace.toLowerCase()}/redux/contractTransactionSelectors.js`,
      generateContractTransactionSelectors(abiLocation, contractKey, namespace),
    )

    try {
      fs.writeFileSync(`./${namespace}/redux/index.js`, generateReduxIndex(), { flag: 'wx' })
    } catch (e) {
      // console.log('redux/index.js already exists')
    }
    try {
      fs.writeFileSync(`./${namespace}/redux/middleware.js`, generateMiddleware(), { flag: 'wx' })
    } catch (e) {
      // console.log('redux/middleware.js already exists')
    }
    try {
      fs.writeFileSync(`./${namespace}/redux/reducers.js`, generateReducers(), { flag: 'wx' })
    } catch (e) {
      // console.log('redux/reducers.js already exists')
    }
  })
}
