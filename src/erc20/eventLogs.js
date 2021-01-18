// This file is generated code, edits will be overwritten
const { fetchLogs, getEventTopics } = require('../events/utils')
const abi = require('../abis/hst.json')

const fetchERC20TransferLogs = ({ from, to, contractAddress, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    contractAddress,
    abi,
    getEventTopics({ abi, name: 'Transfer', params: { from, to, contractAddress } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

const fetchERC20ApprovalLogs = ({ owner, spender, contractAddress, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    contractAddress,
    abi,
    getEventTopics({ abi, name: 'Approval', params: { owner, spender, contractAddress } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

module.exports = { fetchERC20TransferLogs, fetchERC20ApprovalLogs }
