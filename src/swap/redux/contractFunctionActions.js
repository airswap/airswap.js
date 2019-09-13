export const fetchSwapMakerMinimumNonce = ({ makerWallet }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      makerWallet,
      type: 'FETCH_SWAP_MAKER_MINIMUM_NONCE',
      resolve,
      reject,
    }),
  )

export const fetchSwapMakerOrderStatus = ({ makerWallet, nonce }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      makerWallet,
      nonce,
      type: 'FETCH_SWAP_MAKER_ORDER_STATUS',
      resolve,
      reject,
    }),
  )

export const fetchSwapDelegateApprovals = ({ approver, delegate }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      approver,
      delegate,
      type: 'FETCH_SWAP_DELEGATE_APPROVALS',
      resolve,
      reject,
    }),
  )

export const submitSwap = ({ order }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      order,
      type: 'SUBMIT_SWAP',
      resolve,
      reject,
    }),
  )

export const submitSwapCancel = ({ nonces }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonces,
      type: 'SUBMIT_SWAP_CANCEL',
      resolve,
      reject,
    }),
  )

export const submitSwapInvalidate = ({ minimumNonce }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      minimumNonce,
      type: 'SUBMIT_SWAP_INVALIDATE',
      resolve,
      reject,
    }),
  )

export const submitSwapAuthorize = ({ delegate, expiry }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      delegate,
      expiry,
      type: 'SUBMIT_SWAP_AUTHORIZE',
      resolve,
      reject,
    }),
  )

export const submitSwapRevoke = ({ delegate }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      delegate,
      type: 'SUBMIT_SWAP_REVOKE',
      resolve,
      reject,
    }),
  )
