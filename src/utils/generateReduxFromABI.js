const ethers = require('ethers')
const _ = require('lodash')
// const { abis, SWAP_CONTRACT_ADDRESS } = require('../constants')
const { abis, SWAP_LEGACY_CONTRACT_ADDRESS } = require('../constants')

function getInterface(abi) {
  return new ethers.utils.Interface(abi)
}

function getInterfaceEvents(abi) {
  return _.uniqBy(_.values(getInterface(abi).events), 'name')
}

// eslint-disable-next-line
function generateTrackedAction(abi, contractKey, eventNamespace = '') {
  return _.filter(abi, { type: 'event' })
    .map(({ name, inputs }) => {
      const filteredInputs = _.map(_.filter(inputs, { indexed: true }), 'name')
      return `
      export const track${_.upperFirst(eventNamespace)}${name} = ({ callback, ${filteredInputs.join(
        ', ',
      )}, fromBlock, backFillBlockCount } = {}) => ({
        callback,
        contract: ${contractKey},
        abi: abis[${contractKey}],
        name: '${name}',
        params: { ${filteredInputs.join(', ')} },
        fromBlock,
        backFillBlockCount,
        type: 'TRACK_EVENT',
        namespace: '${eventNamespace}',
      })`
    })
    .join('\n')
}

// eslint-disable-next-line
function generateEventTrackingSelectors(abi, contractKey, eventNamespace = '') {
  const selectorTextArray = getInterfaceEvents(abi).map(
    ({ name, topic }) => `
      export const getFetched${_.upperFirst(eventNamespace)}${_.upperFirst(name)} = createSelector(
        getFetchedTrackedEvents,
        events => _.filter(events, { topic: '${topic}' })
      )`,
  )

  return [
    `
    import _ from 'lodash'
    import { createSelector } from 'reselect'
    
    const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched
    `,
    ...selectorTextArray,
  ].join('\n')
}

// TODO: transform this script into one that runs command line with file io, right now it's copy/paste
// console.log(generateTrackedAction(abis[SWAP_CONTRACT_ADDRESS], 'SWAP_CONTRACT_ADDRESS', 'swap'))
// console.log(generateTrackedAction(abis[SWAP_LEGACY_CONTRACT_ADDRESS], 'SWAP_LEGACY_CONTRACT_ADDRESS', 'swapLegacy'))
// console.log(generateEventTrackingSelectors(abis[SWAP_CONTRACT_ADDRESS], 'SWAP_CONTRACT_ADDRESS', 'swap'))
console.log(
  generateEventTrackingSelectors(abis[SWAP_LEGACY_CONTRACT_ADDRESS], 'SWAP_LEGACY_CONTRACT_ADDRESS', 'swapLegacy'),
)
