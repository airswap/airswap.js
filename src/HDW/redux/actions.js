export const initializeHDW = (walletType, path) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: 'INITIALIZE_HDW',
      walletType,
      path,
      resolve,
      reject,
    })
  })

export const confirmHDWPath = (path, pathIndex) => ({
  type: 'CONFIRM_HDW_PATH',
  path,
  pathIndex,
})

export const nextHDWAccounts = () => ({
  type: 'NEXT_HDW_ACCOUNTS',
})

export const prevHDWAccounts = () => ({
  type: 'PREV_HDW_ACCOUNTS',
})

export const setHDWPageOffset = pageOffset => ({
  type: 'SET_HDW_PAGE_OFFSET',
  pageOffset,
})

export const setHDWSubPath = path => ({
  type: 'SET_HDW_SUBPATH',
  path,
})

export const cancelHDWInitialization = () => ({
  type: 'CANCEL_HDW_INITIALIZATION',
})
