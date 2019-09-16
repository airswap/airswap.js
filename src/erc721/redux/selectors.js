import { createSelector } from 'reselect'
import { getERC721OwnerOf, getERC721GetApproved } from './callDataSelectors'
import { getERC721ApproveTransactions } from './contractTransactionSelectors'
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

export const getIsERC721Owner = createSelector(
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

export const getIsERC721Approved = createSelector(getERC721GetApproved, values => (contractAddress, tokenId) => {
  console.log(values)
  const owner = values.find(
    callData =>
      callData.name === 'getApproved' &&
      callData.parameters.contractAddress === contractAddress &&
      callData.parameters.tokenId === tokenId,
  )
  console.log(owner)
  return false
})

export const getERC721Approvals = createSelector(getERC721ApproveTransactions, values => {
  console.log(values)
  return false
})
