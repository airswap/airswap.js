export const getDeltaBalancesAllBalancesForManyAccounts = ({ users, tokens }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      users,
      tokens,
      TYPE: 'GET_DELTA_BALANCES_ALL_BALANCES_FOR_MANY_ACCOUNTS',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesTokenBalance = ({ user, token }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      user,
      token,
      TYPE: 'GET_DELTA_BALANCES_TOKEN_BALANCE',
      resolve,
      reject,
    }),
  )

export const submitDeltaBalancesDestruct = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      TYPE: 'SUBMIT_DELTA_BALANCES_DESTRUCT',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesWalletAllowances = ({ user, spender, tokens }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      user,
      spender,
      tokens,
      TYPE: 'GET_DELTA_BALANCES_WALLET_ALLOWANCES',
      resolve,
      reject,
    }),
  )

export const submitDeltaBalancesWithdraw = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      TYPE: 'SUBMIT_DELTA_BALANCES_WITHDRAW',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesWalletBalances = ({ user, tokens }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      user,
      tokens,
      TYPE: 'GET_DELTA_BALANCES_WALLET_BALANCES',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesTokenAllowance = ({ user, spender, token }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      user,
      spender,
      token,
      TYPE: 'GET_DELTA_BALANCES_TOKEN_ALLOWANCE',
      resolve,
      reject,
    }),
  )

export const submitDeltaBalancesWithdrawToken = ({ token, amount }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      token,
      amount,
      TYPE: 'SUBMIT_DELTA_BALANCES_WITHDRAW_TOKEN',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesAllWETHbalances = ({ wethAddress, users }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      wethAddress,
      users,
      TYPE: 'GET_DELTA_BALANCES_ALL_WET_HBALANCES',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesAllAllowancesForManyAccounts = ({ users, spender, tokens }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      users,
      spender,
      tokens,
      TYPE: 'GET_DELTA_BALANCES_ALL_ALLOWANCES_FOR_MANY_ACCOUNTS',
      resolve,
      reject,
    }),
  )

export const getDeltaBalancesAdmin = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      TYPE: 'GET_DELTA_BALANCES_ADMIN',
      resolve,
      reject,
    }),
  )

export const submitDeltaBalancesConstructor = ({ _deployer }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      _deployer,
      TYPE: 'SUBMIT_DELTA_BALANCES_CONSTRUCTOR',
      resolve,
      reject,
    }),
  )
