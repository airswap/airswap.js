const ethers = require('ethers')
const _ = require('lodash')

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
}

module.exports = { getEventId, parseEventLog }
