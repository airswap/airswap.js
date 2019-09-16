import { combineReducers } from 'redux'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const approveToken = makeEthersTxnsReducer('approveToken')

export default combineReducers({
  approveToken,
})

const {
  getSubmittingApproveToken,
  getErrorSubmittingApproveToken,
  getMiningApproveToken,
  getTransactionsApproveToken,
  getMinedApproveToken,
  getTransactionReceiptsApproveToken,
  getErrorMiningApproveToken,
} = makeEthersTxnsSelectors('approveToken', 'erc721')

export const selectors = {
  getSubmittingApproveERC721: getSubmittingApproveToken,
  getErrorSubmittingApproveERC721: getErrorSubmittingApproveToken,
  getMiningApproveERC721: getMiningApproveToken,
  getTransactionsApproveERC721: getTransactionsApproveToken,
  getMinedApproveERC721: getMinedApproveToken,
  getTransactionReceiptsApproveERC721: getTransactionReceiptsApproveToken,
  getErrorMiningApproveERC721: getErrorMiningApproveToken,
}
