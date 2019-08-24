const _ = require('lodash')
const ethers = require('ethers')
const { httpProvider, ERC20abi, abis, SWAP_LEGACY_CONTRACT_ADDRESS, SWAP_CONTRACT_ADDRESS } = require('../constants')

const { getLogs } = require('../utils/gethRead')

const queries = {}

const { hexlify, hexStripZeros } = ethers.utils

async function fetchLogs(contractAddress, abi, topic, fromBlock, toBlock) {
  const toBlockOverride =
    _.isUndefined(toBlock) || _.isNull(toBlock) ? await httpProvider.getBlockNumber() : Number(toBlock)
  const fromBlockOverride =
    _.isUndefined(fromBlock) || _.isNull(fromBlock) ? Number(toBlockOverride) - 7000 : Number(fromBlock) // default is around 1 day of blocks

  let topicParam
  if (topic) {
    if (_.isArray(topic)) {
      topicParam = topic
    } else {
      topicParam = [topic]
    }
  }

  const query = {
    address: contractAddress || undefined,
    topics: topicParam,
  }

  let logs
  const logParams = [
    {
      ...query,
      fromBlock: hexStripZeros(hexlify(fromBlockOverride)),
      toBlock: hexStripZeros(hexlify(toBlockOverride)),
    },
  ]
  try {
    logs = await getLogs(logParams)
  } catch (e) {
    console.log(`logs not ready for block ${toBlockOverride}, retrying in 1s`)
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          fetchLogs(contractAddress, abi, topic, fromBlock, toBlock)
            .then(resolve)
            .catch(reject),
        1000,
      )
    })
  }

  return parseEventLogs(logs, abi)
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
      const { address, topics, data, blockNumber, transactionHash, removed } = log
      const { name, signature, topic } = parsedLog
      return {
        ...{
          address,
          topics,
          data,
          blockNumber: ethers.utils.bigNumberify(blockNumber).toNumber(),
          transactionHash,
          removed,
        },
        ...{ name, signature, topic },
        values: formattedLogValues,
        parsedLogValues,
      }
    }),
  )
}

async function pollLogs(successCallback, failureCallback, contractAddress, abi, topic) {
  const query = {
    contractAddress,
    abi,
    topic,
  }
  queries[JSON.stringify(query)] = {
    query,
    successCallback,
  }
}

function fetchExchangeLogs(eventName, fromBlock, toBlock) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS])
  const topic = eventName ? abiInterface.events[eventName].topic : null
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topic, fromBlock, toBlock)
}

const swapLegacyContractCreationBlock = `0x${(4349701).toString(16)}`

function fetchFilledExchangeLogsForMakerAddress(makerAddress, fromBlock = swapLegacyContractCreationBlock) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS])
  const topics = abiInterface.events.Filled.encodeTopics([makerAddress.toLowerCase()])
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock)
}

function fetchCanceledExchangeLogsForMakerAddress(makerAddress, fromBlock = swapLegacyContractCreationBlock) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS])
  const topics = abiInterface.events.Canceled.encodeTopics([makerAddress.toLowerCase()])
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock)
}

function fetchFailedExchangeLogsForMakerAddress(makerAddress, fromBlock = swapLegacyContractCreationBlock) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_LEGACY_CONTRACT_ADDRESS])
  const topics = abiInterface.events.Failed.encodeTopics([null, makerAddress.toLowerCase()])
  return fetchLogs(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], topics, fromBlock)
}

function fetchSwapFillsForMakerAddress(makerAddress, fromBlock = 0) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_CONTRACT_ADDRESS])
  const topics = abiInterface.events.Swap.encodeTopics([null, null, makerAddress.toLowerCase()])
  return fetchLogs(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], topics, fromBlock)
}

function fetchSwapCancelsForMakerAddress(makerAddress, fromBlock = 0) {
  const abiInterface = new ethers.utils.Interface(abis[SWAP_CONTRACT_ADDRESS])
  const topics = abiInterface.events.Cancel.encodeTopics([null, makerAddress.toLowerCase()])
  return fetchLogs(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], topics, fromBlock)
}

function fetchERC20Logs(contractAddress, eventName, fromBlock, toBlock) {
  const abiInterface = new ethers.utils.Interface(ERC20abi)
  const topic = eventName ? abiInterface.events[eventName].topic : null
  return fetchLogs(contractAddress, ERC20abi, topic, fromBlock, toBlock)
}

function buildGlobalERC20TransfersTopics(addresses) {
  const erc20ABIInterface = new ethers.utils.Interface(ERC20abi)
  const addressTopics = addresses.map(address =>
    _.last(erc20ABIInterface.events.Transfer.encodeTopics([address.toLowerCase()])),
  )

  const fromTopics = [erc20ABIInterface.events.Transfer.topic, addressTopics, null]
  const toTopics = [erc20ABIInterface.events.Transfer.topic, null, addressTopics]
  return { fromTopics, toTopics }
}

async function fetchGlobalERC20TransfersFrom(addresses, fromBlock, toBlock) {
  const { fromTopics } = buildGlobalERC20TransfersTopics(addresses)
  return fetchLogs(null, ERC20abi, fromTopics, fromBlock, toBlock)
}

async function fetchGlobalERC20TransfersTo(addresses, fromBlock, toBlock) {
  const { toTopics } = buildGlobalERC20TransfersTopics(addresses)
  return fetchLogs(null, ERC20abi, toTopics, fromBlock, toBlock)
}

async function fetchGlobalERC20Transfers(addresses, fromBlock, toBlock) {
  const events = _.flatten(
    await Promise.all([
      fetchGlobalERC20TransfersFrom(addresses, fromBlock, toBlock),
      fetchGlobalERC20TransfersTo(addresses, fromBlock, toBlock),
    ]),
  )
  return _.uniqBy(
    events,
    ({ parsedLogValues, transactionHash }) =>
      `${transactionHash}${parsedLogValues[0]}${parsedLogValues[1]}${parsedLogValues[2]}`, // generates unique id for transfer event, since one transactionHash can have multiple transfers
  )
}

// EXAMPLES
//
// ** fetch all ERC20 Approvals **
// fetchERC20Logs(null, 'Approval')
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch all AST transfers **
// fetchERC20Logs(AST_CONTRACT_ADDRESS, 'Transfer')
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch all Airswap Exchange Contract events  **
// fetchExchangeLogs()
//   .then(console.log)
//   .catch(console.log)
//
// ** fetch global ERC20 transfer events for eth addresses passed in  **
//  fetchGlobalERC20Transfers(['0xDead0717B16b9F56EB6e308E4b29230dc0eEE0B6', '0x1550d41be3651686e1aeeea073d8d403d0bd2e30'])
//   .then(console.log)
//   .catch(console.log)

module.exports = {
  fetchLogs,
  pollLogs,
  fetchExchangeLogs,
  fetchERC20Logs,
  fetchGlobalERC20Transfers,
  buildGlobalERC20TransfersTopics,
  fetchFilledExchangeLogsForMakerAddress,
  fetchCanceledExchangeLogsForMakerAddress,
  fetchFailedExchangeLogsForMakerAddress,
  fetchSwapFillsForMakerAddress,
  fetchSwapCancelsForMakerAddress,
}
