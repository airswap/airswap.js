import _ from 'lodash'
import { createSelector } from 'reselect'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { WRAPPER_CONTRACT_ADDRESS, WETH_CONTRACT_ADDRESS } from '../../constants'
import { getERC20ApprovalEvents } from './eventTrackingSelectors'

export const getERC20Approvals = createSelector(getERC20ApprovalEvents, events => {
  const approvals = events.map(({ values: { owner, spender, value }, address }) =>
    _.mapValues({ owner, spender, value, contractAddress: address }, s => s.toLowerCase()),
  )

  return _.reduce(
    approvals,
    (agg, { owner, spender, value, contractAddress }) => {
      const approved = Number(value) > 0
      return _.merge({}, agg, { [owner]: { [spender]: { [contractAddress]: approved } } })
    },
    {},
  )
})

export const getConnectedERC20Approvals = createSelector(
  getERC20Approvals,
  getConnectedWalletAddress,
  (approvals, walletAddress) => _.get(approvals, walletAddress),
)

export const getConnectedWrapperWethApproval = createSelector(getConnectedERC20Approvals, connectedApprovals =>
  _.get(connectedApprovals, `${WRAPPER_CONTRACT_ADDRESS}.${WETH_CONTRACT_ADDRESS}`),
)
