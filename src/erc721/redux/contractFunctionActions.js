// This file is generated code, edits will be overwritten
export const fetchERC721SupportsInterface = ({ contractAddress, interfaceId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      interfaceId,
      type: 'FETCH_ERC_721_SUPPORTS_INTERFACE',
      resolve,
      reject,
    }),
  )

export const fetchERC721BalanceOf = ({ contractAddress, owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      type: 'FETCH_ERC_721_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const fetchERC721OwnerOf = ({ contractAddress, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      tokenId,
      type: 'FETCH_ERC_721_OWNER_OF',
      resolve,
      reject,
    }),
  )

export const submitERC721TransferFrom = ({ contractAddress, from, to, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      tokenId,
      type: 'SUBMIT_ERC_721_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )

export const submitERC721Approve = ({ contractAddress, to, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      to,
      tokenId,
      type: 'SUBMIT_ERC_721_APPROVE',
      resolve,
      reject,
    }),
  )

export const fetchERC721GetApproved = ({ contractAddress, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      tokenId,
      type: 'FETCH_ERC_721_GET_APPROVED',
      resolve,
      reject,
    }),
  )

export const submitERC721SetApprovalForAll = ({ contractAddress, operator, _approved }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      operator,
      _approved,
      type: 'SUBMIT_ERC_721_SET_APPROVAL_FOR_ALL',
      resolve,
      reject,
    }),
  )

export const fetchERC721IsApprovedForAll = ({ contractAddress, owner, operator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      operator,
      type: 'FETCH_ERC_721_IS_APPROVED_FOR_ALL',
      resolve,
      reject,
    }),
  )

export const fetchERC721KittyIndexToApproved = ({ contractAddress, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      tokenId,
      type: 'FETCH_ERC_721_KITTY_INDEX_TO_APPROVED',
      resolve,
      reject,
    }),
  )

export const submitERC721SafeTransferFrom = ({ contractAddress, from, to, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      from,
      to,
      tokenId,
      type: 'SUBMIT_ERC_721_SAFE_TRANSFER_FROM',
      resolve,
      reject,
    }),
  )
