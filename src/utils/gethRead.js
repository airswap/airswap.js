const _ = require('lodash')
//  ethers = require('ethers')
const { web3Provider, ethersProvider, NO_ALCHEMY_WEBSOCKETS } = require('../constants')

async function send({ method, params }, provider) {
  if (provider) {
    return provider.send(method, params)
  }
  return NO_ALCHEMY_WEBSOCKETS ? ethersProvider.send(method, params) : web3Provider.currentProvider.send(method, params)
}

function fetchBlock(blockNumber, includeFullTransactions = true) {
  // const method = {
  //   method: 'eth_getBlockByNumber',
  //   params: [ethers.utils.hexlify(blockNumber), includeFullTransactions], // [hex block number, include full transactions boolean]
  // }
  return web3Provider.eth.getBlock(blockNumber, includeFullTransactions) // send(method).then(parseBlock)
}

function fetchLatestBlock(includeFullTransactions = true) {
  // const method = {
  //   method: 'eth_getBlockByNumber',
  //   params: ['latest', includeFullTransactions], // [hex block number, include full transactions boolean]
  // }
  return web3Provider.eth.getBlock('latest', includeFullTransactions) // send(method).then(parseBlock)
}

function fetchCurrentBlockNumber() {
  // const method = {
  //   method: 'eth_blockNumber',
  //   params: [],
  // }
  return web3Provider.eth.getBlockNumber()
  // send(method)
  //   .then(res => hexToInt(res))
  //   .catch(res => res)
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

function getLogs([params]) {
  // const method = {
  //   method: 'eth_getLogs',
  //   params,
  // }
  return web3Provider.eth.getPastLogs(params) // send(method)
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
  web3Provider,
}

fetchCurrentBlockNumber()
