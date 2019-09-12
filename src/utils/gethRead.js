const _ = require('lodash')
const ethers = require('ethers')
const uuid = require('uuid4')
const WebSocket = require('isomorphic-ws')
const { formatErrorMessage } = require('../utils/transformations')
const { NODESMITH_URL, NODESMITH_KEY, alchemyWeb3 } = require('../constants')

const nodesmithSupported = !!NODESMITH_KEY
const callbacks = {}
let nodesmithProvider
let nodesmithOpenPromise

async function initializeNodesmith() {
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
  nodesmithProvider.onclose = evt => {
    console.error('nodesmith websocket closed', evt)
  }

  nodesmithProvider.onerror = evt => {
    console.error('nodesmith websocket closed', evt)
  }
}

if (nodesmithSupported) {
  initializeNodesmith()
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

  return alchemyWeb3.currentProvider.send(method, params)
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

function fetchCurrentBlockNumber() {
  const method = {
    method: 'eth_blockNumber',
    params: [],
  }
  return send(method).then(hexToInt)
}

function fetchPendingBlock(includeFullTransactions = true) {
  const method = {
    method: 'eth_getBlockByNumber',
    params: ['pending', includeFullTransactions], // [hex block number, include full transactions boolean]
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

async function call(txObj, blockTag = 'latest') {
  const method = {
    method: 'eth_call',
    params: [txObj, blockTag],
  }
  return send(method)
}

module.exports = {
  fetchBlock,
  fetchLatestBlock,
  getLogs,
  call,
  fetchPendingBlock,
  fetchCurrentBlockNumber,
  alchemyWeb3,
}
