// This file is generated code, edits will be overwritten
export const fetchWrapperSwapContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WRAPPER_SWAP_CONTRACT',
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
