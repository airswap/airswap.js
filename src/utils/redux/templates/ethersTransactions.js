// ETHERS TRANSACTION REDUX TEMPLATE
import { ethers } from 'ethers'
import { formatErrorMessage, getParsedInputFromTransaction, stringBNValues } from '../../transformations'
import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'
import { AIRSWAP_GETH_NODE_ADDRESS } from '../../../constants'
import getRevertReason from '../../revertReason'
import { getAbis } from '../../../abis/redux/reducers'

const provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

const ETHERS_TXNS_ACTIONS = [
  { action: 'submitting', paramsKeys: ['id'] },
  { action: 'errorSubmitting', paramsKeys: ['error', 'id'] },
  { action: 'submitted', paramsKeys: ['transaction', 'id'] },
  { action: 'mined', paramsKeys: ['transactionReceipt', 'id'] },
  { action: 'errorMining', paramsKeys: ['error', 'id', 'transactionReceipt'] },
]

export const makeEthersTxnsActionsCreators = id => makeActionCreators(ETHERS_TXNS_ACTIONS, id)
export const makeEthersTxnsActionTypes = id => makeActionTypes(ETHERS_TXNS_ACTIONS, id)
export const makeMiddlewareEthersTransactionsFn = async (transactionFn, transactionName, store, action, uniqueId) => {
  const { submitting, errorSubmitting, submitted, mined, errorMining } = makeEthersTxnsActionsCreators(transactionName)
  store.dispatch(submitting(uniqueId))
  let txn
  try {
    txn = await transactionFn(store, action)
  } catch (err) {
    store.dispatch(errorSubmitting(formatErrorMessage(err), uniqueId))
    return
  }
  const formattedTxn = stringBNValues(txn)
  const abis = getAbis(store.getState())
  const parsedInput = getParsedInputFromTransaction(formattedTxn, abis)

  store.dispatch(submitted({ ...formattedTxn, ...parsedInput, timestamp: Date.now() }, uniqueId))
  let minedTxn

  try {
    minedTxn = await provider.waitForTransaction(txn.hash).then(() => provider.getTransactionReceipt(txn.hash))
  } catch (err) {
    store.dispatch(errorMining(formatErrorMessage(err), uniqueId))
    return
  }
  const formattedMinedTxn = stringBNValues(minedTxn)
  if (formattedMinedTxn.status === 0) {
    const reason = await getRevertReason(formattedMinedTxn.transactionHash)
    store.dispatch(
      errorMining(formatErrorMessage(reason) || 'Transaction Failed', uniqueId, {
        ...formattedMinedTxn,
        revertReason: reason,
      }),
    )
    return
  }
  store.dispatch(mined(formattedMinedTxn, uniqueId))
}

const ETHERS_TXNS_REDUCERS = {
  submitting: {
    defaultState: {},
    switch: {
      submitting: ({ id }, state) => ({ ...state, [id]: true }),
      errorSubmitting: ({ id }, state) => ({ ...state, [id]: false }),
      submitted: ({ id }, state) => ({ ...state, [id]: false }),
    },
  },
  errorSubmitting: {
    defaultState: {},
    switch: {
      submitting: ({ id }, state) => ({ ...state, [id]: false }),
      errorSubmitting: ({ error, id }, state) => ({ ...state, [id]: error }),
      submitted: ({ id }, state) => ({ ...state, [id]: false }),
    },
  },
  mining: {
    defaultState: {},
    switch: {
      submitting: ({ id }, state) => ({ ...state, [id]: false }),
      submitted: ({ id }, state) => ({ ...state, [id]: true }),
      mined: ({ id }, state) => ({ ...state, [id]: false }),
      errorMining: ({ id }, state) => ({ ...state, [id]: false }),
    },
  },
  transactions: {
    defaultState: {},
    switch: {
      submitted: ({ transaction, id }, state) => ({ ...state, [id]: transaction }),
    },
  },
  mined: {
    defaultState: {},
    switch: {
      submitting: ({ id }, state) => ({ ...state, [id]: false }),
      submitted: ({ id }, state) => ({ ...state, [id]: false }),
      mined: ({ id }, state) => ({ ...state, [id]: true }),
      errorMining: ({ id }, state) => ({ ...state, [id]: false }),
    },
  },
  transactionReceipts: {
    defaultState: {},
    switch: {
      mined: ({ transactionReceipt, id }, state) => ({ ...state, [id]: transactionReceipt }),
      errorMining: ({ transactionReceipt, id }, state) => ({ ...state, [id]: transactionReceipt }),
    },
  },
  errorMining: {
    defaultState: {},
    switch: {
      submitting: ({ id }, state) => ({ ...state, [id]: '' }),
      submitted: ({ id }, state) => ({ ...state, [id]: '' }),
      mined: ({ id }, state) => ({ ...state, [id]: '' }),
      errorMining: ({ error, id }, state) => ({ ...state, [id]: error }),
    },
  },
}

export const makeEthersTxnsReducer = items => makeReducer(ETHERS_TXNS_REDUCERS, ETHERS_TXNS_ACTIONS, items)
export const makeEthersTxnsSelectors = (items, statePath) => makeSelectors(ETHERS_TXNS_REDUCERS, items, statePath)
export const makeEthersTxnsContainers = (items, statePath) => makeContainers(makeEthersTxnsSelectors(items, statePath))
