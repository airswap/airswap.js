// This file is generated code, edits will be overwritten
const { fetchLogs, getEventTopics } = require('../events/utils')
const abi = require('../abis/swapLight.json')
const constants = require('../constants')

const fetchSwapLightCancelLogs = ({ nonce, signerWallet, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'Cancel', params: { nonce, signerWallet } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

const fetchSwapLightCancelUpToLogs = ({ nonce, signerWallet, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'CancelUpTo', params: { nonce, signerWallet } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

const fetchSwapLightSwapLogs = ({ nonce, signerWallet, senderWallet, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'Swap', params: { nonce, signerWallet, senderWallet } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

module.exports = { fetchSwapLightCancelLogs, fetchSwapLightCancelUpToLogs, fetchSwapLightSwapLogs }
