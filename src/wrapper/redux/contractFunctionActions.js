export const getWrapperWethContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      TYPE: 'GET_WRAPPER_WETH_CONTRACT',
      resolve,
      reject,
    }),
  )

export const getWrapperSwapContract = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      TYPE: 'GET_WRAPPER_SWAP_CONTRACT',
      resolve,
      reject,
    }),
  )

export const submitWrapperSwap = ({ order, ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      order,
      ethAmount,
      TYPE: 'SUBMIT_WRAPPER_SWAP',
      resolve,
      reject,
    }),
  )
