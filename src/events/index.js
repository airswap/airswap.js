const HttpProvider = require('ethjs-provider-http')
const BlockTracker = require('eth-block-tracker')
const _ = require('lodash')
const ethers = require('ethers')
const {
  AST_CONTRACT_ADDRESS, //eslint-disable-line
  ERC20abi,
  AIRSWAP_GETH_NODE_ADDRESS,
  abis,
  EXCHANGE_CONTRACT_ADDRESS,
  RESERVE_CONTRACT_ABI,
} = require('../constants')
const { getLogs } = require('../utils/gethRead')

const provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

const queries = {}

async function fetchLogs(contractAddress, abi, topic, fromBlock, toBlock) {
  const toBlockOverride = toBlock || (await provider.getBlockNumber())
  const fromBlockOverride = fromBlock || Number(toBlockOverride) - 250 // default is around 1 day of blocks
  const query = {
    address: contractAddress || undefined,
    topics: topic ? [topic] : undefined,
  }

  let logs
  try {
    logs = await getLogs([
      {
        ...query,
        fromBlock: ethers.utils.hexlify(fromBlockOverride),
        toBlock: ethers.utils.hexlify(toBlockOverride),
      },
    ])
  } catch (e) {
    console.log('error fetching logs from geth', e)
    return
  }

  return parseEventLogs(logs, abi)
}

function parseEventLogs(logs, abi) {
  const abiInterface = new ethers.utils.Interface(abi)
  return _.compact(
    logs.map(log => {
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

async function fetchAndPollLogs(successCallback, failureCallback, contractAddress, abi, topic, fromBlock) {
  fetchLogs(contractAddress, abi, topic, fromBlock)
    .then(batchLogs => {
      successCallback(batchLogs)
      pollLogs(successCallback, failureCallback, contractAddress, abi, topic)
    })
    .catch(e => failureCallback(e))
}

function fetchReserveLogs(reserveAddress, eventName, fromBlock, toBlock) {
  const abiInterface = new ethers.utils.Interface(RESERVE_CONTRACT_ABI)
  const topic = eventName ? abiInterface.events[eventName].topic : null
  return fetchLogs(reserveAddress, RESERVE_CONTRACT_ABI, topic, fromBlock, toBlock)
}

function fetchExchangeLogs(eventName, fromBlock, toBlock) {
  const abiInterface = new ethers.utils.Interface(abis[EXCHANGE_CONTRACT_ADDRESS])
  const topic = eventName ? abiInterface.events[eventName].topic : null
  return fetchLogs(EXCHANGE_CONTRACT_ADDRESS, abis[EXCHANGE_CONTRACT_ADDRESS], topic, fromBlock, toBlock)
}

function fetchERC20Logs(contractAddress, eventName, fromBlock, toBlock) {
  const abiInterface = new ethers.utils.Interface(ERC20abi)
  const topic = eventName ? abiInterface.events[eventName].topic : null
  return fetchLogs(contractAddress, ERC20abi, topic, fromBlock, toBlock)
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

const httpProvider = new HttpProvider(AIRSWAP_GETH_NODE_ADDRESS)
const blockTracker = new BlockTracker({
  provider: httpProvider,
  syncingTimeout: 20 * 60 * 1e3,
})

blockTracker.on('block', block => processNewBlock(block))
blockTracker.start()

function processNewBlock(block) {
  const blockNumber = parseInt(block.number, 16)
  const fromBlock = blockNumber
  const toBlock = blockNumber
  _.mapValues(queries, async ({ query: { contractAddress, abi, topic }, successCallback, failureCallback }) => {
    if (
      contractAddress &&
      !_.find(block.transactions, ({ to }) => (to || '').toLowerCase() === contractAddress.toLowerCase())
    ) {
      return
    }

    fetchLogs(contractAddress, abi, topic, fromBlock, toBlock)
      .then(logs => successCallback(logs))
      .catch(e => failureCallback(e))
  })
}

export { fetchLogs, pollLogs, fetchAndPollLogs, fetchReserveLogs, fetchExchangeLogs, fetchERC20Logs }
