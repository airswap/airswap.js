export const getERC721SupportsInterface = ({ contractAddress, interfaceId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      interfaceId,
      type: 'GET_ERC_721_SUPPORTS_INTERFACE',
      resolve,
      reject,
    }),
  )

export const getERC721BalanceOf = ({ contractAddress, owner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      type: 'GET_ERC_721_BALANCE_OF',
      resolve,
      reject,
    }),
  )

export const getERC721OwnerOf = ({ contractAddress, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      tokenId,
      type: 'GET_ERC_721_OWNER_OF',
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

export const getERC721GetApproved = ({ contractAddress, tokenId }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      tokenId,
      type: 'GET_ERC_721_GET_APPROVED',
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

export const getERC721IsApprovedForAll = ({ contractAddress, owner, operator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      owner,
      operator,
      type: 'GET_ERC_721_IS_APPROVED_FOR_ALL',
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
