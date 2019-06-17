import { combineReducers } from 'redux'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const approveToken = makeEthersTxnsReducer('approveToken')
const wrapWeth = makeEthersTxnsReducer('wrapWeth')
const unwrapWeth = makeEthersTxnsReducer('unwrapWeth')

export default combineReducers({
  approveToken,
  wrapWeth,
  unwrapWeth,
})

const {
  getSubmittingApproveToken,
  getErrorSubmittingApproveToken,
  getMiningApproveToken,
  getTransactionsApproveToken,
  getMinedApproveToken,
  getTransactionReceiptsApproveToken,
  getErrorMiningApproveToken,
} = makeEthersTxnsSelectors('approveToken', 'erc20')

const {
  getSubmittingWrapWeth,
  getErrorSubmittingWrapWeth,
  getMiningWrapWeth,
  getTransactionsWrapWeth,
  getMinedWrapWeth,
  getTransactionReceiptsWrapWeth,
  getErrorMiningWrapWeth,
} = makeEthersTxnsSelectors('wrapWeth', 'erc20')

const {
  getSubmittingUnwrapWeth,
  getErrorSubmittingUnwrapWeth,
  getMiningUnwrapWeth,
  getTransactionsUnwrapWeth,
  getMinedUnwrapWeth,
  getTransactionReceiptsUnwrapWeth,
  getErrorMiningUnwrapWeth,
} = makeEthersTxnsSelectors('unwrapWeth', 'erc20')

export const selectors = {
  getSubmittingApproveToken,
  getErrorSubmittingApproveToken,
  getMiningApproveToken,
  getTransactionsApproveToken,
  getMinedApproveToken,
  getTransactionReceiptsApproveToken,
  getErrorMiningApproveToken,
  getSubmittingWrapWeth,
  getErrorSubmittingWrapWeth,
  getMiningWrapWeth,
  getTransactionsWrapWeth,
  getMinedWrapWeth,
  getTransactionReceiptsWrapWeth,
  getErrorMiningWrapWeth,
  getSubmittingUnwrapWeth,
  getErrorSubmittingUnwrapWeth,
  getMiningUnwrapWeth,
  getTransactionsUnwrapWeth,
  getMinedUnwrapWeth,
  getTransactionReceiptsUnwrapWeth,
  getErrorMiningUnwrapWeth,
}
