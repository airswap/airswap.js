import { createSelector } from 'reselect'
import { getERC721OwnerOf, getERC721GetApproved } from './callDataSelectors'
import { getERC721ApproveTransactions } from './contractTransactionSelectors'
import { SWAP_CONTRACT_ADDRESS } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

export const makeGetERC721Owner = createSelector(getERC721OwnerOf, values => (contractAddress, tokenId) => {
  const owner = values.find(
    callData =>
      callData.name === 'ownerOf' &&
      callData.parameters.contractAddress === contractAddress &&
      callData.parameters.tokenId === tokenId,
  )
  if (owner) return owner.response
})

export const makeGetIsERC721Owner = createSelector(
  getERC721OwnerOf,
  getConnectedWalletAddress,
  (values, connectedWalletAddress) => (contractAddress, tokenId) => {
    const owner = values.find(
      callData =>
        callData.name === 'ownerOf' &&
        callData.parameters.contractAddress === contractAddress &&
        callData.parameters.tokenId === tokenId,
    )
    if (owner) return owner.response.toLowerCase() === connectedWalletAddress.toLowerCase()
    return false
  },
)

export const makeGetIsERC721Approved = createSelector(getERC721GetApproved, values => (contractAddress, tokenId) => {
  const approvedAddress = values.find(
    callData =>
      callData.name === 'getApproved' &&
      callData.parameters.contractAddress === contractAddress &&
      callData.parameters.tokenId === tokenId,
  )
  return approvedAddress && approvedAddress.response.toLowerCase() === SWAP_CONTRACT_ADDRESS
})

export const makeGetERC721ApproveTransaction = createSelector(
  getERC721ApproveTransactions,
  values => (tokenAddress, tokenId) =>
    values.find(
      transactionData =>
        transactionData.name === 'approve' &&
        transactionData.parameters.contractAddress === tokenAddress &&
        transactionData.parameters.tokenId === tokenId,
    ),
)
