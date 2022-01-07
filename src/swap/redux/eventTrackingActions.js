// This file is generated code, edits will be overwritten
const abi = require('../../abis/swap.json')
const constants = require('../../constants')

export const trackSwapAuthorizeSender = ({
  callback,
  authorizerAddress,
  authorizedSender,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'AuthorizeSender(address,address)',
  params: { authorizerAddress, authorizedSender },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapAuthorizeSigner = ({
  callback,
  authorizerAddress,
  authorizedSigner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'AuthorizeSigner(address,address)',
  params: { authorizerAddress, authorizedSigner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancel = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'Cancel(uint256,address)',
  params: { nonce, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancelUpTo = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'CancelUpTo(uint256,address)',
  params: { nonce, signerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapRevokeSender = ({
  callback,
  authorizerAddress,
  revokedSender,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'RevokeSender(address,address)',
  params: { authorizerAddress, revokedSender },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapRevokeSigner = ({
  callback,
  authorizerAddress,
  revokedSigner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name: 'RevokeSigner(address,address)',
  params: { authorizerAddress, revokedSigner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapSwap = ({ callback, nonce, signerWallet, senderWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.SWAP_CONTRACT_ADDRESS,
  abi,
  name:
    'Swap(uint256,uint256,address,uint256,uint256,address,address,uint256,uint256,address,address,uint256,uint256,address)',
  params: { nonce, signerWallet, senderWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})
