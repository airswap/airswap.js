// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abiMapping/indexer.js')
const constants = require('../constants')

const trackIndexerAddTokenToBlacklist = ({ callback, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'AddTokenToBlacklist',
    params: {},
    fromBlock,
    backFillBlockCount,
    topic: '0xe53b519de693da0496205f0705fa49c937a9045cb26b6f67711cd22051955401',
    namespace: 'indexer',
    parser,
  })

const trackIndexerCreateIndex = ({ callback, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'CreateIndex',
    params: {},
    fromBlock,
    backFillBlockCount,
    topic: '0xb9df3a00fbc06a855c8b21697886482e3df2bb8e1e7f6872ce00d50b69700051',
    namespace: 'indexer',
    parser,
  })

const trackIndexerOwnershipTransferred = ({
  callback,
  previousOwner,
  newOwner,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'OwnershipTransferred',
    params: { previousOwner, newOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    namespace: 'indexer',
    parser,
  })

const trackIndexerRemoveTokenFromBlacklist = ({ callback, fromBlock, backFillBlockCount, parser } = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'RemoveTokenFromBlacklist',
    params: {},
    fromBlock,
    backFillBlockCount,
    topic: '0xa1f26e166f408721b7578234199103d95e0aea4308d683b2f6c0ec86ac9e9e73',
    namespace: 'indexer',
    parser,
  })

const trackIndexerStake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'Stake',
    params: { staker, signerToken, senderToken },
    fromBlock,
    backFillBlockCount,
    topic: '0xc5017594d2723c038bb216e5bcef3ac65910ade839c0e63253bf5b59efbf0fd7',
    namespace: 'indexer',
    parser,
  })

const trackIndexerUnstake = ({
  callback,
  staker,
  signerToken,
  senderToken,
  fromBlock,
  backFillBlockCount,
  parser,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.INDEXER_CONTRACT_ADDRESS,
    abi,
    name: 'Unstake',
    params: { staker, signerToken, senderToken },
    fromBlock,
    backFillBlockCount,
    topic: '0x2cbcd809a4c90d11f8d12c4b6d09986b255ae1e68f54f076c145fbb2185904e1',
    namespace: 'indexer',
    parser,
  })

module.exports = {
  trackIndexerAddTokenToBlacklist,
  trackIndexerCreateIndex,
  trackIndexerOwnershipTransferred,
  trackIndexerRemoveTokenFromBlacklist,
  trackIndexerStake,
  trackIndexerUnstake,
}
