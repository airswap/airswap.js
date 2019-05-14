import { combineReducers } from 'redux'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const fillOrder = makeEthersTxnsReducer('fillOrder')

export default combineReducers({
  fillOrder,
})

const {
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
} = makeEthersTxnsSelectors('fillOrder', 'airswapExchange')

export const selectors = {
  getSubmittingFillOrder,
  getErrorSubmittingFillOrder,
  getMiningFillOrder,
  getTransactionsFillOrder,
  getMinedFillOrder,
  getTransactionReceiptsFillOrder,
  getErrorMiningFillOrder,
}
