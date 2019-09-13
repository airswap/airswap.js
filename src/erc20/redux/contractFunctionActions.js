// This file is generated code, edits will be overwritten
export const fetchERC20Name = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_20_NAME',
      resolve,
      reject,
    }),
  )

export const submitERC20Approve = ({ contractAddress, spender, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      spender,
      value,
      type: 'SUBMIT_ERC_20_APPROVE',
      resolve,
      reject,
    }),
  )

export const fetchERC20TotalSupply = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_20_TOTAL_SUPPLY',
      resolve,
      reject,
    }),
  )

export const submitERC20TransferFrom = ({ contractAddress, from, to, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      value,
      type: 'SUBMIT_ERC_20_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const fetchERC20Decimals = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_20_DECIMALS',
      resolve,
      reject,
    }),
  )

export const fetchERC20Version = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_20_VERSION',
      resolve,
      reject,
    }),
  )

export const fetchERC20BalanceOf = ({ contractAddress, owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      type: 'FETCH_ERC_20_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const fetchERC20Symbol = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_20_SYMBOL',
      resolve,
      reject,
    }),
  )

export const submitERC20Transfer = ({ contractAddress, to, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      to,
      value,
      type: 'SUBMIT_ERC_20_TRANSFER',
      resolve,
      reject,
    }),
  )

export const submitERC20ApproveAndCall = ({ contractAddress, spender, value, extraData }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      spender,
      value,
      extraData,
      type: 'SUBMIT_ERC_20_APPROVE_AND_CALL',
      resolve,
      reject,
    }),
  )

export const fetchERC20Allowance = ({ contractAddress, owner, spender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      spender,
      type: 'FETCH_ERC_20_ALLOWANCE',
      resolve,
      reject,
    }),
  )
