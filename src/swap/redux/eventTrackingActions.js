const abi = require('../../abis/Swap.json')
const constants = require('../../constants')

export const trackSwapSwap = ({ callback, nonce, makerWallet, takerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Swap',
  params: { nonce, makerWallet, takerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancel = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Cancel',
  params: { nonce, makerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapInvalidate = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Invalidate',
  params: { nonce, makerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapAuthorize = ({ callback, approver, delegate, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Authorize',
  params: { approver, delegate },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapRevoke = ({ callback, approver, delegate, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Revoke',
  params: { approver, delegate },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})
