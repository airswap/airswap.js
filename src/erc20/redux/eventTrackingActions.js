const abi = require('../../abis/hst.json')

export const trackERC20Transfer = ({ callback, _from, _to, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Transfer',
  params: { _from, _to },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC20',
})

export const trackERC20Approval = ({ callback, _owner, _spender, fromBlock, backFillBlockCount } = {}) => ({
  callback,
  abi,
  name: 'Approval',
  params: { _owner, _spender },
  fromBlock,
  backFillBlockCount,
  type: 'TRACK_EVENT',
  namespace: 'ERC20',
})
