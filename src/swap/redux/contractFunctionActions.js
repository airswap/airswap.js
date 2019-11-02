// This file is generated code, edits will be overwritten
export const submitSwapAuthorizeSender = ({ authorizedSender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      authorizedSender,
      type: 'SUBMIT_SWAP_AUTHORIZE_SENDER',
      resolve,
      reject,
    }),
  )

export const submitSwapAuthorizeSigner = ({ authorizedSigner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      authorizedSigner,
      type: 'SUBMIT_SWAP_AUTHORIZE_SIGNER',
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

export const submitSwapRevokeSender = ({ authorizedSender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      authorizedSender,
      type: 'SUBMIT_SWAP_REVOKE_SENDER',
      resolve,
      reject,
    }),
  )

export const submitSwapRevokeSigner = ({ authorizedSigner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      authorizedSigner,
      type: 'SUBMIT_SWAP_REVOKE_SIGNER',
      resolve,
      reject,
    }),
  )

export const fetchSwapSenderAuthorizations = ({ sender, authorizedSender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      sender,
      authorizedSender,
      type: 'FETCH_SWAP_SENDER_AUTHORIZATIONS',
      resolve,
      reject,
    }),
  )

export const fetchSwapSignerAuthorizations = ({ signer, authorizedSigner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signer,
      authorizedSigner,
      type: 'FETCH_SWAP_SIGNER_AUTHORIZATIONS',
      resolve,
      reject,
    }),
  )

export const fetchSwapSignerMinimumNonce = ({ signer }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signer,
      type: 'FETCH_SWAP_SIGNER_MINIMUM_NONCE',
      resolve,
      reject,
    }),
  )

export const fetchSwapSignerNonceStatus = ({ signer, nonce }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signer,
      nonce,
      type: 'FETCH_SWAP_SIGNER_NONCE_STATUS',
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
