// ETHERS TRANSACTION REDUX TEMPLATE
import { ethers } from 'ethers'
import { formatErrorMessage, stringBNValues, getParsedInputFromTransaction } from '../../transformations'

import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'
import { AIRSWAP_GETH_NODE_ADDRESS } from '../../../constants'
import { getAbis } from '../../../abis/redux/reducers'

const provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

const ETHERS_TXN_ACTIONS = [
  { action: 'submitting' },
  { action: 'errorSubmitting', paramsKeys: ['error'] },
  { action: 'submitted', paramsKeys: ['transaction'] },
  { action: 'mined', paramsKeys: ['transactionReceipt'] },
  { action: 'errorMining', paramsKeys: ['error'] },
]

export const makeEthersTxnActionsCreators = id => makeActionCreators(ETHERS_TXN_ACTIONS, id)
export const makeEthersTxnActionTypes = id => makeActionTypes(ETHERS_TXN_ACTIONS, id)
export const makeMiddlewareEthersTransactionFn = async (transactionFn, transactionName, store, action) => {
  const { submitting, errorSubmitting, submitted, mined, errorMining } = makeEthersTxnActionsCreators(transactionName)
  store.dispatch(submitting())
  let txn
  try {
    txn = await transactionFn(store, action)
  } catch (err) {
    store.dispatch(errorSubmitting(formatErrorMessage(err)))
    return
  }
  const formattedTxn = stringBNValues(txn)
  const abis = getAbis(store.getState())
  const parsedInput = getParsedInputFromTransaction(formattedTxn, abis)
  store.dispatch(submitted({ ...formattedTxn, ...parsedInput, timestamp: Date.now() }))
  let minedTxn
  try {
    minedTxn = await provider.waitForTransaction(txn.hash).then(() => provider.getTransactionReceipt(txn.hash))
  } catch (err) {
    store.dispatch(errorMining(formatErrorMessage(err)))
    return
  }
  store.dispatch(mined(stringBNValues(minedTxn)))
}

const ETHERS_TXN_REDUCERS = {
  submitting: {
    defaultState: false,
    switch: {
      submitting: true,
      errorSubmitting: false,
      submitted: false,
    },
  },
  errorSubmitting: {
    defaultState: '',
    switch: {
      submitting: '',
      errorSubmitting: ({ error }) => error,
      submitted: '',
    },
  },
  mining: {
    defaultState: false,
    switch: {
      submitting: false,
      submitted: true,
      mined: false,
      errorMining: false,
    },
  },
  transaction: {
    defaultState: null,
    switch: {
      submitting: null,
      submitted: ({ transaction }) => transaction,
    },
  },
  mined: {
    defaultState: false,
    switch: {
      submitting: false,
      submitted: false,
      mined: true,
      errorMining: false,
    },
  },
  transactionReceipt: {
    defaultState: null,
    switch: {
      submitting: null,
      mined: ({ transactionReceipt }) => transactionReceipt,
    },
  },
  errorMining: {
    defaultState: '',
    switch: {
      submitting: '',
      submitted: '',
      mined: '',
      errorMining: ({ error }) => error,
    },
  },
}

export const makeEthersTxnReducer = items => makeReducer(ETHERS_TXN_REDUCERS, ETHERS_TXN_ACTIONS, items)
export const makeEthersTxnSelectors = (items, statePath) => makeSelectors(ETHERS_TXN_REDUCERS, items, statePath)
export const makeEthersTxnContainers = (items, statePath) => makeContainers(makeEthersTxnSelectors(items, statePath))
