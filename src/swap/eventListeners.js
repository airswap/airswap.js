// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/Swap.json')
const constants = require('../constants')

const trackSwapAuthorizeSender = ({
  callback,
  authorizerAddress,
  authorizedSender,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'AuthorizeSender',
    params: { authorizerAddress, authorizedSender },
    fromBlock,
    backFillBlockCount,
    topic: '0xbe9299809b40c2eeb1ae326da30a511c24d70cbe3cd4ff384e4839b91de3b325',
    namespace: 'swap',
    parser,
  })

const trackSwapAuthorizeSigner = ({
  callback,
  authorizerAddress,
  authorizedSigner,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'AuthorizeSigner',
    params: { authorizerAddress, authorizedSigner },
    fromBlock,
    backFillBlockCount,
    topic: '0xb9bdd0621c52f9a047fe2a048fa04cdf987438d068ac524be8ea382aa3e94d2c',
    namespace: 'swap',
    parser,
  })

const trackSwapCancel = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Cancel',
    params: { nonce, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    namespace: 'swap',
    parser,
  })

const trackSwapInvalidate = ({ callback, nonce, signerWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Invalidate',
    params: { nonce, signerWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0x13271a4112377cb8d98566817cc69dc66ed3ee25fdcea309a9f6696475640b78',
    namespace: 'swap',
    parser,
  })

const trackSwapRevokeSender = ({
  callback,
  authorizerAddress,
  revokedSender,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'RevokeSender',
    params: { authorizerAddress, revokedSender },
    fromBlock,
    backFillBlockCount,
    topic: '0x92b544a2f54114da47550f9ee5b45cc343e5db8bfd148a7aba43219e33fceccd',
    namespace: 'swap',
    parser,
  })

const trackSwapRevokeSigner = ({
  callback,
  authorizerAddress,
  revokedSigner,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'RevokeSigner',
    params: { authorizerAddress, revokedSigner },
    fromBlock,
    backFillBlockCount,
    topic: '0xfe558292b85125b7cf178f3456b09ce2fa79ca4b4fe2d7bb5da670ffecdb765e',
    namespace: 'swap',
    parser,
  })

const trackSwapSwap = ({ callback, nonce, signerWallet, senderWallet, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.SWAP_CONTRACT_ADDRESS,
    abi,
    name: 'Swap',
    params: { nonce, signerWallet, senderWallet },
    fromBlock,
    backFillBlockCount,
    topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e',
    namespace: 'swap',
    parser,
  })

module.exports = {
  trackSwapAuthorizeSender,
  trackSwapAuthorizeSigner,
  trackSwapCancel,
  trackSwapInvalidate,
  trackSwapRevokeSender,
  trackSwapRevokeSigner,
  trackSwapSwap,
}
