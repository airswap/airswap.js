const ethers = require('ethers')
const _ = require('lodash')
const { getLogs } = require('../utils/gethRead')

function getEventId({ transactionHash, logIndex }) {
  return `${transactionHash}-${logIndex}`
}

function parseEventLog(log, abiInterface) {
  let parsedLog
  try {
    parsedLog = abiInterface.parseLog(log)
  } catch (e) {
    // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
    return null
  }

  if (!parsedLog) {
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
      address: address.toLowerCase(),
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
}

const { hexlify, hexStripZeros } = ethers.utils

async function fetchLogs(contractAddress, abi, topic, fromBlock, toBlock, parser) {
  const query = {
    address: contractAddress || undefined,
    topics: _.isArray(topic) ? topic : [topic],
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
    console.log(`logs not ready for block ${toBlock}, retrying in 1s`, e, logParams)
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          fetchLogs(contractAddress, abi, topic, fromBlock, toBlock, parser)
            .then(resolve)
            .catch(reject),
        1000,
      )
    })
  }
  const parsedEventLogs = parseEventLogs(logs, abi)
  return parser ? parser(parsedEventLogs) : parsedEventLogs
}

const abiInterfaces = {}

function parseEventLogs(logs, abi) {
  if (logs.length === 0) {
    return logs
  }

  const [firstLog] = logs

  let abiInterface
  if (abiInterfaces[firstLog.address]) {
    abiInterface = abiInterfaces[firstLog.address]
  } else {
    abiInterface = new ethers.utils.Interface(abi)
    abiInterfaces[firstLog.address] = abiInterface
  }

  return _.compact(logs.map(log => parseEventLog(log, abiInterface)))
}

module.exports = { getEventId, parseEventLog, fetchLogs }
