// This file is generated code, edits will be overwritten
export const fetchWethName = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WETH_NAME',
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

export const fetchWethTotalSupply = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WETH_TOTAL_SUPPLY',
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

export const fetchWethDecimals = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WETH_DECIMALS',
      resolve,
      reject,
    }),
  )

export const fetchWethBalanceOf = ({ owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      type: 'FETCH_WETH_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const fetchWethSymbol = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_WETH_SYMBOL',
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

export const fetchWethAllowance = ({ owner, spender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      spender,
      type: 'FETCH_WETH_ALLOWANCE',
      resolve,
      reject,
    }),
  )
