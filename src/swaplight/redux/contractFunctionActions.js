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

export const fetchSwapLightFEE_DIVISOR = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_FEE_DIVISOR',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightLIGHT_ORDER_TYPEHASH = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_LIGHT_ORDER_TYPEHASH',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightAuthorized = ({ authorizedAddress, ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      authorizedAddress,
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_AUTHORIZED',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightFeeWallet = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_FEE_WALLET',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightOwner = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_OWNER',
      resolve,
      reject,
    }),
  )

export const submitSwapLightRenounceOwnership = ({ ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_RENOUNCE_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const fetchSwapLightSignerFee = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'FETCH_SWAP_LIGHT_SIGNER_FEE',
      resolve,
      reject,
    }),
  )

export const submitSwapLightTransferOwnership = ({ newOwner, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newOwner,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_TRANSFER_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const submitSwapLightSwap = ({
  nonce,
  expiry,
  signerWallet,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  v,
  r,
  s,
  ethAmount,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      nonce,
      expiry,
      signerWallet,
      signerToken,
      signerAmount,
      senderToken,
      senderAmount,
      v,
      r,
      s,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_SWAP',
      resolve,
      reject,
    }),
  )

export const submitSwapLightSwapWithRecipient = ({
  recipient,
  nonce,
  expiry,
  signerWallet,
  signerToken,
  signerAmount,
  senderToken,
  senderAmount,
  v,
  r,
  s,
  ethAmount,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      recipient,
      nonce,
      expiry,
      signerWallet,
      signerToken,
      signerAmount,
      senderToken,
      senderAmount,
      v,
      r,
      s,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_SWAP_WITH_RECIPIENT',
      resolve,
      reject,
    }),
  )

export const submitSwapLightSetFeeWallet = ({ newFeeWallet, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newFeeWallet,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_SET_FEE_WALLET',
      resolve,
      reject,
    }),
  )

export const submitSwapLightSetFee = ({ newSignerFee, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newSignerFee,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_SET_FEE',
      resolve,
      reject,
    }),
  )

export const submitSwapLightAuthorize = ({ signerAddress, ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerAddress,
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_AUTHORIZE',
      resolve,
      reject,
    }),
  )

export const submitSwapLightRevoke = ({ ethAmount, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      options,
      type: 'SUBMIT_SWAP_LIGHT_REVOKE',
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
