const _ = require('lodash')
const ethers = require('ethers')
const blockTracker = require('../blockTracker')
const { fetchLogs } = require('./utils')

class EventTracker {
  constructor() {
    this.trackedEvents = []
    blockTracker.onBlock(block => this.processBlock(block))
  }
  async trackEvent(event) {
    await blockTracker.readyPromise
    const latestBlockNumber = blockTracker.getLatestBlockNumber()
    this.backFillEvent(event, latestBlockNumber)
    this.trackedEvents.push(event)
  }
  processBlock({ number }) {
    if (!this.trackedEvents.length) {
      return
    }
    this.trackedEvents.map(event => this.processEvent(event, number))
  }
  backFillEvent(event, blockNumber) {
    //eslint-disable-line
    const { contract, abi, callback, parser, backFillBlockCount, fromBlock } = event
    let fromBlockNumberOverride
    if (!_.isUndefined(fromBlock)) {
      fromBlockNumberOverride = Number(fromBlock)
    } else if (!_.isUndefined(backFillBlockCount)) {
      fromBlockNumberOverride = blockNumber - Number(backFillBlockCount)
    } else {
      fromBlockNumberOverride = blockNumber
    }
    const topics = this.getEventTopics(event)
    fetchLogs(contract, abi, topics, fromBlockNumberOverride, blockNumber).then(logs => {
      callback(parser ? parser(logs) : logs)
    })
  }
  processEvent(event, blockNumber) {
    //eslint-disable-line
    const { contract, abi, callback, parser } = event
    const topics = this.getEventTopics(event)
    fetchLogs(contract, abi, topics, blockNumber, blockNumber).then(logs => {
      callback(parser ? parser(logs) : logs)
    })
  }
  // eslint-disable-next-line
  getEventTopics({ name, params: paramsInputs, abi }) {
    const params = paramsInputs || {} // default to empty object if undefined
    const abiInterface = new ethers.utils.Interface(abi)
    const { events } = abiInterface
    const abiEvent = events[name]
    if (!abiEvent) {
      throw new Error(
        `${name} not an abi event, possible events are ${_.uniq(_.map(_.values(events), 'name')).join(', ')}`,
      )
    }
    const paramsArray = abiEvent.inputs.map(
      ({ name: inputName }) => (_.isUndefined(params[inputName]) ? null : params[inputName]),
    )
    return abiEvent.encodeTopics(paramsArray)
  }
}

const eventTracker = new EventTracker()

// USAGE
/*
eventTracker.trackEvent({
  contract: SWAP_LEGACY_CONTRACT_ADDRESS, // optional, the contract that emitted the event. If left out, all events matching that signature will be tracked (for all contracts).
  name: 'Filled', // required, the name of the event emitted by the contract
  params: {
    // optional, indexed params emitted by the contract
    takerToken: '0xdead0717b16b9f56eb6e308e4b29230dc0eee0b6',
  },
  abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS], // required, abi of the contract
  callback: logs => console.log(logs),
  backFillBlockCount: 7000, // optional, if included, first callback execution will include that many blocks BEFORE the current block
})
*/

module.exports = eventTracker
