export const getLedgerProvider = path => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: 'GET_LEDGER_PROVIDER',
      path,
      resolve,
      reject,
    })
  })

export const setLedgerPathType = pathType => ({
  type: 'SET_LEDGER_PATH_TYPE',
  pathType,
})

export const setLedgerIndex = index => ({
  type: 'SET_LEDGER_INDEX',
  index,
})
