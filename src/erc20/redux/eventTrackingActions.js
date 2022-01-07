// This file is generated code, edits will be overwritten
const abi = require('../../abis/hst.json')

export const trackERC20Transfer = ({ callback, from, to, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Transfer(address,address,uint256)',
  params: { from, to },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC20',
})

export const trackERC20Approval = ({ callback, owner, spender, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Approval(address,address,uint256)',
  params: { owner, spender },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC20',
})
