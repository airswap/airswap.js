// This file is generated code, edits will be overwritten
export const fetchAllinfraIsWhitelisted = ({ contractAddress, account }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      account,
      type: 'FETCH_ALLINFRA_IS_WHITELISTED',
      resolve,
      reject,
    }),
  )
