// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/delegate.json')

const trackDelegateOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'delegate',
    parser,
  })

const trackDelegateSetRule = ({
  callback,
  ruleOwner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'SetRule',
    params: { ruleOwner, senderToken, signerToken },
    fromBlock,
    backFillBlockCount,
    topic: '0xeef1056edebc4703267ec0a6f9845851c98be3eefddf0eb8927e7de6b2732e8e',
    namespace: 'delegate',
    parser,
  })

const trackDelegateUnsetRule = ({
  callback,
  ruleOwner,
  senderToken,
  signerToken,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    abi,
    name: 'UnsetRule',
    params: { ruleOwner, senderToken, signerToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x8a5de2720528dbd2e4fe17889175d99555344219a0e2ef60298dc68801f57c98',
    namespace: 'delegate',
    parser,
  })

module.exports = { trackDelegateOwnershipTransferred, trackDelegateSetRule, trackDelegateUnsetRule }
