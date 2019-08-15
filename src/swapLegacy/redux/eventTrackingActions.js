const { abis, SWAP_LEGACY_CONTRACT_ADDRESS } = require('../../constants')

export const trackSwapLegacyFilled = ({
  callback,
  makerAddress,
  makerToken,
  takerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: SWAP_LEGACY_CONTRACT_ADDRESS,
  abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
  name: 'Filled',
  params: { makerAddress, makerToken, takerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLegacy',
})

export const trackSwapLegacyCanceled = ({
  callback,
  makerAddress,
  makerToken,
  takerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: SWAP_LEGACY_CONTRACT_ADDRESS,
  abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
  name: 'Canceled',
  params: { makerAddress, makerToken, takerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLegacy',
})

export const trackSwapLegacyFailed = ({
  callback,
  makerAddress,
  makerToken,
  takerToken,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: SWAP_LEGACY_CONTRACT_ADDRESS,
  abi: abis[SWAP_LEGACY_CONTRACT_ADDRESS],
  name: 'Failed',
  params: { makerAddress, makerToken, takerToken },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'swapLegacy',
})
