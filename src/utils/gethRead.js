const _ = require('lodash')
const ethers = require('ethers')
const uuid = require('uuid')
const WebSocket = require('isomorphic-ws')
const { formatErrorMessage } = require('../utils/transformations')
const { NODESMITH_URL, NODESMITH_KEY, AIRSWAP_GETH_NODE_ADDRESS } = require('../constants')

const ethersProvider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

const nodesmithSupported = !!NODESMITH_KEY
const callbacks = {}
let nodesmithProvider
let nodesmithOpenPromise
if (nodesmithSupported) {
  nodesmithProvider = new WebSocket(NODESMITH_URL)
  nodesmithOpenPromise = new Promise(resolve => {
    nodesmithProvider.onopen = () => {
      resolve()
    }
  })
  nodesmithProvider.onmessage = msg => {
    const message = JSON.parse(msg.data)
    const { resolve, reject } = callbacks[message.id]
    if (message.error) {
      reject(formatErrorMessage(message.error))
    } else {
      resolve(message.result)
    }
  }
}

async function send({ method, params }) {
  if (nodesmithSupported) {
    await nodesmithOpenPromise
    return new Promise((resolve, reject) => {
      const id = uuid()
      callbacks[id] = { resolve, reject }
      nodesmithProvider.send(
        JSON.stringify({
          jsonrpc: '2.0',
          method,
          params,
          id,
        }),
      )
    })
  }
  return ethersProvider.send(method, params)
}

function fetchBlock(blockNumber, includeFullTransactions = true) {
  const method = {
    method: 'eth_getBlockByNumber',
    params: [ethers.utils.hexlify(blockNumber), includeFullTransactions], // [hex block number, include full transactions boolean]
  }
  return send(method).then(parseBlock)
}

function fetchLatestBlock(includeFullTransactions = true) {
  const method = {
    method: 'eth_getBlockByNumber',
    params: ['latest', includeFullTransactions], // [hex block number, include full transactions boolean]
  }
  return send(method).then(parseBlock)
}

function parseBlock(block) {
  if (!block) {
    return block
  }
  const numberFields = _.mapValues(_.pick(block, ['number', 'timestamp']), hexToInt)
  return {
    ...block,
    ...numberFields,
    transactions: block.transactions.map(parseTransaction),
  }
}

function parseTransaction(transaction) {
  if (_.isString(transaction)) {
    return transaction
  }
  const numberFields = _.mapValues(_.pick(transaction, ['gas', 'gasPrice', 'transactionIndex', 'value']), hexToInt)
  return {
    ...transaction,
    ...numberFields,
  }
}

function getLogs(params) {
  const method = {
    method: 'eth_getLogs',
    params,
  }
  return send(method)
}

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16)
}

async function call(txObj) {
  const method = {
    method: 'eth_call',
    params: [txObj, 'latest'],
  }
  return send(method)
}

module.exports = { fetchBlock, fetchLatestBlock, getLogs, call }
