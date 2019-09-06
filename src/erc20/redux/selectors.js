import _ from 'lodash'
import { createSelector } from 'reselect'
import * as callDataSelectors from './callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { WRAPPER_CONTRACT_ADDRESS, WETH_CONTRACT_ADDRESS } from '../../constants'

export const getERC20Approvals = createSelector(callDataSelectors.getERC20Allowance, approvals =>
  _.reduce(
    approvals,
    (agg, val) => {
      const approved = Number(val.response) > 0
      const { owner, spender, contractAddress } = val.parameters
      return _.merge({}, agg, { [owner]: { [spender]: { [contractAddress]: approved } } })
    },
    {},
  ),
)

export const getConnectedERC20Approvals = createSelector(
  getERC20Approvals,
  getConnectedWalletAddress,
  (approvals, walletAddress) => _.get(approvals, walletAddress),
)

export const getConnectedWrapperWethApproval = createSelector(getConnectedERC20Approvals, connectedApprovals =>
  _.get(connectedApprovals, `${WRAPPER_CONTRACT_ADDRESS}.${WETH_CONTRACT_ADDRESS}`),
)
