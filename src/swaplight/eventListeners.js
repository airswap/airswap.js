// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/swapLight.json')
const constants = require('../constants')

const trackSwapLightAuthorize = ({
  callback,
  signerAddress,
  signerWallet,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    name: 'Authorize',
    params: { signerAddress, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x30468de898bda644e26bab66e5a2241a3aa6aaf527257f5ca54e0f65204ba14a',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackSwapLightCancel = ({
  callback,
  nonce,
  signerWallet,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    name: 'Cancel',
    params: { nonce, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackSwapLightOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackSwapLightRevoke = ({
  callback,
  signer,
  signerWallet,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    name: 'Revoke',
    params: { signer, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0xd7426110292f20fe59e73ccf52124e0f5440a756507c91c7b0a6c50e1eb1a23a',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

const trackSwapLightSwap = ({
  callback,
  nonce,
  signerWallet,
  senderWallet,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_LIGHT_CONTRACT_ADDRESS,
    abi,
    name: 'Swap',
    params: { nonce, signerWallet, senderWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = {
  trackSwapLightAuthorize,
  trackSwapLightCancel,
  trackSwapLightOwnershipTransferred,
  trackSwapLightRevoke,
  trackSwapLightSwap,
}
