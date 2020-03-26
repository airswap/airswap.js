const ethers = require('ethers')
const _ = require('lodash')
const { getLogs } = require('../utils/gethRead')

function getProviderLogs(params, provider) {
  const method = {
    method: 'eth_getLogs',
    params,
  }
  return provider.send(method)
}

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

  const parsedLogValues = _.mapValues(parsedLog.values, v => {
    let stringVal = (v.toString ? v.toString() : v) || ''
    stringVal = _.startsWith(stringVal, '0x') ? stringVal.toLowerCase() : stringVal
    return stringVal
  }) // converts bignumbers to strings and lowercases everything (most importantly addresses)
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

async function fetchLogs(contractAddress, abi, topic, fromBlock, toBlock, parser, provider) {
  const query = {
    address: contractAddress || undefined,
    topics: _.isArray(topic) ? topic : [topic],
  }

  let logs
  const logParams = [
    {
      ...query,
      fromBlock: fromBlock ? hexStripZeros(hexlify(fromBlock)) : 'latest',
      toBlock: toBlock ? hexStripZeros(hexlify(toBlock)) : 'latest',
    },
  ]

  try {
    logs = await (provider ? getProviderLogs(logParams, provider) : getLogs(logParams))
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

function getEventTopics({ name, params: paramsInputs, abi }) {
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

module.exports = { getEventId, parseEventLog, fetchLogs, getEventTopics }
