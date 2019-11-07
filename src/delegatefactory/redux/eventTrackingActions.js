// This file is generated code, edits will be overwritten
const abi = require('../../abis/delegateFactory.json')
const constants = require('../../constants')

export const trackDelegateFactoryCreateDelegate = ({
  callback,
  delegateContract,
  delegateContractOwner,
  fromBlock,
  backFillBlockCount,
} = {}) => ({
  callback,
  contract: constants.DELEGATE_FACTORY_CONTRACT_ADDRESS,
  abi,
  name: 'CreateDelegate',
  params: { delegateContract, delegateContractOwner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'delegateFactory',
})
