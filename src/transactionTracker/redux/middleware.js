import _ from 'lodash'
import { ethers } from 'ethers'
import { formatErrorMessage, getParsedInputFromTransaction, stringBNValues } from '../../utils/transformations'
import getRevertReason from '../../utils/revertReason'
import { httpProvider } from '../../constants'
import { getAbis } from '../../abis/redux/reducers'

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

function parseEventLog(log, abiInterface) {
  let parsedLog
  try {
    parsedLog = abiInterface.parseLog(log)
  } catch (e) {
    // this was added because ERC721 transactions show up under the Transfer topic but can't be parsed by the human-standard-token abi
    return null
  }

  const parsedLogValues = _.mapValues(parsedLog.values, v => ((v.toString ? v.toString() : v) || '').toLowerCase()) // converts bignumbers to strings and lowercases everything (most importantly addresses)
  const argumentRange = _.range(Number(parsedLogValues.length)).map(p => p.toString())
  const formattedLogValues = _.pickBy(
    parsedLogValues,
    (param, key) => !_.includes(argumentRange, key) && key !== 'length', // removes some extra junk ethers puts in the parsed logs
  )
  const { address, topics, data, blockNumber, transactionHash, removed, transactionIndex, logIndex } = log
  const { name, signature, topic } = parsedLog
  return {
    ...{
      address,
      topics,
      data,
      blockNumber: ethers.utils.bigNumberify(blockNumber).toNumber(),
      transactionIndex: ethers.utils.bigNumberify(transactionIndex).toNumber(),
      logIndex: ethers.utils.bigNumberify(logIndex).toNumber(),
      transactionHash,
      removed,
    },
    ...{ name, signature, topic },
    values: formattedLogValues,
  }
}

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
  const abis = getAbis(store.getState())
  transaction.parsedInput = getParsedInputFromTransaction(transaction, abis)
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

  transactionReceipt.logs.map(log => {
    const abi = abis[log.address.toLowerCase()]
    if (!abi) {
      console.log(
        `MISSING ABI FOR CONTRACT AT ${log.address.toLowerCase()}, MAKE SURE DYNAMIC ABI LOADING FOR THIS CONTRACT TYPE IS SET IN abis REDUCER`,
      )
      return
    }
    const abiInterface = new ethers.utils.Interface(abi)
    const parsedLog = parseEventLog(log, abiInterface)
    store.dispatch({
      type: 'TRANSACTION_LOG_EVENT',
      event: parsedLog,
      namespace,
      name,
      parameters,
    })
  })
}

// {
//   type: 'TRANSACTION_LOG_EVENT',
//     event: {
//   address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     topics: [
//     '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
//     '0x00000000000000000000000015fc598e31b98d73a7d56e10f079b827cb97af82'
//   ],
//     data: '0x00000000000000000000000000000000000000000000000000005af3107a4000',
//     blockNumber: 5044840,
//     transactionIndex: 7,
//     logIndex: 7,
//     transactionHash: '0x83de8d44a545c37daf57158ba4eb8b5b744e34582b25e0477436d03191794480',
//     name: 'Deposit',
//     signature: 'Deposit(address,uint256)',
//     topic: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
//     values: {
//     owner: '0x15fc598e31b98d73a7d56e10f079b827cb97af82',
//       amount: '100000000000000'
//   }
// }
// }

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
