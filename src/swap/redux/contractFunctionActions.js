export const getSwapMakerMinimumNonce = ({ makerWallet }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      makerWallet,
      TYPE: 'GET_SWAP_MAKER_MINIMUM_NONCE',
      resolve,
      reject,
    }),
  )

export const getSwapMakerOrderStatus = ({ makerWallet, nonce }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      makerWallet,
      nonce,
      TYPE: 'GET_SWAP_MAKER_ORDER_STATUS',
      resolve,
      reject,
    }),
  )

export const getSwapDelegateApprovals = ({ approverAddress, delegateAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      approverAddress,
      delegateAddress,
      TYPE: 'GET_SWAP_DELEGATE_APPROVALS',
      resolve,
      reject,
    }),
  )

export const submitSwap = ({ order }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      order,
      TYPE: 'SUBMIT_SWAP',
      resolve,
      reject,
    }),
  )

export const submitSwapCancel = ({ nonces }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonces,
      TYPE: 'SUBMIT_SWAP_CANCEL',
      resolve,
      reject,
    }),
  )

export const submitSwapInvalidate = ({ minimumNonce }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      minimumNonce,
      TYPE: 'SUBMIT_SWAP_INVALIDATE',
      resolve,
      reject,
    }),
  )

export const submitSwapAuthorize = ({ delegate, expiry }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      delegate,
      expiry,
      TYPE: 'SUBMIT_SWAP_AUTHORIZE',
      resolve,
      reject,
    }),
  )

export const submitSwapRevoke = ({ delegate }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      delegate,
      TYPE: 'SUBMIT_SWAP_REVOKE',
      resolve,
      reject,
    }),
  )
