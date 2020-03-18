// This file is generated code, edits will be overwritten
export const submitERC1155SafeTransferFrom = ({ contractAddress, from, to, id, value, data, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      id,
      value,
      data,
      options,
      type: 'SUBMIT_ERC_1155_SAFE_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const submitERC1155SafeBatchTransferFrom = ({
  contractAddress,
  from,
  to,
  ids,
  values,
  data,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      ids,
      values,
      data,
      options,
      type: 'SUBMIT_ERC_1155_SAFE_BATCH_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const fetchERC1155BalanceOf = ({ contractAddress, owner, id }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      id,
      type: 'FETCH_ERC_1155_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const fetchERC1155BalanceOfBatch = ({ contractAddress, owners, ids }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owners,
      ids,
      type: 'FETCH_ERC_1155_BALANCE_OF_BATCH',
      resolve,
      reject,
    }),
  )

export const submitERC1155SetApprovalForAll = ({ contractAddress, operator, approved, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      operator,
      approved,
      options,
      type: 'SUBMIT_ERC_1155_SET_APPROVAL_FOR_ALL',
      resolve,
      reject,
    }),
  )

export const fetchERC1155IsApprovedForAll = ({ contractAddress, owner, operator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      operator,
      type: 'FETCH_ERC_1155_IS_APPROVED_FOR_ALL',
      resolve,
      reject,
    }),
  )

export const fetchERC1155GetComplianceService = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_ERC_1155_GET_COMPLIANCE_SERVICE',
      resolve,
      reject,
    }),
  )
