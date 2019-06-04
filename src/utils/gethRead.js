const _ = require('lodash')
const ethers = require('ethers')
const uuid = require('uuid')
const WebSocket = require('isomorphic-ws')
const { formatErrorMessage } = require('../utils/transformations')
const { NODESMITH_URL, NODESMITH_KEY, AIRSWAP_GETH_NODE_ADDRESS } = require('../constants')

const nodesmithProvider = new WebSocket(NODESMITH_URL)
const ethersProvider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)
const nodesmithSupported = !!NODESMITH_KEY

const callbacks = {}

const nodesmithOpenPromise = new Promise(resolve => {
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

function fetchBlock(blockNumber) {
  const method = {
    method: 'eth_getBlockByNumber',
    params: [ethers.utils.hexlify(blockNumber), true], // [hex block number, include full transactions boolean]
  }
  return send(method).then(parseBlock)
}

function fetchLatestBlock() {
  const method = {
    method: 'eth_getBlockByNumber',
    params: ['latest', true], // [hex block number, include full transactions boolean]
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

class BlockTracker {
  constructor(onBlock, interval = 3000) {
    this.interval = interval
    this.onBlock = onBlock || _.identity
    this.blocks = {}
    this.init()
  }
  async init() {
    const block = await fetchLatestBlock(true)
    this.blocks[block.number] = block
    this.onBlock(block)
    this.pollForNextBlock()
  }
  getSortedBlocks() {
    return _.sortBy(_.values(this.blocks), 'number')
  }
  async pollForNextBlock() {
    const currentBlockNumber = _.get(_.last(this.getSortedBlocks()), 'number')
    let block
    try {
      block = await fetchBlock(currentBlockNumber + 1)
      if (block) {
        this.blocks[block.number] = block
        this.onBlock(block)
      }
    } catch (e) {
      console.log(`didnt get block (threw error) ${currentBlockNumber}`, e)
    }
    setTimeout(this.pollForNextBlock.bind(this), this.interval)
  }
}

function hexToInt(hexInt) {
  return Number.parseInt(hexInt, 16)
}

module.exports = { fetchBlock, getLogs, BlockTracker }
