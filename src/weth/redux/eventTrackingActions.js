// This file is generated code, edits will be overwritten
const abi = require('../../abis/WETH_ABI.json')
const constants = require('../../constants')

export const trackWethApproval = ({ callback, owner, spender, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Approval(address,address,uint256)',
  params: { owner, spender },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethTransfer = ({ callback, from, to, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Transfer(address,address,uint256)',
  params: { from, to },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethDeposit = ({ callback, owner, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Deposit(address,uint256)',
  params: { owner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethWithdrawal = ({ callback, owner, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Withdrawal(address,uint256)',
  params: { owner },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})
