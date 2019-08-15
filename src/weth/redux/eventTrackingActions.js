const abi = require('../../abis/WETH_ABI.json')
const constants = require('../../constants')

export const trackWethApproval = ({ callback, src, guy, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Approval',
  params: { src, guy },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethTransfer = ({ callback, src, dst, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Transfer',
  params: { src, dst },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethDeposit = ({ callback, dst, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Deposit',
  params: { dst },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})

export const trackWethWithdrawal = ({ callback, src, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  contract: constants.WETH_CONTRACT_ADDRESS,
  abi,
  name: 'Withdrawal',
  params: { src },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'weth',
})
