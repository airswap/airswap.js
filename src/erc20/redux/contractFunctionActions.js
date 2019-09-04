export const getERC20Name = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_ERC_20_NAME',
      resolve,
      reject,
    }),
  )

export const submitERC20Approve = ({ spender, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      spender,
      value,
      type: 'SUBMIT_ERC_20_APPROVE',
      resolve,
      reject,
    }),
  )

export const getERC20TotalSupply = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_ERC_20_TOTAL_SUPPLY',
      resolve,
      reject,
    }),
  )

export const submitERC20TransferFrom = ({ from, to, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      from,
      to,
      value,
      type: 'SUBMIT_ERC_20_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const getERC20Decimals = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_ERC_20_DECIMALS',
      resolve,
      reject,
    }),
  )

export const getERC20Version = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_ERC_20_VERSION',
      resolve,
      reject,
    }),
  )

export const getERC20BalanceOf = ({ owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      type: 'GET_ERC_20_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const getERC20Symbol = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'GET_ERC_20_SYMBOL',
      resolve,
      reject,
    }),
  )

export const submitERC20Transfer = ({ to, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      to,
      value,
      type: 'SUBMIT_ERC_20_TRANSFER',
      resolve,
      reject,
    }),
  )

export const submitERC20ApproveAndCall = ({ spender, value, extraData }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      spender,
      value,
      extraData,
      type: 'SUBMIT_ERC_20_APPROVE_AND_CALL',
      resolve,
      reject,
    }),
  )

export const getERC20Allowance = ({ owner, spender }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      owner,
      spender,
      type: 'GET_ERC_20_ALLOWANCE',
      resolve,
      reject,
    }),
  )
