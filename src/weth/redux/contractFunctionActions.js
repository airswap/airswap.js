export const getWethName = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_WETH_NAME',
      resolve,
      reject,
    }),
  )

export const submitWethApprove = ({ spender, amount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      spender,
      amount,
      type: 'SUBMIT_WETH_APPROVE',
      resolve,
      reject,
    }),
  )

export const getWethTotalSupply = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_WETH_TOTAL_SUPPLY',
      resolve,
      reject,
    }),
  )

export const submitWethTransferFrom = ({ from, to, amount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      from,
      to,
      amount,
      type: 'SUBMIT_WETH_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const submitWethWithdraw = ({ amount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      amount,
      type: 'SUBMIT_WETH_WITHDRAW',
      resolve,
      reject,
    }),
  )

export const getWethDecimals = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_WETH_DECIMALS',
      resolve,
      reject,
    }),
  )

export const getWethBalanceOf = ({ owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      type: 'GET_WETH_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const getWethSymbol = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_WETH_SYMBOL',
      resolve,
      reject,
    }),
  )

export const submitWethTransfer = ({ to, amount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      to,
      amount,
      type: 'SUBMIT_WETH_TRANSFER',
      resolve,
      reject,
    }),
  )

export const submitWethDeposit = ({ ethAmount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ethAmount,
      type: 'SUBMIT_WETH_DEPOSIT',
      resolve,
      reject,
    }),
  )

export const getWethAllowance = ({ owner, spender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      spender,
      type: 'GET_WETH_ALLOWANCE',
      resolve,
      reject,
    }),
  )
