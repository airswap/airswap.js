import { combineReducers } from 'redux'
// import { createSelector } from 'reselect'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'
// import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

const fillSwapSimple = makeEthersTxnsReducer('fillSwapSimple')
const fillSwap = makeEthersTxnsReducer('fillSwap')
const cancelSwap = makeEthersTxnsReducer('cancelSwap')

export default combineReducers({
  fillSwapSimple,
  fillSwap,
  cancelSwap,
})

const {
  getSubmittingFillSwapSimple,
  getErrorSubmittingFillSwapSimple,
  getMiningFillSwapSimple,
  getTransactionsFillSwapSimple,
  getMinedFillSwapSimple,
  getTransactionReceiptsFillSwapSimple,
  getErrorMiningFillSwapSimple,
} = makeEthersTxnsSelectors('fillSwapSimple', 'swap')

const {
  getSubmittingFillSwap,
  getErrorSubmittingFillSwap,
  getMiningFillSwap,
  getTransactionsFillSwap,
  getMinedFillSwap,
  getTransactionReceiptsFillSwap,
  getErrorMiningFillSwap,
} = makeEthersTxnsSelectors('fillSwap', 'swap')

const {
  getSubmittingCancelSwap,
  getErrorSubmittingCancelSwap,
  getMiningCancelSwap,
  getTransactionsCancelSwap,
  getMinedCancelSwap,
  getTransactionReceiptsCancelSwap,
  getErrorMiningCancelSwap,
} = makeEthersTxnsSelectors('cancelSwap', 'swap')

export const selectors = {
  getSubmittingFillSwapSimple,
  getErrorSubmittingFillSwapSimple,
  getMiningFillSwapSimple,
  getTransactionsFillSwapSimple,
  getMinedFillSwapSimple,
  getTransactionReceiptsFillSwapSimple,
  getErrorMiningFillSwapSimple,
  getSubmittingFillSwap,
  getErrorSubmittingFillSwap,
  getMiningFillSwap,
  getTransactionsFillSwap,
  getMinedFillSwap,
  getTransactionReceiptsFillSwap,
  getErrorMiningFillSwap,
  getSubmittingCancelSwap,
  getErrorSubmittingCancelSwap,
  getMiningCancelSwap,
  getTransactionsCancelSwap,
  getMinedCancelSwap,
  getTransactionReceiptsCancelSwap,
  getErrorMiningCancelSwap,
}
