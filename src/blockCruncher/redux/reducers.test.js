import transactionsReducer, {
  transactionsSelector,
  makeGetTransactionsFromAddress,
  makeGetPendingTransactionsFromAddress,
  makeGetCompletedTransactionsFromAddress,
  makeGetTransactionIdsFromAddress,
} from './reducers'
import { submittedTransactionReceipt, submittedTransaction } from './actions'
import { randomTransactionHashGenerator, randomAddressGenerator } from '../../tests/utils'

const defaultState = []

test('default state', () => {
  expect(transactionsReducer(defaultState, {})).toEqual(defaultState)
})
const randomTransactionHash = randomTransactionHashGenerator()
const randomAddress = randomAddressGenerator()

const generateRandomStubTxn = overrideValues => ({
  transactionHash: randomTransactionHash.next().value,
  description: 'test',
  txType: 'test',
  from: randomAddress.next().value,
  to: randomAddress.next().value,
  messagePending: 'Pending',
  messageSuccess: 'Success',
  messageFailure: 'An Error Occurred',
  status: null,
  order: undefined,
  ...overrideValues,
})

const generateRandomReceipt = overrideValues => ({
  transactionHash: randomTransactionHash.next().value,
  transactionIndex: 0,
  blockHash: '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
  blockNumber: 3,
  contractAddress: randomAddress.next().value,
  cumulativeGasUsed: 314159,
  gasUsed: 30234,
  logs: [{}],
  status: '0x1',
  ...overrideValues,
})

describe('reducers', () => {
  const stubTxn = generateRandomStubTxn({
    transactionHash: '0x9da449d79c02c211192d19d0f2b96ad01638bb953b7a2bd7ac8c9470803825e5',
  })
  const receipt = generateRandomReceipt({
    transactionHash: '0x9da449d79c02c211192d19d0f2b96ad01638bb953b7a2bd7ac8c9470803825e5',
  })
  const submittedTransactionAction = submittedTransaction(
    stubTxn.from,
    stubTxn.transactionHash,
    stubTxn.to,
    stubTxn.description,
    stubTxn.txType,
    stubTxn.messagePending,
    stubTxn.messageSuccess,
    stubTxn.messageFailure,
    stubTxn.order,
  )
  test('add transaction', () => {
    expect(transactionsReducer(defaultState, submittedTransactionAction)).toEqual([stubTxn])
  })
  const submittedTransactionReceiptAction = submittedTransactionReceipt(receipt)
  test('add transactionReceipt', () => {
    let state = defaultState
    state = transactionsReducer(state, submittedTransactionAction)
    state = transactionsReducer(state, submittedTransactionReceiptAction)
    expect(state).toEqual([
      {
        ...stubTxn,
        ...receipt,
      },
    ])
  })
  test('multiple transactions pending, add transactionReceipt', () => {
    let state = defaultState
    state = transactionsReducer(state, submittedTransactionAction)
    const newTransactionHash = '0x9de440d79c02c211192d19d0f2b96ad01638bb953b7a2bd7ac8c9470803825e5'
    const newTransactionAction = {
      ...submittedTransactionAction,
      transactionHash: newTransactionHash,
    }
    state = transactionsReducer(state, newTransactionAction)
    state = transactionsReducer(state, submittedTransactionReceiptAction)
    expect(state).toEqual([
      {
        ...stubTxn,
        ...receipt,
      },
      {
        ...stubTxn,
        transactionHash: newTransactionHash,
      },
    ])
  })
})

describe('selectors', () => {
  const stubTxn = generateRandomStubTxn({
    transactionHash: '0x9da449d79c02c211192d19d0f2b96ad01638bb953b7a2bd7ac8c9470803825e5',
  })
  const receipt = generateRandomReceipt({
    transactionHash: '0x9da449d79c02c211192d19d0f2b96ad01638bb953b7a2bd7ac8c9470803825e5',
  })
  const submittedTransactionAction = submittedTransaction(
    stubTxn.from,
    stubTxn.transactionHash,
    stubTxn.to,
    stubTxn.description,
    stubTxn.txType,
    stubTxn.messagePending,
    stubTxn.messageSuccess,
    stubTxn.messageFailure,
    stubTxn.order,
  )
  const submittedTransactionReceiptAction = submittedTransactionReceipt(receipt)
  let transactions = defaultState

  beforeEach(() => {
    transactions = transactionsReducer(transactions, submittedTransactionAction)
    transactions = transactionsReducer(transactions, submittedTransactionReceiptAction)
  })

  test('transactionsSelector', () => {
    expect(transactionsSelector({ transactions })).toEqual([
      {
        ...stubTxn,
        ...receipt,
      },
    ])
  })
  test('makeGetTransactionsFromAddress', () => {
    const newAddress = randomAddress.next().value
    const newTransactionHash = randomTransactionHash.next().value
    const newSubmittedTransactionAction = {
      ...submittedTransactionAction,
      from: newAddress,
      transactionHash: newTransactionHash,
    }
    transactions = transactionsReducer(transactions, newSubmittedTransactionAction)
    expect(transactionsSelector({ transactions })).toHaveLength(2)
    const selector = makeGetTransactionsFromAddress({ transactions })
    expect(selector(newAddress)).toEqual([
      {
        ...stubTxn,
        transactionHash: newTransactionHash,
        from: newAddress,
      },
    ])
  })
  test('makeGetTransactionIdsFromAddress', () => {
    const newAddress = randomAddress.next().value
    const newTransactionHash = randomTransactionHash.next().value
    const newSubmittedTransactionAction = {
      ...submittedTransactionAction,
      from: newAddress,
      transactionHash: newTransactionHash,
    }
    transactions = transactionsReducer(transactions, newSubmittedTransactionAction)
    const selector = makeGetTransactionIdsFromAddress({ transactions })
    expect(selector(newAddress)).toEqual([newTransactionHash])
  })
  test('makeGetPendingTransactionsFromAddress', () => {
    const newAddress = randomAddress.next().value
    const newTransactionHash = randomTransactionHash.next().value
    const newSubmittedTransactionAction = {
      ...submittedTransactionAction,
      from: newAddress,
      transactionHash: newTransactionHash,
    }
    transactions = transactionsReducer(transactions, newSubmittedTransactionAction)
    const selector = makeGetPendingTransactionsFromAddress({ transactions })
    expect(selector(newAddress)).toEqual([
      {
        ...stubTxn,
        transactionHash: newTransactionHash,
        from: newAddress,
      },
    ])
  })
  test('makeGetCompletedTransactionsFromAddress', () => {
    const newAddress = randomAddress.next().value
    const newTransactionHash = randomTransactionHash.next().value
    const newSubmittedTransactionAction = {
      ...submittedTransactionAction,
      from: newAddress,
      transactionHash: newTransactionHash,
    }
    const newReceipt = generateRandomReceipt({
      transactionHash: newTransactionHash,
    })
    expect(newReceipt.transactionHash).toEqual(newTransactionHash)
    const newSubmittedTransactionReceiptAction = submittedTransactionReceipt(newReceipt)
    const originalLength = transactions.length
    transactions = transactionsReducer(transactions, newSubmittedTransactionAction)
    transactions = transactionsReducer(transactions, newSubmittedTransactionReceiptAction)
    expect(transactions.length).toEqual(originalLength + 1)
    const selector = makeGetCompletedTransactionsFromAddress({ transactions })
    expect(selector(newAddress)).toEqual([
      {
        ...stubTxn,
        from: newAddress,
        ...newReceipt,
      },
    ])
  })
})
