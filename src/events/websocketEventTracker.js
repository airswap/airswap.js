const _ = require('lodash')
const ethers = require('ethers')
const blockTracker = require('../blockTracker')
const { alchemyWeb3 } = require('../constants')
const { parseEventLog, fetchLogs } = require('./utils')

const { Interface } = ethers.utils

async function subscribe(contractAddress, abi, topic, fromBlock, callback, parser) {
  const query = {
    address: contractAddress || undefined,
    topics: topic,
  }
  const logParams = _.pickBy(
    {
      ...query,
      fromBlock,
    },
    _.identity,
  )

  const abiInterface = new Interface(abi)
  const subscription = alchemyWeb3.eth.subscribe('logs', logParams, (error, log) => {
    if (error) {
      console.log(error)
    }
    if (parser) {
      callback(parser(parseEventLog(log, abiInterface)))
    } else {
      const parsedEventLog = parseEventLog(log, abiInterface)
      callback([parsedEventLog])
    }
  })

  return subscription
}

class EventTracker {
  constructor() {
    this.trackedEvents = []
  }
  async trackEvent(event) {
    await blockTracker.readyPromise
    const latestBlockNumber = blockTracker.getLatestBlockNumber()
    this.subscribeToEvent(event, latestBlockNumber)
    this.trackedEvents.push(event)
  }
  // eslint-disable-next-line
  fetchHistoricalLogs(
    event,
    contractAddress,
    abi,
    topics,
    fromBlock,
    toBlock,
    callback,
    onFetchingHistoricalEvents = _.identity,
    onFetchedHistoricalEvents = _.identity,
    parser,
  ) {
    onFetchingHistoricalEvents()
    fetchLogs(contractAddress, abi, topics, fromBlock, toBlock, parser).then(events => {
      onFetchedHistoricalEvents(events)
      callback(events)
    })
  }
  subscribeToEvent(event, blockNumber) {
    //eslint-disable-line
    const {
      contract,
      abi,
      callback,
      parser,
      backFillBlockCount,
      fromBlock,
      onFetchingHistoricalEvents,
      onFetchedHistoricalEvents,
    } = event
    let fromBlockNumberOverride

    if (!_.isUndefined(fromBlock)) {
      fromBlockNumberOverride = Number(fromBlock)
    } else if (!_.isUndefined(backFillBlockCount)) {
      fromBlockNumberOverride = blockNumber - Number(backFillBlockCount)
    }

    const topics = this.getEventTopics(event)

    if (fromBlockNumberOverride) {
      this.fetchHistoricalLogs(
        event,
        contract,
        abi,
        topics,
        fromBlockNumberOverride,
        blockNumber,
        callback,
        onFetchingHistoricalEvents,
        onFetchedHistoricalEvents,
        parser,
      )
    }

    subscribe(contract, abi, topics, blockNumber, callback, parser)
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
