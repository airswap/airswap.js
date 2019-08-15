const _ = require('lodash')
const ethers = require('ethers')
const blockTracker = require('../blockTracker')
const { getLogs } = require('../utils/gethRead')

const { hexlify, hexStripZeros } = ethers.utils

async function fetchLogs(contractAddress, abi, topic, fromBlock, toBlock, parse = true) {
  const query = {
    address: contractAddress || undefined,
    topics: topic,
  }

  let logs
  const logParams = [
    {
      ...query,
      fromBlock: hexStripZeros(hexlify(fromBlock)),
      toBlock: hexStripZeros(hexlify(toBlock)),
    },
  ]

  try {
    logs = await getLogs(logParams)
  } catch (e) {
    console.log('error fetching logs from geth', e, logParams)
    return
  }

  return parse ? parseEventLogs(logs, abi) : logs
}

const abiInterfaces = {}

function parseEventLogs(logs, abi) {
  return _.compact(
    logs.map(log => {
      let abiInterface
      if (abiInterfaces[log.address]) {
        abiInterface = abiInterfaces[log.address]
      } else {
        abiInterface = new ethers.utils.Interface(abi)
        abiInterfaces[log.address] = abiInterface
      }
      let parsedLog
      try {
        parsedLog = abiInterface.parseLog(log)
      } catch (e) {
        // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
        return null
      }

      const parsedLogValues = _.mapValues(parsedLog.values, v => ((v.toString ? v.toString() : v) || '').toLowerCase()) // converts bignumbers to strings and lowercases everything (most importantly addresses)
      const argumentRange = _.range(Number(parsedLogValues.length)).map(p => p.toString())
      const formattedLogValues = _.pickBy(
        parsedLogValues,
        (param, key) => !_.includes(argumentRange, key) && key !== 'length', // removes some extra junk ethers puts in the parsed logs
      )
      const { address, topics, data, blockNumber, transactionHash, removed, transactionIndex, logIndex } = log
      const { name, signature, topic } = parsedLog
      return {
        ...{
          address,
          topics,
          data,
          blockNumber: ethers.utils.bigNumberify(blockNumber).toNumber(),
          transactionIndex: ethers.utils.bigNumberify(transactionIndex).toNumber(),
          logIndex: ethers.utils.bigNumberify(logIndex).toNumber(),
          transactionHash,
          removed,
        },
        ...{ name, signature, topic },
        values: formattedLogValues,
      }
    }),
  )
}

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
