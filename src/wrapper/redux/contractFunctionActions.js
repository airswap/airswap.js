// This file is generated code, edits will be overwritten
export const fetchWrapperContractPaused = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_CONTRACT_PAUSED',
      resolve,
      reject,
    }),
  )

export const fetchWrapperIsOwner = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_IS_OWNER',
      resolve,
      reject,
    }),
  )

export const fetchWrapperOwner = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_OWNER',
      resolve,
      reject,
    }),
  )

export const submitWrapperRenounceOwnership = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'SUBMIT_WRAPPER_RENOUNCE_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const fetchWrapperSwapContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_SWAP_CONTRACT',
      resolve,
      reject,
    }),
  )

export const submitWrapperTransferOwnership = ({ newOwner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newOwner,
      type: 'SUBMIT_WRAPPER_TRANSFER_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const fetchWrapperWethContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_WETH_CONTRACT',
      resolve,
      reject,
    }),
  )

export const submitWrapperSetPausedStatus = ({ newStatus }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newStatus,
      type: 'SUBMIT_WRAPPER_SET_PAUSED_STATUS',
      resolve,
      reject,
    }),
  )

export const submitWrapperKillContract = ({ recipient }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      recipient,
      type: 'SUBMIT_WRAPPER_KILL_CONTRACT',
      resolve,
      reject,
    }),
  )

export const submitWrapperSwap = ({ order, ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      order,
      ethAmount,
      type: 'SUBMIT_WRAPPER_SWAP',
      resolve,
      reject,
    }),
  )
