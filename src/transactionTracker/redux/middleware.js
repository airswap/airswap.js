import { formatErrorMessage, getParsedInputFromTransaction, stringBNValues } from '../../utils/transformations'
import getRevertReason from '../../utils/revertReason'
import { httpProvider } from '../../constants'

const submitting = ({ id, namespace, name, parameters }) => ({
  type: 'SUBMITTING_TRANSACTION',
  id,
  namespace,
  name,
  parameters,
})

const errorSubmitting = ({ id, namespace, name, error }) => ({
  type: 'ERROR_SUBMITTING_TRANSACTION',
  id,
  namespace,
  name,
  error,
})

const submitted = ({ id, namespace, name, transaction }) => ({
  type: 'SUBMITTED_TRANSACTION',
  id,
  namespace,
  name,
  transaction,
})

const mined = ({ id, namespace, name, transactionReceipt }) => ({
  type: 'MINED_TRANSACTION',
  id,
  namespace,
  name,
  transactionReceipt,
})

const errorMining = ({ id, namespace, name, transactionReceipt, error }) => ({
  type: 'ERROR_MINING_TRANSACTION',
  id,
  namespace,
  name,
  transactionReceipt,
  error,
})

async function trackTransaction({ contractFunctionPromise, namespace, name, id, parameters }, store) {
  store.dispatch(submitting({ id, namespace, name, parameters }))
  let txn
  try {
    txn = await contractFunctionPromise
  } catch (err) {
    store.dispatch(errorSubmitting({ id, namespace, name, error: formatErrorMessage(err) }))
    return
  }
  const transaction = stringBNValues(txn)
  transaction.parsedInput = getParsedInputFromTransaction(transaction)
  transaction.timestamp = Date.now()

  store.dispatch(submitted({ id, namespace, name, transaction }))
  let minedTxn

  try {
    minedTxn = await httpProvider.waitForTransaction(txn.hash).then(() => httpProvider.getTransactionReceipt(txn.hash))
  } catch (err) {
    store.dispatch(errorMining({ id, namespace, name, error: formatErrorMessage(err) }))
    return
  }
  const transactionReceipt = stringBNValues(minedTxn)
  if (transactionReceipt.status === 0) {
    const reason = await getRevertReason(transactionReceipt.transactionHash)
    const error = formatErrorMessage(reason) || 'Transaction Failed'
    transactionReceipt.revertReason = reason
    store.dispatch(errorMining({ id, namespace, name, error: formatErrorMessage(error), transactionReceipt }))
    return
  }
  store.dispatch(mined({ id, namespace, name, transactionReceipt }))
}

export default function transactionTrackerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'ADD_TRACKED_TRANSACTION':
        trackTransaction(action, store)
        break
      default:
    }
    return next(action)
  }
}
