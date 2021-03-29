// This file is generated code, edits will be overwritten
const abi = require('../../abis/swapLight.json')
const constants = require('../../constants')

export const trackSwapLightAuthorize = ({
  callback,
  signerAddress,
  signerWallet,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  abi,
  name: 'Authorize',
  params: { signerAddress, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLight',
})

export const trackSwapLightCancel = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  abi,
  name: 'Cancel',
  params: { nonce, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLight',
})

export const trackSwapLightOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  abi,
  name: 'OwnershipTransferred',
  params: { previousOwner, newOwner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLight',
})

export const trackSwapLightRevoke = ({ callback, signer, signerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  abi,
  name: 'Revoke',
  params: { signer, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLight',
})

export const trackSwapLightSwap = ({
  callback,
  nonce,
  signerWallet,
  senderWallet,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
  abi,
  name: 'Swap',
  params: { nonce, signerWallet, senderWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLight',
})
