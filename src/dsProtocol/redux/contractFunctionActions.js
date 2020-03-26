// This file is generated code, edits will be overwritten
export const fetchDsProtocolPreTransferCheck = ({ contractAddress, from, to, value }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      value,
      type: 'FETCH_DS_PROTOCOL_PRE_TRANSFER_CHECK',
      resolve,
      reject,
    }),
  )
