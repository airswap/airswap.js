// This file is generated code, edits will be overwritten
export const fetchSwapLightDOMAIN_CHAIN_ID = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_DOMAIN_CHAIN_ID',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightDOMAIN_NAME = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_DOMAIN_NAME',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightDOMAIN_SEPARATOR = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_DOMAIN_SEPARATOR',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightDOMAIN_TYPEHASH = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_DOMAIN_TYPEHASH',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightDOMAIN_VERSION = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_DOMAIN_VERSION',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightORDER_TYPEHASH = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_ORDER_TYPEHASH',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightSignerMinimumNonce = ({ nonce, ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonce,
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_SIGNER_MINIMUM_NONCE',
      resolve,
      reject,
    }),
  )

export const submitSwapLightSwap = ({
  nonce,
  expiry,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  signature,
  ethAmount,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonce,
      expiry,
      signerToken,
      signerAmount,
      senderToken,
      senderAmount,
      signature,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_SWAP',
      resolve,
      reject,
    }),
  )

export const submitSwapLightCancel = ({ nonces, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonces,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_CANCEL',
      resolve,
      reject,
    }),
  )

export const submitSwapLightCancelUpTo = ({ minimumNonce, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      minimumNonce,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_CANCEL_UP_TO',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightNonceUsed = ({ signer, nonce, ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signer,
      nonce,
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_NONCE_USED',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightGetChainId = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_GET_CHAIN_ID',
      resolve,
      reject,
    }),
  )
