import { SWAP_CONTRACT_ADDRESS, abis } from '../../constants'

export const trackSwapSwap = ({ callback, nonce, makerWallet, takerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: SWAP_CONTRACT_ADDRESS,
  abi: abis[SWAP_CONTRACT_ADDRESS],
  name: 'Swap',
  params: { nonce, makerWallet, takerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapCancel = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: SWAP_CONTRACT_ADDRESS,
  abi: abis[SWAP_CONTRACT_ADDRESS],
  name: 'Cancel',
  params: { nonce, makerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapInvalidate = ({ callback, nonce, makerWallet, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: SWAP_CONTRACT_ADDRESS,
  abi: abis[SWAP_CONTRACT_ADDRESS],
  name: 'Invalidate',
  params: { nonce, makerWallet },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapAuthorize = ({
  callback,
  approverAddress,
  delegateAddress,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: SWAP_CONTRACT_ADDRESS,
  abi: abis[SWAP_CONTRACT_ADDRESS],
  name: 'Authorize',
  params: { approverAddress, delegateAddress },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})

export const trackSwapRevoke = ({
  callback,
  approverAddress,
  delegateAddress,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: SWAP_CONTRACT_ADDRESS,
  abi: abis[SWAP_CONTRACT_ADDRESS],
  name: 'Revoke',
  params: { approverAddress, delegateAddress },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swap',
})
