// This file is generated code, edits will be overwritten
const { fetchLogs, getEventTopics } = require('../events/utils')
const abi = require('../abis/swapLight.json')
const constants = require('../constants')

const fetchSwapLightAuthorizeLogs = ({ signerAddress, signerWallet, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'Authorize', params: { signerAddress, signerWallet } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

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

const fetchSwapLightOwnershipTransferredLogs = ({
  previousOwner,
  newOwner,
  fromBlock,
  toBlock,
  parser,
  provider,
} = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'OwnershipTransferred', params: { previousOwner, newOwner } }),
    fromBlock,
    toBlock,
    parser,
    provider,
  )

const fetchSwapLightRevokeLogs = ({ signer, signerWallet, fromBlock, toBlock, parser, provider } = {}) =>
  fetchLogs(
    constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    getEventTopics({ abi, name: 'Revoke', params: { signer, signerWallet } }),
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

module.exports = {
  fetchSwapLightAuthorizeLogs,
  fetchSwapLightCancelLogs,
  fetchSwapLightOwnershipTransferredLogs,
  fetchSwapLightRevokeLogs,
  fetchSwapLightSwapLogs,
}
