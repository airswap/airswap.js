// This file is generated code, edits will be overwritten
export const fetchDelegateFactoryIndexerContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_DELEGATE_FACTORY_INDEXER_CONTRACT',
      resolve,
      reject,
    }),
  )

export const fetchDelegateFactoryProtocol = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_DELEGATE_FACTORY_PROTOCOL',
      resolve,
      reject,
    }),
  )

export const fetchDelegateFactorySwapContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_DELEGATE_FACTORY_SWAP_CONTRACT',
      resolve,
      reject,
    }),
  )

export const submitDelegateFactoryCreateDelegate = ({ delegateTradeWallet }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      delegateTradeWallet,
      type: 'SUBMIT_DELEGATE_FACTORY_CREATE_DELEGATE',
      resolve,
      reject,
    }),
  )

export const fetchDelegateFactoryHas = ({ locator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      locator,
      type: 'FETCH_DELEGATE_FACTORY_HAS',
      resolve,
      reject,
    }),
  )
