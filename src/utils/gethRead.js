const ethers = require('ethers')
const uuid = require('uuid')
const WebSocket = require('isomorphic-ws')
const { formatErrorMessage } = require('../utils/transformations')
const { NODESMITH_URL, NODESMITH_KEY, AIRSWAP_GETH_NODE_ADDRESS } = require('../constants')

const nodesmithProvider = new WebSocket(NODESMITH_URL)
const ethersProvider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)
const nodesmithSupported = !!NODESMITH_KEY

const callbacks = {}

nodesmithProvider.onmessage = msg => {
  const message = JSON.parse(msg.data)
  const { resolve, reject } = callbacks[message.id]
  if (message.error) {
    reject(formatErrorMessage(message.error))
  } else {
    resolve(message.result)
  }
}

function send({ method, params }) {
  if (nodesmithSupported) {
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
    params: [ethers.utils.hexlify(blockNumber), false], // [hex block number, include full transactions boolean]
  }
  return send(method)
}

function getLogs(params) {
  const method = {
    method: 'eth_getLogs',
    params,
  }

  return send(method)
}

module.exports = { fetchBlock, getLogs }
