// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/swapLight.json')
const constants = require('../constants')

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

const trackSwapLightCancelUpTo = ({
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
    name: 'CancelUpTo',
    params: { nonce, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x863123978d9b13946753a916c935c0688a01802440d3ffc668d04d2720c4e110',
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
    topic: '0x9f1d00aae6343e4c7249c1b2a238d90e17da251781cc060e008a0dcf7ee0e725',
    namespace: 'swapLight',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackSwapLightCancel, trackSwapLightCancelUpTo, trackSwapLightSwap }
