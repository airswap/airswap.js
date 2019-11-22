// This file is generated code, edits will be overwritten
const eventTracker = require('../events/websocketEventTracker')
const abi = require('../abis/delegateFactory.json')
const constants = require('../constants')

const trackDelegateFactoryCreateDelegate = ({
  callback,
  delegateContract,
  delegateContractOwner,
  fromBlock,
  backFillBlockCount,
  parser,
  onFetchingHistoricalEvents,
  onFetchedHistoricalEvents,
} = {}) =>
  eventTracker.trackEvent({
    callback,
    contract: constants.DELEGATE_FACTORY_CONTRACT_ADDRESS,
    abi,
    name: 'CreateDelegate',
    params: { delegateContract, delegateContractOwner },
    fromBlock,
    backFillBlockCount,
    topic: '0xff8beab89e8c26a642d622a3afc4cddcb2f06b35a39b280a98b1f7a465080115',
    namespace: 'delegateFactory',
    parser,
    onFetchingHistoricalEvents,
    onFetchedHistoricalEvents,
  })

module.exports = { trackDelegateFactoryCreateDelegate }
