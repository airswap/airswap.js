import { combineReducers } from 'redux'
import { makeEthersTxnReducer, makeEthersTxnSelectors } from '../../utils/redux/templates/ethersTransaction'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const approveToken = makeEthersTxnsReducer('approveToken')
const wrapWeth = makeEthersTxnReducer('wrapWeth')
const unwrapWeth = makeEthersTxnReducer('unwrapWeth')

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
  getTransactionWrapWeth,
  getMinedWrapWeth,
  getTransactionReceiptWrapWeth,
  getErrorMiningWrapWeth,
} = makeEthersTxnSelectors('wrapWeth', 'erc20')

const {
  getSubmittingUnwrapWeth,
  getErrorSubmittingUnwrapWeth,
  getMiningUnwrapWeth,
  getTransactionUnwrapWeth,
  getMinedUnwrapWeth,
  getTransactionReceiptUnwrapWeth,
  getErrorMiningUnwrapWeth,
} = makeEthersTxnSelectors('unwrapWeth', 'erc20')

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
  getTransactionWrapWeth,
  getMinedWrapWeth,
  getTransactionReceiptWrapWeth,
  getErrorMiningWrapWeth,
  getSubmittingUnwrapWeth,
  getErrorSubmittingUnwrapWeth,
  getMiningUnwrapWeth,
  getTransactionUnwrapWeth,
  getMinedUnwrapWeth,
  getTransactionReceiptUnwrapWeth,
  getErrorMiningUnwrapWeth,
}
