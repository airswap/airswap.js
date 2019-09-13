// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/Swap.json')
const constants = require('../constants')

const trackSwapSwap = ({ callback, nonce, makerWallet, takerWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Swap',
    params: { nonce, makerWallet, takerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e',
    namespace: 'swap',
    parser,
  })

const trackSwapCancel = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Cancel',
    params: { nonce, makerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    namespace: 'swap',
    parser,
  })

const trackSwapInvalidate = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Invalidate',
    params: { nonce, makerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x13271a4112377cb8d98566817cc69dc66ed3ee25fdcea309a9f6696475640b78',
    namespace: 'swap',
    parser,
  })

const trackSwapAuthorize = ({ callback, approver, delegate, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Authorize',
    params: { approver, delegate },
    fromBlock,
    backFillBlockCount,
    topic: '0x601f80ed402ea845dc33078b21175993b7e0040de344205a8fd656d7033eb724',
    namespace: 'swap',
    parser,
  })

const trackSwapRevoke = ({ callback, approver, delegate, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Revoke',
    params: { approver, delegate },
    fromBlock,
    backFillBlockCount,
    topic: '0xd7426110292f20fe59e73ccf52124e0f5440a756507c91c7b0a6c50e1eb1a23a',
    namespace: 'swap',
    parser,
  })

module.exports = { trackSwapSwap, trackSwapCancel, trackSwapInvalidate, trackSwapAuthorize, trackSwapRevoke }
