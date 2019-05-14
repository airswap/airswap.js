// @flow
export const submittedTransaction = (
  from: string,
  transactionHash: string,
  to: string,
  description: string,
  txType: string,
  messagePending: string = 'Pending',
  messageSuccess: string = 'Success',
  messageFailure: string = 'An Error Occurred',
  order: ?Object,
) => ({
  type: 'SUBMITTED_TRANSACTION',
  from,
  to,
  transactionHash,
  description,
  txType,
  messagePending,
  messageSuccess,
  messageFailure,
  order,
})

export const submittedTransactionReceipt = (receipt: Object) => ({
  type: 'SUBMITTED_TRANSACTION_RECEIPT',
  receipt,
})
