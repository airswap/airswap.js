import { combineReducers } from 'redux'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const fillOrder = makeEthersTxnsReducer('fillOrder')
const cancelOrder = makeEthersTxnsReducer('cancelOrder')

export default combineReducers({
  fillOrder,
  cancelOrder,
})

const {
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
} = makeEthersTxnsSelectors('fillOrder', 'swapLegacy')

const {
  getSubmittingCancelOrder,
  getErrorSubmittingCancelOrder,
  getMiningCancelOrder,
  getTransactionsCancelOrder,
  getMinedCancelOrder,
  getTransactionReceiptsCancelOrder,
  getErrorMiningCancelOrder,
} = makeEthersTxnsSelectors('cancelOrder', 'swapLegacy')

export const selectors = {
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
  getSubmittingCancelOrder,
  getErrorSubmittingCancelOrder,
  getMiningCancelOrder,
  getTransactionsCancelOrder,
  getMinedCancelOrder,
  getTransactionReceiptsCancelOrder,
  getErrorMiningCancelOrder,
}
