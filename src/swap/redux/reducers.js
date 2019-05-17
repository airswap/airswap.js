import { combineReducers } from 'redux'
import { makeEthersTxnsReducer, makeEthersTxnsSelectors } from '../../utils/redux/templates/ethersTransactions'

const swap = makeEthersTxnsReducer('swap')

export default combineReducers({
  swap,
})

const {
  getSubmittingSwap,
  getErrorSubmittingSwap,
  getMiningSwap,
  getTransactionsSwap,
  getMinedSwap,
  getTransactionReceiptsSwap,
  getErrorMiningSwap,
} = makeEthersTxnsSelectors('swap', 'swap')

export const selectors = {
  getSubmittingSwap,
  getErrorSubmittingSwap,
  getMiningSwap,
  getTransactionsSwap,
  getMinedSwap,
  getTransactionReceiptsSwap,
  getErrorMiningSwap,
}
